// dodaj 'loading="lazy"' na sve 'img' tagove
const imgTags = document.querySelectorAll('img');
imgTags.forEach(img => {
    img.setAttribute('loading', 'lazy');
});