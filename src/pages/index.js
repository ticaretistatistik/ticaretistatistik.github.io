import Layout from '@theme/Layout';

import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import VideoSection from '../components/home/VideoSection';
import Events from '../components/home/Events';
import RecentPosts from '../components/home/RecentPosts';
import CommunityCTA from '../components/home/CommunityCTA';

import IstatistikNedir from '../components/HomepageFeatures/IstatistikNedir';
import DersIcerikleri from '../components/HomepageFeatures/DersIcerikleri';

export default function IndexPage() {
  return (
    <Layout
      title="Ana Sayfa"
      description="İstanbul Ticaret Üniversitesi İstatistik bölümü öğrencileri için hazırlanan yardımcı doküman sitesi.">
      <Hero />
      <Stats />
      <IstatistikNedir />
      <DersIcerikleri />
      <VideoSection />
      <Events />
      <RecentPosts />
      <CommunityCTA />
    </Layout>
  );
}
