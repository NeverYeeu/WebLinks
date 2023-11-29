import {renderComics, toLocalStorage, renderGenre} from './function.js';
import {comics, genreComic} from '../api/src.js'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const iconSets = $$('.icon-set');
const readLinks = $$('.infor-href')
const numChapter = $$('numChapter');
const boxSettings = $$('.box-setting');
const chapterNums = $$('.chapter-num');
const chapterLinks = $$('.chapter-link');
const setButtons = $$('.setting-button');
const boxServer = $('.box-server');
const linksComic = $('.links-comic')

// Xử lý render ra trình duyệt

const arrManga = comics.manga;
arrManga.sort((a,b) => b.chapComic - a.chapComic)
const arrManhua = comics.manhua;
arrManhua.sort((a,b) => b.chapComic - a.chapComic)
const arrManhwa = comics.manhwa;
arrManhwa.sort((a,b) => b.chapComic - a.chapComic)
$$('.links')[0].innerHTML = arrManhua.map(renderComics).join('')
$$('.links')[1].innerHTML = arrManhwa.map(renderComics).join('')
$$('.links')[2].innerHTML = arrManga.map(renderComics).join('')

iconSets.forEach((icon, index) => {
	icon.addEventListener('click', () => {
		boxSettings[index].classList.toggle('open')
		chapterNums[index].onkeydown = (e) => {
			let aValue = e.target.value
			insertContent(index, aValue)
		}
	})
})
function insertContent(a, b) {
	numChapter[a].innerText = b;
}
var idenComic = $$('.numChapter');
const plusBtns = $$('.plus-btn')
const minusBtns = $$('.minus-btn')
const loadIcon  = $('.load-btn')

// Phần cài đặt, tinh chỉnh tăng giảm số chap
const numBtns = $$('.set_chap > span');
numBtns.forEach((num, index) => {
	num.addEventListener('click', () => {
		$('.set_chap > span.choose').classList.remove('choose')
		num.classList.add('choose')
		let valueChap = $('.set_chap > span.choose').innerText
		localStorage.setItem('set-chap', valueChap)
	})
})
plusBtns.forEach((item, index) => {
	item.addEventListener('click', () => {
		let currentChap = +idenComic[index].innerText
		let getValue = +localStorage.getItem('set-chap')
		let b = (++currentChap) + getValue - 1
		handleChapter(b, index);
	})
})
minusBtns.forEach((item, index) => {
	item.addEventListener('click', () => {
		let currentChap = +idenComic[index].innerText
		let getValue = +localStorage.getItem('set-chap')
		let b = (--currentChap) - getValue + 1
		handleChapter(b, index);
	})
})
function handleChapter(b, index) {
	idenComic[index].innerText = b
	localStorage.setItem(index, b)
}
for(let index in idenComic ){
	if (index < idenComic){
		idenComic[index].innerText = localStorage.getItem(index)
	}
}
// Hiệu ứng cài đặt
loadIcon.addEventListener('click', () => {
	loadIcon.classList.toggle('open');
	$('.wrapper-set').classList.toggle('open')
	loadIcon.classList.toggle('choose')
})
const genreList = $('.genre_list');
genreList.innerHTML = genreComic.map(renderGenre).join('');

const genreIcon = $('.genre-btn');
const closeBoxGenre = $('.box-genre_overlay');
closeBoxGenre.addEventListener('click', () => {
	$('.box-genre').classList.remove('open')
	genreIcon.classList.remove('choose')
})
genreIcon.addEventListener('click', () => {
	$('.box-genre').classList.toggle('open')
	genreIcon.classList.toggle('choose')
})
// Bộ lọc tìm thể loại truyện tranh----------------------------------
const itemGenres = $$('.genre_list > li')
itemGenres[0].classList.add('choose')
function getGenre() {
	itemGenres.forEach((item) => {
		item.addEventListener('click', () => {
			let getValue = item.innerText;
			comicFilter(getValue)
			$('.genre_list > li.choose').classList.remove('choose')
			item.classList.add('choose')
		})
	})
}
getGenre()
// Tạo mảng khi ta chọn thể loại-------------------------------------------
function comicFilter(getValue) {
	let newManhua = comics.manhua;
		$$('.links')[0].innerHTML = handleGenre(newManhua).map(renderComics).join('')
	let newManhwa = comics.manhwa;
		$$('.links')[1].innerHTML = handleGenre(newManhwa).map(renderComics).join('')
	let newManga = comics.manga;
		$$('.links')[2].innerHTML = handleGenre(newManga).map(renderComics).join('')
	function handleGenre(arr){
		const newArray = arr.filter((a) => {
			return a.genreComic.includes(getValue)
		})
		return newArray
	}
}
// Chỉnh sửa chap-----------------------------------------------------------
const noticeBtns = $$('.notice-btn');
const boxEdits = $('.box-infor_comic');
const extraBtns = $$('.extra-btn');
const closeBtn = $('.close-btn');
const boxItem = $('.box-item');
const genreHeading = $('#genre-head');
const columnHead = $$('.column-head');
// Thể hien thong tin truyen tranh----------------------------------------------
function handleExtraChap() {
	noticeBtns.forEach((btn, index) => {
		btn.addEventListener('click', () => {

			console.log(index)
			boxEdits.classList.toggle('open');
			let boxInfor = $('.box-infor_comic');
			boxInfor.innerHTML = renderInforComic();
			const closeWrapBtn = $('.wrap-close');
			// Xử lý khi ta click vào truyen
			handleInforComic(index)
			closeWrapBtn.addEventListener('click', () => {
				boxEdits.classList.remove('open');
			})
		})
	})
	extraBtns.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			btn.classList.add('click');
			let nameHead = columnHead[index].innerText;
			genreHeading.innerText = nameHead;
		})
		closeBtn.addEventListener('click', () => {
			extraBtns[index].classList.remove('click');
		})
	})
	

} handleExtraChap();

