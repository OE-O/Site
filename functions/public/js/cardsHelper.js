function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
window.onload = () => {
    fetch('/api/mods/').then(response => response.json()).then(data => {
        data = shuffle(data).slice(0, 4);
        let amnShown = 0;
        data.forEach(rand => {
            if(!rand.info.official) return;
            if(amnShown >= 3) return;
            amnShown++
            document.getElementById("randomMods").innerHTML += `<div class="card"><div class="card-body"><h5 class="card-title">${rand.info.name}</h5><p class="card-text"><small>${rand.info.game}</small></p><p class="card-text">${rand.info.shortDesc}</p><br><a class="btn btn-secondary btn-lg" href="/mods/${rand.info.id}" role="button">View</a></div></div>`
        });
    });
}