# Case Generation Thread Handoffs

Use these files as copy-paste prompts for dedicated Codex case-generation sessions.

## Thread Registry

| Thread name | Target | Purpose | File |
| --- | --- | --- | --- |
| `CASE_GENERATOR_REBUILD` | Codex | Rebuild the current Korean-first case generator and create the generator guide | `01-codex-case-generator-rebuild.md` |
| `CASE_GENERATOR_REBUILD - spouse-02 Concept Brief` | Codex | Create 3 spouse-02 concept options and one selected concept brief | `02-codex-spouse-02-concept-brief.md` |
| `CASE_GENERATOR_REBUILD - Session-First Reset` | Codex | Reject generic spouse-02 concept, update guide, regenerate Session-first concepts | `03-codex-session-first-reset.md` |
| `PROJECT_CONTROL_TOWER` | Codex | Overall project control, case generation review, promotion approval, release validation | Main coordination thread |

## Operating Rule

The rebuild thread should produce drafts and tools, but production promotion into `src/data/**` should be coordinated through `PROJECT_CONTROL_TOWER`.

Generated draft output should go under `tmp/case-generation/` until reviewed.
