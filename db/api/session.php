<?php 
session_start();
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $dados = json_decode(file_get_contents("php://input"),true);
   $_SESSION['usuario'] = $dados['usuario'];
   if($_SESSION['usuario']){
        $session = true;
        $mensagem = "o usuario " . $dados['usuario'] . " Esta logado";

    }
    else{
        $session = false;
        $mensagem = "o usuario não foi logado";
    }
    echo json_encode([
        "session" => $session,
        "mensagem" => $mensagem 
    ]);
   
}
