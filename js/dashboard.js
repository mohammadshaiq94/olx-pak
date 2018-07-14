const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

var storageRef = firebase.storage().ref();






function sumbitAnAdd(event) {

  event.preventDefault();

  var Title = document.getElementById("Title").value
  var Catagory = document.getElementById("Catagory").value
  var price = document.getElementById("price").value
  var Description = document.getElementById("Description").value
  var Name = document.getElementById("Name").value
  var Phone = document.getElementById("Phone").value
  var selectFile = document.getElementById("selectFile").files
  var AdAdderId = document.getElementById("City").value

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
      createAt: (new Date()).toString()

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