<section class="opacity" id="sectionAdicionar">
    <div id="adicionarHeader">
        <h1>usuarios</h1>
        <h2 id="remove">x</h2>
    </div>
    <div id="adicionarMain">
    <?php foreach($usuarios as $usuario):
        $verificarFriends = verificarAmizade($id, $usuario['id']);
        $verificarAmizade = verificarAmizade( $usuario['id'],$id)
        ?>
        <?php if($usuario['id'] == $id):?>
        <?php elseif($verificarFriends):?>
        <?php else:?>
            <span>
            <h1><?=$usuario['usuario']?></h1>
            <small id="adicionarUsuario" data-id="<?=$usuario['id']?>"><?=$verificarAmizade?"Confirmar":"Adicionar Usuario"?></small>
            </span>
        <?php endif?>
    <?php endforeach?>  
    </div>
</section>