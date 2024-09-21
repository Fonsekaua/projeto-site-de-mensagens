<div id="mensagens">
<span id="usuarioSpan" data-id="<?= $usuario['id'] ?>">
    <small><?= $usuario['usuario'] ?></small>
    <p>ultima mensagem...</p>

</span>
<section class="opacity">
    <div id="sectionHeader">
        <h2>Mensager <small><?= $usuario['usuario'] ?></small></h2>
        <h3 id="remove">x</h3>
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