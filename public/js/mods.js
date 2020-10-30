function* shuffle(array) {

	var i = array.length;

	while (i--) {
		yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
	}

}

function getMod(id) {

	var db = firebase.firestore()

	if (id == 'random') {
		var ranNums = shuffle(['002', '112', '324', '335', '420', '483', '644']);

		for (let repeat = 0; repeat < 3; repeat++) {
			id = ranNums.next().value;

			console.log(id)

			var mod = db.collection("mods").doc(id);

			mod.get().then((doc) => {
				if (doc.exists) {
					console.log("Mod data:", doc.data());

					modInfo = generateCard(doc);

					var cards = document.getElementById("randomMods");
					cards.insertAdjacentHTML('beforeend', modInfo);

				} else {
					console.log("No such mod!");
				}
			}).catch(function (error) {
				console.log("Error getting mod:", error);
			});

		}
	} else if (id == 'all') {
		db.collection("mods").get().then((mods) => {
			mods.forEach((doc) => {
				console.log(doc.id, "data:", doc.data());

				modInfo = generateCard(doc);

				var cards = document.getElementById("modList");
				cards.insertAdjacentHTML('beforeend', modInfo);
			});
		});
	} else {

		var path = document.defaultView.location.pathname.split('/');
		var id = path[2];

		console.log(id)

		var mod = db.collection("mods").doc(id);

		mod.get().then(function (doc) {
			if (doc.exists) {
				console.log("Mod data:", doc.data());

				modInfo = generatePage(doc);

				var cards = document.getElementById("modInfo");
				cards.insertAdjacentHTML('afterbegin', modInfo);
			} else {
				console.log("No such mod!");

				modError = generateError();

				document.getElementById("default-style").disabled = true;
				document.getElementById("404-style").disabled = false;

				var main = document.getElementById('modInfo');
				main.innerHTML = "";

				var page = document.getElementById("modInfo");
				page.insertAdjacentHTML('afterbegin', modError);
			}
		}).catch(function (error) {
			console.log("Error getting mod:", error);
		});
	}
}

function generateCard(mod) {
	var ModInfo = "";
	ModInfo += "<card id=\"modCard\">";
	ModInfo += "<div class=\"card-body\">";
	ModInfo += "<h5 class=\"card-title\" id=\"modName\">" + mod.data().name + "<\/h1>";
	ModInfo += "<p class=\"card-text\" id=\"game\"><small>" + mod.data().game + "<\/small><\/p>";
	ModInfo += "<p class=\"card-text\" id=\"shortDesc\">" + mod.data().shortDesc + "<\/p>";
	ModInfo += "<a class=\"btn-secondary\" href=\"\/mods\/" + mod.data().id + "\" role=\"button\">view<\/a>";
	ModInfo += "<\/div>";
	ModInfo += "<\/card>";

	return ModInfo;
}

function generatePage(mod) {
	var modInfo = "";
	modInfo += "<section class=\"top\">";
	modInfo += "<div class=\"top-content\">";
	modInfo += "<h1 class=\"title\" id=\"modName\"> " + mod.data().name + " <\/h1>";
	modInfo += "<p class=\"subtitle\" id=\"shortdesc\">" + mod.data().shortDesc + "<\/p>";
	if (mod.data().official == true) {
		modInfo += "<small id=\"official\"> Official OE-O Mod <\/small>";
	} else {
		modInfo += "<small id=\"unofficial\"> Unofficial Mod <\/small>";
	}
	modInfo += "<\/div>";
	modInfo += "<\/section>";
	modInfo += "<section class=\"mods\">";
	modInfo += "<card>";
	modInfo += "<div class=\"card-body\">";
	modInfo += "<h5 class=\"card-title\" id=\"modName\"> " + mod.data().name + " <\/h5>";
	modInfo += "<p class=\"card-text\" id=\"game\"><small> " + mod.data().game + " <\/small><\/p>";
	modInfo += "<p class=\"card-text\" id=\"longDesc\"> " + mod.data().longDesc + " <\/p>";
	modInfo += "<br>";
	if (mod.data().Download == true) {
		modInfo += "<a class=\"btn-primary\" href=\" " + mod.data().DownloadURL + " \" target=\"_blank\" role=\"button\" id=\"download\">Download<\/a>";
	} if (mod.data().Steam == true) {
		modInfo += "<a class=\"btn-secondary\" role=\"button\" href=\"steam:\/\/openurl\/ " + mod.data().SteamURL + " \" id=\"Steam\">Open in Steam<\/a>";
		modInfo += "<a class=\"btn-secondary\" role=\"button\" target=\"_blank\" href=\" " + mod.data().SteamURL + " \" id=\"SteamURL\">Workshop Page<\/a>";
	} if (mod.data().GitHub == true) {
		modInfo += "<a class=\"btn-secondary\" role=\"button\" target=\"_blank\" href=\" " + mod.data().GitHubURL + " \" id=\"GitHubURL\">view on GitHub<\/a>";
	}
	modInfo += "<\/div>";
	modInfo += "<\/card>";
	modInfo += "<\/section>";
	return modInfo
}

function generateError() {
	var modError = "";
	modError += "<section class=\"top\">";
	modError += "<div class=\"top-content\">";
	modError += "<h1 class=\"title\">Oh No...<\/h1>";
	modError += "<p class=\"subtitle\">It doesn't look like that mod exists!<\/p>";
	modError += "<a class=\"btn-primary\" href=\"\/mods\" id=\"back-button\" role=\"button\">Go Back<\/a>";
	modError += "<\/div>";
	modError += "<footer>";
	modError += "<img class=\"center\" src=\"..\/assets\/Logo.png\" width=\"150\">";
	modError += "<p class=\"copyright\">Copyright © OE-O Modding | 2020<\/p>";
	modError += "<\/footer>";
	modError += "<\/section>";
	return modError
}