<?php
session_start();
include "db_actions.php";
$usuarios = selecionarTabela('usuarios');
$mensagens = selecionarTabela('mensagens');

foreach ($usuarios as $usuario) {
    if ($_SESSION) {
        if ($_SESSION['usuario'] == $usuario['usuario']) {
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
    <div id="friendZone">
        <?php foreach ($usuarios as  $usuario): ?>
            <div id="mensagens">


                <span id="usuarioSpan" data-id="<?= $usuario['id'] ?>">
                    <small><?= $usuario['usuario'] ?></small>
                    <p>ultima mensagem...</p>

                </span>
                <section class="opacity">
                    <div id="sectionHeader">
                        <h2>Mensager <small><?= $usuario['usuario'] ?></small></h2>
                    </div>
                    <div id="sectionMain">
                        <label class="mensagem esquerda">sua mensagem</label>
                        <?php foreach ($mensagens as $mensagem): 
                            $verificarMensagens = verificarMensagens($usuario['id'])
                            ?>
                            <?php if($verificarMensagens):?>
                            <label class="mensagem direita"><?= $mensagem['mensagem'] ?></label>
                            <?php endif?>
                        <?php endforeach ?>
                    </div>
                    <div id="sectionFooter">
                        <input id="mensagemDoUsuario" data-user="<?= $id ?>" type="text" placeholder="Digite sua mensagem">
                        <button>Post</button>
                    </div>
                </section>
            </div>
        <?php endforeach ?>
    </div>

</body>

</html>
<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>