/**
 * Docusaurus plugin: events
 *
 * Fetches the public Google Calendar iCal feed at build time, expands
 * recurring events, writes src/data/events.json (consumed statically by
 * homepage + list page), and registers a detail route per event at
 * /topluluk/etkinlikler/<slug>.
 *
 * If the remote fetch fails and a previous src/data/events.json exists,
 * we fall back to it so builds stay green when offline.
 */

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';

import ical from 'node-ical';

const DEFAULT_ICAL_URL =
  'https://calendar.google.com/calendar/ical/3358654a63a1e4c7d975799b72ab7f2ef78554d12243f928f8886012fa6ff271%40group.calendar.google.com/public/basic.ics';

const LOOK_AHEAD_DAYS = 365;
const LOOK_BEHIND_DAYS = 730;
const DETAIL_BASE = '/topluluk/etkinlikler';
const COMBINING_MARKS = /[̀-ͯ]/g;

export default function eventsPlugin(context, options = {}) {
  const icalUrl = options.icalUrl || process.env.TICAR_ICAL_URL || DEFAULT_ICAL_URL;
  const jsonOutPath = path.join(context.siteDir, 'src', 'data', 'events.json');

  return {
    name: 'docusaurus-plugin-events',

    async loadContent() {
      let rawEvents = [];
      let fetchedOk = false;

      try {
        const data = await ical.async.fromURL(icalUrl);
        rawEvents = expandEvents(Object.values(data));
        fetchedOk = true;
        console.log(`[events] Fetched ${rawEvents.length} event occurrence(s)`);
      } catch (err) {
        console.warn('[events] Fetch failed:', err.message);
      }

      if (!fetchedOk && existsSync(jsonOutPath)) {
        console.log('[events] Falling back to cached src/data/events.json');
        try {
          return JSON.parse(readFileSync(jsonOutPath, 'utf8'));
        } catch (_) {
          return emptyPayload();
        }
      }

      const now = Date.now();
      const upcoming = rawEvents
        .filter((e) => new Date(e.start).getTime() >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start));
      const past = rawEvents
        .filter((e) => new Date(e.start).getTime() < now)
        .sort((a, b) => new Date(b.start) - new Date(a.start));

      assignSlugs([...upcoming, ...past]);

      return {upcoming, past, updatedAt: new Date().toISOString()};
    },

    async contentLoaded({content, actions}) {
      if (!content) return;
      const {createData, addRoute} = actions;

      mkdirSync(path.dirname(jsonOutPath), {recursive: true});
      writeFileSync(jsonOutPath, JSON.stringify(content, null, 2));

      const all = [...(content.upcoming || []), ...(content.past || [])];
      for (const ev of all) {
        if (!ev.slug) continue;
        const dataPath = await createData(
          `event-${ev.slug}.json`,
          JSON.stringify(ev),
        );
        addRoute({
          path: `${DETAIL_BASE}/${ev.slug}`,
          component: '@site/src/components/events/EventDetail.jsx',
          modules: {event: dataPath},
          exact: true,
        });
      }
    },
  };
}

function emptyPayload() {
  return {upcoming: [], past: [], updatedAt: new Date().toISOString()};
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
      if (dates.length === 0 && ev.start) dates = [ev.start];
      const duration = ev.end && ev.start ? new Date(ev.end) - new Date(ev.start) : 0;
      for (const d of dates) {
        const occStart = new Date(d);
        const occEnd = duration ? new Date(occStart.getTime() + duration) : null;
        out.push({
          ...base,
          start: occStart.toISOString(),
          end: occEnd ? occEnd.toISOString() : null,
        });
      }
    } else {
      out.push(base);
    }
  }
  return out;
}

function normalize(ev) {
  const fullDescription = stripText(ev.description || '');
  return {
    uid: String(ev.uid || ''),
    title: stripText(ev.summary || 'Etkinlik'),
    summary: fullDescription.slice(0, 220),
    description: fullDescription,
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

const TR_MAP = {
  ı: 'i', İ: 'i', ğ: 'g', Ğ: 'g', ü: 'u', Ü: 'u',
  ş: 's', Ş: 's', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c',
};

function slugify(s) {
  return String(s || '')
    .split('')
    .map((c) => TR_MAP[c] ?? c)
    .join('')
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function shortHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).slice(0, 6);
}

function assignSlugs(events) {
  const seen = new Map();
  for (const ev of events) {
    const title = slugify(ev.title);
    const date = ev.start ? ev.start.slice(0, 10) : '';
    let base = [title, date].filter(Boolean).join('-');
    if (!base) base = `etkinlik-${shortHash(ev.uid || Math.random().toString())}`;

    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    ev.slug = n === 0 ? base : `${base}-${n + 1}`;
    ev.detailPath = `${DETAIL_BASE}/${ev.slug}`;
  }
}
