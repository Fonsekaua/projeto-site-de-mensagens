<?php 
include "../db_actions.php";
if($_SERVER["REQUEST_METHOD"] === "POST"){

    $dados = json_decode(file_get_contents("php://input"),true);
    $usuario = $dados['usuario'];

    if(strlen($usuario)<3){
        $registro = false;
        $mensagem = "Numero de caracteres minimo não alcançado!!!";
    }
    else{
        uploadRegistro($usuario);
        $registro = true;
        $mensagem = "Usuario $usuario cadastrado com sucesso!!";
    }

    echo json_encode([
        "registro" => $registro,
        "mensagem" => $mensagem
    ]);
}