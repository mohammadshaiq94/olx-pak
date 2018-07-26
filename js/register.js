
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFLrkycQpWBi05v2RUOTlPpacNQvLT4cc",
    authDomain: "olx-pak-fe511.firebaseapp.com",
    databaseURL: "https://olx-pak-fe511.firebaseio.com",
    projectId: "olx-pak-fe511",
    storageBucket: "olx-pak-fe511.appspot.com",
    messagingSenderId: "791616641732"
  };
  firebase.initializeApp(config);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
  }

  var db = firebase.firestore();

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
   

    let info = {
        name,
        email,
        password
    }

    console.log(info);


    

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (res) {
        //localStorage.setItem("user", res.user.uid);
            alert('registered succesfully"')

            db.collection('users').doc(res.user.uid).set({name, email , uid : firebase.auth().currentUser.uid})
        .then(() => {
            console.log('Added in db');
        })
    })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message)
        });
}