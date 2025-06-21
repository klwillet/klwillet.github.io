document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(content);

    const paintingList = document.querySelector("#paintings ul");
    const figure = document.querySelector("figure");
    const fullImage = document.querySelector("#full");
    const title = document.querySelector("#title");
    const artist = document.querySelector("#artist");
    const descriptionBox = document.querySelector("#description");

    // populate thumbnail list
    data.forEach(painting => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = `images/small/${painting.id}.jpg`;
        img.alt = painting.title;
        img.dataset.id = painting.id;
        li.appendChild(img);
        paintingList.appendChild(li);
    });

    // event delegation for clicks
    paintingList.addEventListener("click", (e) => {
        const clicked = e.target;
        if (clicked.tagName !== "IMG") return;

        const id = clicked.dataset.id;
        const painting = data.find(p => p.id === id);
        if (!painting) return;

        // clear previous display
        figure.innerHTML = "";

        // add new full-size image
        const img = document.createElement("img");
        img.id = "full";
        img.src = `images/large/${painting.id}.jpg`;
        img.alt = painting.title;
        figure.appendChild(img);

        // add title and artist
        title.textContent = painting.title;
        artist.textContent = painting.artist;

        // add feature rectangles
        painting.features.forEach(feature => {
            const box = document.createElement("div");
            box.className = "box";

            const [x1, y1] = feature.upperLeft;
            const [x2, y2] = feature.lowerRight;

            box.style.position = "absolute";
            box.style.left = `${x1}px`;
            box.style.top = `${y1}px`;
            box.style.width = `${x2 - x1}px`;
            box.style.height = `${y2 - y1}px`;

            // hover events to show description
            box.addEventListener("mouseover", () => {
                descriptionBox.textContent = feature.description;
            });
            box.addEventListener("mouseout", () => {
                descriptionBox.textContent = "";
            });

            figure.appendChild(box);
        });
    });
});
