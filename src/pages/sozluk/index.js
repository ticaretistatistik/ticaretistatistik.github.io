import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiSearch, FiX} from 'react-icons/fi';

import glossary from '@site/src/data/glossary.json';
import styles from './styles.module.css';

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

export default function SozlukPage() {
  const [query, setQuery] = useState('');

  const sorted = useMemo(
    () =>
      [...glossary].sort((a, b) => trCollator.compare(a.term, b.term)),
    [],
  );

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
      </div>
    </Layout>
  );
}
