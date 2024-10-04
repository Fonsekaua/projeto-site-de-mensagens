<?php
session_start();
include "db/db_actions.php";
$usuarios = selecionarTabela('usuarios');
$mensagens = selecionarTabela('mensagens');
$friends = selecionarTabela('friends');

foreach ($usuarios as $usuario) {
    if ($_SESSION) {
        if ($_SESSION['usuario'] == $usuario['usuario']) {
            $id = $usuario['id'];
        } 
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">

</head>

<body>
     <div id="tela" class="opacity"></div>   
    <?php include "php/header.php"; ?>
    
    <?php include "php/pageLogin.php"?>
     <?php include "php/pageRegistro.php"?>
    <?php include "php/pageAdd.php"?>
    <main>
            <?php include "php/pageMain.php"; ?>    
    </main>

    <?php include "php/footer.php"; ?>
   
</body>

</html>
<script src="js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>