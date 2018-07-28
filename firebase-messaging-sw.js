importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase.js');

var config = {
   
        apiKey: "AIzaSyDFLrkycQpWBi05v2RUOTlPpacNQvLT4cc",
        authDomain: "olx-pak-fe511.firebaseapp.com",
        databaseURL: "https://olx-pak-fe511.firebaseio.com",
        projectId: "olx-pak-fe511",
        storageBucket: "olx-pak-fe511.appspot.com",
        messagingSenderId: "791616641732"
    };
firebase.initializeApp(config);

const messaging = firebase.messaging();