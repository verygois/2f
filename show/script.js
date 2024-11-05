'use strict'

async function showJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    creaateSHOW(index);
};

function creaateSHOW(obj) {
    document.title = obj.title;
    const ogtitle = document.querySelector('meta[property="og:title"]');
    ogtitle.content = document.title;
    const h1 = document.querySelector('#title');
    h1.innerHTML = document.title;

    const description = document.querySelector('meta[name="description"]');
    const ogdescription = document.querySelector('meta[property="og:description"]');
    description.content = obj.description;
    ogdescription.content = obj.description;

    const subtitle = document.querySelector('#subtitle');
    subtitle.textContent = obj.subtitle;

    const date = document.querySelector('#date');
    date.textContent = obj.date.from;
    date.setAttribute("data-time", obj.date.datetime);
    date.addEventListener('click', function (event) {
        let ago = new Date(event.target.dataset.time);
        let diff = new Date().getTime() - ago.getTime();

        if (date.textContent == obj.date.from) {
            let progress = new Date(diff);

            if (progress.getUTCFullYear() - 1970) {
                event.target.textContent = progress.getUTCFullYear() - 1970 + '年前';
            } else if (progress.getUTCMonth()) {
                event.target.textContent = progress.getUTCMonth() + 'ヶ月前';
            } else if (progress.getUTCDate() - 1) {
                event.target.textContent = progress.getUTCDate() - 1 + '日前';
            } else if (progress.getUTCHours()) {
                event.target.textContent = progress.getUTCHours() + '時間前';
            } else if (progress.getUTCMinutes()) {
                event.target.textContent = progress.getUTCMinutes() + '分前';
            } else {
                event.target.textContent = 'たった今';
            };
        } else {
            date.textContent = obj.date.from;
        };
    }, false);

    document.querySelector('#door').textContent = obj.door;

    const members = document.querySelector('#members');
    if (obj.members) {
        members.textContent = obj.members;
    } else {
        members.remove();
    };

    const info = document.querySelector('#info');
    for (const infoEach of obj.info) {
        info.innerHTML += infoEach;
    };

    if (obj.youtube) {
        window.addEventListener("load", () => {
            player.loadVideoById({ videoId: obj.youtube });
        })
    } else {
        document.querySelector('#player').remove();
    }

    const aside = document.querySelector('#aside');
    if (obj.aside) {
        for (const asideEach of obj.aside) {
            aside.innerHTML += asideEach;
        };
    } else {
        aside.remove();
    };
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#url').textContent = location.hostname + location.pathname;
    document.querySelector('#back').addEventListener('click', function () {
        history.back(-1); return false;
    });
});