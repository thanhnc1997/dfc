import {stories} from '../data.js';

let current_topic = '';

export default async function stories_page() {
	const template = document.createElement('div');
	template.classList.add('stories-page');
	template.innerHTML = `
	<div class="header">
		<nav class="topics">
			<span class="active" data-topic="">Tất cả</span>
			<span data-topic="1">Đoàn kết</span>
			<span data-topic="2">Góp sức bảo vệ an ninh</span>
			<span data-topic="3">Hiếu học</span>
			<span data-topic="4">Người phụ nữ anh hùng hoặc có tài</span>
		</nav>
	</div>
	<div class="page">
		<div class="d-grid grid-2 grid-lg-4" style="grid-gap: 6px;"></div>
	</div>
	`;
	
	template.querySelectorAll('.topics span').forEach(span => {
		span.addEventListener('click', e => {
			template.querySelector('.topics span.active').classList.remove('active');
			e.currentTarget.classList.add('active');
			
			current_topic = parseInt(e.currentTarget.getAttribute('data-topic')) || '';
			
			render_list({topic: current_topic});
		});
	});
	
	async function render_list({topic}) {
		template.querySelector('.d-grid').innerHTML = '';
		
		let list = stories;
		if (topic || topic != '') {
			list = stories.filter(item => {
				if (item.topic == topic) return item;
			});
		}
		
		if (!list.length) {
			template.querySelector('.d-grid').innerHTML = '<div style="grid-column: 1/5" class="text-center">Không có dữ liệu</div>';
			return false;
		}
		
		for (let item of list) {
			let div = document.createElement('div');
			div.classList.add('item');
			div.innerHTML = `
			<figure class="image" style="background-image: url(${item.image})"></figure>
			<h4>${item.name}</h4>
			`;
			div.querySelector('.image').addEventListener('click', async e => {
				document.body.appendChild(await render_popup({image: item.image}))
			});
			
			template.querySelector('.d-grid').appendChild(div);
		}
	}
	
	async function render_popup({image}) {
		let popup = document.createElement('div');
		popup.classList.add('popup');
		popup.innerHTML = `
		<div class="overlay"></div>
		<div class="content">
			<img class="mb-12" src="${image}">
			<button class="btn" style="width: 100%;">Đóng</button>
		</div>
		`;
		
		popup.querySelector('.btn').addEventListener('click', e => popup.remove());
		popup.querySelector('.overlay').addEventListener('click', e => popup.remove());
		
		return popup;
	}
	
	render_list({topic: ''});
	
	return template;
}