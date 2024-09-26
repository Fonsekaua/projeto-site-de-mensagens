<header>
    <h1>home</h1>
    <nav>
        <?php if($_SESSION):?>
            <li><?= $_SESSION['usuario']?></li>
         <li id="adicionar">Adicionar</li>
         <li id="sessionDestroy">X</li>
         <?php else:?>
            <li id="login">Login</li>
            <li id="registro">Registro</li>
        <?php endif?>
       
    </nav>
</header>