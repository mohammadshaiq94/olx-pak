const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}


let adToView = localStorage.getItem('adToView');
let catsToView = localStorage.getItem("catsToView");
console.log(adToView, catsToView)

let data;


firestore.collection(catsToView).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();


        let image = document.getElementById("image");
        image.innerHTML = data.imgs;

        let Title = document.getElementById("Title");
        Title.innerHTML = data.Title;

        let city = document.getElementById("city");
        city.innerHTML = data.Phone;

       

        let price = document.getElementById("price");
        price.innerHTML = `Rs.${data.price}`





        let description = document.getElementById("dis");
        description.innerHTML = data.Description;
    })


// let currentSlide = 0;
// let slider = document.getElementById("imgs");


// function next() {
//     if (currentSlide == (data.imgs.length)) {

//     } else {
//         slider.style.backgroundImage = `url(${data.imgs[currentSlide + 1]})`;
//         currentSlide++;
//     }
// }

// function back() {

//     if (currentSlide <= 0) {

//     } else {
//         slider.style.backgroundImage = `url(${data.imgs[currentSlide - 1]})`
//         currentSlide--
//     }

// }









function chat() {
    window.location = "chatt.html";
}



