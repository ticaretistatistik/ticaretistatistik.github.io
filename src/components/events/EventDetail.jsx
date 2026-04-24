import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiExternalLink,
} from 'react-icons/fi';

import styles from './EventDetail.module.css';

const TR_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];
const TR_WEEKDAYS = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba',
  'Perşembe', 'Cuma', 'Cumartesi',
];

function formatDate(iso) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: TR_MONTHS[d.getMonth()],
    monthShort: TR_MONTHS[d.getMonth()].slice(0, 3),
    year: d.getFullYear(),
    weekday: TR_WEEKDAYS[d.getDay()],
    time: d.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Istanbul',
    }),
  };
}

function mapsHref(location) {
  if (!location) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function formatTimeRange(event) {
  const start = formatDate(event.start);
  if (!event.end) return start.time;
  const end = formatDate(event.end);
  if (start.day === end.day && start.month === end.month && start.year === end.year) {
    return `${start.time} – ${end.time}`;
  }
  return `${start.time} → ${end.day} ${end.monthShort} ${end.time}`;
}

export default function EventDetail({event}) {
  const start = formatDate(event.start);
  const isPast = new Date(event.start).getTime() < Date.now();
  const hasUrl = event.url && /^https?:/i.test(event.url);
  const mapLink = mapsHref(event.location);
  const description = event.description || '';

  return (
    <Layout
      title={event.title}
      description={(event.summary || description || '').slice(0, 160)}>
      <div className={styles.page}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link to="/topluluk/etkinliklerimiz" className={styles.back}>
            <FiArrowLeft size={14} aria-hidden="true" />
            Tüm etkinlikler
          </Link>
        </nav>

        <header className={styles.head}>
          <div
            className={`${styles.datePill} ${isPast ? styles.datePillPast : ''}`}
            aria-hidden="true">
            <span className={styles.pillMonth}>{start.monthShort}</span>
            <span className={styles.pillDay}>{start.day}</span>
            <span className={styles.pillYear}>{start.year}</span>
          </div>

          <p className={styles.eyebrow}>
            {isPast ? 'Geçmiş etkinlik' : 'Yaklaşan etkinlik'}
          </p>
          <h1 className={styles.title}>{event.title}</h1>

          <ul className={styles.facts}>
            <li className={styles.fact}>
              <FiCalendar size={16} aria-hidden="true" />
              <span>
                {start.weekday}, {start.day} {start.month} {start.year}
              </span>
            </li>
            <li className={styles.fact}>
              <FiClock size={16} aria-hidden="true" />
              <span>{formatTimeRange(event)}</span>
            </li>
            {event.location && (
              <li className={styles.fact}>
                <FiMapPin size={16} aria-hidden="true" />
                {mapLink ? (
                  <Link
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    {event.location}
                  </Link>
                ) : (
                  <span>{event.location}</span>
                )}
              </li>
            )}
          </ul>

          {hasUrl && !isPast && (
            <Link
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}>
              Kayıt ol / detaylı bilgi
              <FiExternalLink size={16} aria-hidden="true" />
            </Link>
          )}
        </header>

        <main className={styles.body}>
          {description ? (
            <article className={styles.prose}>
              {description
                .split(/\n{2,}/)
                .map((para, i) => <p key={i}>{para}</p>)}
            </article>
          ) : (
            <p className={styles.emptyText}>
              Bu etkinlik için henüz ayrıntılı bir açıklama eklenmedi.{' '}
              {hasUrl && (
                <>
                  Güncel bilgi için{' '}
                  <Link href={event.url} target="_blank" rel="noopener noreferrer">
                    kayıt sayfasına
                  </Link>{' '}
                  göz atabilirsin.
                </>
              )}
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
}
