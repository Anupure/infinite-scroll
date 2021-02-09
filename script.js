const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash api

let count = 5;
const apiKey = 'y7ykDY9X0UoTuZTkpDGGfWOHfjB7qedWBTYwjx7Ai0k';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes ) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos and add to dom
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> to ink to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event listener, check when each loading is finished
        img.addEventListener('load', imageLoaded)
        // put <img> inside the <a> tag, then both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash api

async function getPhotos() {
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}

// Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -2000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
})

// on Load
getPhotos()