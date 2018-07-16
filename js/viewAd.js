const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);



let adToView = localStorage.getItem('adToView');
let catsToView = localStorage.getItem("catsToView");
console.log(adToView,catsToView)

let data;

firestore.collection(catsToView).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();
    })


let currentSlide = 0;
let slider = document.getElementById("slider");

function next() {
    if (currentSlide == (data.imgs.length - 1)) {

    } else {
        slider.backgroundImage = `url(${data.imgs[currentSlide]})`;
        currentSlide++;
    }
}

function back() {
    if(currentSlide == 0){

    }else{
        slider.backgroundImage = `url(${data.imgs[currentSlide]})`
        currentSlide--
    }

}






