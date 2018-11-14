		//		hent og gem variabel fra URL
		let urlParams = new URLSearchParams(window.location.search);
		let id = urlParams.get("id");
		let kategoriFilter = urlParams.get("kategoriFilter");
		console.log("id er: " + id);

		//	globale variabeler
		let etager = [];
		let dest = document.querySelector("[data-container]");

		//	dokument DOM loadet
		document.addEventListener("DOMContentLoaded", hentJson);

		//	hent json
		async function hentJson() {
			console.log("hentJson");

			//	Hent wordpress content fra flere custom post types (multiple-post-type plugin endpoint)
			let jsonData = await fetch("http://erik-crg.dk/kea/07-cms/huset-kbh/wordpress/wp-json/wp/v2/husets_etager");

			etager = await jsonData.json();

			//	test json-import
			console.log(etager);

			visEtager();
		}

		//	Event-loop
		function visEtager() {

			//	Kør loop med json-data
			etager.forEach(etage => {
				let dest = document.querySelector("[data-container]");

				//hvis id navn matcher, så kør loop
				if (etage.id == id) {

					dest.querySelector("[data-splash_image]").setAttribute("src", etage.acf.splash_image.sizes.large);

					//	Link fra billede
					dest.querySelector("[data-splash_image]").addEventListener("click", () => {
						window.location.href = "etager.html?id=" + etage.id;
					});

					console.log(etage.acf.splash_image);
					dest.querySelector("[data-title]").textContent = etage.title.rendered;
					dest.querySelector("[data-content]").innerHTML = etage.content.rendered;
				}
			})
		}
