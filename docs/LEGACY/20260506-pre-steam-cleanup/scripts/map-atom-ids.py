#!/usr/bin/env python
"""
V2 structure-v2 freeQuestionHooks allowAtomIds / depthLayers revealAtomIds
→ V1 실제 atom ID로 매핑하는 스크립트

매핑 전략:
1. V1 v2-atoms.json에서 모든 실제 atom ID 추출 (party/dispute/state별 인덱스)
2. V2 structure-v2.json의 가짜 ID를 파싱하여 party/dispute/state 정보 추출
3. 해당 V1 atoms로 교체

가짜 ID 패턴:
- colon_unlock: spouse09:a:d-1:unlock:s2:0
- dot_unlock_A: family02:a:d1.unlock.s4.0
- dot_unlock_B: d1.a.unlock.s2.symbolic_name
- dot_unlock_C: d1.unlock.s2.b.context_0
- hyphen_mismatch: neighbor-05:a:d-1:act:0 (V1은 neighbor05:a:d-1:act:0)
"""

import json
import os
import glob
import re
import sys
from collections import defaultdict


def load_v1_atoms(v1_path):
    """V1 atoms 파일에서 모든 atom ID를 party/dispute/state별로 인덱스"""
    with open(v1_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # atom_index[party][disputeId][state] = [id1, id2, ...]
    atom_index = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
    all_ids = set()

    for party in data.get('claimPolicies', {}):
        for did in data['claimPolicies'][party]:
            for state in data['claimPolicies'][party][did]:
                s = data['claimPolicies'][party][did][state]
                if 'claimAtoms' in s:
                    for a in s['claimAtoms']:
                        atom_index[party][did][state].append(a['id'])
                        all_ids.add(a['id'])

    return atom_index, all_ids


def normalize_case_id(case_id):
    """case-id에서 하이픈 제거: neighbor-05 -> neighbor05"""
    return case_id.replace('-', '')


def parse_fake_id(fake_id, case_id):
    """
    가짜 atom ID를 파싱하여 (party, disputeId, state) 튜플 반환.
    파싱 불가시 None 반환.
    """
    case_norm = normalize_case_id(case_id)

    # Pattern 1: caseNorm:party:d-N:unlock:sN:idx (colon_unlock)
    # e.g. spouse09:a:d-1:unlock:s2:0
    m = re.match(r'^[^:]+:([ab]):d-(\d+):unlock:s(\d+):\d+$', fake_id)
    if m:
        party, dnum, snum = m.group(1), m.group(2), m.group(3)
        return party, f'd-{dnum}', f'S{snum}'

    # Pattern 2a: caseNorm:party:dN.unlock.sN.idx (dot_unlock family-02 style)
    # e.g. family02:a:d1.unlock.s4.0
    m = re.match(r'^[^:]+:([ab]):d(\d+)\.unlock\.s(\d+)\.\d+$', fake_id)
    if m:
        party, dnum, snum = m.group(1), m.group(2), m.group(3)
        return party, f'd-{dnum}', f'S{snum}'

    # Pattern 2b: dN.party.unlock.sN.symbolic_name (family-03 style)
    # e.g. d1.a.unlock.s2.temporary_term_seen
    m = re.match(r'^d(\d+)\.([ab])\.unlock\.s(\d+)\..+$', fake_id)
    if m:
        dnum, party, snum = m.group(1), m.group(2), m.group(3)
        return party, f'd-{dnum}', f'S{snum}'

    # Pattern 2c: dN.unlock.sN.party.symbolic_name (family-04 style)
    # e.g. d1.unlock.s2.b.context_0
    m = re.match(r'^d(\d+)\.unlock\.s(\d+)\.([ab])\..+$', fake_id)
    if m:
        dnum, snum, party = m.group(1), m.group(2), m.group(3)
        return party, f'd-{dnum}', f'S{snum}'

    # Pattern 2d: dN.unlock.sN.symbolic (family-05/06/08 style, no party)
    # e.g. d1.unlock.s3.b.metrics_after_reaction -> handled above
    # e.g. d1.a.unlock.s3.landlord-pressure -> handled by 2b

    return None


def try_hyphen_fix(fake_id, case_id, all_v1_ids):
    """
    하이픈 문제 해결:
    - case-id:party:... -> caseid:party:... (V2가 하이픈 있고 V1이 없을 때)
    - caseid:party:... -> case-id:party:... (V2가 하이픈 없고 V1이 있을 때)
    V1에 매칭되는 ID가 있으면 반환, 없으면 None.
    """
    case_hyphen = case_id  # e.g. neighbor-05
    case_norm = normalize_case_id(case_id)  # e.g. neighbor05

    # Try removing hyphen: neighbor-05:... -> neighbor05:...
    if fake_id.startswith(case_hyphen + ':'):
        fixed = case_norm + fake_id[len(case_hyphen):]
        if fixed in all_v1_ids:
            return fixed

    # Try adding hyphen: neighbor05:... -> neighbor-05:...
    if fake_id.startswith(case_norm + ':'):
        fixed = case_hyphen + fake_id[len(case_norm):]
        if fixed in all_v1_ids:
            return fixed

    return None


def get_atoms_for_states(atom_index, dispute_id, states, both_parties=False, party=None):
    """지정된 dispute/states에 해당하는 V1 atom ID들 반환"""
    result = []
    parties = ['a', 'b'] if both_parties else ([party] if party else ['a', 'b'])
    for p in parties:
        for state in states:
            result.extend(atom_index[p][dispute_id][state])
    return result


def map_hook_atoms(hook, atom_index, all_v1_ids, case_id):
    """freeQuestionHook의 allowAtomIds를 매핑"""
    env = hook['answerEnvelope']
    dispute_id = env['disputeId']
    allowed_states = hook.get('allowedAtStates', [])
    old_ids = env['allowAtomIds']
    new_ids = []
    changes = 0
    errors = []

    for aid in old_ids:
        if aid in all_v1_ids:
            new_ids.append(aid)
            continue

        # Try hyphen fix first
        fixed = try_hyphen_fix(aid, case_id, all_v1_ids)
        if fixed:
            new_ids.append(fixed)
            changes += 1
            continue

        # Try parsing as fake unlock ID
        parsed = parse_fake_id(aid, case_id)
        if parsed:
            party, did, state = parsed
            replacements = atom_index[party][did][state]
            if replacements:
                for r in replacements:
                    if r not in new_ids:
                        new_ids.append(r)
                changes += 1
            else:
                errors.append(f'No V1 atoms for {party}.{did}.{state} (fake={aid})')
                new_ids.append(aid)  # keep original
        else:
            errors.append(f'Cannot parse fake ID: {aid}')
            new_ids.append(aid)  # keep original

    # Deduplicate while preserving order
    seen = set()
    deduped = []
    for nid in new_ids:
        if nid not in seen:
            seen.add(nid)
            deduped.append(nid)

    return deduped, changes, errors


def map_depth_layer_atoms(layer, dispute_id, atom_index, all_v1_ids, case_id):
    """depthLayer의 revealAtomIds를 매핑"""
    old_ids = layer.get('revealAtomIds', [])
    if not old_ids:
        return old_ids, 0, []

    layer_id = layer.get('id', '')
    new_ids = []
    changes = 0
    errors = []

    for aid in old_ids:
        if aid in all_v1_ids:
            new_ids.append(aid)
            continue

        # Try hyphen fix
        fixed = try_hyphen_fix(aid, case_id, all_v1_ids)
        if fixed:
            new_ids.append(fixed)
            changes += 1
            continue

        # Try parsing as fake unlock ID
        parsed = parse_fake_id(aid, case_id)
        if parsed:
            party, did, state = parsed
            replacements = atom_index[party][did][state]
            if replacements:
                for r in replacements:
                    if r not in new_ids:
                        new_ids.append(r)
                changes += 1
            else:
                errors.append(f'No V1 atoms for {party}.{did}.{state} (fake={aid})')
                new_ids.append(aid)
        else:
            errors.append(f'Cannot parse fake ID: {aid}')
            new_ids.append(aid)

    seen = set()
    deduped = []
    for nid in new_ids:
        if nid not in seen:
            seen.add(nid)
            deduped.append(nid)

    return deduped, changes, errors


def json_to_ts(data, case_id):
    """JSON 데이터를 TS export 문자열로 변환"""
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    var_name = case_id.replace('-', '_') + '_structure_v2'
    return f'export const {var_name} = {json_str} as const;\n'


def process_case(v2_json_path, case_id, report):
    """단일 사건 처리"""
    v1_path = os.path.join(
        'd:/ProjectWS/docs/ref/리뉴얼참고/gpt-batch',
        case_id,
        f'{case_id}-v2-atoms.json'
    )

    if not os.path.exists(v1_path):
        report['skipped_no_v1'].append(case_id)
        return

    # Load V1 atoms
    atom_index, all_v1_ids = load_v1_atoms(v1_path)

    # Load V2 structure
    with open(v2_json_path, 'r', encoding='utf-8') as f:
        v2_data = json.load(f)

    total_changes = 0
    total_errors = []

    # Check if already fully matched (PASS)
    all_v2_ids = set()
    for h in v2_data.get('freeQuestionHooks', []):
        for aid in h['answerEnvelope']['allowAtomIds']:
            all_v2_ids.add(aid)
    for d in v2_data.get('disputes', []):
        for layer in d.get('depthLayers', []):
            for aid in layer.get('revealAtomIds', []):
                all_v2_ids.add(aid)

    unmatched = all_v2_ids - all_v1_ids
    if not unmatched:
        report['pass'].append(case_id)
        return

    # Map freeQuestionHooks
    for hook in v2_data.get('freeQuestionHooks', []):
        new_ids, changes, errors = map_hook_atoms(hook, atom_index, all_v1_ids, case_id)
        hook['answerEnvelope']['allowAtomIds'] = new_ids
        total_changes += changes
        total_errors.extend(errors)

    # Map depthLayers revealAtomIds
    for dispute in v2_data.get('disputes', []):
        dispute_id = dispute['id']
        for layer in dispute.get('depthLayers', []):
            new_ids, changes, errors = map_depth_layer_atoms(
                layer, dispute_id, atom_index, all_v1_ids, case_id
            )
            layer['revealAtomIds'] = new_ids
            total_changes += changes
            total_errors.extend(errors)

    # Also map proposedUnlockAtoms if present
    if 'proposedUnlockAtoms' in v2_data:
        for pua in v2_data['proposedUnlockAtoms']:
            aid = pua.get('id', '')
            if aid not in all_v1_ids:
                fixed = try_hyphen_fix(aid, case_id, all_v1_ids)
                if fixed:
                    pua['id'] = fixed
                    total_changes += 1

    # Write JSON
    with open(v2_json_path, 'w', encoding='utf-8') as f:
        json.dump(v2_data, f, indent=2, ensure_ascii=False)
        f.write('\n')

    # Write TS
    ts_path = v2_json_path.replace('.json', '.ts')
    if os.path.exists(ts_path):
        ts_content = json_to_ts(v2_data, case_id)
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)

    # Verify remaining unmatched after mapping
    remaining_unmatched = set()
    for h in v2_data.get('freeQuestionHooks', []):
        for aid in h['answerEnvelope']['allowAtomIds']:
            if aid not in all_v1_ids:
                remaining_unmatched.add(aid)
    for d in v2_data.get('disputes', []):
        for layer in d.get('depthLayers', []):
            for aid in layer.get('revealAtomIds', []):
                if aid not in all_v1_ids:
                    remaining_unmatched.add(aid)

    report['mapped'].append({
        'case_id': case_id,
        'changes': total_changes,
        'errors': total_errors,
        'before_unmatched': len(unmatched),
        'after_unmatched': len(remaining_unmatched),
        'remaining': sorted(remaining_unmatched)[:10] if remaining_unmatched else []
    })


