import Sitemap from 'react-router-sitemap';
import App from './App';
 // Your React Router configuration file
import path from 'path';
import fs from 'fs';

const sitemap = new Sitemap(App)
    .applyParams({
        lastmod: new Date().toISOString().slice(0, 10),
    })
    .build('https://www.humanrightsdossier.com')
    .save('./public/sitemap.xml');

fs.writeFileSync(path.resolve(__dirname, './public/sitemap.xml'), sitemap.toString());
