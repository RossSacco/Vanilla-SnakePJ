let isUsernameValid = false;
let isPasswordValid = false;


document.addEventListener("DOMContentLoaded", function() { 
     
    //Validazione
    document.getElementById("username").addEventListener("keyup", validateUsername);
    document.getElementById("password").addEventListener("keyup", validatePassword);
    document.getElementById("ConfermaPassword").addEventListener("keyup", validatePasswordMatch);
    
    document.getElementById("register_form").addEventListener("submit", (e) => register(e));
    document.getElementById("login_form").addEventListener("submit", (e) => login(e))

});

function register(e) {
    
    e.preventDefault();
   
    validatePasswordMatch();
    validateUsername();
   
    if (!isUsernameValid || !isPasswordValid)
        return;
        
    let formData = new FormData(e.target);
    formData.append("action", "register");

    fetch('./register.php', {method: 'POST', body: formData})
	.then(result => result.json())
	.then(data => {
        if (!data.error){
            
            success();
            
        }
        else 
            error('register', data.message, data.error);
    }
	);
    
    e.target.reset();
    
   
}



function login(e){
    e.preventDefault(); 

    let formDataLogin=new FormData(e.target); 
    formDataLogin.append("action", "login"); 

    fetch('./login.php', {method: 'POST', body:formDataLogin})
    .then(result=> result.json())
    .then(data=> {
        if(data['login'] === true){
            window.location.href='index.php'; 
        }else {
            error('login', data.message, data.error); 
        }
    })
}

 
function validatePasswordMatch() {

    if (document.getElementById("password").value !== document.getElementById("ConfermaPassword").value){
        document.getElementById("span_conferma_password").innerText = "Le password non corrispondono";
        document.getElementById("ConfermaPassword").classList.add("input_error");
        isPasswordValid = false;
    } else {
        document.getElementById("span_conferma_password").innerText = "";
        document.getElementById("ConfermaPassword").classList.remove("input_error");
        isPasswordValid = true;
    }
    toggleSubmit();
}


function validatePassword(){
    
    if (document.getElementById("ConfermaPassword").value != ""){
        document.getElementById("ConfermaPassword").value = "";
        document.getElementById("span_conferma_password").innerText = "";
        document.getElementById("ConfermaPassword").classList.remove("input_error");
        isPasswordValid = false;
        toggleSubmit();
    }
    
    if (!(/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,20}$/.test(document.getElementById("password").value))){
        document.getElementById("span_password").innerHTML = "Inserire 8-20 caratteri (A-Z, a-z, 0-9, !@#$%).<br> Almeno una lettera e un numero.";
        document.getElementById("password").classList.add("input_error");
    }
    else {
        document.getElementById("span_password").innerText = "";
        document.getElementById("password").classList.remove("input_error");
    }
}

function validateUsername() {
    
    if (!((/^[a-z\d_]{4,20}$/i).test(document.getElementById("username").value))){
        
        document.getElementById("span_username").innerText = "Inserire 4-20 caratteri (A-Z, a-z, 0-9, _)";
        document.getElementById("username").classList.add("input_error");
        document.getElementById("span_username_available").innerText = "";
        isUsernameValid = false;
    } 
    
    else {
        document.getElementById("span_username").innerText = "";
        document.getElementById("username").classList.remove("input_error"); 
        isUsernameValid=true; 
        checkUsernameDataBase();
    }
}


 
function checkUsernameDataBase() {
    let payload = new FormData();
    payload.append("username_reg", document.getElementById("username").value);
    payload.append("action", "validateusername");

    fetch('./register.php', {method: 'POST', body: payload})
	.then(result => result.json())
	.then(data => {
       if (!data.error) {
            document.getElementById("span_username").innerText = "";
            document.getElementById("span_username_available").innerText = "✔ Username disponibile";
            document.getElementById("username").classList.remove("input_error");
            isUsernameValid = true;
        }
        else {
            document.getElementById("span_username").innerText = " X Username non disponibile";
            document.getElementById("span_username_available").innerText = "";
            document.getElementById("username").classList.add("input_error");
            isUsernameValid = false;
        }
        
        toggleSubmit();
    }
	);
}

function toggleSubmit() {
    if (isUsernameValid && isPasswordValid)
        document.getElementById("submit").disabled = false;
    else 
        document.getElementById("submit").disabled = true;
}



function success() {
    document.getElementById("span_username").innerText = "";
    document.getElementById("span_username_available").innerText = "";
    document.getElementsByClassName("success")[0].classList.remove("hidden");
}

function error(action, message, errore) {
    document.getElementById("form_message_" + action).innerText = message;
    console.log(errore);
}



function goTo(choise){
    if(choise === 'reg'){
        document.getElementById('divLogin').classList.add('hidden');
        document.getElementById('divReg').classList.remove("hidden");
        
    }else if (choise === 'login'){
        document.getElementById('divReg').classList.add('hidden');
        document.getElementsByClassName("success")[0].classList.add("hidden");
        document.getElementById('divLogin').classList.remove("hidden"); 
    }


}



function togglePassword(icon, id){
    let pwdfield = document.getElementById(id);
    pwdfield.setAttribute('type', (pwdfield.getAttribute('type') === 'password' )? 'text' : 'password');
    icon.classList.toggle('fa-eye-slash');
}