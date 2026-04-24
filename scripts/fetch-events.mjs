/**
 * Build-time Google Calendar (iCal) fetcher.
 *
 * Fetches the public .ics feed, picks the next few upcoming events (or
 * falls back to recent past events), and writes src/data/events.json for
 * the homepage Events component to import statically.
 */

import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import ical from 'node-ical';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_PATH = join(ROOT, 'src', 'data', 'events.json');

const DEFAULT_ICAL_URL =
  'https://calendar.google.com/calendar/ical/3358654a63a1e4c7d975799b72ab7f2ef78554d12243f928f8886012fa6ff271%40group.calendar.google.com/public/basic.ics';

const ICAL_URL = process.env.TICAR_ICAL_URL || DEFAULT_ICAL_URL;
const LOOK_AHEAD_DAYS = 365;
const LOOK_BEHIND_DAYS = 730; // 2 years of past events

async function main() {
  let rawEvents = [];
  let fetchedOk = false;

  try {
    const data = await ical.async.fromURL(ICAL_URL);
    rawEvents = expandEvents(Object.values(data));
    fetchedOk = true;
    console.log(`[events] Fetched ${rawEvents.length} event occurrence(s)`);
  } catch (err) {
    console.warn('[events] Fetch failed:', err.message);
  }

  // If fetch failed but we already have a JSON file, keep it as-is.
  if (!fetchedOk && existsSync(OUT_PATH)) {
    console.log('[events] Keeping previous events.json');
    return;
  }

  const now = Date.now();
  const upcoming = rawEvents
    .filter((e) => new Date(e.start).getTime() >= now)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const past = rawEvents
    .filter((e) => new Date(e.start).getTime() < now)
    .sort((a, b) => new Date(b.start) - new Date(a.start));

  mkdirSync(dirname(OUT_PATH), {recursive: true});
  writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        upcoming,
        past,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  console.log(
    `[events] Wrote ${upcoming.length} upcoming + ${past.length} past event(s) → src/data/events.json`,
  );
}

function expandEvents(raw) {
  const horizon = Date.now() + LOOK_AHEAD_DAYS * 24 * 3600 * 1000;
  const horizonPast = Date.now() - LOOK_BEHIND_DAYS * 24 * 3600 * 1000;
  const out = [];

  for (const ev of raw) {
    if (ev.type !== 'VEVENT') continue;
    const base = normalize(ev);
    if (!base.start) continue;

    if (ev.rrule) {
      let dates = [];
      try {
        dates = ev.rrule.between(new Date(horizonPast), new Date(horizon), true);
      } catch (_) {
        dates = [];
      }
      if (dates.length === 0 && ev.start) {
        dates = [ev.start];
      }
      const duration = ev.end && ev.start ? new Date(ev.end) - new Date(ev.start) : 0;
      for (const d of dates) {
        const occStart = new Date(d);
        const occEnd = duration ? new Date(occStart.getTime() + duration) : null;
        out.push({...base, start: occStart.toISOString(), end: occEnd ? occEnd.toISOString() : null});
      }
    } else {
      out.push(base);
    }
  }
  return out;
}

function normalize(ev) {
  return {
    uid: String(ev.uid || ''),
    title: stripText(ev.summary || 'Etkinlik'),
    description: stripText(ev.description || '').slice(0, 220),
    location: stripText(ev.location || ''),
    start: ev.start ? new Date(ev.start).toISOString() : null,
    end: ev.end ? new Date(ev.end).toISOString() : null,
    url: extractUrl(ev.url, ev.description || ''),
    allDay: ev.datetype === 'date',
  };
}

function stripText(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractUrl(urlField, description) {
  if (urlField) {
    const s = String(urlField);
    if (/^https?:\/\//.test(s)) return s;
  }
  const match = String(description || '').match(/https?:\/\/[^\s<>"]+/);
  return match ? match[0].replace(/[.,;)]+$/, '') : null;
}

main().catch((err) => {
  console.error('[events] Unexpected error:', err);
  // Ensure we don't break the build
  if (!existsSync(OUT_PATH)) {
    mkdirSync(dirname(OUT_PATH), {recursive: true});
    writeFileSync(
      OUT_PATH,
      JSON.stringify({upcoming: [], past: [], updatedAt: new Date().toISOString()}),
    );
  }
});
