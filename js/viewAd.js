const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
  }


let adToView = localStorage.getItem('adToView');
let catsToView = localStorage.getItem("catsToView");
console.log(adToView, catsToView)

let data;

firestore.collection(catsToView).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();
        localStorage.setItem("adAdderId",snapshot.data().adAdderId)
    })




function chat(){
    window.location = "chat.html";
}



