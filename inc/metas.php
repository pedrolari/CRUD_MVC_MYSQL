        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title><?php if($title) { echo $title;} else { ?>Revista ORH<? } ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content=" <?php if($keywords){ echo $keywords; }else{ echo "Revista ORH"; } ?>" />
        <meta name="description" content="<?php if($description){ echo $description; } else { echo "Revista ORH"; }?>"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta name="robots" content="all" />
        <link rel="canonical" href="<?=$url_revista?>index.php" />
        <meta name="author" content="www.dipe.es" />
        <meta property="og:title" content="<?php echo $title?>" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="<?=$description?>">
        <meta property="og:url" content="<?=__CURRENT_URI__?>" />
        <?php if (isset($image1)){?>
            <meta property="og:image" content="<?=$url_revista?>/images/articulos/<?php echo $image1 ?>" />
        <?php } ?>

        <link rel="alternate" hreflang="es" href="<?=$ruta_absoluta.$request_uri?>" />
        <link rel="shortcut icon" href="<?=$url_revista?>/images/favicon.png">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="<?=$url_revista?>assets/css/bootstrap.min.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?=$url_revista?>assets/css/app.css" type="text/css"/>
        <link rel="stylesheet" href="<?=$url_revista;?>assets/css/all.min.css">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script defer src="<?=$url_revista?>assets/js/bootstrap.min.js" type="text/javascript"></script>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.1.0/mustache.min.js"></script>
        <script defer src="<?=$url_revista?>assets/js/app.js" type="text/javascript"></script>
        <script defer src="<?=$url_revista?>assets/js/revista.js" type="text/javascript"></script>