const modal = document.querySelector("#add-item-modal");
const modalOpenBtn = document.querySelector(".add-item-btn");

modalOpenBtn.addEventListener("click", (e) => {
	if (modal.classList.contains("close")) {
		modal.classList.toggle("close");
	}
	modal.classList.toggle("hidden");
	modal.classList.toggle("open");
	console.log(modal);
});

modal.addEventListener("click", (e) => {
	const evTarget = e.target;
	if (evTarget.classList.contains("add-item-modal-bg")) {
		modal.classList.toggle("open");
		modal.classList.toggle("close");
		modal.addEventListener("transitionend", function (e) {
			modal.classList.toggle("hidden");
			modal.removeEventListener("transitionend", arguments.callee);
			console.log(modal);
		});
	}
});