// Xác Nhận Xóa Truyện-------------------------------------------------------
function hanldeButton() {
	const deleteBtns = $('.edit-delete');
	const nameComics = $('.name-comic');
	deleteBtns.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			let getName = nameComics[index].innerText;
			let getValue = confirm('Bạn có muốn xóa Truyện'+' " ' + getName +' " ' + 'này ra khỏi danh sách không?')
			if(getValue == 0){
				console.log('Không Xóa Truyện')
			} else if(getValue == 1) {
				console.log('Xác Nhận Xóa Truyện')
			}
		})
	})
};

function renderInforComic() {
	return (`
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
		<div class="wrap-close">Đóng</div>
	</div>
	<img src="" class="infor_comicImg" alt=""> 
	`)
}

// Xử lý và render du lieu ra the input---------------------------------------
// const inputTexts = $$('.wrap-input  input[type="text"]')
function handleInforComic(index){
	const nameComic = $('input[name="nameComic"]')
	const nameCharacter = $('input[name="nameCharacter"]')
	const linkComic = $('input[name="linkComic"]')
	const linkImage = $('input[name="linkImage"]')
	const nameGenre = $('input[name="nameGenre"]')
	const nameChapter = $('input[name="nameChapter"]')
	let srcImage = $('.infor_comicImg');
	console.log(srcImage)
	let manhuaLength = arrManhua.length;
	let manhwaLength = arrManhwa.length;
	let mangaLength = arrManga.length;

	let indexManhua = manhuaLength;
	let indexManhwa = manhwaLength + manhuaLength;
	let indexManga = mangaLength + manhwaLength + manhuaLength;
	if (index < indexManhua && index >= 0){
		let length = 0;
		renderValueInput(index, length, arrManhua)
	} else if(index > indexManhua && index < indexManhwa){
		let length = indexManhua;
		console.log('Manhwa');
		renderValueInput(index, length, arrManhwa)
	} else if(index >= indexManhwa && index < indexManga ){
		console.log('Manhga');
		let length = indexManhwa;
		renderValueInput(index, length, arrManga)
	}
	
	// function handleValueInput(arr, index){
	// 	if(arrLength == manhuaLength) {
	// 		for (let i = 0; i < arrLength; ++i){
	// 		}
	// 	} else if(arrLength == manhwaLength){
	// 		totalLength = manhwaLength + manhuaLength;
	// 		for (let i = manhuaLength ; i < totalLength; ++i){
	// 			renderValueInput(i, manhuaLength, arr)
	// 		}
	// 	} else if(arrLength == mangaLength) {
	// 		totalLength = manhuaLength + mangaLength + manhwaLength;
	// 		let currentLength = manhuaLength + manhwaLength;
	// 		for (let i = currentLength; i< totalLength; ++i) {
	// 			renderValueInput(i, currentLength, arr)
	// 		}
	// 	}
	// };
	function renderValueInput( index,length, arr){
		nameComic.setAttribute('value', arr[index-length].nameComic);
		nameCharacter.setAttribute('value', arr[index-length].mainComic);
		linkComic.setAttribute('value', arr[index-length].linkComic);
		linkImage.setAttribute('value', arr[index-length].imageComic);
		nameChapter.setAttribute('value', arr[index-length].chapComic);
		nameGenre.setAttribute('value', arr[index-length].genreComic);
		srcImage.setAttribute('src', arr[index-length].imageComic);
		console.log(srcImage)
	}
}
// ------------------------------------------------------------------
// Gọi API lấy dữ liệu-----------------------------------------------
const linkHeads = $$('.links-head > span');
linkHeads.forEach((head, index) => {
	head.onclick = () => {
		$('.links-head >span.choose-head').classList.remove('choose-head')
		head.classList.add('choose-head');
		let valueGenre = head.innerText.toLowerCase();
		handleApi(valueGenre)
	}
})
// Dong mo hop truyen tranh-------------------------------------------------
const setBtn = $('.load-btn');
const extraComic = $('.extra_comic');
const serverBtn = $('.server-btn');
const readBtn = $('.read_comic')
const genreBtn = $('.genre-btn');
const boxLinkApi = $('.box-links');
const wrapBox = $('.wrap-box');

