<?php
class ContenidoEstatico extends EntidadBase{
    private $id;
    private $title;
    private $content;
    private $idd;
    private $cfooter;
    private $sfooter;
    
    public function __construct($adapter) {
        $table="front_contenido_estatico";
        parent::__construct($table, $adapter);
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
    
    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function getContent() {
        return $this->content;
    }

    public function setContent($content) {
        $this->content = $content;
    }

    public function getIdd() {
        return $this->idd;
    }

    public function setIdd($idd) {
        $this->idd = $idd;
    }

    public function getCfooter() {
        return $this->cfooter;
    }

    public function setCfooter($cfooter) {
        $this->cfooter = $cfooter;
    }

    public function getSfooter() {
        return $this->sfooter;
    }

    public function setSfooter($sfooter) {
        $this->sfooter = $sfooter;
    }

    public function save(){
        $query="INSERT INTO usuarios (id, title, content, idd, cfooter, sfooter)
                VALUES(NULL,
                       '".$this->id."',
                       '".$this->title."',
                       '".$this->content."',
                       '".$this->idd."',
                       '".$this->cfooter."',
                       '".$this->sfooter."');";
        $save=$this->db()->query($query);
        //$this->db()->error;
        return $save;
    }

}
?>