// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ticaret İstatistik',
  tagline: "İstatistik —  Güçlü akademik kadrosu ile istatistiğe dair her şey sizi geleceğe hazırlıyor.",
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://ticaretistatistik.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ticaretistatistik', // Usually your GitHub org/user name.
  projectName: 'ticaretistatistik.github.io', // Usually your repo name.
  trailingSlash: false,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  },

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-9Y3bqD0qWQH3q4gVv5Stm9J9t6pTZQJ9hG1nq3o2vV9q2b2o0qkqC0R1f2qf7k2P',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ticaretistatistik/ticaretistatistik.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ticaretistatistik/ticaretistatistik.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
    // [
    //   '@docusaurus/preset-classic',
    //   {
    //     docs: {
    //       path: 'blog',
    //       remarkPlugins: [remarkMath],
    //       rehypePlugins: [rehypeKatex],
    //     },
    //   },
    // ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card

      announcementBar: {
        id: 'support_us',
        content:
          'İstanbul ticaret üniversitesi istatistik bölümü ile ilgili bilgilere ve özel içeriklere anında ulaşabilirsiniz. Kaçırmamak için şimdi  <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/ticaretistatistik">takip edin</a>!',
        backgroundColor: '#f5cf06',
        textColor: '#091E42',
        isCloseable: false,
      },

      hideOnScroll: true,

      image: 'img/social-card.jpeg',
      navbar: {
        title: 'Ticaret İstatistik',
        logo: {
          alt: 'Ticaret İstatistik Logo',
          src: 'img/logo.png',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Programlar',
            items: [
              {
                href: "#",
                label: 'Jamovi',
              },
              {
                href: "/docs/jasp",
                label: 'Jasp',
              },
              {
                href: "#",
                label: 'Spss',
              },
              {
                href: "#",
                label: 'Tableau',
              },
            ]
          },

          {
            type: 'dropdown',
            position: 'left',
            label: 'Yazılım',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'pythonSidebar',
                label: 'Python',
              },
              {
                type: 'docSidebar',
                sidebarId: 'rSidebar',
                label: 'R lang',
              }
            ]
          },
  
          {
            type: 'dropdown',
            position: 'left',
            label: 'Topluluk',
            items: [
              {
                to: '/topluluk/etkinliklerimiz',
                label: 'Etkinlikler',
              },
              {
                to: '/topluluk/hikayeler',
                label: 'Hikayeler',
              },
            ]
          },

          {
            type: 'dropdown',
            position: 'left',
            label: 'Podcast',
            items: [
              {
                target: "_blank",
                to: "https://open.spotify.com/episode/6V0ILCX5RppYRMEFB0JVLd",
                label: 'İstatistik nedir, Ne değildir',
              },
              {
                target: "_blank",
                to: "https://open.spotify.com/episode/4wURYTjCeMk3Ec3LLqAp7A",
                label: 'İstatistik eğitimi zor mudur?',
              },
              {
                target: "_blank",
                to: "https://open.spotify.com/episode/5fRXoB7AjypToPSbuujgYl",
                label: 'Yapay Zeka ve İstatistik',
              },
              {
                target: "_blank",
                to: "https://open.spotify.com/episode/2B9LdSpxOtfh2pMXOQVZxw",
                label: 'Makine Öğrenmesi mi İstatistiksel Öğrenme mi?',
              },
            ]
          },

          {to: '/blog', label: 'Blog', position: 'left'},

          {
            href: 'https://ticaret.edu.tr/istatistik/akademik-kadro/',
            label: 'Akademik Kadro',
            position: 'right',
          },

          {
            href: 'mailto:istatistik@ticaret.edu.tr',
            label: 'Email',
            position: 'right',
          },

          {
            href: 'https://ticaret.edu.tr/istatistik/wp-content/uploads/sites/30/2024/10/2024-2025-Istatistik-Ders-Icerigi.pdf',
            label: 'Müfredat',
            position: 'right',
          },

          {
            href: 'https://github.com/ticaretistatistik/ticaretistatistik.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Dokümanlar',
            items: [
              {
                href: "#",
                label: 'Jamovi',
              },
              {
                label: 'Python',
                to: '/docs/python/',
              },
              {
                label: 'R lang',
                to: '/docs/r/',
              },
              {
                href: "#",
                label: 'Spss',
              },
              {
                href: "#",
                label: 'Tableau',
              },
            ],
          },
          {
            title: "Akademik Bilgiler",
            items: [
              {
                label: 'Bölüm Sayfası',
                href: 'https://ticaret.edu.tr/istatistik/',
              },
              {
                label: 'Akademik Kadro',
                href: 'https://ticaret.edu.tr/istatistik/akademik-kadro/',
              },
              {
                label: 'Ders Programları',
                href: 'https://ticaret.edu.tr/istatistik/ders-programlari/',
              },
            ]
          },
          {
            title: 'Sosyal',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Instagram',
                href: 'https://instagram.com/ticaretistatistik'
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/company/i%CC%87statistik-toplulu%C4%9Futic'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ticaretistatistik',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ticaret İstatistik<br/>Licensed under the GNU General Public License v3.0 or later.<br/>Built with <a target="_blank" rel="noopener noreferrer" href="https://docusaurus.io/">Docusaurus</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
