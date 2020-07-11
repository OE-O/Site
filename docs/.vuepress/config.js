module.exports = {
  theme: 'yuu',
  title: 'OE-O Documentation',
  description: 'Documentation for the OE-O public API',
  themeConfig: {
    logo: 'https://firebasestorage.googleapis.com/v0/b/oe-o-api.appspot.com/o/promotional%2Flogos%2Frounded.png?alt=media',
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Reference", link: "/reference/" },
      { text: "About", link: "/info/"},
      { text: 'Github', link: 'https://github.com/OE-O' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/guide/',
            '/guide/getting-started',
            '/guide/api-tokens',
          ]
        },
        {
        title: 'Advanced',
        collapsable: false,
        sidebarDepth: 1,
        displayAllHeaders: true,
        }
      ],
      //fallback
      '/': [
        {
          title: 'Information',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/info/',
            '/info/contact',
          ]
        }
      ]
    }
  }
};
