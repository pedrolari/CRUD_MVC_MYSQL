<!-- <?php 
$right_content = "SELECT * FROM `front_contenido_estatico` WHERE `sfooter` = 1 AND `cfooter` = 2";
$left_content = "SELECT * FROM `front_contenido_estatico` WHERE `sfooter` = 1 AND `cfooter` = 1";

$result_right = mysqli_query($GLOBALS['conexion'], $right_content);
$result_left = mysqli_query($GLOBALS['conexion'], $left_content);
?> -->

<footer class="footer1_revistas">
    <?php if ($navigation==1){ ?>
        <div class="newsletter-panel container wd-90">
            <?php include("inc/contenido/mailChimpForm.php"); ?>
        </div>
        <?php
        $sql_footer = "SELECT * FROM contenido WHERE id=2";
        $consulta = mysqli_query($GLOBALS['conexion'], $sql_footer);
        $r = mysqli_fetch_array($consulta);
        ?>
        <style type="text/css">
            #image-back-footer1{
                background-image: url('<?=$url_gen?>images/<?=$r["imagen_footer"];?>');
                background-repeat: no-repeat;
            }
        </style>
        <div id="image-back-footer1" class="col-md-12 mt-50 mb-50">
            <div class="m-z-auto d-block wd-70">
                <div class="text_abs_footer d-block l-float" style="margin-top: 50px; margin-bottom: 50px;">
                    <div>
                        <span>" <?=strip_tags($r['frase_celebre']);?>"</span><br>
                        <div class="col-rd-100 mr-90 ta-r">
                            <span class="f-light"><?=$r['autor']; ?></span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="image-back-footer">

            </div>
        </div>
    <?php } ?>
    <div class="container3" style="">
        <div class="informacion-panel col-md-12 mt-80 mb-120">
            <div class="col-md-3 wd-20i" style="padding-right: 25px;width: 18%">
                <a href="https://www.observatoriorh.com/" target="_blank">
                 <img src="<?=$url_gen?>assets/images/Logo_Blanco.png"/>
             </a>           
         </div>
         <div class="col-md-3 wd-20i">
            <div class="col-md-12">
                <div class="col-md-05">
                    <hr class="vertical_hr">
                </div>
                <div class="separacion-footer col-md-95">
                    <ul class="ul1_footer">
                        <?php
                        foreach($leftFooter as $item) {
                            ?>
                            <li>
                                <a href="<?php echo $url_gen?><?=$item->idd?>"><?=$item->title?></a>
                            </li>
                            <?php 
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-3 wd-20i" style="width: 18%;padding-right: 25px">
            <div class="col-md-12">
                <div class="col-md-05">
                    <hr class="vertical_hr">
                </div>
                <div class="separacion-footer col-md-95">
                    <ul class="ul1_footer">
                        <?php
                        foreach($rightFooter as $item) {
                            ?>
                            <li>
                                <a href="<?php echo $url_gen?><?=$item->idd?>"><?=$item->title?></a>
                            </li>
                            <?php 
                        }
                        ?>                            
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-3 wd-40i" style="padding-right: 25px;width: 35%;">

            <div class="col-md-12">
                <div class="col-md-05">
                    <hr class="vertical_hr">
                </div>
                <div class="separacion-footer col-md-95">
                    <ul class="ul1_footer">
<!--                             <?
                            $sql_footer1 = "SELECT * FROM contenido_footer";

                            $c1 = mysqli_query($GLOBALS['conexion'],$sql_footer1);
                            while($r1 = mysqli_fetch_array($c1)){

                                if (empty($r1['email'])&& empty($r1['url'])){
                                    ?>
                                    <li>
                                        <a href="#">
                                            <?=$r1['identificador']; ?>
                                        </a>
                                    </li>
                                    <?
                                }else if(!empty($r1['email'])){
                                    ?>
                                    <li>
                                        <a href="mailto:<?=$r1['email']?>">
                                            <?=$r1['identificador']; ?>
                                        </a>
                                    </li>
                                    <?
                                }else if(!empty($r1['url'])){
                                    ?>
                                    <li>
                                        <a href="<?=$r1['url']?>">
                                            <?=$r1['identificador']; ?>
                                        </a>
                                    </li>
                                    <?
                                }

                            }
                            ?>
                        -->                        

                        <?php

                        print_arr($contentFooter);
                        foreach($contentFooter as $item) {
                            if (empty($item->email) && empty($item->url)){
                        ?>
                            <li>
                                <a href="#">
                                    <?=$item->identificador;?>
                                </a>
                            </li>
                            <?php
                        }else if(!empty($item->email)){
                            ?>
                            <li>
                                <a href="mailto:<?=$item->email?>">
                                    <?=$item->identificador;?>
                                </a>
                            </li>
                            <?php
                        }else if(!empty($item->url)){
                            ?>
                            <li>
                                <a href="<?=$item->url?>">
                                    <?=$item->identificador; ?>
                                </a>
                            </li>
                        <?php
                        }
                    }
                    ?>                         
                </ul>
            </div>
        </div>

    </div>
</div>

</div>
<!--END OF CONTAINER LINKS-->

<!--COPYRIGHT DIV-->
<div class="col-md-12 bg-f1">
    <div class="col-md-foot">
        <div class="footer1_copyright d-block l-float">

            <span>
                &copy; Observatorio ORH, 2019
            </span>


        </div>
        <div class="footer1_copyright d-block r-float">
            <a rel="nofollow" title="Diseño web" target="_blank" href="http://www.dipe.es/diseno-web">
                <span>
                    Diseño Web
                </span>
            </a>
            :
            <a rel="nofollow" title="dipe" target="_blank" href="http://www.dipe.es/">
                <span>
                    dipe
                </span>
            </a>

        </div>
    </div>

</div>


</footer>

<input type="hidden" id="progress_width" value="0">

