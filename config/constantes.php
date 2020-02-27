<?php
//EXTRA DIPE
    // VISUALIZAMOS LOS ERRORES, SI LO HACEMOS DESDE NUESTRAS IPS
    if (in_array($_SERVER['REMOTE_ADDR'], array('83.38.205.108'), true)) {
        ini_set('display_errors',1);
        error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
        define('DEBUG_MODE', true);
    } else {
        ini_set('display_errors',0);
        error_reporting(0); 
        define('DEBUG_MODE', false);
    }
    // FIN VISUALIZAMOS LOS ERRORES, SI LO HACEMOS DESDE NUESTRAS IPS

    // CARGAMOS LAS FUNCIONES
    include_once("./../revista/gestion-revista/inc/funcionesgenerales.php");
    include_once("./../revista/gestion-revista/inc/funcionesespecificas.php");
    // FIN CARGAMOS LAS FUNCIONES

    // COMPROBAMOS SI HAY SESSION O NO
    if (!isset($_SESSION['sessionid'])) {
        session_start();
        $vsessionid = session_id();
    }
    // FIN COMPROBAMOS SI HAY SESSION O NO

    // ESTABLECEMOS LA ZONA HORARIA PREDETERMIADA USADA PARA TODAS LAS FUNCIONES DE FECHA Y HORA.
    date_default_timezone_set('Europe/Madrid');
    // FIN ESTABLECEMOS LA ZONA HORARIA PREDETERMIADA USADA PARA TODAS LAS FUNCIONES DE FECHA Y HORA.

    // RUTAS
    $url_servername = "http://revistaorh.servidordepruebas.net/revista_new";
    $urlinicio = strpos($_SERVER['HTTP_HOST'], 'revistaorh.servidordepruebas.net/revista_new/') === false ? 'http://revistaorh.servidordepruebas.net/revista_new/' : 'http://revistaorh.servidordepruebas.net/revista_new/';
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        $urlinicio = str_replace('http:', 'https:', $urlinicio);
        $var_s = 's';
    } else {
        $var_s = NULL;
    }

    $url_gen = 'http' . $var_s . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $urladmin = $urlinicio.'gestion-revista/';
    $urlbase = $urlinicio;
    $url_absoluta = 'usr/home/revistaorhservidordepruebas/www/revista_new/';
    $url_absoluta_admin = $url_absoluta.'gestion-revista/';
    // FIN RUTAS

//FIN EXTRA DIPE
?>