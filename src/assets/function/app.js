function saveOnClick() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var name = document.getElementById('name');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var userstatus = document.getElementById('userstatus');
    insertData(email.value, password.value, name.value, phone.value, address.value, userstatus.value)
}

function insertData(email, password, name, phone, address, userstatus) {
    var firebaseRef = firebase.database().ref('users/');
    firebaseRef.push({
        email: email,
        password: password,
        name: name,
        phone: phone,
        address: address,
        userstatus: userstatus
    });
    signUp();
}

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("สมัครสมาชิกสำเร็จ");
            location.replace("http://localhost:4200/user");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                alert('ข้อมูลไม่ถูกต้อง');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    console.log("Register Success");
}

function signIn() {
    console.log("SignIn Data")
    var email = document.getElementById('emailSig').value;
    var password = document.getElementById('passwordSig').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("เข้าสู่ระบบสำเร็จ");
            location.replace("http://localhost:4200/user");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('รหัสผ่านไม่ถูกต้อง');
            } else {
                alert(errorMessage);
            }
        });
    console.log("Login Success");

}

function logout() {
    firebase
        .auth()
        .signOut();
}
function profile(){
$window.localStorage['my-data'] = 'hello world'
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
  
});
}