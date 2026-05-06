"""
증인(socialGraph) 상세 프로필 자동 생성.
기존 데이터(slot, name, relationTo, bias, knowledgeScope)를 기반으로
개연성 있는 witnessProfile을 추가한다.
"""
import json, sys, os, re

sys.stdout.reconfigure(encoding='utf-8')

def extract_given_name(full_name):
    """'오미숙 (세린의 어머니)' → '오미숙', '미숙'"""
    clean = full_name.split('(')[0].strip()
    parts = clean.split()
    full = parts[0] if parts else clean
    given = full[1:] if len(full) >= 2 else full
    return full, given

def extract_role(full_name):
    """괄호 안 역할 추출: '오미숙 (세린의 어머니)' → '세린의 어머니'"""
    m = re.search(r'\(([^)]+)\)', full_name)
    return m.group(1) if m else ''

def estimate_age(party_a, party_b, slot, role, relation_to):
    """역할/슬롯 기반 나이 추정"""
    a_age = party_a.get('age', 35)
    b_age = party_b.get('age', 35)
    ref_age = a_age if relation_to == 'a' else b_age if relation_to == 'b' else (a_age + b_age) // 2

    if '어머니' in role or '아버지' in role or '부모' in role:
        return ref_age + 25
    if '누나' in role or '형' in role or '언니' in role or '오빠' in role:
        return ref_age + 3
    if '동생' in role:
        return ref_age - 3
    if slot == 'family_1' or slot == 'family_2':
        if '어머니' in role or '아버지' in role:
            return ref_age + 25
        return ref_age + 5  # 가족은 약간 위
    if slot == 'institutional':
        return ref_age + 5  # 기관 담당자는 약간 위
    if '동기' in role or '친구' in role:
        return ref_age  # 동갑
    if '동료' in role or '선배' in role:
        return ref_age + 2
    if '후배' in role:
        return ref_age - 3
    return ref_age + 2  # 기본: 약간 위

def build_speech_style(slot, role, bias, relation_to, rel_type):
    """역할 기반 말투 생성"""
    if slot == 'institutional':
        return '사실 위주로 간결하게 답한다. 직업적 용어를 섞되 감정은 절제한다.'
    if '어머니' in role or '아버지' in role:
        return '자식 편을 들면서도 객관적으로 보이려 한다. 어른 특유의 훈계 톤이 섞인다.'
    if '동기' in role or '친구' in role:
        return '편하게 말하다가 재판관 앞에서는 존댓말로 돌아간다. 친구의 입장을 자연스럽게 대변한다.'
    if '동료' in role:
        return '직장 상황을 잘 아는 만큼 구체적이지만, 본인 평판에 영향 갈까 봐 표현을 고른다.'
    if '누나' in role or '형' in role or '언니' in role:
        return '동생 걱정이 앞서지만 사실은 사실대로 말하려 한다. 감정이 올라오면 직설적이 된다.'
    if '동생' in role:
        return '형/누나 앞에서 말 못 했던 걸 재판관 앞에서 꺼낸다. 조심스럽지만 할 말은 한다.'
    if bias == 'neutral':
        return '객관적으로 답하려 하지만 자기가 본 장면 위주로 말한다.'
    return '조심스럽게 말하되, 자기가 아는 범위를 넘어서지 않으려 한다.'

def build_address(slot, role, rel_type, party_a, party_b, relation_to):
    """호칭 생성"""
    a_given = party_a['name'][1:] if len(party_a['name']) >= 2 else party_a['name']
    b_given = party_b['name'][1:] if len(party_b['name']) >= 2 else party_b['name']

    # 재판관 호칭: 항상 "재판관님"
    judge = '재판관님'

    # A, B 호칭
    if '어머니' in role or '아버지' in role:
        # 부모가 자녀를 부를 때
        child = a_given if relation_to == 'a' else b_given
        other = b_given if relation_to == 'a' else a_given
        addr_child = child  # 이름만
        addr_other = other + '씨'
        return judge, addr_child if relation_to == 'a' else addr_other, addr_other if relation_to == 'a' else addr_child

    if '동기' in role or '친구' in role:
        friend = a_given if relation_to == 'a' else b_given
        other = b_given if relation_to == 'a' else a_given
        addr_friend = friend  # 이름만 (친구)
        addr_other = other + '씨'
        return judge, addr_friend if relation_to == 'a' else addr_other, addr_other if relation_to == 'a' else addr_friend

    if slot == 'institutional':
        return judge, party_a['name'] + '씨', party_b['name'] + '씨'

    if '동료' in role:
        colleague = a_given if relation_to == 'a' else b_given
        other = b_given if relation_to == 'a' else a_given
        return judge, colleague + '씨', other + '씨'

    # 기본
    return judge, a_given + '씨', b_given + '씨'

