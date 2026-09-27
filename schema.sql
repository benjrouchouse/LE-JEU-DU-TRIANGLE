CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  grade TEXT,
  name TEXT NOT NULL,
  grp INTEGER NOT NULL,
  level TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS movements (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,
  month TEXT,
  member_id TEXT,
  member_label TEXT,
  type TEXT NOT NULL,
  from_group INTEGER,
  from_level TEXT,
  to_group INTEGER,
  to_level TEXT,
  note TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT OR IGNORE INTO settings (key, value) VALUES ('targets', '{"N4":13,"N3":17,"N2PL":4,"N12":21}');
