import styles from './IstatistikNedir.module.css';

export default function IstatistikNedir() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className={styles.eyebrow}>İstatistik nedir?</p>
            <h2 className={styles.title}>
              Veriden hikâye çıkarma <em>disiplini</em>.
            </h2>
          </div>
          <div className={styles.body}>
            <p>
              İstatistik; verilerin toplanması, analiz edilmesi ve yorumlanmasıyla ilgilenen
              bir bilim dalıdır. Rastlantının altında yatan örüntüleri görmeyi, belirsizliği
              sayısallaştırmayı ve kararları kanıta dayandırmayı öğretir.
            </p>
            <p>
              Günümüzün veri odaklı dünyasında istatistikçiler sağlık, finans, kamu
              politikaları ve yapay zekâ gibi alanlarda kritik bir rol oynar —
              modellerin güvenilir, sonuçların tekrarlanabilir olmasını sağlar.
            </p>
            <blockquote className={styles.quote}>
              “Tüm modeller yanlıştır, fakat bazıları yararlıdır.”
              <cite className={styles.cite}>— George E. P. Box</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
