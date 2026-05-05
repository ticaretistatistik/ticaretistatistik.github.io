import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  FiDownload,
  FiClock,
  FiBookOpen,
  FiDatabase,
  FiSearch,
} from 'react-icons/fi';

import styles from './styles.module.css';

// Veri seti kaydı şeması:
//   slug, title, description, learn (string[]), tags (string[]),
//   rows, cols, source, license, available (true ise indirilebilir),
//   files: [{label, format, url, size}]
const datasets = [
  {
    slug: 'ogrenci-notlari',
    title: 'Öğrenci Notları (Demo)',
    description:
      'Üç bölümden 30 öğrencinin çalışma saatleri, devamsızlık, vize/final ve geçme durumu. Tanımlayıcı istatistik, gruplar arası karşılaştırma ve basit lojistik regresyon için ideal.',
    learn: [
      'Sürekli ve kategorik değişkenleri ayırt etme',
      'Bölüm/cinsiyete göre ortalama karşılaştırma (t-testi, ANOVA)',
      'Çalışma saati ↔ ortalama ilişkisini regresyon ile modelleme',
      'gecti değişkeniyle lojistik regresyon temelleri',
    ],
    tags: ['Eğitim', 'Regresyon', 'Sınıflandırma'],
    rows: 30,
    cols: 9,
    source: 'Sentetik veri (eğitim amaçlı)',
    license: 'CC0 — kamuya açık',
    available: true,
    files: [
      {
        label: 'CSV indir',
        format: 'CSV',
        url: '/datasets/ogrenci-notlari/ogrenci-notlari.csv',
      },
    ],
  },
  {
    slug: 'tuik-issizlik',
    title: 'TÜİK İşsizlik Oranları',
    description:
      'TÜİK aylık işsizlik oranları (yaş ve cinsiyet kırılımı). Zaman serisi analizi, mevsimsellik ve trend incelemesi için.',
    learn: [
      'Zaman serisi görselleştirme',
      'Mevsimsellik ve trend ayrıştırma',
      'Hareketli ortalama ile düzleştirme',
    ],
    tags: ['Makroekonomi', 'Zaman serisi'],
    rows: null,
    cols: null,
    source: 'TÜİK',
    license: 'TÜİK kullanım koşulları',
    available: false,
  },
  {
    slug: 'iris',
    title: 'Iris (Klasik)',
    description:
      'Fisher\'in 150 örneklik klasik iris çiçeği veri seti. Üç türün petal ve sepal ölçümleri. Sınıflandırma ve kümeleme egzersizleri için.',
    learn: [
      'Çok değişkenli görselleştirme (scatter matrix)',
      'k-NN ve karar ağacı ile sınıflandırma',
      'k-means ile kümeleme',
    ],
    tags: ['Klasik', 'Sınıflandırma', 'Kümeleme'],
    rows: 150,
    cols: 5,
    source: 'UCI Machine Learning Repository',
    license: 'CC BY 4.0',
    available: false,
  },
  {
    slug: 'tips',
    title: 'Restoran Bahşişleri',
    description:
      'Bir restoranda 244 öğünde toplam hesap, bahşiş, cinsiyet, sigara, gün, öğün ve grup büyüklüğü. Çift değişkenli ilişkiler ve regresyon için.',
    learn: [
      'Korelasyon ve serpme grafiği yorumu',
      'Doğrusal regresyon: bahşiş ~ hesap',
      'Kategorik değişken etkileri (cinsiyet, gün)',
    ],
    tags: ['Regresyon', 'Görselleştirme'],
    rows: 244,
    cols: 7,
    source: 'Bryant & Smith — Practical Data Analysis',
    license: 'Public domain',
    available: false,
  },
];

const ALL_TAG = 'Tümü';

export default function VeriSetleriPage() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  const allTags = useMemo(() => {
    const set = new Set();
    datasets.forEach((d) => d.tags.forEach((t) => set.add(t)));
    return [ALL_TAG, ...[...set].sort((a, b) => a.localeCompare(b, 'tr'))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    return datasets.filter((d) => {
      const tagOk = activeTag === ALL_TAG || d.tags.includes(activeTag);
      if (!tagOk) return false;
      if (!q) return true;
      const hay = [d.title, d.description, ...d.tags].join(' ').toLocaleLowerCase('tr');
      return hay.includes(q);
    });
  }, [query, activeTag]);

  return (
    <Layout
      title="Veri Setleri"
      description="Öğrencilere yönelik kullanıma hazır CSV/Excel veri setleri. Açıklamalar ve ne öğreneceğiniz notlarıyla.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Yaparak öğren</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Veri Setleri</span>
          </h1>
          <p className={styles.lead}>
            Derslerde, ödevlerde ve kendi denemelerinizde kullanabileceğiniz
            kullanıma hazır veri setleri. Her bir set için kısa bir açıklama,
            ne öğrenebileceğiniz ve indirilebilir dosya bağlantıları yer alır.
          </p>
        </header>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch size={16} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Veri setlerinde ara…"
            />
          </label>

          <div className={styles.tags} role="tablist">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={activeTag === tag}
                className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ''}`}
                onClick={() => setActiveTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>Filtreyle eşleşen veri seti bulunamadı.</p>
        ) : (
          <ul className={styles.grid}>
            {filtered.map((d) => (
              <DatasetCard key={d.slug} d={d} />
            ))}
          </ul>
        )}

        <p className={styles.contribute}>
          Kütüphaneye veri seti önermek ister misiniz?{' '}
          <Link to="/katkida-bulunma">Katkıda bulunma</Link> sayfasından bize
          ulaşın.
        </p>
      </main>
    </Layout>
  );
}

function DatasetCard({d}) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHead}>
        <div className={styles.cardTags}>
          {d.tags.map((t) => (
            <span key={t} className={styles.tagPill}>
              {t}
            </span>
          ))}
          {!d.available && (
            <span className={styles.soonBadge}>
              <FiClock size={12} aria-hidden="true" /> Yakında
            </span>
          )}
        </div>
        <h2 className={styles.cardTitle}>{d.title}</h2>
        <p className={styles.cardDesc}>{d.description}</p>
      </div>

      <div className={styles.learn}>
        <span className={styles.learnLabel}>
          <FiBookOpen size={14} aria-hidden="true" /> Ne öğrenirsin
        </span>
        <ul className={styles.learnList}>
          {d.learn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <FiDatabase size={14} aria-hidden="true" />
          {d.rows && d.cols
            ? `${d.rows} satır · ${d.cols} sütun`
            : 'Boyut: belirtilmemiş'}
        </span>
        <span className={styles.metaItem}>Kaynak: {d.source}</span>
      </div>

      <div className={styles.actions}>
        {d.available && d.files
          ? d.files.map((f) => (
              <a
                key={f.url}
                className={styles.downloadBtn}
                href={f.url}
                download>
                <FiDownload size={14} aria-hidden="true" />
                {f.label}
              </a>
            ))
          : (
            <span className={styles.disabledBtn} aria-disabled="true">
              <FiClock size={14} aria-hidden="true" />
              Çok yakında
            </span>
          )}
      </div>
    </li>
  );
}
