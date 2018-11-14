	//	global var
	let events = [];
	let eventNumber;
	let eventTemplate = document.querySelector("[data-template]");
	let eventContainer = document.querySelector("[data-container]");

	//	globale variabeler
	let sider = [];
	let dest = document.querySelector("[side-container]");

	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJsonEvents);

	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJsonSide);


	//	hent json
	async function hentJsonEvents() {
		console.log("hentJsonEvents");

		//	Hent wordpress content fra flere custom post types (multiple-post-type plugin endpoint)
		let jsonData = await fetch("http://erik-crg.dk/kea/07-cms/huset-kbh/wordpress/wp-json/wp/v2/multiple-post-type?&type[]=musikevents&type[]=filmevents&type[]=ordevent&type[]=andet_event");

		events = await jsonData.json();

		//	test json-import
		console.log(events);

		//	sortér efter event-dato fra acf
		events.sort(function (a, b) {
			return a.acf.dato - b.acf.dato;
		});

		//	begræns antal post vist på siden
		eventAntal = events.slice(0, 5);
		console.log(eventAntal);

		visEvents();
	}

	//	Event-loop
	function visEvents() {

		//	Kør loop med json-data
		eventAntal.forEach(event => {
			console.log(event);

			//		Klon? ja tak
			let klon = eventTemplate.cloneNode(true).content;

			//	udtræk dato fra acf
			let str = event.acf.dato;
			console.log("hel dato: " + str);

			//	omform måned fra tal til 3 bugstaver - fjern evt. 0 i start af streng
			let eventMaaned = str.substring(4, 6).replace(/^0+/, '');

			if (eventMaaned == 01) {
				eventMaaned = "jan";
			}
			if (eventMaaned == 02) {
				eventMaaned = "feb";
			}
			if (eventMaaned == 03) {
				eventMaaned = "mar";
			}
			if (eventMaaned == 04) {
				eventMaaned = "apr";
			}
			if (eventMaaned == 05) {
				eventMaaned = "maj";
			}
			if (eventMaaned == 06) {
				eventMaaned = "jun";
			}
			if (eventMaaned == 07) {
				eventMaaned = "jul";
			}
			if (eventMaaned == 08) {
				eventMaaned = "aug";
			}
			if (eventMaaned == 09) {
				eventMaaned = "sep";
			}
			if (eventMaaned == 10) {
				eventMaaned = "okt";
			}
			if (eventMaaned == 11) {
				eventMaaned = "nov";
			}
			if (eventMaaned == 12) {
				eventMaaned = "dec";
			}

			// test
			console.log("EventMaaned: " + eventMaaned);

			//	udtræk dag og fjern evt. 0 i start af streng
			let eventDag = str.substring(6, 8).replace(/^0+/, '');

			console.log("EventDag: " + eventDag);

			// brug omformet dag og måned
			klon.querySelector("[data-dato]").textContent = eventDag;
			klon.querySelector("[data-maaned]").textContent = eventMaaned;

			klon.querySelector("[data-billede]").setAttribute("src", event.acf.billede);
			klon.querySelector("[data-billede]").setAttribute("alt", "Eventbillede for: " + event.title.rendered);
			klon.querySelector("[data-title]").textContent = event.title.rendered;
			klon.querySelector("[data-sted]").textContent = event.acf.sted;

			console.log("id: " + event.id);
			klon.querySelector(".event-wrapper").addEventListener("click", () => {
				window.location.href = "events.html?id=" + event.id;
				//				window.location.href = "events.html?id=" + event.id + "&preload=" + ("src", event.acf.billede);
			});

			//	    tilføj html DOM
			eventContainer.appendChild(klon);
			console.log("loop er kørt");
		});
	}


	//	hent jsonPage til forsidehentning

	async function hentJsonSide() {
		console.log("hentJsonSide");

		//	Hent wordpress content fra flere custom post types
		let jsonData = await fetch("http://erik-crg.dk/kea/07-cms/huset-kbh/wordpress/wp-json/wp/v2/sider");

		sider = await jsonData.json();

		//	test json-import
		console.log(sider);

		visSider();
	}


	//	Event-loop
	function visSider() {

		//	Kør loop med json-data
		sider.forEach(side => {
			let dest = document.querySelector("[side-container]");

			//hvis id navn matcher, så kør loop
			if (side.id == 173) {
				dest.querySelector("[data-content]").innerHTML = side.content.rendered;
			}
		})
	}

	//Tilmelding - nyhedsbrev

	let modal = document.querySelector("#modal");
	let tilmeld = document.querySelector("#tilmeld");
	let close = document.querySelector("#close");

	//kode til at svar teksten bliver vist
	let svartekst = "";
	document.querySelector("form").addEventListener("submit", ajaxCall);

	//kode
	async function ajaxCall(e) {
		e.preventDefault();
		let navn = this.querySelector("input[name=navn]").value;
		let email = this.querySelector("input[name=email]").value;
		let url = "form_nyhedsbrev.php?navn=" + navn + "&email=" + email;
		let svar = await fetch(url);
		svartekst = await svar.text();
		show();
		this.querySelector("input[name=navn]").value = "";
		this.querySelector("input[name=email]").value = "";
	}

	function show(response) {
		document.querySelector("#response").textContent = svartekst;
	}

	tilmeld.addEventListener("click", visModal);

	function visModal() {

		//ved klik på tilmeldingsboxen vises modal vindu med indhold.
		modal.classList.add("vis");

		//ved klik på close button fjernes modal vinduet med indholdet.
		close.addEventListener("click", skjulModal);

	}

	function skjulModal() {
		//css med modal vis bliver skjult igen
		modal.classList.remove("vis");
	}
