<?php
class Usuario extends EntidadBase{
    private $id;
    private $nombre;
    private $apellidos;
    private $email;
    private $password;
    
    public function __construct($adapter) {
        $table="mod_usuarios";
        parent::__construct($table, $adapter);
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
    
    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellido() {
        return $this->apellidos;
    }

    public function setApellido($apellidos) {
        $this->apellidos = $apellidos;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function save(){
        $query="INSERT INTO usuarios (id,nombre,apellidos,email,password)
                VALUES(NULL,
                       '".$this->nombre."',
                       '".$this->apellidos."',
                       '".$this->email."',
                       '".$this->password."');";
        $save=$this->db()->query($query);
        //$this->db()->error;
        return $save;
    }

}
?>