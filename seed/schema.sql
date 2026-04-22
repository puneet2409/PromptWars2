-- Chunav Saathi — AlloyDB / PostgreSQL Schema
-- This schema is applied at deploy time when DATABASE_URL is set.

CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  code VARCHAR(5) UNIQUE NOT NULL,
  lok_sabha_seats INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS constituencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  state_id INTEGER REFERENCES states(id),
  type VARCHAR(20) DEFAULT 'general' -- general, sc, st
);

CREATE TABLE IF NOT EXISTS parties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  abbreviation VARCHAR(20) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#64748b'
);

CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  constituency_id INTEGER REFERENCES constituencies(id),
  year INTEGER NOT NULL,
  candidate_name VARCHAR(200) NOT NULL,
  party_id INTEGER REFERENCES parties(id),
  votes INTEGER DEFAULT 0,
  is_winner BOOLEAN DEFAULT false,
  margin INTEGER DEFAULT 0,
  turnout NUMERIC(5,2) DEFAULT 0
);

CREATE INDEX idx_results_year ON results(year);
CREATE INDEX idx_results_constituency ON results(constituency_id);
CREATE INDEX idx_constituencies_state ON constituencies(state_id);
