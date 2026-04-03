# Solomon V2 batch outputs

Generated from the uploaded V2 batch request and the four case source bundles.

Contents per case:
- `{case}-structure-v2.json`
- `{case}-structure-v2.ts`
- `{case}-beats-v2-full.json`
- `{case}-beats-v2-full.ts`

Generation notes:
- beat IDs use the hyphenless case prefix (`friend01`, `friend02`, ...).
- top-level `caseId` keeps the hyphenated file/case form (`friend-01`, `friend-02`, ...).
- each case includes 56 beats total, with 12 interjections and 6 fatigue beats.
