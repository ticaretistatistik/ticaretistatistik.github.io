import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiCalendar, FiMapPin, FiClock, FiArrowUpRight, FiPlayCircle} from 'react-icons/fi';

import data from '@site/src/data/events.json';
import styles from './etkinliklerimiz.module.css';

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
    monthShort: TR_MONTHS[d.getMonth()].slice(0, 3),
    month: TR_MONTHS[d.getMonth()],
    year: d.getFullYear(),
    weekday: TR_WEEKDAYS[d.getDay()],
    time: d.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Istanbul',
    }),
  };
}

function EventRow({event, kind}) {
  const d = formatDate(event.start);
  const detailHref = event.detailPath || (event.slug ? `/topluluk/etkinlikler/${event.slug}` : null);
  const externalHref = event.url && /^https?:/i.test(event.url) ? event.url : null;
  const href = detailHref || externalHref;
  const isExternal = !detailHref && Boolean(externalHref);
  const loc = event.location || '';
  const blurb = event.summary || event.description;

  const inner = (
    <>
      <div
        className={`${styles.date} ${kind === 'past' ? styles.datePast : ''}`}
        aria-hidden="true">
        <span className={styles.month}>{d.monthShort}</span>
        <span className={styles.day}>{d.day}</span>
        <span className={styles.year}>{d.year}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FiClock size={14} aria-hidden="true" />
            {d.weekday}, {d.day} {d.month} {d.year} · {d.time}
          </span>
          {loc && (
            <span className={styles.metaItem}>
              <FiMapPin size={14} aria-hidden="true" />
              {loc}
            </span>
          )}
        </div>
        {blurb && <p className={styles.desc}>{blurb}</p>}
      </div>

      {href && (
        <span className={styles.arrow} aria-hidden="true">
          <FiArrowUpRight size={20} />
        </span>
      )}
    </>
  );

  if (!href) {
    return <article className={styles.card}>{inner}</article>;
  }

  const linkProps = isExternal
    ? {href, target: '_blank', rel: 'noopener noreferrer'}
    : {to: href};

  return (
    <Link {...linkProps} className={styles.card}>
      {inner}
    </Link>
  );
}

export default function EtkinliklerPage() {
  const {upcoming = [], past = []} = data || {};
  const [tab, setTab] = useState(
    upcoming.length > 0 ? 'upcoming' : 'past',
  );

  const visibleEvents = useMemo(
    () => (tab === 'upcoming' ? upcoming : past),
    [tab, upcoming, past],
  );

  return (
    <Layout
      title="Etkinlikler"
      description="İstatistik Topluluğu'nun yaklaşan ve geçmiş etkinlikleri — panel, söyleşi ve buluşmaları takip edin.">
      <div className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Topluluk</p>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Etkinlikler</span>
          </h1>
          <p className={styles.lead}>
            Panel, söyleşi, workshop ve kariyer buluşmaları — İstatistik
            Topluluğu'nun yaklaşan ve geçmiş etkinliklerine buradan ulaş.
          </p>

          <div className={styles.calendarCta}>
            <FiCalendar size={18} aria-hidden="true" />
            <span>
              Etkinlikler Google Takvim'den otomatik güncellenir.{' '}
              <Link
                href="https://calendar.google.com/calendar/u/0?cid=MzM1ODY1NGE2M2ExZTRjN2Q5NzU3OTliNzJhYjdmMmVmNzg1NTRkMTIyNDNmOTI4Zjg4ODYwMTJmYTZmZjI3MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.calendarLink}>
                Kendi takvimine ekle →
              </Link>
            </span>
          </div>

          <Link to="/topluluk/kayitlar" className={styles.recordingsBanner}>
            <span className={styles.recordingsBannerIcon} aria-hidden="true">
              <FiPlayCircle size={22} />
            </span>
            <span className={styles.recordingsBannerBody}>
              <span className={styles.recordingsBannerLabel}>Arşiv</span>
              <span className={styles.recordingsBannerText}>
                Geçmiş etkinliklerin video kayıtlarına göz at
              </span>
            </span>
            <span className={styles.recordingsBannerArrow} aria-hidden="true">→</span>
          </Link>

          <div className={styles.tabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'upcoming'}
              onClick={() => setTab('upcoming')}
              className={`${styles.tab} ${tab === 'upcoming' ? styles.tabActive : ''}`}>
              Yaklaşan
              <span className={styles.tabCount}>{upcoming.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'past'}
              onClick={() => setTab('past')}
              className={`${styles.tab} ${tab === 'past' ? styles.tabActive : ''}`}>
              Geçmiş
              <span className={styles.tabCount}>{past.length}</span>
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {visibleEvents.length === 0 ? (
            <div className={styles.empty}>
              {tab === 'upcoming' ? (
                <>
                  <p className={styles.emptyTitle}>
                    Yaklaşan etkinlik yok.
                  </p>
                  <p className={styles.emptyText}>
                    Şu an planlanmış bir etkinliğimiz yok. Takvim güncellendiğinde
                    burada listelenir —{' '}
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setTab('past');
                      }}>
                      geçmiş etkinliklere göz at
                    </Link>
                    .
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.emptyTitle}>Henüz etkinlik yok.</p>
                  <p className={styles.emptyText}>
                    İlk etkinliğimiz takvime eklendiğinde burada görünecek.
                  </p>
                </>
              )}
            </div>
          ) : (
            <ul className={styles.list}>
              {visibleEvents.map((ev, i) => (
                <li key={ev.uid || `${ev.start}-${i}`}>
                  <EventRow event={ev} kind={tab} />
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </Layout>
  );
}
