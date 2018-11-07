	//	global var
	let events = [];
	let eventNumber;
	let eventTemplate = document.querySelector("[data-template]");
	let eventContainer = document.querySelector("[data-container]");

	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJson);


	//	hent json
	async function hentJson() {
		console.log("hentJson");

		//	Hent wordpress content fra flere custom post types (multiple-post-type plugin endpoint)
		let jsonData = await fetch("http://erik-crg.dk/kea/07-cms/huset-kbh/wordpress/wp-json/wp/v2/multiple-post-type?&type[]=musikevents&type[]=filmevents&type[]=ordevent");

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

			//	omform måned-nr til fx JAN
			let eventMaaned = str.substring(4, 6);
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
				window.location.href = "events.html?id=event_" + event.id;
			});

			//	    tilføj html DOM
			eventContainer.appendChild(klon);
			console.log("loop er kørt");
		});
	}