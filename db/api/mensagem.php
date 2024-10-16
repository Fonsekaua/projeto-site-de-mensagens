<?php 
include "../db_actions.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $dados = json_decode(file_get_contents("php://input"),true);
    $id_remetente = $dados['id_remetente'];
    $mensagemDoUsuario  = $dados['mensagemDoUsuario'];
    $id_destinatario = $dados['id_destinatario'];
    $verificarDestinatario = verificarAmizade($id_destinatario,$id_remetente);
    $verificarRemetente = verificarAmizade($id_remetente,$id_destinatario);
   
    if($verificarDestinatario == false){
        $envio = false;
        
        $mensagem = "Destinatario não é amigo do Remetente!!";
    }
    elseif($verificarRemetente == false){
        $envio = false;
        $mensagem = "Remetente não é amigo do Destinatario!!";
    }
    elseif (uploadMensager($mensagemDoUsuario,$id_remetente,$id_destinatario)){
        $envio = true;
        $mensagem = "Sua mensagem foi enviada com sucesso!!";
    }

    echo json_encode([
        "envio" => $envio,
        "mensagem" => $mensagem,
        "mensagemDoUsuario" => $mensagemDoUsuario
    ]);
}
