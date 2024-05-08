import {vocabulary} from '../data.js';

export default async function book_review_page() {
	const template = document.createElement('div');
	template.classList.add('book-review-page');
	template.innerHTML = `
	<div class="text-center" style="padding: 16px;">Chưa có dữ liệu</div>
	`;
	
	return template;
}