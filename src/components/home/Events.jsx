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

const MAX_UPCOMING = 2;
const MAX_PAST = 3;

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
  const first = loc.split(',')[0]?.trim();
  return first && first.length > 4 ? first : loc.slice(0, 60);
}

function EventCard({event, kind}) {
  const d = formatDate(event.start);
  const hasUrl = event.url && /^https?:/i.test(event.url);
  const loc = shortLocation(event.location);

  const inner = (
    <>
      <div className={`${styles.date} ${kind === 'past' ? styles.datePast : ''}`} aria-hidden="true">
        <span className={styles.month}>{d.month}</span>
        <span className={styles.day}>{d.day}</span>
        <span className={styles.year}>{d.year}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.cardTitle}>{event.title}</h3>
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
        {event.description && (
          <p className={styles.desc}>{event.description}</p>
        )}
      </div>

      {hasUrl && (
        <span className={styles.arrow} aria-hidden="true">
          <FiArrowUpRight size={18} />
        </span>
      )}
    </>
  );

  if (hasUrl) {
    return (
      <Link
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}>
        {inner}
      </Link>
    );
  }
  return <article className={styles.card}>{inner}</article>;
}

export default function Events() {
  const {upcoming = [], past = []} = data || {};
  if (upcoming.length === 0 && past.length === 0) return null;

  const visibleUpcoming = upcoming.slice(0, MAX_UPCOMING);
  const visiblePast = past.slice(0, MAX_PAST);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.headCopy}>
            <p className={styles.eyebrow}>Topluluk</p>
            <h2 className={styles.title}>Etkinlikler</h2>
            <p className={styles.lead}>
              {visibleUpcoming.length > 0 && visiblePast.length > 0
                ? 'Yaklaşan buluşmalarımız ve yakın zamanda düzenlenen etkinlikler.'
                : visibleUpcoming.length > 0
                  ? 'Önümüzdeki dönemde sizi bekleyen buluşmalar.'
                  : 'Son düzenlediğimiz topluluk etkinlikleri.'}
            </p>
          </div>
          <Link to="/topluluk/etkinliklerimiz" className={styles.viewAll}>
            Tüm etkinlikler
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        {visibleUpcoming.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupLabel}>
              <span className={styles.groupDot} aria-hidden="true" />
              Yaklaşan
              <span className={styles.groupCount}>
                {upcoming.length > MAX_UPCOMING
                  ? `${MAX_UPCOMING}/${upcoming.length}`
                  : upcoming.length}
              </span>
            </h3>
            <ul className={styles.list}>
              {visibleUpcoming.map((ev) => (
                <li key={ev.uid || ev.start + ev.title}>
                  <EventCard event={ev} kind="upcoming" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {visiblePast.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupLabel}>
              <span
                className={`${styles.groupDot} ${styles.groupDotPast}`}
                aria-hidden="true"
              />
              Geçmiş etkinlikler
              <span className={styles.groupCount}>{past.length}</span>
            </h3>
            <ul className={styles.list}>
              {visiblePast.map((ev) => (
                <li key={ev.uid || ev.start + ev.title}>
                  <EventCard event={ev} kind="past" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
