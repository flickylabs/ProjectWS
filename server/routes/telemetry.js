import express from 'express';
import { getDB } from '../db/connection.js';

const router = express.Router();

const EVENT_NAMES = new Set([
  'session_start',
  'session_end',
  'phase_enter',
  'phase_exit',
  'tutorial_started',
  'tutorial_step_completed',
  'tutorial_skipped',
  'tutorial_finished',
  'tutorial_restarted_from_settings',
  'first_meaningful_action',
  'action_select',
  'action_blocked',
  'question_result',
  'evidence_investigate',
  'evidence_present_result',
  'feedback_shown',
  'feedback_action',
  'feedback_dismiss',
  'hidden_dispute_emerged',
  'truth_stage_changed',
  'lie_collapse',
  'combination_attempt',
  'combination_success',
  'combination_fail',
  'verdict_enter',
  'verdict_submit',
  'verdict_retry',
  'impact_beat_played',
  't3_climax_reached',
  'verdict_entry_cutscene_played',
  'error_caught',
]);

const CLIENT_PLATFORMS = new Set(['electron-steam', 'electron-dev', 'web-vercel', 'web-dev']);
const MAX_BATCH_SIZE = 100;
const MAX_PAYLOAD_BYTES = 8192;
const MAX_STRING_VALUE_LENGTH = 256;
const DENIED_PAYLOAD_KEYS = [
  /raw/i,
  /dialogue/i,
  /prompt/i,
  /message/i,
  /free.*text/i,
  /question.*text/i,
  /^text$/i,
  /^body$/i,
  /^quote$/i,
];

function telemetryDisabled() {
  return process.env.TELEMETRY_ENABLED === 'false' || process.env.TELEMETRY_ENABLED === '0';
}

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function byteLength(value) {
  return Buffer.byteLength(value, 'utf8');
}

function validId(value, max = 128) {
  return typeof value === 'string' && value.length > 0 && value.length <= max;
}

function containsDeniedPayloadKey(value) {
  if (Array.isArray(value)) return value.some(containsDeniedPayloadKey);
  if (!isPlainObject(value)) {
    return typeof value === 'string' && value.length > MAX_STRING_VALUE_LENGTH;
  }

  return Object.entries(value).some(([key, nested]) => (
    DENIED_PAYLOAD_KEYS.some((pattern) => pattern.test(key)) || containsDeniedPayloadKey(nested)
  ));
}

function normalizeCaseId(value) {
  if (value == null || value === '') return null;
  if (typeof value !== 'string') return null;
  return value.replace(/^case-/, '').slice(0, 128);
}

function validateEvent(event) {
  if (!isPlainObject(event)) return 'event must be an object';
  if (!validId(event.event_id)) return 'event_id is required';
  if (!validId(event.anon_id)) return 'anon_id is required';
  if (!validId(event.session_id)) return 'session_id is required';
  if (!EVENT_NAMES.has(event.event_name)) return 'unknown event_name';
  if (!isPlainObject(event.event_payload)) return 'event_payload must be an object';
  if (byteLength(JSON.stringify(event.event_payload)) > MAX_PAYLOAD_BYTES) return 'event_payload too large';
  if (containsDeniedPayloadKey(event.event_payload)) return 'event_payload contains disallowed text fields';
  if (typeof event.client_ts !== 'string' || Number.isNaN(Date.parse(event.client_ts))) return 'client_ts is invalid';
  if (!validId(event.client_build, 128)) return 'client_build is required';
  if (!CLIENT_PLATFORMS.has(event.client_platform)) return 'client_platform is invalid';
  if (!validId(event.client_locale, 16)) return 'client_locale is required';
  return null;
}

router.post('/events', (req, res) => {
  const events = req.body?.events;
  if (!Array.isArray(events)) {
    return res.status(400).json({ accepted: 0, rejected: 1, errors: [{ index: null, reason: 'events must be an array' }] });
  }
  if (events.length === 0 || events.length > MAX_BATCH_SIZE) {
    return res.status(400).json({ accepted: 0, rejected: events.length, errors: [{ index: null, reason: `events length must be 1-${MAX_BATCH_SIZE}` }] });
  }
  if (telemetryDisabled()) {
    return res.json({ accepted: 0, rejected: 0, disabled: true });
  }

  const db = getDB();
  const insert = db.prepare(`
    INSERT OR IGNORE INTO telemetry_events (
      event_id,
      anon_id,
      session_id,
      case_id,
      event_name,
      event_payload,
      client_ts,
      client_build,
      client_platform,
      client_locale
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let accepted = 0;
  const errors = [];
  const tx = db.transaction((batch) => {
    batch.forEach((event, index) => {
      const error = validateEvent(event);
      if (error) {
        errors.push({ index, reason: error });
        return;
      }

      insert.run(
        event.event_id,
        event.anon_id,
        event.session_id,
        normalizeCaseId(event.case_id),
        event.event_name,
        JSON.stringify(event.event_payload),
        event.client_ts,
        event.client_build,
        event.client_platform,
        event.client_locale,
      );
      accepted += 1;
    });
  });

  try {
    tx(events);
    return res.json({ accepted, rejected: errors.length, errors });
  } catch (err) {
    console.error('[telemetry] failed to insert events', err);
    return res.status(500).json({ accepted: 0, rejected: events.length, errors: [{ index: null, reason: 'insert_failed' }] });
  }
});

router.delete('/me', (req, res) => {
  const anonId = req.query.anon_id || req.body?.anon_id;
  if (!validId(anonId)) {
    return res.status(400).json({ deleted: 0, error: 'anon_id is required' });
  }
  const result = getDB().prepare('DELETE FROM telemetry_events WHERE anon_id = ?').run(anonId);
  return res.json({ deleted: result.changes });
});

export default router;
