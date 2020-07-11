function c() {
    if(window.outerWidth <= 604 || window.outerHeight <= 656) {
        document.getElementById('noMobileNav').style = "display: none;";
        return;
    } else {
        document.getElementById('noMobileNav').style = "margin-left: -10px";
    }
}