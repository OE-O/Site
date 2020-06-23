window.onload = async function () {
    $.get("https://api.oe-o.tk/accounts/count",
        function (data, textStatus, jqXHR) {
            console.log(data);
            if(data.count < 10) {return document.getElementById('registered-users').innerText = "00" + data.count;}
            if(data.count >= 10 && data.count < 100) {return document.getElementById('registered-users').innerText = "0" + data.count;}

        },
    );
}

function easterEgg() {
    var x = document.getElementById("AudioEasterEgg");
    x.play();
}