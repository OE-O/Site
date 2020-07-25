
window.onload = () => {
    var mod = window.location.pathname.replace("/mods/", "");
    console.log("Loaded mod: " + mod);
    $.get( "/api/mods/" + mod, function(data) {
        console.log("Gotten Data for mod: ", data);
        if(data.official) {
            document.getElementById("official").innerHTML = "Official OE-O Mod";
        } else {
            document.getElementById("official").style = "display: none;"
        }
        document.getElementById("pageTitle").content = data.name;
        document.getElementById("pageImg").content = `https://oe-o.tk/i/${data.id}`;
        document.getElementById("pageURL").content = `https://oe-o.tk/mods/${data.id}`;
        document.getElementById("pageShort").content = data.shortDesc;
        document.getElementById("modname").innerHTML = data.name;
        document.getElementById("modtitle").innerHTML = data.name;
        document.getElementById("shortdesc").innerHTML = data.shortDesc;
        document.getElementById("description").innerHTML = data.longDesc;
        document.getElementById("game").innerHTML = data.game;
        var d = Date.now();
        document.getElementById("previewImg").innerHTML = `<img src="/i/${data.id}?`+d.toString() + `" style="margin-top: 1rem; margin-bottom: 1rem; color: white; border: 2px solid #AD91FF; border-radius: 5px" alt="We couldn't load this image, sorry..." width="${window.screen.width / 3}" height="auto">`;
        console.log(document.getElementById("previewImg").src)
        if(data.comingSoon) {
            document.getElementById("openInSteam").style = "color: white;";
            document.getElementById("openInSteam")
            document.getElementById("openInSteam").innerHTML = "Coming Soon";
            return;
        }
        if(!data.allowSiteDownload) {
            document.getElementById("downloadAsZip").style = "display: none;";
        }
        if(!data.steam.hasSteam) {
            document.getElementById("openInSteam").style = "display: none;";
        }
        
        document.getElementById("downloadAsZip").href = `/d/${data.id}-latest`;
        document.getElementById("openInSteam").href = `steam://openurl/${data.steam.url}`
    });
}