export function addTelemetryEventsMigration(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS telemetry_events (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id        TEXT NOT NULL UNIQUE,
      anon_id         TEXT NOT NULL,
      session_id      TEXT NOT NULL,
      case_id         TEXT,
      event_name      TEXT NOT NULL,
      event_payload   TEXT NOT NULL,
      client_ts       TEXT NOT NULL,
      received_at     TEXT NOT NULL DEFAULT (datetime('now')),
      client_build    TEXT NOT NULL,
      client_platform TEXT NOT NULL,
      client_locale   TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_telemetry_anon_received
      ON telemetry_events(anon_id, received_at);
    CREATE INDEX IF NOT EXISTS idx_telemetry_session_received
      ON telemetry_events(session_id, received_at);
    CREATE INDEX IF NOT EXISTS idx_telemetry_event_received
      ON telemetry_events(event_name, received_at);
    CREATE INDEX IF NOT EXISTS idx_telemetry_case_event
      ON telemetry_events(case_id, event_name);
    CREATE INDEX IF NOT EXISTS idx_telemetry_client_ts
      ON telemetry_events(client_ts);
  `);
}
