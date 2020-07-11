/** InstantClick Framework */
! function () {
    var t, n;

    function i() {
        t.className = "visible"
    }

    function e() {
        instantclick.clearTimeout(n), t.className = ""
    }
    instantclick.on("change", function (n) {
        instantclick.supported && (n && function () {
            (t = document.createElement("div")).id = "instantclick";
            var n = "";
            if (!("transform" in t.style))
                for (var i in {
                        Webkit: !0,
                        Moz: !0
                    }) i + "Transform" in t.style && (n = "-" + i.toLowerCase() + "-");
            var e = document.createElement("style");
            e.setAttribute("instantclick-loading-indicator", ""), e.textContent = "#instantclick {pointer-events:none; z-index:2147483647; position:fixed; top:0; left:0; width:100%; height:3px; border-radius:2px; color:hsl(192,100%,50%); background:currentColor; box-shadow: 0 -1px 8px; opacity: 0;}#instantclick.visible {opacity:1; " + n + "animation:instantclick .6s linear infinite;}@" + n + "keyframes instantclick {0%,5% {" + n + "transform:translateX(-100%);} 45%,55% {" + n + "transform:translateX(0%);} 95%,100% {" + n + "transform:translateX(100%);}}", document.head.appendChild(e)
        }(), document.body.appendChild(t), n || e())
    }), instantclick.on("restore", function () {
        document.body.appendChild(t), e()
    }), instantclick.on("wait", function () {
        n = instantclick.setTimeout(i, 800)
    }), instantclick.on("exit", e), instantclick.loadingIndicator = {
        show: i,
        hide: e
    }
}();