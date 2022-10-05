const modal = document.querySelector("#add-item-modal");
const modalOpenBtn = document.querySelector(".add-item-btn");

const openModal = () => {
	if (modal.classList.contains("close")) {
		modal.classList.toggle("close");
	}
	modal.classList.toggle("hidden");
	modal.classList.toggle("open");
};

const closeModal = () => {
	modal.classList.toggle("open");
	modal.classList.toggle("close");
	modal.addEventListener("transitionend", function (e) {
		modal.classList.toggle("hidden");
		modal.removeEventListener("transitionend", arguments.callee);
	});
};

modalOpenBtn.addEventListener("click", (e) => {
	openModal();
});

modal.addEventListener("click", (e) => {
	const evTarget = e.target;
	if (evTarget.classList.contains("add-item-modal-bg")) {
		closeModal();
	}
});

const itemDateElem = document.querySelector("#input-date");
const itemPlaceElem = document.querySelector("#input-place");
const itemPriceElem = document.querySelector("#input-price");
const listElem = document.querySelector(".item-list");
const sumElem = document.querySelector(".sum");

var items = [];
var id = 0;

const addItem = (date, place, price) => {
	items.unshift({ id: id++, date: date, place: place, price: price });
	paintItems();
};

const deleteItem = (id) => {
	items.filter((item) => item.id !== id);
	paintItems();
};

const paintItems = () => {
	items.sort((a, b) => new Date(a.date) - new Date(b.date));
	items.forEach((item) => {
		let itemElem = document.createElement("li");
		itemElem.classList.add("item");

		let itemDate = document.createElement("div");
		itemDate.classList.add("date");
		itemDate.innerText = item.date;

		let itemContent = document.createElement("div");
		itemContent.classList.add("content");
		let itemPlace = document.createElement("div");
		itemPlace.classList.add("place");
		itemPlace.innerText = item.place;
		let itemPrice = document.createElement("div");
		itemPrice.classList.add("price");
		itemPrice.innerHTML =
			"<span>￦</span>" + item.price.toLocaleString("ko-KR");
		itemContent.appendChild(itemPlace);
		itemContent.appendChild(itemPrice);

		let deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.innerHTML =
			"<img id='close-svg' src='./assets/delete.svg' height='30px'/>";
		deleteBtn.addEventListener("click", () => deleteItem(item.id));

		itemElem.appendChild(itemDate);
		itemElem.appendChild(itemContent);
		itemElem.appendChild(deleteBtn);
		listElem.appendChild(itemElem);

		let temp = Number(sumElem.innerText.substr(1)) + Number(item.price);
		sumElem.innerText = "￦" + temp.toLocaleString("ko-KR");
	});
};

console.log(
	Number(sumElem.innerText.substr(1)),
	Number(sumElem.innerText.substr(1)) + 1
);

const init = () => {
	let addItemBtn = document.querySelector(".add-item-submit");
	addItemBtn.addEventListener("click", () => {
		addItem(itemDateElem.value, itemPlaceElem.value, itemPriceElem.value);
		closeModal();
	});
};

init();
