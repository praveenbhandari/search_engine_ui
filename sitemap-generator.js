// import router from './src/router'; // Adjust the path to your router file
import { Sitemap } from 'react-router-sitemap';

new Sitemap(router)
  .build('https://your-amplify-domain.com')
  .save('./public/sitemap.xml'); // Ensure the path matches your public directory
