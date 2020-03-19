module.exports = {
  title: 'Substats Docs',
  description: 'Serverless Function to Count How Many People are Subscribed to You in Your Favorite Services',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],
  themeConfig: {
    logo: '/img/substats.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Contribute', link: '/dev/' },
      { text: 'API', link: 'https://api.spencerwoo.com/substats' },
      { text: 'GitHub', link: 'https://github.com/spencerwooo/Substats' },
    ],
    sidebar: ['/', '/query.md', '/api.md'],
    sidebarDepth: 3,
    smoothScroll: true,
    lastUpdated: 'Last Updated',
  },
  plugins: [
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
  ],
}
