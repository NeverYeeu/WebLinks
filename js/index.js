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
// for(let index = 0; index < idenComic.length; index++ ){
// 	let valueChapter = idenComic[index].innerText;
// 	idenComic[index].innerText = localStorage.setItem(index, valueChapter)
// }
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