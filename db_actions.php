<?php 
include "db.php";
function selecionarTabela($nome){
    global $pdo;
    $consulta = $pdo->query("SELECT * FROM $nome");
    return $consulta->fetchAll(PDO::FETCH_ASSOC);
}
function uploadMensager($mensagem, $id_remetente){
    global $pdo;
    $consulta = "INSERT INTO mensagens (mensagem, id_remetente) VALUES (:mensagem, :id_remetente)";
    $db = $pdo->prepare($consulta);
    $db->bindParam(":mensagem", $mensagem);
    $db->bindParam(":id_remetente", var: $id_remetente);
    $db->execute();
    return $db->rowCount() > 0; // Retorna TRUE se a operação for bem-sucedida
}

function fazerLogin($usuario) {
    global $pdo;
    
    // Consulta SQL para selecionar o usuário com verificação sensível a maiúsculas/minúsculas (BINARY)
    $consulta = "SELECT * FROM usuarios WHERE BINARY usuario = :usuario";
    
    // Preparar a consulta
    $db = $pdo->prepare($consulta);
    
    // Associar o parâmetro ":usuario" com a variável $usuario
    $db->bindParam(":usuario", $usuario);
    
    // Executar a consulta
    $db->execute();
    
    // Verificar se a consulta retornou resultados
    if ($db->rowCount() > 0) {
        // Usuário encontrado, retorne o registro
        return $db->fetch(PDO::FETCH_ASSOC);
    } else {
        // Usuário não encontrado
        return false;
    }
}

