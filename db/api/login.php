<?php 
include "../db_actions.php";
if($_SERVER["REQUEST_METHOD"] === "POST"){

    $dados = json_decode(file_get_contents("php://input"),true);
    $usuario = $dados['usuario'];

    if(fazerLogin($usuario)){
        $login = true;
        $mensagem = "Bem-vindo $usuario !";
    }else{
        $login = false;
        $mensagem = "Não foi possivel fazer seu login...";
    }

    echo json_encode([
        "login" => $login,
        "mensagem" => $mensagem
    ]);
}