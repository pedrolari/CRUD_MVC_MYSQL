<?
if ($_SESSION['cookie_law_dipe'] != 23) {
	
	$aviso = "<div id='overbox3'>
				<div id='infobox3'>
					<div class='cerrar-posicion'> <a onclick='aceptar_cookies();' style='cursor:pointer;'>Cerrar</a></div>
						<div class='texto-aviso'><p>Este sitio web utiliza cookies propias y de terceros para obtener datos estadísticos de la navegación de sus usuarios. Si continúas navegando, consideramos que aceptas su uso. Si quieres, puedes cambiar tus preferencias o ampliar esta información en <a target='_blank' class='blanco' href='https://www.observatoriorh.com/revista/politica-de-cookies' >Política de cookies</a></p>                              
						</div>
				</div>
			</div>";
	
    $_SESSION['cookie_law_dipe'] = 23;
} 
?>