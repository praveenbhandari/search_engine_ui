require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
  });
  
  const router = require('./Routes').default;
  const Sitemap = require('react-router-sitemap').default;
  
  function generateSitemap() {
    new Sitemap(router)
      .build('https://humanrightsdossier.com')
      .save('./public/sitemap.xml');
  }
  
  generateSitemap();
  