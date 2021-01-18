const imagesContainer = document.querySelector('.container')
let images = [];

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

    // Create images
    images.forEach((image,idx) => {
        let div = document.createElement('div');
        div.classList.add('img' + Number(idx+1));
        let img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description
        div.append(img)
        df.append(div)
    })
    imagesContainer.append(df);
    
    //calculate remianing number of images in gallery
    let div = document.createElement('div');
    div.classList.add('number');
    let totalNumber = data.length - 5;
    div.textContent = "+" + totalNumber;
    imagesContainer.lastElementChild.append(div);

    let img = imagesContainer.querySelectorAll('img');
    
}






   