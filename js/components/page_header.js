export default async function page_header() {
	const template = document.createElement('header');
	template.classList.add('page-header');
	template.innerHTML = `
	<nav class="main-nav">
		<span data-page="stories" style="background: linear-gradient(#7F7FD5, #86A8E7, #91EAE4)">📖 Danh mục truyện</span>
		<span data-page="vocabulary" style="background: linear-gradient(#f12711, #f5af19)">💬 Từ ngữ</span>
		<span data-page="book-review" style="background: linear-gradient(#11998e, #38ef7d)">🌟 Book review</span>
	</nav>
	`;
	
	template.querySelectorAll('header span').forEach(span => {
		span.addEventListener('click', async e => {
			let data_page = e.currentTarget.getAttribute('data-page');
			document.querySelector('main').innerHTML = '';
			
			if (data_page == 'vocabulary') document.querySelector('main').appendChild(await (await import('../pages/vocabulary_page.js')).default());
			
			if (data_page == 'stories') document.querySelector('main').appendChild(await (await import('../pages/stories_page.js')).default());
			
			if (data_page == 'book-review') document.querySelector('main').appendChild(await (await import('../pages/book_review_page.js')).default());
		});
	});
	
	return template;
}