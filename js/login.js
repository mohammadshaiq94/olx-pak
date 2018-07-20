var config = {
    apiKey: "AIzaSyDFLrkycQpWBi05v2RUOTlPpacNQvLT4cc",
    authDomain: "olx-pak-fe511.firebaseapp.com",
    databaseURL: "https://olx-pak-fe511.firebaseio.com",
    projectId: "olx-pak-fe511",
    storageBucket: "olx-pak-fe511.appspot.com",
    messagingSenderId: "791616641732"
  };
  firebase.initializeApp(config);

const firestore = firebase.firestore();



function LoginUser(event){
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let passsord = document.getElementById("password").value;

    
    firebase.auth().signInWithEmailAndPassword(email,passsord)
    .then(function(res){
        localStorage.setItem('user_id', res.user.uid);
		console.log("Log In Successfully");
            // btn.innerHTML = "login"
            window.location = "dashboard.html";
        }).catch(function(err){
            console.log(err.message)
        })

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                     .register('./service-worker.js')
                   .then(function() { console.log('Service Worker Registered'); });
          }
}



