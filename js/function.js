import {comics} from '../api/src.js'
function renderComics(item) {
	let {nameComic, mainComic, imageComic, linkComic, chapComic} = item;
	return (`
	<div class="link-infor">
		<div class="wrapper-infor">
			<div class="infor-chap">
				<img src=${imageComic} alt="">
				<div class="chap-change">
					<i class="fa-solid fa-minus minus-btn"></i>
					<span class="numChapter">${chapComic}</span>
					<i class="fa-solid fa-plus plus-btn"></i>
				</div>
			</div>
			<div class="infor-truyen">
				<span>${nameComic}</span>
				<span>Main: <span class="truyen-main">${mainComic}</span>
				<a  class="infor-href" target="_blank" href=${linkComic} >Đọc Truyện</a>
			</div>
		</div>
	</div>
	`)
};
export {renderComics}

// Hàm gửi dữ liệu lên Local Storage

function toLocalStorage(key) {
	const store = localStorage.getItem(key) ?? [];
	const saveItem = () => {
		localStorage.setItem(key, store)
	}
	const storage = {
		getStorage(key) {
			return store[key]
		},
		setStorage(key, value) {
			storage[key] = value
			saveItem()
		},
		deleteStorage(key) {
			delete storage[key]
			saveItem()
		}
	}
	return storage
}
export {toLocalStorage}

function renderGenre(item){
	let {genre} = item
	return (`
		<li>${genre}</li>
	`)
}
export {renderGenre}