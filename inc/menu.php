<nav id="menu-bottom" class="menu-bottom">
    <div class="float-panel" id="float-panel-fixed" style="" data-top="0" data-scroll="200">
        <div class="content-area" >
            <div class="container" >
                <a class="logo-orh-menu-fixed" href="#">
                    <img class="fa-gg" src="<?php echo $ruta_absoluta?>images/Logo_Normal_menu_fixed.png"/>
                    <em></em>
                </a>
                <div class="container-menu">
                    <div id="menuList">
                        <ul id="header-nav">
                            <?php 
                            $_sql = "SELECT * FROM `menus_item` WHERE `TIPOMENU` = 1 AND `PUBLICAR` = 1 ORDER BY `ORDEN`";
                            $_result = mysqli_query($GLOBALS['conexion'], $_sql);
                            $cTop = 0;
                            while ($_row = mysqli_fetch_array($_result)):
                                $_title = $_row['TITULO'];
                                $_title = utf8_encode ($_title);
                                $uri = $url_gen.$_row['uri'];
                                $active ="";
                                if ($_title == "INICIO") {
                                    $uri = "https://www.observatoriorh.com/";
                                }
                                if ($navigation == 0 && $_title == "Nº ANTERIORES"):
                                    $active = "class='active'";
                                elseif($navigation == 1 && $_title == "Nº ACTUAL"):
                                    $active = "class='active'";
                                elseif($navigation == -6 && $_title === "BUSCADOR" && $_SERVER['REQUEST_URI'] == "/buscador"):
                                    $active = "class='active'";
                                elseif($navigation == -6  && $_SERVER['REQUEST_URI'] == "/catalogo-revistas" && $_title === "CATÁLOGO REVISTAS"):
                                    $active = "class='active'";
                                elseif($_title == "SUSCRIPCIONES" && $navigation == -1):
                                    $active = "class='active'";
                                endif;
                                ?>
                                <li>  
                                    <?php if ($_title == "Nº ANTERIORES") { ?>
                                        <a <?=$active?>>
                                            <?=$_title?>
                                        </a>
                                    <?php } else {?>
                                        <a <?=$active?> <?=$cTop == 0 ? "target='_blank'" : ""?> href="<?=$uri?>" >
                                            <?=$_title?>
                                        </a>
                                    <?php } ?>
                                    <?php
                                    if ($_title == "Nº ANTERIORES"):
                                        $sql_query = "SELECT * FROM `revistas` WHERE `PUBLICAR`=1 ORDER BY `revistas`.`anio` DESC,`revistas`.`MES` DESC";
                                        $resultado = mysqli_query($GLOBALS['conexion'], $sql_query);
                                        $counter = 0;
                                        $numRows = mysqli_num_rows($resultado);
                                        $fila = mysqli_fetch_array($resultado);
                                        ?>
                                        <div class="back-dropdown1">
                                            <ul class="dropdown1" >
                                                <?php
                                                $resultado_ = mysqli_query($GLOBALS['conexion'], $sql_query);
                                                if ($numRows<10){
                                                    do {
                                                        $fila_= mysqli_fetch_array($resultado_);
                                                        if($counter==0){
                                                        }else{
                                                            ?>
                                                            <li class="bd-1w">
                                                                <a  href="<?=$ruta_absoluta_web;?>/<?=$fila_['NUMERO'];?>"><span><?=$fila_['anio']; ?> / Nº <?=$fila_['NUMERO']; ?> / <?=$meses[$fila_['MES']]; ?></span></a>
                                                            </li>
                                                            <?php
                                                        }
                                                        $counter++;
                                                    }while($counter<$numRows);
                                                }else{
                                                    do {
                                                        $fila_ = mysqli_fetch_array($resultado_);
                                                        if($counter==0){
                                                        }else{
                                                            ?>
                                                            <li class="bd-1w">
                                                                <a  href="<?=$ruta_absoluta_web;?>/<?=$fila_['NUMERO'];?>"><span><?=$fila_['anio']; ?> / Nº <?=$fila_['NUMERO']; ?> / <?=$meses[$fila_['MES']]; ?></span></a>
                                                            </li>
                                                            <?php
                                                        }
                                                        $counter++;
                                                    }while($counter<10);
                                                }
                                                ?>
                                                <li class="bd-1w">
                                                    <a href="<?php echo $ruta_absoluta?>catalogo-revistas">
                                                        <span>Más Números...</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <?php
                                    endif;
                                    ?>
                                </li>
                                <?php
                                $cTop++;
                            endwhile;
                            ?>
                        </ul>
                    </div>
                </div>
                <?php
                    /**Dipe
                    Showing div users and cart when fixed menu pop up
                    */
                    ?>
                    <div class="scrolldiv">
                        <div class="container-mobile" style="display: none;">
                            <div class="nav-toggle-block" onclick="sidebar_view(this, event, 0)" style="position: relative;margin-top:8px;">
                                <a id="nav-toggle" class="nav-toggle" style="color:rgb(0,0,0,.90);margin-right: 10px;" href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                        <div class="bloque-usuario-scroll">
                            <?php if(!isset($_SESSION['login_usuario']) || $_SESSION['login_usuario']==''){?>
                                <a style="outline: none!important   ; padding-top: 5px;"  class="logos" href="javascript:enter(2);">
                                    <i class="far fa-user fs20 c-primary"></i>
                                    <!-- <img src="<?php echo $ruta_absoluta?>images/Usuario.png"/> -->
                                </a>
                            <?php }else{?>
                                <a style="outline: none!important;    padding-top: 5px;"  class="logos" href="javascript:client_options(2);">
                                    <i class="far fa-user fs20 c-primary"></i>
                                    <!-- <img src="<?php echo $ruta_absoluta?>images/Usuario.png"/> -->
                                </a>
                            <? }?>
                            <div id="user-login2">
                                <?php //include ("user-login.php");?>
                            </div>
                            <div id="user-options2">
                                <?php $top = "top:14px!important;" ?>
                                <?php //include ("user-options.php");?>
                            </div>
                        </div>
                        <div class="bloque-carrito-scroll">
                            <div class="col-md-12 mt0" id="refreshCarrito_topFixed">
                                <?php
                            //include 'loadCart.php';
                                $numS = is_array($_SESSION['suscripciones']) ? count($_SESSION['suscripciones']) : 0;
                                $numA = is_array($_SESSION['articulos']) ? count($_SESSION['articulos']) : 0;
                                $numX = is_array($_SESSION['jornadas']) ? count($_SESSION['jornadas']) : 0;
                                ?>
                                <a class="logos" id="logo_cart_scroll" onclick="openMinCart(1)" style="padding-top: 5px;">
                                    <span class="c-units js-units"><?php echo $numA + $numS + $numX?></span>
                                    <i class="fas fa-shopping-cart fs20  c-primary"></i>
                                    <!-- <img src="<?php echo $ruta_absoluta?>images/Carrito Compra.png"/> -->
                                </a>
                                <div id="cart_holder_bottom" style="position: relative;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                        //end hidden div
                    ?>
                </div>
            </div>
            <input type="hidden" value="<?php echo $navigation ?>" id="navigation">
            <div class="progress-container" style="display:none;">
                <div class="progress-bar" id="myBar1"></div>
            </div> 
        </div>
    </nav>
