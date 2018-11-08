	//	globale variabeler
	let etager = [];
	let etageTemplate = document.querySelector("[data-template]");
	let etageContainer = document.querySelector("[data-container]");

	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJson);

	//	hent json
	async function hentJson() {
		console.log("hentJson");

		//	Hent wordpress content fra flere custom post types (multiple-post-type plugin endpoint)
		let jsonData = await fetch("http://erik-crg.dk/kea/07-cms/huset-kbh/wordpress/wp-json/wp/v2/husets_etager");

		etager = await jsonData.json();

		//	sortér alfabetisk efter titel
		etager.sort(function (a, b) {
			return a.title.rendered.localeCompare(b.title.rendered);
		});

		//	test json-import
		console.log(etager);

		visEtager();
	}

	//	Event-loop
	function visEtager() {

		//	Kør loop med json-data
		etager.forEach(etage => {
			console.log(etage);

			//	Klon? ja tak
			let klon = etageTemplate.cloneNode(true).content;

			klon.querySelector("[data-splash_image]").setAttribute("src", etage.acf.splash_image.sizes.medium_large);
			klon.querySelector("[data-link]").addEventListener("click", () => {

				//	Link fra billede
				window.location.href = "etager.html?id=" + etage.id;
			});
			console.log(etage.acf.splash_image);
			klon.querySelector("[data-title]").textContent = etage.title.rendered;
			klon.querySelector("[data-beskrivelse]").textContent = etage.acf.kort_beskrivelse;

			//	Link fra knap
			klon.querySelector("[data-link]").addEventListener("click", () => {
				window.location.href = "etager.html?id=" + etage.id;
			});

			// tilføj html DOM
			etageContainer.appendChild(klon);
			console.log("loop er kørt");
		});
	}
