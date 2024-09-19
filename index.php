<?php 
session_start();
include "db_actions.php";
$usuarios = selecionarTabela('usuarios');
$mensagens = selecionarTabela('mensagens');
foreach ($usuarios as $usuario) {
    if($_SESSION){
        if($_SESSION['usuario'] == $usuario['usuario']){
            $id = $usuario['id'];
            echo $id;
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
    <link rel="stylesheet" href="style.css">
   
</head>
<body>
    <form>
        <input type="text">
        <button>login</button>
    </form>
    <section>
        <div id="sectionHeader">
            <h2>Mensager <small>nome-usuario</small></h2>
        </div>
        <div id="sectionMain">
        <label class="mensagem esquerda">sua mensagem</label>
            <?php foreach($mensagens as $mensagem):?>
            <label class="mensagem direita"><?= $mensagem['mensagem']?></label>
            <?php endforeach?>
        </div>
        <div id="sectionFooter">
            <input id="mensagemDoUsuario" data-user="<?=$id?>" type="text" placeholder="Digite sua mensagem">
            <button>Post</button>
        </div>
    </section>
</body>
</html>
 <script src="script.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
