<!DOCTYPE HTML>
<html lang="es">
<head>
    <?php
    include_once('inc/metas.php'); 
    ?>
</head>

<body>
    <?php
    require_once("inc/ley_cookies.php");
    ?>
    <div id="main" class="view">
        <script>
            AOS.init();
        </script>
        <?php
        require_once('inc/header-top.php');
        require_once("inc/header.php");
        require_once("inc/menu.php");
        
        // AQUI CARGAREMOS EL CONTENIDO QUE NOS DEVUELVA EL CONTROLADOR
        // include_once($vista);

        
        require_once("inc/footer.php");
        ?>
    </div>
</body>
</html>