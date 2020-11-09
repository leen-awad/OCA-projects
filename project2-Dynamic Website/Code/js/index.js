class User {
  constructor (name,email,password,birthDate,phonenumber){
  this.name = name;
  this.email = email;
  this.password = password;
  this.birthDate = birthDate;
  this.phoneNumber = phonenumber;
  }
}

let visible = 1;
let storageType;
let userIni = new User();
 

function openNav() {
  document.getElementById("myNav").style.display = "block";
}

function closeNav() {
  document.getElementById("myNav").style.display = "none";
}


// Get the elements
const partOne = document.getElementById('partOne'),
  partTwo = document.getElementById('partTwo'),
  prev = document.getElementsByClassName('prev-button'),
  next = document.getElementsByClassName('next-button');



function nextPage(){

    if (visible === 1) {

      partOne.style.transform = 'translateX(-100%)';
      partTwo.style.transform = 'translateX(0)';

    }

    visible ++;

}

Array.from(prev).forEach(button => {

  button.addEventListener('click', () => {

if (visible === 2) {

      partTwo.style.transform = 'translateX(100%)';
      partOne.style.transform = 'translateX(0)';

    }

    visible --;

  });

});



var emailReg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
var passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var phoneNumberReg = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
var birthdayReg = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/);
var nameReg = new RegExp(/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/);


function validation (savingType){
 
  var user = new User();

  user.name = document.forms["formOne"]["username"].value;
  user.email = document.forms["formOne"]["email"].value;
  user.password = document.forms["formOne"]["password"].value;
  user.birthDate = document.forms["formOne"]["birthday"].value;
  user.phoneNumber = document.forms["formOne"]["phonenumber"].value;
  user.birthDate = document.forms["formOne"]["birthday"].value;


  if(nameReg.test(user.name) != true){
    document.getElementById('usernameVal').hidden = false;  
  }else{
    document.getElementById('usernameVal').hidden = true; 
  }

  if(birthdayReg.test(user.birthDate) != true){
    document.getElementById('birthdayVal').hidden = false;  
    console.log("wrong")
  }else{
    document.getElementById('birthdayVal').hidden = true; 
  }

  if(phoneNumberReg.test(user.phoneNumber) != true){
    document.getElementById('phoneVal').hidden = false;  
  }else{
    document.getElementById('phoneVal').hidden = true;
  }
   
  
  if(emailReg.test(user.email) != true){
    document.getElementById('emailVal').hidden = false;  
  }else{
    document.getElementById('emailVal').hidden = true;
  }

  if(passwordReg.test(user.password) != true)
  {
    document.getElementById('passwordVal').hidden = false;  
  }else{
    document.getElementById('passwordVal').hidden = true;
  }

  if(!(nameReg.test(user.name) != false 
  && phoneNumberReg.test(user.phoneNumber) != false 
  && emailReg.test(user.email)  != false
  && passwordReg.test(user.password) != false)){
    return false;
  }else {
    if(savingType === 'session'){

      sessionStorage.setItem("user",JSON.stringify(user));
      document.getElementById('namePreview').innerText = user.name;
        clear();

        nextPage();

    }else{
      clear();
      localStorage.setItem("user",JSON.stringify(user));
      document.getElementById('namePreview').innerText = user.name;
      nextPage();
    }
  }
}


function clear(){
        document.forms["formOne"]["username"].value = "";
        document.forms["formOne"]["email"].value = "";
        document.forms["formOne"]["password"].value = "";
        document.forms["formOne"]["birthday"].value = "";
        document.forms["formOne"]["phonenumber"].value = "";
        document.forms["formOne"]["birthday"].value = "";
        document.getElementById('checkAgree').checked = false;
        document.getElementById("session").disabled = true;
        document.getElementById("local").disabled = true;
}

function changed(checkbox){
  if(checkbox.checked){
    document.getElementById("session").disabled = false;
    document.getElementById("local").disabled = false;
  }else {
    document.getElementById("session").disabled = true;
    document.getElementById("local").disabled = true;
  }
}

if(sessionStorage.getItem('user') != null && userIni != undefined){
    userIni = JSON.parse(sessionStorage.user);
    storageType = 'session';
    nextPage();
    document.getElementById('namePreview').innerText = userIni.name;
}

if(localStorage.getItem('user') != null && userIni != undefined){
userIni = JSON.parse(localStorage.user);
storageType = 'local';
nextPage();
document.getElementById('namePreview').innerText = userIni.name;
}

let backgroudSession = sessionStorage.getItem('background');
let fontFamilySession = sessionStorage.getItem('font-family');
let fontColorSession = sessionStorage.getItem('color');

if(backgroudSession != null){
  document.body.style.background = sessionStorage.getItem('background');
}

if(fontFamilySession != null){
  $(document).ready(function(){
    $("body,label").css("font-family",fontFamilySession);
  });
}

if(fontColorSession != null){
  $(document).ready(function(){
    $("label , p").css("color",fontColorSession);
  });
  if(fontColorSession == "#db6400"){
    $(document).ready(function(){
      $("p").css("color",'white');
    });
  }
}




function SignOut() {
  if(storageType == 'session'){
  sessionStorage.removeItem('user');
  }

  if(storageType == 'local'){
    localStorage.removeItem('user');
  }
  resetSettings();
}

function userChoice() {
  var background = document.getElementById("background").value;
  var fontColor = document.getElementById("fontColor").value;
  var fontFamily = document.getElementById("fontFamily").value;
  

  if(background == 'black'){
  document.body.style.background = "#333";
  sessionStorage.setItem("background","#333");
  }
  if(background == 'white'){
    document.body.style.background = "white";
    sessionStorage.setItem("background","white");
  }
  if(background == 'default'){
    document.body.style.background = "white";
    sessionStorage.setItem("background","white");
  }


  if(fontColor == 'black'){
    $(document).ready(function(){
      $("label , p").css("color",'black');
    });
    sessionStorage.setItem("color","black");
  }

  if(fontColor == 'white'){
    $(document).ready(function(){
      $("label , p").css("color",'white');
    });
    sessionStorage.setItem("color","white");
  }

  if(fontColor == 'defaultFont'){
    $(document).ready(function(){
      $("label").css("color",'#db6400');
    });

    $(document).ready(function(){
      $("p").css("color",'white');
    });
    sessionStorage.setItem("color",'#db6400');
  }



  if(fontFamily == 'arial'){
    $(document).ready(function(){
      $("body,label").css("font-family","Arial, FontAwesome");
    });
    sessionStorage.setItem("font-family","Arial, FontAwesome");
  }

  if(fontFamily == 'mono'){
    $(document).ready(function(){
      $("body,label").css("font-family","Syne Mono");
    });
    sessionStorage.setItem("font-family","Syne Mono");
  }

  if(fontFamily == 'amatic'){
    $(document).ready(function(){
      $("body,label").css("font-family","Amatic SC");
    });
    sessionStorage.setItem("font-family","Amatic SC");
  }
}

function resetSettings(){
  $(document).ready(function(){
    $("body,label").css("font-family","Arial, FontAwesome");
  });
  sessionStorage.setItem("font-family","Arial, FontAwesome");

  $(document).ready(function(){
    $("label").css("color",'#db6400');
  });

  $(document).ready(function(){
    $("p").css("color",'white');
  });
  sessionStorage.setItem("color",'#db6400');


    document.body.style.background = "white";
    sessionStorage.setItem("background","white");
  

}

