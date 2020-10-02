function scrollFunction() {
    var main = document.getElementById("main");
    var topbutton = document.getElementById("topBtn");

    if (main.scrollTop > 20) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

function topFunction() {
    var main = document.getElementById("main");

    main.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}