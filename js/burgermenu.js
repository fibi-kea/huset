if (window.innerWidth < 980) {




	//		nav-menu-mobile - eventlisterns

	document.addEventListener("DOMContentLoaded", function (event) {
		navMenu();
	});

	//	viser & skjuler navigationsmenu

	function navMenu() {

		console.log("navMenu");

		function toggleMenu() {
			console.log("toggleMenu");
			document.querySelector(".burger").classList.toggle("change");
			document.querySelector("nav").classList.toggle("show");
			document.querySelector("header").classList.toggle("show");
			document.querySelector(".burger").classList.toggle("pulse");
		}

		function closeMenu() {
			console.log("closeMenu");
			document.querySelector(".burger").classList.remove("change");
			document.querySelector("nav").classList.remove("show");
			document.querySelector("header").classList.remove("show");
			document.querySelector(".burger").classList.remove("pulse");
		}

		document.querySelector(".burger").addEventListener("click", toggleMenu);
		document.querySelector("nav ul").addEventListener("click", closeMenu);
		document.querySelector("nav .sprog").addEventListener("click", closeMenu);

		//	luk menu, hvis der bruges enter-knap i searchfeltet
		let input = document.querySelector("#search");
		input.addEventListener("keyup", function (event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				closeMenu();
			}
		});

	}
}
