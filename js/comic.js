import {images, chapters} from "../api/image.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
// Render ra chapter

const listChap = $$('.list-chap');
listChap.forEach((list) => {
	list.innerHTML = chapters["comic1"].map((item) =>{
		return (`
		<li>${item.chapter}</li>
 		`)
	}).join("")
})
// Xu ly khi ta bam nut chapter-----------------------------------------
const chapterBtns = $$('.list-chap > li');
const stepChap = (chapterBtns.length) / 2;
chapterBtns[0].classList.add('choose')
chapterBtns[stepChap].classList.add('choose');

const imageSrc = $('#image-source');
chapterBtns.forEach((chap, index) => {
	chap.addEventListener('click', () => {
		if (index < stepChap) {
			let chapChoose = +index;
			let newIndex = +index + stepChap;
			handleChapter(chapChoose, newIndex)
		} else {
			let chapChoose = +index - stepChap;
			handleChapter(chapChoose, chapChoose)
		};
		function handleChapter(chapChoose, newIndex) {
			$$('.list-chap >li.choose').forEach((item) => {
				item.classList.remove('choose')
			})
			chap.classList.add('choose')
			chapterBtns[newIndex].classList.add("choose")
			// Chen anh------------------------------------------
			let newImages = images[0][chapChoose];
			imageSrc.innerHTML = newImages.map(renderImages).join("")
		}
	})
})
// Xu Ly su kien chuyen Chap--------------------------------------------
function renderImages(item) {
	let {img} = item;
	return (`
		<li><img src=${img} alt=""></li>
	`)
}