def build_sentiment(bias, relation_to):
    """편향에 따른 감정 점수"""
    if bias == 'pro_a':
        return (60, -10) if relation_to != 'b' else (60, -20)
    if bias == 'pro_b':
        return (-10, 60) if relation_to != 'a' else (-20, 60)
    if bias == 'neutral':
        return (20, 20)
    if bias == 'self_interest' or bias == 'pro_self':
        return (0, 0)
    if bias == 'anti_a':
        return (-40, 30)
    if bias == 'anti_b':
        return (30, -40)
    if bias == 'against_both':
        return (-20, -20)
    return (10, 10)

def generate_profile(tp, party_a, party_b, rel_type):
    """증인 프로필 생성"""
    full_name, given = extract_given_name(tp['name'])
    role = extract_role(tp['name'])
    slot = tp['slot']
    bias = tp['bias']
    relation_to = tp['relationTo']

    age = estimate_age(party_a, party_b, slot, role, relation_to)

    # 직업 추정
    if slot == 'institutional':
        occ = role if role else '기관 담당자'
    elif '어머니' in role:
        occ = '주부' if age > 55 else '자영업'
    elif '아버지' in role:
        occ = '은퇴' if age > 60 else '자영업'
    elif '동기' in role or '친구' in role:
        ref = party_a if relation_to == 'a' else party_b
        occ = ref.get('occupation', '회사원') + ' 관련'
    elif '동료' in role:
        ref = party_a if relation_to == 'a' else party_b
        occ = ref.get('occupation', '회사원')
    else:
        occ = role if role else '미상'

    speech = build_speech_style(slot, role, bias, relation_to, rel_type)
    judge_addr, addr_a, addr_b = build_address(slot, role, rel_type, party_a, party_b, relation_to)
    sent_a, sent_b = build_sentiment(bias, relation_to)

    # 관계 설명
    if relation_to == 'a':
        rel_a = role if role else f'{party_a["name"]}의 지인'
        rel_b = f'{party_b["name"]}와는 이 사건을 통해 알게 됨' if bias != 'pro_b' else f'{party_b["name"]}도 알고 있는 사이'
    elif relation_to == 'b':
        rel_b = role if role else f'{party_b["name"]}의 지인'
        rel_a = f'{party_a["name"]}와는 이 사건을 통해 알게 됨' if bias != 'pro_a' else f'{party_a["name"]}도 알고 있는 사이'
    else:
        rel_a = f'{party_a["name"]}을 업무상 알고 있음'
        rel_b = f'{party_b["name"]}을 업무상 알고 있음'

    return {
        'age': age,
        'occupation': occ,
        'relationToA': rel_a,
        'relationToB': rel_b,
        'sentimentToA': sent_a,
        'sentimentToB': sent_b,
        'speechStyle': speech,
        'addressJudge': judge_addr,
        'addressA': addr_a,
        'addressB': addr_b,
    }

def main():
    base = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'cases', 'generated')
    categories = ['spouse','neighbor','workplace','partnership','family','friend','tenant']
    total = 0

    for cat in categories:
        for i in range(1, 13):
            cid = f'{cat}-{i:02d}'
            path = os.path.join(base, f'{cid}.json')
            with open(path, 'r', encoding='utf-8') as f:
                case = json.load(f)

            rel_type = case.get('meta', {}).get('relationshipType', cat)
            party_a = case['duo']['partyA']
            party_b = case['duo']['partyB']

            for tp in case['duo'].get('socialGraph', []):
                if 'witnessProfile' not in tp:
                    tp['witnessProfile'] = generate_profile(tp, party_a, party_b, rel_type)
                    total += 1

            with open(path, 'w', encoding='utf-8') as f:
                json.dump(case, f, ensure_ascii=False, indent=2)

    print(f'{total} witness profiles generated')

if __name__ == '__main__':
    main()
