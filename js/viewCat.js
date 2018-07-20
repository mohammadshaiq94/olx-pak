const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


console.log(firestore)


const cat = localStorage.getItem("catsToView");
let outcome = document.getElementById("output");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
  }




outcome.innerHTML = "";

firestore.collection(cat).get()
    .then(function (doc) {
        let indexNo = 0;
        doc.forEach(selectFile => {
            console.log(doc.docs)
            console.log(selectFile.data());
            localStorage.setItem("adderId",selectFile.data().adderId)
            let data = selectFile.data()
            outcome.innerHTML += 
            
            `
            <div class="container result mt-2 d-flex flex-row" id="${doc.docs[indexNo].id}" onclick="viewAd(event)">
            <div class="adImg d-flex">
                <img src="${data.imgs}" class="w-80 align-self-center m-auto">
            </div>
            <div class="ml-4 justify-content-md-start justify-content-sm-center w-100">
                <h5 id="title" class="mb-0">${data.Title}</h5>
                <p class="text-muted mb-0">${data.Catagory}</p>
                <h5 class= "float-left price" >Rs.${data.price}</h5>
            </div>
            </div>
            ` 


            indexNo++;
        });
    })

    



    function viewAd(event){
        let target = event.target.parentNode.parentNode;
        localStorage.setItem("adToView",target.id);
        window.location = "viewAd.html"
    }