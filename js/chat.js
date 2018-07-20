const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const auth = firebase.auth();
const messaging = firebase.messaging();
let currentUser = undefined;
let chatsDiv = document.getElementById("allChats");

console.log("firestore", firestore);
console.log("auth", auth);
console.log("messaging", messaging);


let cUser = localStorage.getItem("user");
let chats = new Set();

let previosChatsDiv = document.getElementById("allChats");

firestore.collection("messages").where("recieverId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(selectFile => {
            chats.add(selectFile.doc.id);
            firestore.collection('users').doc(selectFile.doc.data().senderId).get()
                .then(doc => {

                    previosChatsDiv.innerHTML += `
                    <div class="w-80 m-auto chatDiv d-flex flex-row" id=${element.doc.id} onclick = "startChat(event)" >
                    <div class="align-self-center">
                    </div>
                    <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                    <h5>${doc.data().Name}</h5>
                    <span class="cursor-pointer">message....</span>
                    <span class="cursor-pointer">At: time</span>
                    </div>
                    </div>
                     `

                })

        })
    })





function startChat(event) {
    let chatbox = document.getElementsByClassName("chatbox")[0];

    if (event.target.nodeName == "SPAN" || event.target.nodeName == "H5") {
        let target = (event.target.parentNode.parentNode).id;
        console.log(target);
        
        chatbox.id = target;
        firestore.collection("messages").doc(target)
            .get().then(doc => {
                if(doc.data().senderId !== localStorage.getItem("user")){
                    localStorage.setItem("adderId" , doc.data().senderId)  
                }else if(doc.data().recieverId !== localStorage.getItem("user")){
                    localStorage.setItem("adderId" , doc.data().recieverId)
                }
                initailizeChatListner(target);
            })
        
    }



}

var addKaUser = localStorage.getItem("adderId");



firestore.collection("messages").where("senderId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(selectFile => {
            chats.add(selectFile.doc.id);
            firestore.collection('users').doc(selectFile.doc.data().recieverId).get()
                .then(doc => {

                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${selectFile.doc.id}>
                       
                        <div class="ml-3 d-flex flex-column align-self-center">
                      
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })





var recieverId = localStorage.getItem("adAdderId");
var senderId = localStorage.getItem("user_id");








let roomFound = false;

let currentChat;


if (recieverId && senderId) {
    let chatbox = document.getElementsByClassName("chatbox")[0];
    let messageDiv = document.getElementById("messageDiv");



    console.log("working")
    firestore.collection("messages").where("senderId", "==", senderId)
        .where("recieverId", "==", recieverId)

        .get().then(function (snapshot) {
            snapshot.forEach(function (chatRoom) {
                roomFound = true;
                console.log("chat room Found>>>", chatRoom)
                currentChat = chatRoom.id;
                chatbox.id = chatRoom.id;

                initailizeChatListner(currentChat)

               


            })

        })







}






function createRoom() {
    return new Promise((resolve, reject) => {
        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId,
        }).then(chatRoom => {
            chatbox.id = chatRoom.id;
            currentChat = chatRoom.id;
            console.log("Chat room Created With This ID >", chatRoom.id);
            initailizeChatListner(chatRoom.id)
            resolve(chatRoom.id);

        })

    })

}
let chatInitialed = false;

function send_Message(event) {
    // event.preventDefault()

    let messageToSend = document.getElementById("input").value;
    let chatbox = document.getElementsByClassName("chatbox")[0];
    
    if (chatbox.id) {
        firestore.collection("messages").doc(chatbox.id)
            .collection("message").doc( ((new Date).getTime()).toString() ).set({
                message: messageToSend,
                senderId: senderId,
                recieverId : recieverId,
                time: (new Date).toString()
            }).then(docRef => {
                if (chatInitialed == false) {

                    initailizeChatListner(chatbox.id);
                    chatInitialed = true

                }
            })

    } else {

        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId
        }).then(docRef => {
            chatbox.id = docRef.id;
            send_Message();


        })


        

    }





}





let messageDiv = document.getElementById("messageDiv");


function initailizeChatListner(chatId) {

    const chatID = chatId;
   
    if (chatID) {

        messageDiv.innerHTML = "";

        firestore.collection("messages").doc(chatID)
            .collection("message")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.doc.data().senderId == senderId) {

                        messageDiv.innerHTML += `
                                    <div class="bg-green m-2 float-right message">
                                     <p class="text-white font-weight-bold p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }

                    else {

                        messageDiv.innerHTML += `
                                    <div class="border m-2 message">
                                     <p class="font-weight-bold text-black p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }


                })

            })

    }

}



// // const messaging = firebase.messaging();

// messaging.requestPermission().then(function() {
// 	console.log('Notification permission granted.');
// 	return messaging.getToken()
// }).then(function(currentToken) {
// 	console.log('currentToken', currentToken);
// }).catch(function(err) {
// 	console.log('Unable to get permission to notify.', err);
// });

// messaging.onMessage((payload) => {
// 	console.log('payload', payload)
// })


// //Way to push notification using fetch!


// //Server Key (Firebase -> Project -> Settings -> Cloud Messaging -> Server Key
// var key = 'AAAAuFAHWsQ:APA91bGIhu6LHqmZJ1wSfYlECtzYtZefKxe9nSQWGmWfu6U6qoLSHs1BfW76iGN8LfVgCv0yQZl_yBXIRnqRsKKnd0KFua654D8S_B3S5SBphmZ5tV8XvoYfwptWHWpwMfmXZwN2KQfqfZ5s10PPAqZh6dN-McFYTQ';
// //token
// var to = 'eIPZ0eXePFE:APA91bGMPx3AJfNnWaIs0Ui5uN72aNpxYelOBYhwXqHlQ26SLWrc9Kh3aYGLCM5Ypq3RfE1cHpV8nFcMTVvfcMuW8vCRVgCTCaYrqz5lajH7r3owQkYng50Ftgvrvojrhkd2Ndz0q_Xu';
// var notification = {
// 	'title': 'Portugal vs. Denmark',
// 	'body': '5 to 1'
// };

// fetch('https://fcm.googleapis.com/fcm/send', {
// 	'method': 'POST',
// 	'headers': {
// 		'Authorization': 'key=' + key,
// 		'Content-Type': 'application/json'
// 	},
// 	'body': JSON.stringify({
// 		'notification': notification,
// 		'to': to
// 	})
// }).then(function(response) {
// 	console.log(response);
// }).catch(function(error) {
// 	console.error(error);
// });


function signOut() {

    let btn = document.getElementById("logOUt");
    btn.innerHTML = `
        <img src="">
    `
    firebase.auth().signOut().then(function (res) {
        console.log("LOG OUT SuccessFull!!!");
        window.location = "index.html"
    })
}





messaging.onMessage(function (payload) {
    console.log('onMessage', payload);
});