'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    indexContents(index);
};

function indexContents(obj) {
    const org = [
        "all"
    ];

    for (const content of obj.contents) {
        if (content.org == "show") {
            createLi('#cover #contents')
        } else {
            // indexOf()による判断
            const index = org.indexOf(content.org);
            if (index < 0) {
                org.push(content.org);
            };
            createLi('#index ul')
        }

        function createLi(query) {
            const contents = document.querySelector(query);
            const contentsLi = document.createElement('li');
            contentsLi.classList.add(content.org);
            contents.appendChild(contentsLi);

            const a = document.createElement('a');
            contentsLi.appendChild(a);
            if (content.target && content.href) {
                a.setAttribute("target", content.target)
                a.href = content.href;
            } else {
                //
            }

            const date = document.createElement('u');
            date.textContent = content.date;
            a.appendChild(date);
            const name = document.createElement('strong');
            name.textContent = content.name;
            a.appendChild(name);
            const description = document.createElement('small');
            description.textContent = content.description;
            a.appendChild(description);

        }
    };

    for (const orgEach of org.sort()) {
        const nav = document.querySelector('#index nav');
        const input = document.createElement('input');
        input.setAttribute('name', 'org');
        input.setAttribute('type', 'radio');
        input.id = orgEach;
        input.value = orgEach;
        if (orgEach == "all") {
            input.checked = true;
        };

        const label = document.createElement('label');
        label.setAttribute('for', orgEach);

        if (orgEach == "all") {
            label.textContent = "View all";
        } else if (orgEach == "community") {
            label.textContent = "COMMUNITY EVENT";
        } else if (orgEach == "live") {
            label.textContent = "LIVE/PERFORMANCE";
        } else if (orgEach == "members") {
            label.textContent = "MEMBERS ONLY";
        } else if (orgEach == "residency") {
            label.textContent = "RESIDENCY";
        } else if (orgEach == "shop") {
            label.textContent = "POP UP SHOP";
        } else if (orgEach == "talk") {
            label.textContent = "TALK/DISCUSSION";
        } else if (orgEach == "workshop") {
            label.textContent = "WORKSHOP";
        }

        nav.appendChild(input);
        nav.appendChild(label);

        input.addEventListener('change', () => {
            let targets = document.querySelectorAll("#index ul li");
            for (let ii of targets) {
                ii.hidden = false;
                let item_data = ii.getAttribute('class');
                if (orgEach && orgEach !== 'all' && orgEach !== item_data) {
                    ii.hidden = true;
                };
            };
        }, false);
    };
};