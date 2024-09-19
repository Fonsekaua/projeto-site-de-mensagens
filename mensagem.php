<?php 
include "db_actions.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $dados = json_decode(file_get_contents("php://input"),true);
    $id_remetente = $dados['id_remetente'];
    $mensagemDoUsuario  = $dados['mensagemDoUsuario'];

   
    if(uploadMensager($mensagemDoUsuario,$id_remetente)){
        $envio = true;
        $mensagem = "mensagem enviada";
    }else{
        $envio = false;
        $mensagem = "sua mensagem não pode ser enviada!";
    }

    echo json_encode([
        "envio" => $envio,
        "mensagem" => $mensagem,
        "mensagemDoUsuario" => $mensagemDoUsuario
    ]);
}
