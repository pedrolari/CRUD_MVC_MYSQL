<?php
class UsuariosModel extends ModeloBase{
    private $table;
    
    public function __construct($adapter){
        $this->table="mod_usuarios";
        parent::__construct($this->table, $adapter);
    }
    
    //Metodos de consulta
    // public function getUnUsuario(){
    //     $query="SELECT * FROM mod_usuarios WHERE email='victor@victor.com'";
    //     $usuario=$this->ejecutarSql($query);
    //     return $usuario;
    // }
}
?>
