'use strict'

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#url').textContent = location.hostname + location.pathname;
    document.querySelector('#back').addEventListener('click', function () {
        history.back(-1); return false;
    });
});