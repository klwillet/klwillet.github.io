// parse JSON content into a JavaScript object
const photos = JSON.parse(content);

// loop through each photo object and call outputCard()
for (let i = 0; i < photos.length; i++) {
    outputCard(photos[i]);
}

// generate HTML for one photo card
function outputCard(photo) {
    document.write('<article>');
    document.write(`<img src="images/${photo.filename}" alt="${photo.title}">`);
    document.write('<div class="caption">');
    document.write(`<h2>${photo.title}</h2>`);
    document.write(`<p>${photo.location.city}, ${photo.location.country}</p>`);
    document.write('<h3>Colors</h3>');
    outputColors(photo.colors);
    document.write('</div>');
    document.write('</article>');
}

// loop through colors and writes span tags
function outputColors(colors) {
    for (let i = 0; i < colors.length; i++) {
        document.write(constructColor(colors[i]));
    }
}

// return a span string with style
function constructColor(color) {
    const style = constructStyle(color);
    return `<span style="${style}">${color.name}</span>`;
}

// return inline CSS string
function constructStyle(color) {
    let style = `background-color: ${color.hex};`;
    if (color.luminance < 70) {
        style += ' color: white;';
    }
    return style;
}

