import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Her Yerden Erişim',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Bu sitedeki dokümanlara her yerden kolayca erişebilirsin, aklına takılan bir şey olduğunda hemen bakabilirsin.
      </>
    ),
  },
  {
    title: 'Öğrendiklerinizi Paylaşın',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Bu sitede bulunan dokümanlara sen de kolayca katkıda bulunabilirsin.
      </>
    ),
  },
  {
    title: 'Gücünü Topluluktan Alır',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Bu sitede bulunan dokümanlar topluluk tarafından oluşturulur ve güncellenir.
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
