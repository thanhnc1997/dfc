import {vocabulary} from '../data.js';

let current_unit,
		current_lesson;

export default async function vocabulary_page() {
	const template = document.createElement('div');
	template.classList.add('vocabulary-page');
	template.innerHTML = `
	<div class="header">
		<nav class="units">
			<span class="active" data-unit="4">Lớp 4</span>
			<span data-unit="5">Lớp 5</span>
		</nav>
		<nav class="lessons">
			<span class="active" data-lesson="1">Bài 1</span>
			<span data-lesson="2">Bài 2</span>
		</nav>
		<div class="search-form">
			<div class="search-box">
				<img class="mr-4" src="images/icons/search.svg">
				<input type="text" placeholder="Tìm kiếm từ vựng">
			</div>
		</div>
	</div>
	<ul></ul>
	`;
	
	template.querySelector('.search-form input').addEventListener('input', e => {
		render_list({unit: current_unit, lesson: current_lesson, letter: e.target.value.toLowerCase()});
	});
	
	template.querySelectorAll('.units span').forEach(span => {
		span.addEventListener('click', e => {
			template.querySelector('.units span.active').classList.remove('active');
			e.currentTarget.classList.add('active');
			
			current_unit = parseInt(e.currentTarget.getAttribute('data-unit'));
			render_list({unit: current_unit, lesson: current_lesson});
		});
	});
	
	template.querySelectorAll('.lessons span').forEach(span => {
		span.addEventListener('click', e => {
			template.querySelector('.lessons span.active').classList.remove('active');
			e.currentTarget.classList.add('active');
			
			current_lesson = parseInt(e.currentTarget.getAttribute('data-lesson'));
			render_list({unit: current_unit, lesson: current_lesson});
		});
	});
	
	function render_list({unit, lesson, letter}) {
		template.querySelector('ul').innerHTML = '';
		
		let list = vocabulary.filter(item => {
			if (item.unit == unit && item.lesson == lesson) return item;
		});
		
		if (letter) {
			list = list.filter(item => item.name.toLowerCase().includes(letter));
		}
		
		if (!list.length) {
			template.querySelector('ul').innerHTML = '<li style="grid-column: 1/5; background: transparent;" class="text-center">Không có dữ liệu</li>';
			return false;
		}
		
		for (let item of list) {
			let li = document.createElement('li');
			li.innerHTML = `
			<div class="d-flex align-items-center">
				<b class="mr-8">${item.name}</b>
				${item.type
				? `<span class="tag">${item.type}</span>`
				: ''
				}
				<img class="ml-auto cursor-pointer toggle" src="images/icons/plus.svg">
			</div>
			<div class="content">
				<div class="mb-4">
					<span class="mb-4 text-secondary d-block"><small>📘</small> Giải nghĩa từ</span>
					<p><b>${item.meaning}</b></p>
				</div>
				<div class="mb-4">
					<span class="mb-4 text-secondary d-block"><small>🖋️</small> Đặt câu</span>
					<p><b>${item.sentences}</b></p>
				</div>
				${item.image
				? `
				<figure class="image rounded-8" style="background-image: url(${item.image});"></figure>
				`
				: ''
				}
				
			</div>
			`;
			
			li.querySelector('.toggle').addEventListener('click', e => {
				e.currentTarget.classList.toggle('active');
				li.querySelector('.content').classList.toggle('show');
			});
			
			template.querySelector('ul').appendChild(li);
		}
	}
	
	render_list({unit: 4, lesson: 1});
	
	return template;
}