import {comicx} from "../api/src.js"

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
console.log(comicx)

const listBook = $('#list-book');
listBook.innerHTML = comicx.map(renderComicx).join('');
function renderComicx(item) {
	let {linkBook, nameBook, nameAuthor, linkImage} = item;
	return (`
	<div class="book-page">
		<a href=${linkBook} class="book-page_link"><img src=${linkImage} alt=""></a>
		<div class="book-page_infor">
			<a href=${linkBook}>${nameBook}</a>
			<a href=${linkBook}>${nameAuthor}</a>
			<div><a class="read-btn" href=${linkBook}>Read</a></div>
		</div>
	</div>
	`)
}
const wrappBook = $('#wrapp-book');
wrappBook.innerHTML = comicx.map(renderListComic).join("")
function renderListComic(item) {
	let {linkBook, nameBook, linkImage} = item;
	return (`
	<div class="book-content">
		<a href=${linkBook} class="content-link">
			<img src=${linkImage} alt="">
			<span class="content-link_name">${nameBook}</span>
		</a>
	</div>
	`)
}
// Tao hieu ung slide show----------------------------------
const navMoveSlide = $$('.navMoveSlide');
var sizeLinks = $$('.book-page');
var sizeLink = sizeLinks[0].clientWidth + 12;
var slideContent = $('#list-book');
function moveSlideShow() {
	var moveSlide = 0;
	var maxLink = sizeLink * (sizeLinks.length );
		maxLink -= sizeLink;
		var nextSlide = () => {
			if (moveSlide < maxLink) moveSlide += sizeLink;
			else moveSlide = 0; 
			slideContent.style.marginLeft = '-' + moveSlide + 'px';
		}
		var prevSlide = () => {
			if (moveSlide == 0) moveSlide = maxLink;
			else moveSlide -= sizeLink;
			slideContent.style.marginLeft = '-' + moveSlide + 'px';
		}
		navMoveSlide[1].addEventListener('click', nextSlide);
		navMoveSlide[0].addEventListener('click', prevSlide);
		setInterval(() =>{
			nextSlide();
		}, 40000);
}
moveSlideShow();
