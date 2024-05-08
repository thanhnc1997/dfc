import page_header from './components/page_header.js';
import stories_page from './pages/stories_page.js';

let app = document.getElementById('app');
app.appendChild(await page_header());

let main = document.createElement('main');
main.appendChild(await stories_page());
app.appendChild(main);