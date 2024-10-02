<?php 
include "../db_actions.php";
if($_SERVER["REQUEST_METHOD"] === "POST"){

    $dados = json_decode(file_get_contents("php://input"),true);
    $id_usuario = $dados['id_usuario'];
    $id_usuarioFriend = $dados['id_usuarioFriend'];

    if(uploadFriends($id_usuario,$id_usuarioFriend)){
        $adicionado = true;
        $mensagem = "Usuario adicionado a lista de amigos com sucesso!!";
    }else{
        $adicionado = false;
        $mensagem = "Não foi possivel adicionar este usuario a sua lista de amigos....";
    }

    echo json_encode([
        "adicionado" => $adicionado,
        "mensagem" => $mensagem
    ]);
}