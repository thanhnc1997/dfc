import {book_review} from '../data.js';

export default async function book_review_page() {
	const template = document.createElement('div');
	template.classList.add('book-review-page');
	template.innerHTML = `
	<ul></ul>
	`;
	
	async function render_list() {
		template.querySelector('ul').innerHTML = '';
		
		for (let item of book_review) {
			let li = document.createElement('li');
			li.innerHTML = `
			<div class="profile mb-12">
				<span></span>
				<div>
					<p><b>${item.reviewer.name}</b></p>
					<small class="text-secondary">Học sinh lớp ${item.reviewer.class}</small>
				</div>
			</div>
			<video width="100%" controls>
				<source src="${item.video}" type="video/mp4">
			</video>
			`;
			
			template.querySelector('ul').appendChild(li);
		}
	}
	
	render_list();
	
	return template;
}