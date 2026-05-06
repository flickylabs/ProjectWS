"""Apply refined texts from _texts.json back to generated JSON."""
import json, sys, os

def apply_refined(case_id):
    base = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'cases')
    refined_path = os.path.join(base, 'refined', f'{case_id}_texts.json')
    gen_path = os.path.join(base, 'generated', f'{case_id}.json')

    with open(refined_path, 'r', encoding='utf-8') as f:
        texts = json.load(f)
    with open(gen_path, 'r', encoding='utf-8') as f:
        case = json.load(f)

    field_map = {
        'meta.anchorTruth': ('meta', 'anchorTruth'),
        'meta.emotionalBait': ('meta', 'emotionalBait'),
        'meta.resolutionDilemma': ('meta', 'resolutionDilemma'),
        'duo.partyA.speechStyle': ('duo', 'partyA', 'speechStyle'),
        'duo.partyA.fear': ('duo', 'partyA', 'fear'),
        'duo.partyB.speechStyle': ('duo', 'partyB', 'speechStyle'),
        'duo.partyB.fear': ('duo', 'partyB', 'fear'),
        'context.description': ('context', 'description'),
        'context.triggerAmplifier': ('context', 'triggerAmplifier'),
    }
    for key, path in field_map.items():
        if key in texts.get('fields', {}):
            obj = case
            for p in path[:-1]:
                obj = obj[p]
            obj[path[-1]] = texts['fields'][key]['refined']

    for arr_key, items in texts.get('arrays', {}).items():
        if arr_key == 'duo.partyA.verbalTells.pattern':
            for item in items:
                case['duo']['partyA']['verbalTells'][int(item['id'])]['pattern'] = item['refined']
        elif arr_key == 'duo.partyB.verbalTells.pattern':
            for item in items:
                case['duo']['partyB']['verbalTells'][int(item['id'])]['pattern'] = item['refined']
        elif arr_key == 'duo.relationshipLedger.description':
            for item in items:
                for ledger in case['duo']['relationshipLedger']:
                    if ledger['id'] == item['id']:
                        ledger['description'] = item['refined']
        elif arr_key == 'duo.socialGraph.knowledgeScope':
            for item in items:
                for tp in case['duo']['socialGraph']:
                    if tp['id'] == item['id']:
                        tp['knowledgeScope'] = item['refined']
        elif arr_key == 'disputes.name':
            for item in items:
                for d in case['disputes']:
                    if d['id'] == item['id']:
                        d['name'] = item['refined']
        elif arr_key == 'disputes.truthDescription':
            for item in items:
                for d in case['disputes']:
                    if d['id'] == item['id']:
                        d['truthDescription'] = item['refined']
        elif arr_key == 'evidence.description':
            for item in items:
                for e in case['evidence']:
                    if e['id'] == item['id']:
                        e['description'] = item['refined']

    for eid, ev_data in texts.get('investigationResults', {}).items():
        for e in case['evidence']:
            if e['id'] == eid:
                for inv_key, inv_item in ev_data['items'].items():
                    e['investigationResults'][inv_key] = inv_item['refined']

    with open(gen_path, 'w', encoding='utf-8') as f:
        json.dump(case, f, ensure_ascii=False, indent=2)
    print(f'{case_id} applied successfully')

if __name__ == '__main__':
    for cid in sys.argv[1:]:
        apply_refined(cid)
