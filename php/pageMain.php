<div id="mensagens">
    <?php if($_SESSION): 
        foreach ($usuarios as $usuario):
            // Verifica se os usuários são amigos
            $verificarFriends = verificarAmizade($id, $usuario['id']);
    ?>
    <?php if($verificarFriends): ?>
        <div id="mensagensBack">
        <span id="usuarioSpan" data-id="<?= $usuario['id'] ?>">
            <small><?= $usuario['usuario'] ?></small>   
        </span>

        <section class="opacity" data-id="<?= $usuario['id']?>" id="mensagensSection">
            <div id="sectionHeader">
                <h2>Mensager <small><?= $usuario['usuario'] ?></small></h2>
                <h3 id="remove">x</h3>
            </div>

            <div id="sectionMain">
                <?php 
                // Verifica e exibe as mensagens trocadas entre os usuários
                foreach ($mensagens as $mensagem): 
                    if ($mensagem['id_remetente'] == $usuario['id'] && $mensagem['id_destinatario'] == $id) {
                        // Mensagem do outro usuário (esquerda)
                        echo '<label class="mensagem esquerda">' . $mensagem['mensagem'] . '</label>';
                    } elseif ($mensagem['id_remetente'] == $id && $mensagem['id_destinatario'] == $usuario['id']) {
                        // Mensagem do usuário logado (direita)
                        echo '<label class="mensagem direita">' . $mensagem['mensagem'] . '</label>';
                    }
                endforeach; 
                ?>
            </div>

            <div id="sectionFooter">
                <input id="mensagemDoUsuario" type="text" placeholder="Digite sua mensagem">
                <button>Post</button>
            </div>
        </section>
        </div>
        
    <?php endif; ?>    
    <?php endforeach; ?>
    <?php endif; ?>
</div>
