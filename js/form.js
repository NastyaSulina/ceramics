// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_yvw0j4mNiHz0P59ZVvymBBfwKmZdxxw",
    authDomain: "feedbacknastya.firebaseapp.com",
    databaseURL: "https://feedbacknastya-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "feedbacknastya",
    storageBucket: "feedbacknastya.appspot.com",
    messagingSenderId: "588303587311",
    appId: "1:588303587311:web:2ae577391de1d0394d881a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
let messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form to database
function submitForm(e){
    e.preventDefault();  //Изменяем поведение по умолчанию

    //Get value
    let name = getInputVal('name');
    let email = getInputVal('email');
    let message = getInputVal('message');

    // Save message
    saveMessage(name, email, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },3000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get form value
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message
    });
}
