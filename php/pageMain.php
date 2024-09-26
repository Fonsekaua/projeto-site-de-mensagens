<div id="mensagens">
    <?php if($_SESSION): 
        foreach ($usuarios as $usuario):
            $verificarFriends = verificarAmizade($id,$usuario['id']);

        ?>
    <?php if($verificarFriends):?>
        <span id="usuarioSpan" data-id="<?= $usuario['id'] ?>">
    <small><?= $usuario['usuario'] ?></small>
    <p>ultima mensagem...</p>
    </span>
   

<section class="opacity" data-id="<?= $usuario['id']?>">
    <div id="sectionHeader">
        <h2>Mensager <small><?= $usuario['usuario'] ?></small></h2>
        <h3 id="remove">x</h3>
    </div>
    <div id="sectionMain">
        <?php foreach ($mensagens as $mensagem): 
            $verificarMensagens = verificarMensagens($id);
            $verificarMensagensRemetente = verificarMensagensRemetente($usuario['id'])
        ?>
            <?php if($verificarMensagens):?>
            <label class="mensagem esquerda"><?= $mensagem['mensagem']?></label>  
            <?php endif?> 
 
            <label class="mensagem direita"><?=$mensagem['mensagem']?></label>
            
        <?php endforeach ?>
    </div>
    <div id="sectionFooter">
        <input id="mensagemDoUsuario" data-user="<?= $id ?>" type="text" placeholder="Digite sua mensagem">
        <button>Post</button>
    </div>
</section>
<?php endif?>    
<?php 
      endforeach;
      endif?>
</div>