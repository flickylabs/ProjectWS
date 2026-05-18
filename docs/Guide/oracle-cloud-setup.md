# Oracle Cloud Always Free — Solomon 텔레메트리 백엔드 셋업 가이드

작성일: 2026-05-18
결정 근거: [decisions-5.md](decisions-5.md) §3 옵션 G
선행 자료: [master-task.md](master-task.md) (Codex 퍼널 의뢰서, 구현 완료)

## §0. 개요

| 항목 | 값 |
|---|---|
| 비용 | **영구 $0** (Always Free 한도 내) |
| 셋업 시간 | 1회 약 2~4시간 |
| 운영 부담 | 거의 0 (autostart + nginx + Let's Encrypt 자동 갱신) |
| 한국 region | ✓ Seoul (`AP-SEOUL-1`), Chuncheon (`AP-CHUNCHEON-1`) 둘 다 가능 |
| 기술 스택 | Ubuntu 22 + Node 20 + nginx + SQLite (server/ 그대로) |
| 대안 | 부록 A (1차 비활성), 부록 B (Cloudflare Workers 마이그레이션) |

**왜 Oracle Cloud Always Free**:
- VPS는 사용자 0명이어도 월 $5 고정 비용 발생. Oracle Free는 영구 $0
- `server/` Express + SQLite 그대로 deploy. 추가 마이그레이션 0
- Cloudflare Workers (옵션 E)는 더 무료 한도 크지만 Workers 변환 필요. 출시 일정 길어짐

## §1. Oracle Cloud 계정 + 인스턴스

### §1.1. 계정 생성
1. https://oracle.com → Cloud → Sign up Free
2. 신용카드 verification (인증만, 과금 안 됨)
3. **Home Region 선택 = Korea Northwest (Chuncheon) 또는 Korea Central (Seoul)** — 한국 사용자 latency 최저
4. 계정 활성 대기 (5~30분)

### §1.2. Always Free Compute 인스턴스
Compute → Instances → **Create Instance**

| 설정 | 값 |
|---|---|
| Image | Canonical Ubuntu 22.04 |
| Shape | **VM.Standard.A1.Flex** (Ampere ARM) |
| OCPU | 1 (최대 4까지 Always Free) |
| Memory | 6 GB (최대 24 GB까지 Always Free) |
| Boot volume | 50 GB (Always Free 한도 200 GB) |
| Public IP | Assign |
| SSH key | 새 페어 생성 → `.pem` 다운로드 + 안전 보관 |

> **Ampere ARM 주의**: x86 대비 일부 npm native 모듈 호환 확인 필요. `better-sqlite3`는 ARM prebuild 지원 ✓

### §1.3. 네트워킹 (Ingress)
인스턴스 → Subnet → **Security List** → Default → **Add Ingress Rule**

| Source CIDR | Protocol | Port |
|---|---|---|
| 0.0.0.0/0 | TCP | 80 |
| 0.0.0.0/0 | TCP | 443 |

SSH 22번은 기본 enable. 보안 강화 위해 SSH source CIDR를 본인 IP로 제한 권장.

### §1.4. Ubuntu 자체 방화벽 (iptables)
SSH 접속 후:
```bash
sudo iptables -I INPUT 5 -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 5 -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

## §2. 서버 환경 설치

### §2.1. 시스템 업데이트
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx
```

### §2.2. Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # → v20.x
```

## §3. 서버 코드 배포

### §3.1. Repo clone
```bash
sudo mkdir -p /opt/solomon-telemetry
sudo chown ubuntu:ubuntu /opt/solomon-telemetry
cd /opt/solomon-telemetry
git clone <repo-url> .
cd server
npm install --omit=dev
```

> **선택**: server/ 만 cherry-pick clone 가능. 클라 코드는 prod 서버에 불필요.

### §3.2. 환경변수 (.env)
`/opt/solomon-telemetry/server/.env` 생성:
```env
NODE_ENV=production
PORT=3001

# Steam 인증
STEAM_REQUIRE_API_AUTH=true
STEAM_AUTH_MOCK=0
STEAM_WEB_API_KEY=<Steam Web API Key>

# 텔레메트리 DB 영속 위치
DATABASE_FILE=/opt/solomon-telemetry/server/data/telemetry.db

# (선택) CORS 화이트리스트
ALLOWED_ORIGINS=app://./,file://,https://your-game-domain.com
```

`chmod 600 .env` 로 권한 제한.

### §3.3. DB migration
```bash
mkdir -p data
node db/migrations/add-telemetry-events.js
ls -la data/  # telemetry.db 생성 확인
```

### §3.4. systemd 서비스
`/etc/systemd/system/solomon-telemetry.service`:
```ini
[Unit]
Description=Solomon Telemetry Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/solomon-telemetry/server
ExecStart=/usr/bin/node index.js
Restart=on-failure
RestartSec=5s
EnvironmentFile=/opt/solomon-telemetry/server/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable solomon-telemetry
sudo systemctl start solomon-telemetry
sudo systemctl status solomon-telemetry  # active 확인
```

### §3.5. nginx reverse proxy
`/etc/nginx/sites-available/solomon-telemetry`:
```nginx
server {
  listen 80;
  server_name telemetry.your-domain.com;

  client_max_body_size 256k;  # telemetry batch payload 한도

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 30s;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/solomon-telemetry /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## §4. 도메인 + SSL

### §4.1. DNS 연결 (Cloudflare 무료 plan 권장)
1. Cloudflare 계정 + 도메인 등록 (또는 기존 사용)
2. DNS → A record 추가
   - Name: `telemetry` (or 원하는 sub)
   - Target: Oracle 공용 IPv4
   - **Proxy status: DNS only (회색 구름)** ← Let's Encrypt 발급용 일시 OFF

### §4.2. Let's Encrypt 인증서
```bash
sudo certbot --nginx -d telemetry.your-domain.com
# 이메일 입력, TOS 동의, A 선택 (redirect HTTP→HTTPS 활성)
```
자동 갱신 cron 확인:
```bash
sudo systemctl list-timers | grep certbot
```

### §4.3. Cloudflare proxy ON
- DNS proxy status → **Proxied (주황 구름)**
- CDN + DDoS 보호 자동 활성화
- 추가 비용 0

## §5. 클라 빌드 시점 endpoint 주입

### §5.1. Vite 빌드 환경변수
배포 빌드 시:
```bash
VITE_API_URL=https://telemetry.your-domain.com/api npm run build:pc:steam
```

또는 `.env.production`:
```env
VITE_API_URL=https://telemetry.your-domain.com/api
```

### §5.2. 검증
배포 후 클라에서:
1. PC 실행 → 첫 진입 약관 모달 통과
2. 사건 진행 → 임의 행동 (증거 제시 등)
3. Oracle 서버에서:
   ```bash
   sudo journalctl -u solomon-telemetry -f
   ```
   → POST `/api/telemetry/events` 로그 표시되어야 함
4. DB 확인:
   ```bash
   sqlite3 /opt/solomon-telemetry/server/data/telemetry.db "SELECT COUNT(*) FROM telemetry_events;"
   ```

## §6. 운영

### §6.1. 로그
```bash
sudo journalctl -u solomon-telemetry -f      # Node 앱 로그
sudo tail -f /var/log/nginx/access.log       # nginx 요청
sudo tail -f /var/log/nginx/error.log
```

### §6.2. DB 백업 (cron)
```bash
crontab -e
```
```cron
0 3 * * * cp /opt/solomon-telemetry/server/data/telemetry.db /opt/solomon-telemetry/backups/telemetry-$(date +\%Y\%m\%d).db
0 4 * * 0 find /opt/solomon-telemetry/backups -name "telemetry-*.db" -mtime +30 -delete
```

### §6.3. 분석 쿼리
```bash
sqlite3 /opt/solomon-telemetry/server/data/telemetry.db < /opt/solomon-telemetry/server/db/analytics-queries.sql
```
서버 코드의 analytics-queries.sql (10건) — funnel 이탈률, 행동 분포, 사건별 완료율 등.

### §6.4. Always Free 유지 조건 (중요)
**Oracle은 7일 이상 idle (CPU < 20%) 시 Free 인스턴스 reclaim 가능.**

방지책: 가벼운 keepalive cron:
```cron
*/15 * * * * curl -s https://telemetry.your-domain.com/api/health > /dev/null
```
또는 systemd timer로 동등 효과. 보통 텔레메트리 트래픽 자체로 충분.

## §7. 비상 대응

### §7.1. 서버 다운
```bash
sudo systemctl restart solomon-telemetry
sudo journalctl -u solomon-telemetry -n 100  # 직전 100줄 원인 확인
```
**클라는 큐+재시도+sendBeacon 보호** — 일시 다운 사용자 체감 0.

### §7.2. OOM / 메모리 부족
1 OCPU / 6 GB로 출시 충분. 부족 시 4 OCPU / 24 GB로 무료 확장:
- Console → Instance → Edit Shape → Add OCPU + RAM
- 다운타임 ~1분

### §7.3. SSL 인증서 만료
certbot 자동 갱신 cron 실패 시:
```bash
sudo certbot renew --dry-run
sudo certbot renew  # 강제
```

### §7.4. Oracle 정책 변경 (장기 위험)
Always Free 정책은 변경 가능성 낮지만 0 아님. 출시 후 6개월 시점 재검토:
- Cloudflare Workers + D1 (decisions-5.md §3 옵션 E) 대안 준비
- DB schema는 Workers D1 호환 가능

## §8. 분석 대시보드 (선택)

server/db/analytics-queries.sql 10건을 자동 실행하는 웹 대시보드 후속:
- Metabase / Redash 무료 self-host
- 또는 단순 Node-cron → Slack 일간 리포트 (가장 가벼움)

본 가이드 범위 밖. 출시 후 데이터 양 보고 결정.

---

## 부록 A. 1차 비활성 모드 (시간 부족 시)

Oracle 셋업 미루고 출시:
1. 클라 `.env.production`에 `VITE_API_URL=https://nonexistent.local/api` 또는 미설정 (fetch 실패 → 큐 누적)
2. 또는 server/funnelClient.ts에서 `isTelemetryRuntimeEnabled()` 강제 false 분기 (출시 후 ON으로 복구)
3. 첫 2~4주 데이터 누락 감수
4. Oracle 셋업 완료 후 클라 build 시 `VITE_API_URL` 정식 주입 → 다음 patch로 활성

**위험**: 출시 초기 funnel 데이터 누락. 사용자 이탈 지점 불명.

## 부록 B. Cloudflare Workers + D1 마이그레이션 (장기 확장)

Oracle Free 한도 위협 또는 동시 10k+ 사용자 시점:
1. server/routes/telemetry.js → Workers fetch handler 변환
2. SQLite → D1 (호환 SQL, schema 거의 그대로)
3. better-sqlite3 → D1 binding API
4. Oracle 인스턴스 retire

마이그레이션 예상 1~2일 (server/ 코드 작음). 출시 후 안정 시점 검토.

## 부록 C. 비용 시뮬레이션

| 사용자 (DAU) | 일 이벤트 추정 | DB 성장률 | Oracle Free 한도 |
|---|---|---|---|
| 100 | ~50,000 | ~50 MB/월 | ✓ 영구 무료 |
| 1,000 | 500,000 | ~500 MB/월 | ✓ 영구 무료 |
| 10,000 | 5,000,000 | ~5 GB/월 | ✓ (50 GB 부트 디스크 안) |
| 100,000 | 50M | ~50 GB/월 | ⚠ archival 필요 (또는 옵션 B 전환) |

> 동시 사용자 10k 도달 시 Workers + D1 검토. 그 전까지 Oracle Free 충분.
