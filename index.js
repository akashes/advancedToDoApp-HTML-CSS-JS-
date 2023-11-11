let input = document.getElementById("kitchen-input");
let button = document.getElementById("add-btn");
let kitchenItems = document.getElementById("kitchen-items-list");
const audio = new Audio("./Audio/remove.mp3");

//global varibles
let result = [];
let kitchenInputArray = [];
let kitchen = [];

//initial call to get values from the localstorage
getLocalStorage();

function upperCase() {
	input.value = input.value.toUpperCase();
}
function setLocalStorage(val) {
	// set to localStorage
	localStorage.setItem("kitchenInput", JSON.stringify(kitchenInputArray));
}
function getLocalStorage() {
	// get from localStorage

	if (JSON.parse(localStorage.getItem("kitchenInput"))) {
		//  kitchen = localStorage.getItem(JSON.parse(kitchenInputArray))
		// console.log(kitchen);
		// result.push(localStorage.getItem(JSON.parse(kitchenInput)));.
		// result.push(...JSON.parse(localStorage.getItem("kitchenInput")))
		// console.log(result);
		kitchenItems.innerText = "";

		kitchenInputArray = JSON.parse(localStorage.getItem("kitchenInput"));
		console.log(kitchenInputArray);
		kitchenInputArray.forEach((element) => {
			console.log(element);
			let li = document.createElement("li");
			li.textContent = element;
			li.style.cssText = "animation:move .3s ease-in-out";
			input.value = "";
			input.focus();
			kitchenItems.appendChild(li);

			// creating delete button

			var trashBtn = document.createElement("i");
			trashBtn.classList.add("fas", "fa-trash", "fa-xs");
			li.appendChild(trashBtn);

			// creating edit button

			var editBtn = document.createElement("i");
			editBtn.classList.add("fas", "fa-edit", "fa-xs");
			li.appendChild(editBtn);
		});
	}
}


input.addEventListener("input", upperCase);

//button click event 
button.addEventListener("click", () => {
	let val = input.value;
	kitchenInputArray.push(val);

	if (val === "") {
		alert("Please enter an item");
	} else {
		setLocalStorage(val);

		getLocalStorage();
	}
});

input.addEventListener("keydown", function (val) {
	if (val.key === "Enter") {
		let val = input.value;
			kitchenInputArray.push(val);

		if (val === "") {
			alert("Please enter an item");
		} else {
			
			setLocalStorage()
			getLocalStorage()
		}
	}
});



function deleteItem(e) {
	classes = e.target.classList;
	for (i of classes) {
		if (i == "fa-trash") {
			item = e.target.parentNode;
			item.classList.add("fadeOut");
			item.addEventListener("transitionend", () => {
				item.remove();
				audio.currentTime = 0.25;
				audio.play();
			});
		}
	}
}
function changeCase(val) {
	val = val.toUpperCase();
	return val;
}
function editItem(e) {
	editClasses = e.target.classList;
	for (i of editClasses) {
		if (i == "fa-edit") {
			let editValue = prompt("Please enter new value");
			if(!editValue){
				alert('please enter a value')
			}else{
				editvalueUpper = changeCase(editValue);


				e.target.parentNode.firstChild.textContent = editvalueUpper;

				
			}
			
		}
	}
}
kitchenItems.addEventListener("click", deleteItem);
kitchenItems.addEventListener("click", editItem);
