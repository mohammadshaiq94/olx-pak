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



// firestore.collection(catsToView).doc(adToView).get()
//     .then(function (snapshot) {
//         console.log(snapshot.data());
//         data = snapshot.data();
        

//         let image = document.getElementById("img");
//         image.display = `url(${data.imgs})`

        
//         let Title = document.getElementById("Title");
//         Title.innerHTML = data.Title;

//         let Catagory = document.getElementById("Catagory");
//         Catagory.innerHTML = data.Catagory;

//         let price = document.getElementById("price");
//         price.innerHTML = `Rs.${data.price}`

//         let Description = document.getElementById("Description");
//         Description.innerHTML = data.Description;

        
    // })








function chat(){
    window.location = "chatt.html";
}



