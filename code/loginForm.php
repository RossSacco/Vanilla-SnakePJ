
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNAKE</title>
    <link rel="stylesheet" type="text/css" href="./css/loginForm.css">
    <link rel="stylesheet" type="text/css" href="./css/register.css">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
</head>
<body>
    <?php
        require("tastoIndietro.php");
    ?>


    <img src="immagini/logo.png" alt="logo" id="logo">


    <div id="divLogin" class="divForm">
        <form id="login_form">
            <h1>LOGIN</h1>
            <div class="input-group">
                <label>Username</label>
                <input type="text" id="username_login" name="username_login" placeholder=" . . .">
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password" id="password_login" name="password_login" autocomplete ="off" placeholder=" . . .">
            </div>
            <input type="submit" id="acc" value="Accedi">

            <span class="form_message" id="form_message_login"></span>
            <p>Non hai ancora un Account? <a href="#register" onclick="goTo('reg')" id="registrati">Registrati</a></p>
        </form>
    </div>


    <div id="divReg" class="divForm hidden">
        <form id="register_form">
            <h2>REGISTRAZIONE</h2>
    
            <div class="input-group2">
                <label>Username</label>
                <input type="text" name="username" id="username" placeholder=". . ." required>
                <span id="span_username_available" class="att"></span>
                <span id="span_username" class="att"></span>
            </div>

            <div class="input-group2">
            <label>Password</label>
                <input type="password" name="password" id="password" autocomplete ="off" placeholder=". . ." required>
                <span class="eyeIcons"><img src="immagini/eye.png" alt="" onclick="togglePassword(this, 'password')" ></span>
                <span id="span_password" class="att"></span>
            </div>

            <div class="input-group2">
            <label>Conferma Password</label>
                <input type="password" name="ConfermaPassword" id="ConfermaPassword" autocomplete ="off" placeholder=". . ." required>
                <span class="eyeIcons"><img src="immagini/eye.png" alt="" onclick="togglePassword(this, 'ConfermaPassword')" ></span>
                <span id="span_conferma_password" class="att"></span>
            </div>

            <input type="submit" id="submit" value="Registrati">

            
            <span class="form_message" id="form_message_register"></span>
            
            <p>Hai già un Account? <a href="#login" onclick="goTo('login')" id="accedi">Accedi</a></p>
        </form>
    </div>

    <div class="success hidden">
        <div class="registered_modal">
            <h3 class="registered_message">Registrazione effettuata!</h3>
            <div class="registered_btngroup">
                <button id="toLogin" onclick="goTo('login')">Vai al Login</button>
            </div>
        </div>
    </div>


    <script src="js/register.js"></script>
</body>
</html>