readBtn.addEventListener('click', () => {
	wrapBox.classList.remove('close')
	readBtn.classList.remove('open')

	genreBtn.classList.remove('close')
	extraComic.classList.remove('open')
	boxLinkApi.classList.add('close');
	setBtn.classList.remove('close')
	serverBtn.classList.remove('close')
});
serverBtn.addEventListener('click', () => {
	wrapBox.classList.add('close')
	boxLinkApi.classList.remove('close')
	serverBtn.classList.add('close')
	setBtn.classList.add('close')
	readBtn.classList.add('open');
	genreBtn.classList.add('close')
	extraComic.classList.add('open')
})

extraComic.addEventListener('click', () => {
	boxItem.classList.toggle('open')
})
closeBtn.addEventListener('click', () => {
	boxItem.classList.remove('open')
})

let manhua = (comics.manhua).sort((a,b) => {
	return (b.chapComic - a.chapComic)
})
renderData(manhua)
// Lấy giữ liệu truyền vào api----------------------------------------
function handleApi(genre) {
	const urlApi = 'http://localhost:3000/' + genre;
	const button = $('.item-btn');
	
	function startWeb(){
		getApi(renderData);
		handleForm();
	}
	startWeb();
	
	function getApi(callback) {
		fetch(urlApi) 
			.then (res => res.json())
			.then (callback)		
			.catch( () => {
				console.log('Không thể gọi được API');
				boxLinkApi.innerHTML = (`
				<div class="box-server">
					<div class="server-notice">
						Server hiện chưa được bật, vui lòng bật lên '__'
					</div>
				</div>
				`)
				
			})
	}
	// Đẩy code lên json-server-------------------------------------------------
	function postApi(data, usersApi) {
		let option = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data)
		}
		fetch(urlApi, option) 
			.then(res => res.json())
			.then(usersApi)
	}
	// Xóa dữ liệu--------------------------------------------------------------
	function deleteApi(id){
		let isChoose = confirm('Bạn có muốn xóa truyện này không?');
		if(isChoose == true) {
			console.log('xóa truyện')
			let option = {
				method: 'DELETE',
				headers: {"Content-Type": "application/json"},
			}
			fetch(urlApi + '/' + id, option) 
				.then(res => res.json())
				.then(() => {
					let item = $('.item-' + id);
					item.remove();
				})
		} else{
			console.log('Không xóa truyện')
		}
	}
	//Xử lý khi ta nhập dữ liệu-------------------------------------------------
	function handleForm(){
		button.addEventListener('click', () => {
			let nameComic = $('input[name="itemNameComic"]').value;
			let mainComic = $('input[name="itemnameCharacter"]').value;
			let imageComic = $('input[name="itemimageComic"]').value;
			let linkComic = $('input[name="itemlinkComic"]').value;
			let chapComic = $('input[name="itemchapComic"]').value;
			let genreComic = $('input[name="itemgenreComic"]').value;
			var formData = {
				nameComic: nameComic,
				mainComic: mainComic,
				imageComic: imageComic,
				linkComic: linkComic,
				chapComic: chapComic,
				genreComic: genreComic
			}
			postApi(formData, () => {
				getApi(renderData);
			})
		})
	}
	const deleteComicBtns = $$('.delete_comic');
	console.log(deleteComicBtns)
	deleteComicBtns.forEach((item, index) => {
		item.addEventListener('click', () => {
			deleteApi(index)
		})
	})
}

function renderData(array) {
	linksComic.innerHTML = array.map(dataHtml).join('');
	function dataHtml(item) {
		let {id, nameComic, mainComic, imageComic, linkComic, chapComic, genreComic} = item;
		return (`
		<div class="link-comic item-${id}" >
			<img src=${imageComic} alt=${nameComic} class="comic_img">
			<span>
				<div class="comic_name">${nameComic}</div>
				<div class="comic_1">
					<input type="text" placeholder="Chapter" value= ${chapComic}>
					<input type="text" placeholder="Main" value= ${mainComic}>
				</div>
				<input type="text" placeholder="Genre" value= ${genreComic}>
				<div class="comic_2">
					<input type="text" placeholder="Link Comic" value= ${linkComic}>
					<input type="text" placeholder="Link Image" value= ${imageComic}>
				</div>
			</span>
			<p class="delete_comic">Xóa</p>
		</div>
		`)
	}
	
}
