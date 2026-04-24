import Link from '@docusaurus/Link';
import {FiMapPin, FiClock, FiArrowUpRight} from 'react-icons/fi';
import data from '@site/src/data/events.json';
import styles from './Events.module.css';

const TR_MONTHS_SHORT = [
  'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
  'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara',
];
const TR_WEEKDAYS = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba',
  'Perşembe', 'Cuma', 'Cumartesi',
];

function formatDate(iso) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: TR_MONTHS_SHORT[d.getMonth()],
    year: d.getFullYear(),
    weekday: TR_WEEKDAYS[d.getDay()],
    time: d.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Istanbul',
    }),
  };
}

function shortLocation(loc) {
  if (!loc) return '';
  // Full addresses are verbose; pick the venue name (first comma segment)
  // but keep it reasonable even if there's no venue.
  const first = loc.split(',')[0]?.trim();
  return first && first.length > 4 ? first : loc.slice(0, 60);
}

export default function Events() {
  const {events = [], mode = 'upcoming'} = data || {};
  if (!events.length) return null;

  const heading = mode === 'upcoming' ? 'Yaklaşan etkinlikler' : 'Son etkinlikler';
  const lead =
    mode === 'upcoming'
      ? 'Topluluğumuzun yaklaşan buluşmaları, paneller ve söyleşiler.'
      : 'Son düzenlenen topluluk etkinlikleri ve konuklarımız.';

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Topluluk</p>
            <h2 className={styles.title}>{heading}</h2>
            <p className={styles.lead}>{lead}</p>
          </div>
          <Link to="/topluluk/etkinliklerimiz" className={styles.viewAll}>
            Tüm etkinlikler
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <ul className={styles.list}>
          {events.map((ev, i) => {
            const d = formatDate(ev.start);
            const hasUrl = ev.url && /^https?:/i.test(ev.url);
            const loc = shortLocation(ev.location);

            const inner = (
              <>
                <div className={styles.date} aria-hidden="true">
                  <span className={styles.month}>{d.month}</span>
                  <span className={styles.day}>{d.day}</span>
                  <span className={styles.year}>{d.year}</span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{ev.title}</h3>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <FiClock size={14} aria-hidden="true" />
                      {d.weekday} · {d.time}
                    </span>
                    {loc && (
                      <span className={styles.metaItem}>
                        <FiMapPin size={14} aria-hidden="true" />
                        {loc}
                      </span>
                    )}
                  </div>
                  {ev.description && (
                    <p className={styles.desc}>{ev.description}</p>
                  )}
                </div>

                {hasUrl && (
                  <span className={styles.arrow} aria-hidden="true">
                    <FiArrowUpRight size={18} />
                  </span>
                )}
              </>
            );

            return (
              <li key={ev.uid || i}>
                {hasUrl ? (
                  <Link
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}>
                    {inner}
                  </Link>
                ) : (
                  <article className={styles.card}>{inner}</article>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