def main():
    v2_base = 'd:/ProjectWS/docs/ref/리뉴얼참고/gpt-batch-v2'
    v2_files = glob.glob(os.path.join(v2_base, 'round-*/output/*-structure-v2.json'))
    v2_files.sort()

    report = {
        'pass': [],
        'skipped_no_v1': [],
        'mapped': []
    }

    for f in v2_files:
        case_id = os.path.basename(f).replace('-structure-v2.json', '')
        process_case(f, case_id, report)

    # Print report
    print('=' * 70)
    print('ATOM ID MAPPING REPORT')
    print('=' * 70)

    print(f'\n--- PASS (이미 V1 ID와 일치, 수정 안 함): {len(report["pass"])}건 ---')
    for c in sorted(report['pass']):
        print(f'  {c}')

    print(f'\n--- SKIP (V1 atoms 파일 없음): {len(report["skipped_no_v1"])}건 ---')
    for c in sorted(report['skipped_no_v1']):
        print(f'  {c}')

    print(f'\n--- MAPPED (매핑 수행): {len(report["mapped"])}건 ---')
    success_count = 0
    partial_count = 0
    for m in sorted(report['mapped'], key=lambda x: x['case_id']):
        status = 'OK' if m['after_unmatched'] == 0 else 'PARTIAL'
        if status == 'OK':
            success_count += 1
        else:
            partial_count += 1
        print(f'  {m["case_id"]}: {status} | changes={m["changes"]} | '
              f'unmatched: {m["before_unmatched"]} → {m["after_unmatched"]}')
        if m['errors']:
            for e in m['errors'][:5]:
                print(f'    ERROR: {e}')
        if m['remaining']:
            for r in m['remaining'][:5]:
                print(f'    REMAINING: {r}')

    print(f'\n--- SUMMARY ---')
    print(f'PASS: {len(report["pass"])}')
    print(f'SKIP (no V1): {len(report["skipped_no_v1"])}')
    print(f'MAPPED OK: {success_count}')
    print(f'MAPPED PARTIAL: {partial_count}')
    print(f'TOTAL: {len(v2_files)}')


if __name__ == '__main__':
    main()
