const {
    get
} = require("request");

function getUrlParams() {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    return urlParams;
}

async function createAccount() {
    var e1 = document.getElementById('e1');
    var e2 = document.getElementById('e2');
    var un1 = document.getElementById('un1');
    var p1 = document.getElementById('p1');
    var p2 = document.getElementById('p2');
    if (e1.value !== e2.value || !un1.value || p1.value !== p2.value) {
        var arrayOfUnmatched = []
        if (e1.value !== e2.value) arrayOfUnmatched.push("email");
        if (!un1.value) arrayOfUnmatched.push("username");
        if (p1.value !== p2.value) arrayOfUnmatched.push("password");
        document.getElementById('signUpRep').innerHTML = `Your ${arrayOfUnmatched.join(" and ")} doesn't match and or is empty!`;
        return;
    }
    var response = grecaptcha.getResponse();
    if (!response != '0') {
        document.getElementById('signUpRep').innerHTML = `Please complete the captcha.`;
        return;
    }
    document.getElementById('signUpRep').innerHTML = ``;
    var encryption;
    await fetch('http://localhost:8080/encrypt?stringR=' + p1.value)
        .then(async response => {
            return await response.json()
        }).then(data => {
            encryption = data;
        })
    var token;
    await fetch('http://localhost:8080/tokens/get', {
            method: 'GET',
            headers: {
                "authorization": "OE0O97255"
            }
        })
        .then(async response => {
            return await response.json()
        }).then(data => token = data);

    const rawResponse = await fetch('http://localhost:8080/accounts/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: un1.value,
            password: {
                iv: encryption.encryptedObj.iv,
                hex: encryption.encryptedObj.hex
            },
            email: e1.value,
            access_token: token.response.token
        })

    }).catch(e => console.error(e));
    const content = await rawResponse.json();
    if (content.status === 500) {
        document.getElementById('signUpRep').innerHTML = content.message;
        return;
    }
    if (getUrlParams().get("ref") === 1) {
        const discordCode = await fetch('https://api.oe-o.tk/discord/doneCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token: token.response.token,
                id: getUrlParams().get("id")
            })
        }).catch(e => console.error(e));
        const content = await discordCode.json();
        if (content.status !== 200) return console.error(content.error);
    }

    await fetch('https://api.oe-o.tk/tokens/delete', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token.response.token
        })
    });
}