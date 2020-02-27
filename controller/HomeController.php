<?php
class HomeController extends ControladorBase{
    public $conectar;
    public $adapter;

    public function __construct() {
        parent::__construct();

        $this->conectar=new Conectar();
        $this->adapter=$this->conectar->conexion();
    }
    
    public function index(){
        //Obtenemos los datos del footer
        $ContenidosEstaticos = new ContenidoEstaticosModel($this->adapter);
        $rightFooter = $ContenidosEstaticos->getRightFooter();
        $leftFooter = $ContenidosEstaticos->getLeftFooter();
        $contentFooter = $ContenidosEstaticos->getContentFooter();


        //Cargamos la vista index y le pasamos valores
        $this->view("home",array(
            "rightFooter"=>$rightFooter,
            "leftFooter"=>$leftFooter,
            "contentfooter"=>$contentFooter,
        ));



    }

    public function footer(){
        $ContenidosEstaticos = new ContenidoEstaticosModel($this->adapter);
        $rightFooter = $ContenidosEstaticos->getRightFooter();
        $leftFooter = $ContenidosEstaticos->getLeftFooter();
        // var_dump($leftFooter);
    }
}
?>
