const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


function viewCat(event) {
    console.log(event.target.parentNode.id);
    localStorage.setItem("catsToView", event.target.parentNode.id);
    window.location = "viewCat.html"
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
  }


function search() {
    let toSearch = (document.getElementById("input").value).toLowerCase();
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (var i = 0; i < promises.length; i++) {

        // for (var j = 0; j < promises[i].Catagory.length; j++) {
        //     let category = (promises[i].Catagory).toLowerCase();

        //     if (toSearch[0] == category[j]) {
        //         for (var l = 1; l <= toSearch.length; l++) {
        //             if (toSearch == category.slice(j, l)) {
        //                 list.innerHTML += `<option value="${category}" id="${promises[i].adId}">${category}</option>`
        //                 break;
        //             }
        //         }
        //     }
        // }

        for (var k = 0; k < promises[i].Title.length; k++) {
            let title = (promises[i].Title).toLowerCase();
            if (toSearch[0] == title[k]) {
                for (var m = 1; m <= title.length; m++) {
                    if (toSearch == title.slice(k, m)) {
                        list.innerHTML += `<option value="${title}" title="${promises[i].Catagory}" id="${promises[i].adId}">${title}</option>`
                        break;
                    }
                }
            }

        }



    }


    // for (var k = 0; k < promises[i].Title.length; k++) {
    //     let title = (promises[i].Title).toLowerCase();

    //     if (toSearch == title.slice(0, k)) {

    //         list.innerHTML += `
    //         <option value="${title}" onclick="viewAdBySearch(event) id="${promises[i].adId}">${title}</option>
    //         `
    //         break;
    //     }

    // }





}



function viewAdBySearch(event){
    event.preventDefault();

    let search = document.getElementById("input").value;

    let datalist = document.getElementById("list");
    
    let addToView;
    let catsToView ;

    for(let i = 0; i < datalist.childNodes.length; i++){
        if(search == datalist.childNodes[i].value){
            addToView = datalist.childNodes[i].id;
           
            catsToView = datalist.childNodes[i].title;
            break;
        }
    }

    localStorage.setItem("adToView",addToView);
    localStorage.setItem("catsToView",catsToView);
    console.log(addToView, catsToView)
    window.location = "viewAd.html"

}

let searches = ["Property For Sell", "Property For Rent", "Cars", "Bikes", "Electronics", "Mobiles", "Jobs", "Services", "Business", "Furniture", "Animals", "Books", "Fashion", "Kids"];


let promises = [];
searches.forEach(Element => {
    let index = 0;
    firestore.collection(Element)
        .get().then(snapshot => {
            if (snapshot.empty == false) {
                snapshot.forEach((doc) => {
                    let data = doc.data();
                    data.adId = snapshot.docs[index].id;
                    index++;
                    promises.push(data)
                    console.log(data)
                })
            }
        })
    index = 0;
})


function toDashboard() {
    window.location = "dashboard.html"
}