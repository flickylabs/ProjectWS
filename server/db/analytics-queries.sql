-- Funnel telemetry first-pass analysis queries.
-- Replace :start_date / :end_date with ISO timestamps or remove the WHERE block.

-- 1. Daily event volume and unique anonymous users.
SELECT
  date(received_at) AS day,
  COUNT(*) AS event_count,
  COUNT(DISTINCT anon_id) AS users,
  COUNT(DISTINCT session_id) AS sessions
FROM telemetry_events
WHERE received_at >= :start_date AND received_at < :end_date
GROUP BY day
ORDER BY day;

-- 2. Session funnel by milestone event.
SELECT
  COUNT(DISTINCT CASE WHEN event_name = 'session_start' THEN session_id END) AS sessions_started,
  COUNT(DISTINCT CASE WHEN event_name = 'first_meaningful_action' THEN session_id END) AS first_actions,
  COUNT(DISTINCT CASE WHEN event_name = 'verdict_enter' THEN session_id END) AS verdict_entries,
  COUNT(DISTINCT CASE WHEN event_name = 'verdict_submit' THEN session_id END) AS verdict_submits
FROM telemetry_events
WHERE received_at >= :start_date AND received_at < :end_date;

-- 3. Phase exits: average duration and action count.
SELECT
  json_extract(event_payload, '$.phase') AS phase,
  COUNT(*) AS exits,
  ROUND(AVG(json_extract(event_payload, '$.duration_sec')), 1) AS avg_duration_sec,
  ROUND(AVG(json_extract(event_payload, '$.actions_count')), 1) AS avg_actions
FROM telemetry_events
WHERE event_name = 'phase_exit'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY phase
ORDER BY phase;

-- 4. Tutorial completion and skip rate.
SELECT
  COUNT(DISTINCT CASE WHEN event_name = 'tutorial_started' THEN session_id END) AS started,
  COUNT(DISTINCT CASE WHEN event_name = 'tutorial_finished' THEN session_id END) AS finished,
  COUNT(DISTINCT CASE WHEN event_name = 'tutorial_skipped' THEN session_id END) AS skipped,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_name = 'tutorial_finished' THEN session_id END)
    / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'tutorial_started' THEN session_id END), 0), 1) AS finish_rate_pct
FROM telemetry_events
WHERE received_at >= :start_date AND received_at < :end_date;

-- 5. Action block reasons by action type.
SELECT
  json_extract(event_payload, '$.action_type') AS action_type,
  json_extract(event_payload, '$.reason') AS reason,
  COUNT(*) AS count
FROM telemetry_events
WHERE event_name = 'action_blocked'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY action_type, reason
ORDER BY count DESC;

-- 6. Evidence presentation effectiveness.
SELECT
  case_id,
  json_extract(event_payload, '$.evidence_id') AS evidence_id,
  json_extract(event_payload, '$.result') AS result,
  COUNT(*) AS count
FROM telemetry_events
WHERE event_name = 'evidence_present_result'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY case_id, evidence_id, result
ORDER BY count DESC;

-- 7. Truth stage transitions and collapses.
SELECT
  case_id,
  json_extract(event_payload, '$.target') AS target,
  json_extract(event_payload, '$.from_state') AS from_state,
  json_extract(event_payload, '$.to_state') AS to_state,
  COUNT(*) AS count
FROM telemetry_events
WHERE event_name = 'truth_stage_changed'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY case_id, target, from_state, to_state
ORDER BY count DESC;

-- 8. Combination lab success and fail reasons.
SELECT
  event_name,
  COALESCE(json_extract(event_payload, '$.recipe_id'), json_extract(event_payload, '$.recipe_attempted[0]')) AS recipe_id,
  COALESCE(json_extract(event_payload, '$.reason'), 'success') AS outcome,
  COUNT(*) AS count
FROM telemetry_events
WHERE event_name IN ('combination_success', 'combination_fail')
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY event_name, recipe_id, outcome
ORDER BY count DESC;

-- 9. Verdict score distribution.
SELECT
  case_id,
  CAST(json_extract(event_payload, '$.confidence') AS INTEGER) / 10 * 10 AS score_bucket,
  COUNT(*) AS verdicts
FROM telemetry_events
WHERE event_name = 'verdict_submit'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY case_id, score_bucket
ORDER BY case_id, score_bucket;

-- 10. Impact beat usage by intensity.
SELECT
  json_extract(event_payload, '$.beat_id') AS beat_id,
  json_extract(event_payload, '$.intensity') AS intensity,
  COUNT(*) AS count
FROM telemetry_events
WHERE event_name = 'impact_beat_played'
  AND received_at >= :start_date AND received_at < :end_date
GROUP BY beat_id, intensity
ORDER BY count DESC;
