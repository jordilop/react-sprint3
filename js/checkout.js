// regExp Password https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/

let nodeList = [
	{
		id: "fName",
		regExp: /^[A-zÀ-ú\s]{3,}$/
	},
	{
		id: "fEmail",
		regExp: /^[\w.-]+@[\w.-]+\.\w{2,}$/
	},
	{
		id: "fAddress",
		regExp: /.{3,}/
	},
	{
		id: "fLastN",
		regExp: /^[A-zÀ-ú\s]{3,}$/
	},
	{
		id: "fPassword",
		regExp: /^(?=.*[0-9])(?=.*[A-z]).{4,8}$/
	},
	{
		id: "fPhone",
		regExp: /^[0-9]{9}$/
	},

];

//Event without reload
const form = document.getElementById('form');
form.addEventListener('submit', validate);

function inputCheck(element) {
	let index = nodeList.findIndex(nodeList => nodeList.id == element.id);
	let checkRegExp = nodeList[index].regExp.test(element.value);
	return checkRegExp;
}

// Exercise 7
function validate(event) {
	const formList = document.querySelectorAll("input");
	formList.forEach(function (element) {
		if (!inputCheck(element)) {
			element.classList.add("is-invalid");
			element.classList.remove("is-valid");
		} else {
			element.classList.add("is-valid");
			element.classList.remove("is-invalid");
		}
	});
	event.preventDefault();
}