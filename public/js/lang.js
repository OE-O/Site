function openLang() {
    var menu = document.getElementById("dropdown");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function switchLang(code) {
    switch (code) {
        case 'en':
            document.cookie = "firebase-language-override=en";
            document.location.reload()
            break;
        case 'fi':
            document.cookie = "firebase-language-override=fi";
            document.location.reload()
            break;
    }
}