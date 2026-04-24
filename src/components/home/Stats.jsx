import styles from './Stats.module.css';

const items = [
  {value: '4', unit: 'yıl', label: 'Lisans programı · 240 AKTS'},
  {value: '20+', unit: '', label: 'Veri bilimi ve istatistik dersi'},
  {value: '4', unit: 'bölüm', label: 'Podcast serisi'},
  {value: '∞', unit: '', label: 'Açık kaynak ders notu'},
];

export default function Stats() {
  return (
    <section className={styles.section} aria-label="Bölüm istatistikleri">
      <div className={styles.inner}>
        <ul className={styles.grid}>
          {items.map((it, i) => (
            <li key={i} className={styles.item}>
              <div className={styles.value}>
                {it.value}
                {it.unit && <span className={styles.unit}>{it.unit}</span>}
              </div>
              <div className={styles.label}>{it.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
