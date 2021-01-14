#!/usr/bin/env node
const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('https://newline-ng-universal-ddotx.herokuapp.com', {
  filePath: './sitemap2.xml',
  stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.log('done')
});

// start the crawler
generator.start();
