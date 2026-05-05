import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiSearch, FiX} from 'react-icons/fi';

import glossaryData from '@site/src/data/glossary.json';
import authorsData from '@site/src/data/authors.json';
import styles from './styles.module.css';

const normName = (s) => String(s || '').trim().toLocaleLowerCase('tr-TR');
const AUTHORS_BY_NAME = new Map(
  authorsData.map((a) => [normName(a.name), a]),
);

const trCollator = new Intl.Collator('tr-TR', {sensitivity: 'base'});

function firstLetter(str) {
  const ch = String(str).trim().charAt(0);
  return ch.toLocaleUpperCase('tr-TR');
}

function slugify(term) {
  return String(term)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function splitIntoRows(items, rowCount) {
  const rows = Array.from({length: Math.min(rowCount, items.length || 1)}, () => []);
  if (!rows.length) return rows;
  items.forEach((item, i) => rows[i % rows.length].push(item));
  return rows;
}

function ContributorCard({contributor}) {
  const initials = contributor.name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toLocaleUpperCase('tr-TR');
  const avatar = contributor.image_url ? (
    <img
      src={contributor.image_url}
      alt=""
      className={styles.contributorAvatar}
      loading="lazy"
      aria-hidden="true"
    />
  ) : (
    <span className={styles.contributorAvatarFallback} aria-hidden="true">
      {initials}
    </span>
  );
  return (
    <article className={styles.contributorCard}>
      {avatar}
      <div className={styles.contributorCardText}>
        <p className={styles.contributorCardName}>{contributor.name}</p>
        <p className={styles.contributorCardRole}>
          {contributor.title || 'Sözlük katkıcısı'}
        </p>
      </div>
    </article>
  );
}

// Marquee'nin "kesintisiz loop" hilesi her kolonun içeriğini iki kez
// basmayı gerektiriyor. Az kart olduğunda iki kopya aynı anda görünür ve
// "duplicate" hissi verir. Bu eşik altında statik bir ızgara gösteriyoruz
// — yeterince katkıcı toplandığında otomatik olarak marquee'ye geçiyor.
const MARQUEE_THRESHOLD = 9;

function ContributorsMarquee({contributors}) {
  if (!contributors.length) return null;
  const isStatic = contributors.length < MARQUEE_THRESHOLD;
  const cols = isStatic ? null : splitIntoRows(contributors, 3);
  const speedFactors = [4, 5.5, 4.5];
  const minDuration = 12;
  return (
    <section className={styles.contributorsSection}>
      <h2 className={styles.contributorsTitle}>Bu sözlüğü birlikte yapanlar</h2>
      <p className={styles.contributorsKicker}>
        {contributors.length === 1
          ? 'İlk katkıcımız — sıradaki sen olabilirsin'
          : `${contributors.length} katkıcı, sayı her gün artıyor`}
      </p>
      {isStatic ? (
        <div className={styles.contributorsStaticGrid}>
          {contributors.map((c, j) => (
            <ContributorCard key={j} contributor={c} />
          ))}
        </div>
      ) : (
        <div className={styles.marqueeColumns}>
          {cols.map((col, i) => {
            const factor = speedFactors[i % speedFactors.length];
            const duration = Math.max(col.length * factor, minDuration);
            return (
              <div
                key={i}
                className={`${styles.marqueeColumn} ${i % 2 ? styles.marqueeReverse : ''}`}
                style={{'--marquee-duration': `${duration}s`}}
                aria-hidden={i > 0 ? 'true' : undefined}>
                <div className={styles.marqueeTrack}>
                  {[...col, ...col].map((c, j) => (
                    <ContributorCard key={j} contributor={c} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function SozlukPage() {
  const [query, setQuery] = useState('');

  const sorted = useMemo(
    () =>
      [...glossaryData.terms].sort((a, b) => trCollator.compare(a.term, b.term)),
    [],
  );

  const contributors = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const t of glossaryData.terms) {
      const raw = (t.contributor || '').trim();
      if (!raw) continue;
      const key = normName(raw);
      if (seen.has(key)) continue;
      seen.add(key);
      const author = AUTHORS_BY_NAME.get(key);
      out.push({
        name: author ? author.name : raw,
        title: author ? author.title : null,
        image_url: author ? author.image_url : null,
        url: author ? author.url : null,
      });
    }
    return out.sort((a, b) => trCollator.compare(a.name, b.name));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    if (!q) return sorted;
    return sorted.filter((item) => {
      const haystack = [
        item.term,
        item.en,
        item.definition,
        item.example,
        ...(item.related || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('tr-TR');
      return haystack.includes(q);
    });
  }, [sorted, query]);

  const grouped = useMemo(() => {
    const buckets = new Map();
    for (const item of filtered) {
      const letter = firstLetter(item.term);
      if (!buckets.has(letter)) buckets.set(letter, []);
      buckets.get(letter).push(item);
    }
    return [...buckets.entries()].sort((a, b) =>
      trCollator.compare(a[0], b[0]),
    );
  }, [filtered]);

  const allLetters = useMemo(
    () =>
      [...new Set(sorted.map((i) => firstLetter(i.term)))].sort((a, b) =>
        trCollator.compare(a, b),
      ),
    [sorted],
  );

  const activeLetters = useMemo(
    () => new Set(grouped.map(([l]) => l)),
    [grouped],
  );

  return (
    <Layout
      title="İstatistik Sözlüğü"
      description="Türkçe istatistik terimleri sözlüğü — tanımlar, örnekler ve İngilizce karşılıkları.">
      <div className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Kaynaklar · Sözlük</p>
          <h1 className={styles.title}>
            İstatistik <span className={styles.titleAccent}>sözlüğü</span>
          </h1>
          <p className={styles.lead}>
            İstatistiğin temel terimleri; tanımları, kısa örnekleri ve İngilizce
            karşılıklarıyla. Aramak için aşağıdaki kutuyu kullanabilir veya alfabe
            çubuğundan bir harfe geçebilirsin.
          </p>

          <div className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Terim, İngilizce karşılık veya tanımla ara…"
              className={styles.search}
              aria-label="Sözlükte ara"
            />
            {query && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => setQuery('')}
                aria-label="Aramayı temizle">
                <FiX size={16} />
              </button>
            )}
          </div>

          <nav className={styles.alphabet} aria-label="Alfabe navigasyonu">
            {allLetters.map((letter) => {
              const active = activeLetters.has(letter);
              return (
                <a
                  key={letter}
                  href={active ? `#harf-${letter}` : undefined}
                  className={`${styles.letter} ${active ? '' : styles.letterInactive}`}
                  aria-disabled={!active}>
                  {letter}
                </a>
              );
            })}
          </nav>
        </header>

        <main className={styles.main}>
          {grouped.length === 0 ? (
            <p className={styles.empty}>
              “{query}” için eşleşen terim bulunamadı. Başka bir kelime dener misin?
            </p>
          ) : (
            grouped.map(([letter, items]) => (
              <section
                key={letter}
                id={`harf-${letter}`}
                className={styles.section}>
                <h2 className={styles.letterHeading}>
                  <span className={styles.letterHeadingBadge}>{letter}</span>
                </h2>
                <dl className={styles.list}>
                  {items.map((item) => (
                    <article
                      key={slugify(item.term)}
                      id={slugify(item.term)}
                      className={styles.entry}>
                      <dt className={styles.term}>
                        <span className={styles.termTr}>{item.term}</span>
                        {item.en && (
                          <span className={styles.termEn}>{item.en}</span>
                        )}
                      </dt>
                      <dd className={styles.definition}>
                        <p className={styles.definitionText}>
                          {item.definition}
                        </p>
                        {item.example && (
                          <p className={styles.example}>
                            <span className={styles.exampleLabel}>Örnek</span>
                            {item.example}
                          </p>
                        )}
                        {item.related && item.related.length > 0 && (
                          <p className={styles.related}>
                            <span className={styles.relatedLabel}>
                              İlgili terimler
                            </span>
                            {item.related.map((r, i) => (
                              <Link
                                key={i}
                                to={`#${slugify(r)}`}
                                className={styles.relatedLink}>
                                {r}
                              </Link>
                            ))}
                          </p>
                        )}
                      </dd>
                    </article>
                  ))}
                </dl>
              </section>
            ))
          )}
        </main>

        <ContributorsMarquee contributors={contributors} />

        <div className={styles.ctaWrap}>
          <Link
            to="https://forms.gle/s5jreyNxNUiMzDkX7"
            className={styles.ctaButton}>
            Sen de bir terim öner
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
          <p className={styles.ctaHint}>
            5 dakika sürer · GitHub hesabı gerekmez · Adın katkıcılar arasında anılır
          </p>
        </div>
      </div>
    </Layout>
  );
}
