const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);



const cat = localStorage.getItem("catsToView");



firestore.collection(cat).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.data())
        })
    })