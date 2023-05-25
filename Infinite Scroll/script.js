const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");


let ready =false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []


// API url
const count = 30
const apiKey = 'NupP-HUzhD_bBY0KdSHZSZQ9GdKSzDR-Git_0w_42qw'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded(){
    console.log('image loaded')
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden = true
        console.log("ready=",ready)
    }
}

// display photos

function displayPhotos(photosArray){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total images=",totalImages)
    photosArray.forEach((photo)=>{
        // create a to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:"_blank"
        });
        // create <img> for photo
        const img = document.createElement("img");
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        
        item.appendChild(img)
        img.addEventListener('load',imageLoaded);
        imageContainer.appendChild(item)
        

    });
}

// get photos from unsplash

async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        const photosArray = await response.json();
        console.log(photosArray)
        displayPhotos(photosArray);
    }catch(error){
        console.log(error)
    }
}
// on load

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos()
    }
})

getPhotos() 
console.log(photosArray)