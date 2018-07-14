const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);



let adToView = localStorage.getItem('adToView');
let catsToView = localStorage.getItem("catsToView");
console.log(adToView,catsToView)

firestore.collection(catsToView).doc(adToView)
    .get().then(doc => {
        console.log(doc.data())
    })