
CREATE TABLE IF NOT EXISTS lessons_readed (
  id_lesson INTEGER,
  started_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workshops_started (
  id_workshop INTEGER,
  started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

