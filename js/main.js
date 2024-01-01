
var signupUserName = document.getElementById("signupUserName");
var signupUserEmail = document.getElementById("signupUserEmail");
var signupUserPassword = document.getElementById("signupUserPassword");
var loginUserEmail = document.getElementById("loginUserEmail");
var loginUserPassword = document.getElementById("loginUserPassword");
var checkMessage = document.getElementById("checkMessage");
var checkMessage2 = document.getElementById("checkMessage2");
var welcomeMessage = document.getElementById("welcomeMessage");
var nameRegex = /^[A-Za-z]{3}/;
var emailRegex = /[A-Za-z]{1,10}(\.)?[A-Za-z]{0,10}([0-9]{1,6})?@[a-z]{2,6}\.[a-z]{2,6}/;
var passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_+=-]).{8,}/;

if(localStorage.getItem("userInfo") != null){
    usersContainer = JSON.parse(localStorage.getItem("userInfo"));
}
else{
    usersContainer = [];
}
function createUser(){
    if(signupUserNameValidation(signupUserName.value) && signupUserEmailValidation(signupUserEmail.value) && signupUserPasswordValidation(signupUserPassword.value)){
        var createUser = {
            userName : signupUserName.value ,
            userEmail : signupUserEmail.value ,
            userPassword : signupUserPassword.value
        }
        var checkCreateUser = usersContainer.find(function (userInfo) {
            return userInfo.userEmail === createUser.userEmail;
        });
        if (checkCreateUser) {
            checkMessage.innerHTML = `Registration Failed this Email ${createUser.userEmail} is Already Exists`;
            checkMessage.classList.remove("d-none");
            checkMessage.classList.add("d-block");
        } else {
            usersContainer.push(createUser);
            localStorage.setItem("userInfo", JSON.stringify(usersContainer));
            checkMessage.innerHTML = `Registration is Sucssesful`;
            checkMessage.classList.remove("d-none");
            checkMessage.classList.add("d-block");
            clearForm()
        }
    }
    else if(signupUserName.value == "" || signupUserEmail.value == "" || signupUserPassword.value == ""){
        checkMessage.innerHTML = `Registration Failed. you need to enter Name, Email and Password.`;
        checkMessage.classList.remove("d-none");
        checkMessage.classList.add("d-block"); 
    }
    else{
        checkMessage.innerHTML = `Registration Failed. you have enterd invalid Name or Email or Password.`;
        checkMessage.classList.remove("d-none");
        checkMessage.classList.add("d-block");
    }
}
function clearForm(){
    signupUserName.value = ""
    signupUserEmail.value = ""
    signupUserPassword.value = ""
}
function login(){
    if(loginUserEmailValidation(loginUserEmail.value) && loginUserPasswordValidation(loginUserPassword.value)){
        var loginUser = {
            userEmail: loginUserEmail.value,
            userPassword: loginUserPassword.value
        };
        if(localStorage.getItem("userInfo") != null){
            for(var i=0; i<usersContainer.length; i++){
                if(loginUserEmail.value == usersContainer[i].userEmail && loginUserPassword.value == usersContainer[i].userPassword){
                    localStorage.setItem("userName", JSON.stringify(usersContainer[i].userName))
                    window.location.href = "html/Home.html";
                }
                else{
                    checkMessage2.innerHTML = `Login failed. User not found or incorrect email or password.`;
                    checkMessage2.classList.remove("d-none");
                    checkMessage2.classList.add("d-block");
                }
            }
        }
        else if(localStorage.getItem("userInfo") == null){
            checkMessage2.innerHTML = `Email is not exist`;
            checkMessage2.classList.remove("d-none");
            checkMessage2.classList.add("d-block");
        }
    }
    else if(loginUserEmail.value == "" || loginUserPassword.value == ""){
        checkMessage2.innerHTML = `Login failed. you need to enter both email and password.`;
        checkMessage2.classList.remove("d-none");
        checkMessage2.classList.add("d-block");    
    }
    else{
        checkMessage2.innerHTML = `Login failed. you have enterd invalid email or password.`;
        checkMessage2.classList.remove("d-none");
        checkMessage2.classList.add("d-block");
    }
}
function setWelcomeMessage(){   
        var getOutWelcomeMessage = JSON.parse(localStorage.getItem("userName"));
        welcomeMessage.innerHTML = `Welcome ${getOutWelcomeMessage}`;
}
if(welcomeMessage){
    setWelcomeMessage();
}
function clearForm2(){
    loginUserEmail.value = "";
    loginUserPassword.value = "";
}
function signupUserNameValidation(name){
    if(nameRegex.test(name)){
        signupUserName.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        signupUserName.classList.add("is-invalid");
        return false;
    }
}
function signupUserEmailValidation(email){
    if(emailRegex.test(email)){
        signupUserEmail.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        signupUserEmail.classList.add("is-invalid");
        return false;
    }
}
function signupUserPasswordValidation(password){
    if(passwordRegex.test(password)){
        signupUserPassword.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        signupUserPassword.classList.add("is-invalid");
        return false;
    }
}
function loginUserEmailValidation(email){
    if(emailRegex.test(email)){
        loginUserEmail.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        loginUserEmail.classList.add("is-invalid");
        return false;
    }
}
function loginUserPasswordValidation(password){
    if(passwordRegex.test(password)){
        loginUserPassword.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        loginUserPassword.classList.add("is-invalid");
        return false;
    }
}

