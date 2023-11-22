import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'CitizenLab',
      links: [
        {
          text: 'A Propos',
          href: getPermalink('/about'),
        },
        {
          text: 'Equipe',
          href: '#',
        },
      ],
    },
    {
      text: 'Actualités',
      href: getBlogPermalink(),
    },
    {
      text: 'Blog',
      href: getPermalink('astro', 'tag')
    },
    {
      text: 'Nos Formations',
      href: getPermalink('tutorials', 'category')
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    
  ],
};

export const footerData = {
  links: [
    {
      title: 'CitizenLab',
      links: [
        {
          text: 'A Propos', href: getPermalink('/about') },
        { text: 'Equipe', href: '#' },
      ],
    },
    {
      title: 'Actualités',
      links: [
        { text: "Actualités", href: getBlogPermalink() },
        { text: "Blog", href: getBlogPermalink() },
      ],
    },
    {
      title: "Formations",
      links: [
        { text: "Nos Formations", href: '#' },
      ],
    },
    {
      title: "Nous Contacter",
      links:[
        { text: "test@test.com", href:'mailto:test@test.com' },
        { text: "0094848439943", href: 'tel:0094848439943'},
        {text: "Cotonou, Benin", href: '#'}
      ]
    }
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { text: 'Twitter', icon: 'tabler:brand-x', href: '#' },
    { text: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { text: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { text: 'Youtube', icon: 'tabler:brand-youtube', href: '#' },
    { text: 'Linkedin', icon: 'tabler:brand-linkedin', href: '#' },
    { text: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { text: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/AfricTivistes/citizenlabbenin' },
  ],
  footNote: `
  <a href="https://www.africtivistes.com" target= '_blank'>
  <img src="https://update.africtivistes.org/wp-content/uploads/2023/10/Logo-Africtivistes.png" alt="AfricTivistes" class="h-8" />
  </a>
    <a target= '_blank' class="text-green-600 hover:underline dark:text-gray-200" href="https://www.africtivistes.com"> AfricTivistes</a> · All rights reserved.
  `,
};
