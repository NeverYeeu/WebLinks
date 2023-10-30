const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
const backgrounds = [
	{color: "rgb(30,33,34)"},
	{color: "rgb(189,174,148, 0.1)"},
	{color: "#101010"},
	{color: "#696969"},
	{color: "rgb(28,28,28)"},
	{color: "rgb(255,255,255)"},
]
$('.box_background').innerHTML = backgrounds.map(renderBackground).join('');
function renderBackground(item) {
	return (`
		<span id=${item.color} style="background-color:${item.color}"></span>	
	`)
}
const getBacks = $$('.box_background span');
const boxDisplay = $('.display-column')

const sizeNums = $$('.size-num');
const minusBtns = $$('.minusBtn')
const plusBtns = $$('.plusBtn')
//Lấy giá trị truyền vào file
const fontS = localStorage.getItem('fontSize');
boxDisplay.style.fontSize = fontS + 'px';
const lineH = localStorage.getItem('lineHeight');
boxDisplay.style.lineHeight = lineH;
const backG = localStorage.getItem('backgroundColor');
boxDisplay.style.backgroundColor = backG;
sizeNums[0].innerText = fontS;
sizeNums[1].innerText = lineH;
//Truyen vao background
const column = $('.web-column');
const content = $('#web-content');
column.style.backgroundColor = backG;
content.style.lineHeight = lineH;
content.style.fontSize = fontS + 'px';

console.log(column)
//Chinh sua mau------------------------------------------
getBacks.forEach((color) => {
	color.addEventListener('click', () => {
		let getColor = color.getAttribute('id');
		boxDisplay.style.backgroundColor = getColor; 
		column.style.backgroundColor = getColor;
		localStorage.setItem('backgroundColor', getColor)
	})
})
// Tăng Giảm giá trị trong file---------------------------
minusBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		let getSize = +sizeNums[index].innerText;
		if (sizeNums[index].classList.contains('fontSize')) {
			let newValue = (--getSize)
			handleFontS(newValue); handleSize(newValue, index)
			localStorage.setItem('fontSize', newValue)
		} else if(sizeNums[index].classList.contains('lineHeight')){
			let extraValue = 0.5;
			let newValue = (--getSize) + extraValue;
			handleLineH(newValue);; handleSize(newValue, index)
			localStorage.setItem('lineHeight', newValue)
		}
	})
})
plusBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		let getSize = +sizeNums[index].innerText;
		if (sizeNums[index].classList.contains('fontSize')) {
			let newValue = (++getSize)
			handleFontS(newValue); handleSize(newValue, index)
			localStorage.setItem('fontSize', newValue)
		} else if(sizeNums[index].classList.contains('lineHeight')){
			let extraValue = 0.5;
			let newValue = (++getSize) - extraValue;
			handleLineH(newValue);; handleSize(newValue, index)
			localStorage.setItem('lineHeight', newValue)
		}
	})
})
function handleSize(value, index) {
	sizeNums[index].innerText = value;
}
function handleLineH(value) {
	boxDisplay.style.lineHeight = value;
	content.style.lineHeight = value;
}
function handleFontS(value) {
	boxDisplay.style.fontSize = value + 'px';
	content.style.fontSize = value + 'px';
}
// Đóng Mở Họp cài đặt------------------------------------
const boxSetting = $('#box-setting');
const iconSetting = $('.nav-set')
iconSetting.addEventListener('click', () => {
	boxSetting.classList.toggle('open');
})