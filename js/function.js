function renderComics(item) {
	let {nameComic, mainComic, imageComic, linkComic, chapComic} = item;
	return (`
	<div class="link-infor">
		<img src=${imageComic} alt="" class="infor-img">
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
				<span class="name-comic">${nameComic}</span>
				<span>Main: <span class="truyen-main">${mainComic}</span>
				<a  class="infor-href" target="_blank" href=${linkComic} >Đọc Truyện</a>
			</div>
		</div>
		<i class="fa-solid fa-circle-exclamation notice-btn"></i>
		<div class="box-edit">
			<div class="wrap-edit">
				<span class="edit-repair">Áp dụng</span>
				<span class="edit-delete">Xóa</span>
			</div>
			<div class="wrap-input">
				<div class="input-name">
					<div>
						<label>Name Comic:</label>
						<input type="text" name="nameComic" placeholder="Name Comic">
					</div>
					<div>
						<label>Character:</label>
						<input type="text" name="nameCharacter" placeholder="Name Character">
					</div>
				</div>
				<div>
					<label>Link Comic:</label>
					<input type="text" name="linkComic" placeholder="Link Comic">
				</div>
				<div>
					<label>Link Image:</label>
					<input type="text" name="linkImage" placeholder="Link Image">
				</div>
				<div class="input-name">
					<div>
						<label>Genre:</label>
						<input type="text" name="nameGenre" placeholder="Name Genre">
					</div>
					<div>
						<label>Chapter:</label>
						<input type="text" name="nameChapter" placeholder="Chapter">
					</div>
				</div>
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

// Ham lay gia tri cua localhost------------------------------------
function startWeb(){

} startWeb();

function getItems() {
	fetch(fakeApi) 
		.then(res => res.json())
		.then((items) => {

		})
}
