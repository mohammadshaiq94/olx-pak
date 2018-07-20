const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

var storageRef = firebase.storage().ref();


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () { console.log('Service Worker Registered'); });
}


let currentUser

firebase.auth().onAuthStateChanged((user) => {
  if (user) { currentuser = user.id }
  else { console.log("not user") }
})



function sumbitAnAdd(event) {

  event.preventDefault();

  var Title = document.getElementById("Title").value
  var Catagory = document.getElementById("Catagory").value
  var price = document.getElementById("price").value
  var Description = document.getElementById("Description").value
  var Name = document.getElementById("Name").value
  var Phone = document.getElementById("Phone").value
  var selectFile = document.getElementById("selectFile").files
  var adAdderId = document.getElementById("City").value

  let promises = uploadPics(selectFile);

  let urls = [];




  Promise.all(promises).then(function (res) {

    console.log(res)

    var formvalues = {
      Title: Title,
      Catagory: Catagory,
      Description: Description,
      price: price,
      Name: Name,
      Phone: Phone,
      imgs: res,
      createAt: (new Date()).toString(),
      adAdderId: localStorage.getItem("user_id")

    }
    console.log(formvalues)






    var u_id = localStorage.getItem('user_id');
    db.collection(Catagory).add(formvalues)
      .then(() => {
        console.log('Added in db');
      }).catch(function (error) {
        var errorcode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      })


  })



  function uploadPics(selectFile) {



    let promises = [];

    for (let i = 0; i < selectFile.length; i++) {

      promises.push(new Promise(function (resolve, reject) {
        let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
        imgRef.put(selectFile[i])
          .then(function (snapshot) {
            imgRef.getDownloadURL().then(function (url) {
              console.log(url);
              resolve(url);
            })
          })
      }))
    }
    return promises;
  }
}