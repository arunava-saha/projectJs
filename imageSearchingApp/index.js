const apikey = "J9YZFwHzjnvLIIOIUr7e4EUDv0Y30XUG-HM3Li8McFI";

let formEl = document.querySelector('form');
let search = document.querySelector('#search');
let result = document.querySelector('.result');
let showMore = document.querySelector('#show-more');
let input = "";

let page = 1;
async function searchImages() {
    input = search.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${apikey}`;
    const res = await fetch(url);

    const data = await res.json();

    if (page === 1) {
        result.innerHTML = "";
    }

    const Images = data.results;

    Images.map((image) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("cell");
        const imgEl = document.createElement("img");
        imgEl.src = image.urls.small;
        imgEl.alt = image.alt_description;
        const linkEl = document.createElement("a");
        linkEl.href = image.links.html;
        linkEl.target = "_blank";
        linkEl.textContent = image.alt_description;

        imageWrapper.appendChild(imgEl);
        imageWrapper.appendChild(linkEl);
        result.appendChild(imageWrapper);
    })
    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})