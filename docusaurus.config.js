/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Draft.js',
  tagline: '基于React的富文本编辑器框架',
  url: 'https://draftjs-cn.netlify.com',
  baseUrl: '/',
  organizationName: 'sessionboy',
  projectName: 'draftjs-cn',
  favicon: 'img/draftjs-logo.ico',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: 'https://github.com/facebook/draft-js/edit/master/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'Draft.js',
      logo: {
        alt: 'Draft.js Logo',
        src: 'img/draftjs-logo.svg',
      },
      links: [
        {to: 'docs/getting-started', label: '文档', position: 'right'},
        {
          href: 'https://github.com/facebook/draft-js',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: 'ae94c9e3ee00ea8edddd484adafc37cd',
      indexName: 'draft-js',
    },
    googleAnalytics: {
      trackingID: 'UA-44373548-19',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '入门指南',
              to: 'docs/getting-started',
            },
            {
              label: 'API Reference',
              to: 'docs/api-reference-editor',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/draftjs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/draft_js',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/draft-js',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: '/img/oss_logo.png',
        href: 'https://opensource.facebook.com/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
    },
  },
};
