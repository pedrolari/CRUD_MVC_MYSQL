<nav class="menu-top" id="menu-top">
    <div class="container">
        <!-- Search Bar -->
        <!-- Logo-->
        <div class="col-sm-3 logo-orh-head">
            <div class="logo-orh">
                <a  href="<?=$ruta_absoluta?>" target="_blank" title="Revista ORH">
                    <img alt="logo ORH" src="<?=$url_gen?>assets/images/Logo_Normal_menu.png">
                </a>
            </div>
        </div>
        <!-- End Logo-->
        <!-- Menu-->
        <div class="menu-desktop col-md-9 mt15" id="menu">
            <div class="col-sm-12">
                <div class="texto-busqueda col-sm-7">
                    <form action="newmenu.php" method="POST" id="">
                        <input id="search_hint" type="text" class="searchBar" placeholder="Buscar.." autocomplete="off">
                        <div id="container-suggestions" class="style-15">
                            <div id="suggestions"></div>
                        </div>
                    </form>
                </div>
                <div class="bloque-carrito col-md-1 right" id="carrito-div" style="width:17%">
                    <div class="col-md-12" id="refreshCarrito_top"  style="margin-top:0;padding-left: 25px">
                        <a style="outline: none;" class="carrito-newmenu" onclick="openMinCart(0)">
                            <span>Mi Carrito</span>
                            <span class="c-units js-units">0</span>
                            <i class="fas fa-shopping-cart fs20 c-primary"></i>
                        </a>
                        <div id="cart_holder" style="position: relative;">
                        </div>
                    </div>
                </div>
                <div class="bloque-usuarios col-md-1 right" style="padding-top:5px;width:17%;">
                    <a style="outline: none;" class="enter-new-menu" href="javascript:enter(1);">
                        <span>
                            Acceso Clientes&nbsp;
                            <i class="far fa-user fs20"></i>
                        </span>
                    </a>
                    <div id="user-options1">
                    </div>
                    <div id="user-login1" style="position: relative;    left: -122px;top: -15px;">
                    </div>
                </div>
            </div>
        </div><!-- End Menu-->
        <hr class="hr-newmenu-bottom">
    </div>
</nav>
