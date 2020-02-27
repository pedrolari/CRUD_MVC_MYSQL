<?php
class ContenidoEstaticosModel extends ModeloBase{
    private $table;
    
    public function __construct($adapter){
        $this->table="front_contenido_estatico";
        parent::__construct($this->table, $adapter);
    }
    
    //Metodos de consulta
    public function getRightFooter(){
        $query="SELECT * FROM front_contenido_estatico WHERE sfooter = 1 AND cfooter = 2";
        $footer = $this->ejecutarSql($query);
        return $footer;
    }

    public function getLeftFooter(){
        $query="SELECT * FROM front_contenido_estatico WHERE sfooter = 1 AND cfooter = 1";
        $footer = $this->ejecutarSql($query);
        return $footer;
    }

    public function getContentFooter(){
        $query="SELECT * FROM contenido_footer";
        $footer = $this->ejecutarSql($query);
        return $footer;
    }    

}
?>
