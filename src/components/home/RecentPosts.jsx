import Link from '@docusaurus/Link';
import styles from './RecentPosts.module.css';

const posts = [
  {
    title: 'Ortalama mı, medyan mı?',
    excerpt:
      'Verinin özetlenmesinde merkezi eğilim ölçülerinin hangisini seçmeniz gerektiğini, aykırı değerlerin etkisiyle birlikte inceliyoruz.',
    date: '23 Eylül 2025',
    readingTime: '6 dk',
    to: '/blog/ortalama-vs-medyan',
    tag: 'Temel İstatistik',
  },
  {
    title: 'NPS — Net Promoter Score',
    excerpt:
      'Müşteri sadakatini ölçmek için kullanılan NPS metriğinin hesaplanışı, yorumu ve istatistiksel sınırları.',
    date: '9 Eylül 2025',
    readingTime: '5 dk',
    to: '/blog/net-promosyoncu-skoru-nps',
    tag: 'Uygulama',
  },
  {
    title: 'İstatistik Topluluğu Dergisi',
    excerpt:
      'Öğrenci topluluğumuzun 2025 dönem sonu dergisi yayında — yazılar, röportajlar ve öğrenci çalışmaları.',
    date: '27 Haziran 2025',
    readingTime: '3 dk',
    to: '/blog/istatistik-toplulugu-dergisi-2025',
    tag: 'Topluluk',
  },
];

export default function RecentPosts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Son yazılar</p>
            <h2 className={styles.title}>Blogdan</h2>
          </div>
          <Link to="/blog" className={styles.viewAll}>
            Tümünü gör
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link key={i} to={post.to} className={styles.card}>
              <div className={styles.cardBody}>
                <span className={styles.tag}>{post.tag}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
              </div>
              <div className={styles.cardMeta}>
                <time>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
