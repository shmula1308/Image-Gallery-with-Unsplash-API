const imagesContainer = document.querySelector('.container');
const modGallery = document.querySelector('.modal-gallery');
const modImage = document.querySelector('.modal-img img');
const arrows = document.querySelectorAll('.modal-arrows');
const closeBtn = document.querySelector('.closeBtn')
let images = [];
let allImages = [];
let index = 0;
document.addEventListener('DOMContentLoaded', init);


function init() {
    const uri = 'https://api.unsplash.com/photos/?client_id=mN6ulV9jO_YDW9WnCBLxxVzTAVnBqRUFYNoe4Hypu98'
    const req = new Request(uri,{
        method: 'GET',
        mode: 'cors'
    })
    fetch(req)
        .then((response) =>{
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("BAD HTTP")
            }
        })
        .then(displayImages)
        .catch(err => console.log('ERROR:', err.message))
}

function displayImages(data) {
    let df = new DocumentFragment();
    images = data.slice(0,5);
    allImages = data;

    // Create images
    images.forEach((image,idx) => {
        let div = document.createElement('div');
        div.classList.add('img' + Number(idx+1));
        let img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        img.setAttribute("data-index",idx);
        div.append(img)
        df.append(div)
    })
    imagesContainer.append(df);
    
    //calculate remianing number of images in the gallery
    let div = document.createElement('div');
    div.classList.add('number');
    let totalNumber = data.length - 5;
    div.textContent = "+" + totalNumber;
    imagesContainer.lastElementChild.append(div);

    let displayedImgs = imagesContainer.querySelectorAll('img');
    displayedImgs.forEach(image => {
        image.addEventListener('click', modalGallery)
    }) 
}


function modalGallery(ev) {
   imagesContainer.style.display = 'none';
   modGallery.style.display = "block";
   modImage.src = ev.target.src;
   index = ev.target.getAttribute('data-index');
   arrowsDisplay(index);
   console.log(index)
   if(index === '0') {
    document.getElementById('left').style.display = "none"
   }
   
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', changeImage);
})

function changeImage(ev) {
    if(ev.target.id === 'right') {
        index++;
        arrowsDisplay(index);
        let src = allImages[index].urls.regular;
        modImage.src = src;
    } else {
        index--;
        arrowsDisplay(index);
        let src = allImages[index].urls.regular;
        modImage.src = src;
    }  
}

function arrowsDisplay(idx) {
    console.log(idx)
    if(idx === 0) {
        document.getElementById('left').style.display = 'none';
        index = 0;
        return;
    } else {
        document.getElementById('left').style.display = 'block';
    }
    if(idx === allImages.length - 1) {
        index = allImages.length - 1;
        document.getElementById('right').style.display = 'none';
    }else {
        document.getElementById('right').style.display = 'block';
    }
}


closeBtn.addEventListener('click', () => {
    modGallery.style.display = 'none';
    imagesContainer.style.display = 'grid';
    
} )





   