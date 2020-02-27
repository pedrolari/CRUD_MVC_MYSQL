<div class="bar-top">
    <div class="container">
       <div>
        <div class="contacto-calendario col-md-6">
            <ul class="contacto_2">
                <li>
                    <ul class="calendario_ul" style="margin:0!important">
                        <li>
                            <!-- <div id="calendario_hover"></div> -->
                        </li>
                        <li>
                            <?php
                            $day = date('d');
                            $month = date('m');
                            $m = intval($month);
                            $year = date('Y');
                            $meses = array("", "Enero", "Febrero", "Marzo", "Abril", "Mayo","Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                            ?>
                            <span><i class="fas fa-calendar-alt fs16"></i> <span><?=$day." ".$meses[$m]." ".$year?></span></span>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="<?=$url_gen?>contacto">
                        <ul class="mail_ul">
                            <li>
                            </li>
                            <li>
                                <span><i class="fas fa-envelope fs16"></i> <span>Contacto</span></span>
                            </li>
                        </ul>
                    </a>
                </li>
                <li>
                    <a href="<?=$url_gen?>suscripciones">
                        <ul class="suscripciones_ul">
                            <li>
                            </li>
                            <li>
                                <span><i class="fas fa-book-open fs16"></i> <span>Suscríbete</span></span>
                            </li>
                        </ul>
                    </a>
                </li>
            </ul>
        </div>
        <div class="contacto-redes col-md-6">
            <ul class="contacto_1">
                 <li>
                    <a href="<?=$linkedin_link?>" target="_blank" title="LinkedIn">
                        <i class="fab fa-linkedin-in fs18"></i>
                    </a>
                </li>
                <li>
                    <a href="<?=$twitter_link?>" target="_blank" title="Twitter">
                        <i class="fab fa-twitter fs18"></i>
                    </a>
                </li>
                <li>
                    <a href="<?=$instagram_link?>" target="_blank" title="Instagram">
                        <i class="fab fa-instagram fs18"></i>
                    </a>
                </li>
                <li>
                    <a href="<?=$facebook_link?>" target="_blank" title="Facebook">
                        <i class="fab fa-facebook-f fs18"></i>
                    </a>
                </li>
                <li>
                    <a href="<?=$youtube_link?>" target="_blank" title="Youtube">
                        <i class="fab fa-youtube fs18"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
