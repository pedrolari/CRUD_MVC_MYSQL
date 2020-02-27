"use strict";

var navigation = $('#navigation').val();
var totalArticles = $('#total-rows-articles').val();

function parseData(array) {
  return JSON.stringify(array);
}

$(function () {
  $('#order-new_user').on('input', function (e) {
    var elm = $(this);

    if (elm.is(':checked')) {
      $('#order-new_user_data').show();
    } else {
      $('#order-new_user_data').hide();
    }
  });
  $('#btn-order').click(function (e) {
    e.preventDefault();
    var num_a = $('#art-mx').val();
    var num_s = $('#sus-mx-1').val();
    var num_j = $('#sus-mx-2').val();

    if (typeof num_a != 'undefined' || typeof num_s != 'undefined' || typeof num_j != 'undefined') {} else {
      alert("No hay nada en el carrito.");
      return false;
    }

    var articulos = [];
    var suscripciones = [];
    var jornadas = [];
    var i,
        s,
        j,
        c = 0;

    if (num_a != null) {
      for (i = 0; i < num_a; i++) {
        articulos[i] = {
          "id": $('#id_articulo_' + i).val(),
          "type": 1,
          "unid": 1,
          "precio": $('#precio-a' + i).val(),
          "iva": $('#iva-a' + i).val(),
          "title": $('#info_' + i).val(),
          "extra": ""
        };
      }
    }

    if (num_s != null) {
      for (s = 0; s < num_s; s++) {
        suscripciones[s] = {
          "id": $('#id_suscripcion_' + s).val(),
          "type": 2,
          "unid": $('#sus-n-1-' + s).val(),
          "precio": $('#precio-s' + s).val(),
          "iva": $('#iva-s' + s).val(),
          "title": $('#info_1' + s).val(),
          "extra": $('#extra_1' + s).val()
        };
        c++;
      }
    }

    if (num_j != null) {
      c = 0;

      for (j = 0; j < num_j; j++) {
        jornadas[j] = {
          "id": $('#id_suscripcion' + j).val(),
          "type": 3,
          "unid": $('#sus-n-2-' + j).val(),
          "precio": $('#precio-j' + j).val(),
          "iva": $('#iva-j' + j).val(),
          "title": $('#info_2' + j).val(),
          "extra": ""
        };
        c++;
      }
    }

    articulos = parseData(articulos);
    suscripciones = parseData(suscripciones);
    jornadas = parseData(jornadas);
    var tmp_token = $('#tmp_token').val();
    var precio_cesta = $('#precio-cesta').val();
    var iva_cesta = $('#iva-cesta').val();
    var total_cesta = $('#total-cesta').val();
    $.ajax({
      url: 'https://www.observatoriorh.com/revista/componentes/compra-articulos/controller/cart-controller.php',
      type: 'POST',
      data: {
        a: articulos,
        s: suscripciones,
        j: jornadas,
        tmp: tmp_token,
        precio: precio_cesta,
        iva: iva_cesta,
        total: total_cesta
      },
      cache: false
    }).done(function (response) {
      location.href = origin + "/revista/carrito/pedido";
    }).fail(function (response) {// console.error(response)
    });
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $('#password-login_menu').click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var elm = document.getElementById('password-user');
    var btn = document.getElementById('password-login_menu');

    if (elm.type === "password") {
      btn.title = "Ocultar Contraseña";
      btn.innerHTML = "<i class='far fa-eye-slash'></i>";
      elm.type = "text";
    } else {
      btn.title = "Mostrar Contraseña";
      btn.innerHTML = "<i class='fas fa-eye'></i>";
      elm.type = "password";
    }
  });
  $('#btn-enviar_contacto').click(function (e) {
    e.preventDefault();
    var form = $('#form-contacto');
    var nombre = $('#form-contacto_bloque #nombre').val().length;
    var apellidos = $('#form-contacto_bloque #apellidos').val().length;
    var email = $('#form-contacto_bloque #email').val().length;
    var comentarios = $('#form-contacto_bloque #comentarios').val().length;
    var cb = $('#form-contacto_bloque #politica');

    if (cb.is(':checked')) {
      if (nombre !== 0 && apellidos !== 0 && email !== 0 && comentarios !== 0) {
        var form_data = $('#form-contacto').serialize();
        $.ajax({
          url: 'componentes/elementos/send_mail_contact.php',
          type: 'POST',
          data: form_data,
          cache: false,
          beforeSend: function beforeSend(data) {
            $('#btn-enviar_contacto').val("Enviando...");
          },
          success: function success(data) {
            $('#btn-enviar_contacto').val("Enviado!");
            setTimeout(function () {
              $('#form-contacto_success').show();
              $('#form-contacto_bloque').hide();
              $('.intro-formulario').hide();
            }, 2500);
          },
          error: function error(data) {}
        });
      } else {
        alert("Rellene los campos obligatorios.");
      }
    } else {
      alert("Tiene que aceptar la política de privacidad para avanzar.");
    }
  });
  $(':input[name=copiar_datos]').change(function () {
    var x = $(this);
    var id = $('#id_usuario_facturacion').val();

    if (x.is(":checked")) {
      $.ajax({
        url: 'componentes/usuarios/user_controller/get_datos_facturacion.php',
        type: 'POST',
        cache: false,
        data: {
          id: id
        },
        dataType: 'json',
        beforeSend: function beforeSend(data) {},
        success: function success(data) {
          $('#empresa_envio').val(data.data.empresa);
          $('#departamento_envio').val(data.data.departamento);
          $('#nombre_envio').val(data.data.nombre);
          $('#apellidos_envio').val(data.data.apellidos);
          $('#direccion_envio').val(data.data.direccion);
          $('#codigo_postal_envio').val(data.data.codigo_postal);
          $('#localidad_envio').val(data.data.localidad);
          $('#pais_envio').val(data.data.pais);
          $('#email_envio').val(data.data.email);
        },
        error: function error(data) {}
      });
    } else {}
  });
  $('#bt_modificar_datos_envio').click(function (e) {
    e.preventDefault();
    var form_data = $('#form-datos_envio').serialize();
    $.ajax({
      url: 'componentes/usuarios/user_controller/datos_envio.php',
      type: 'POST',
      cache: false,
      data: form_data,
      beforeSend: function beforeSend(data) {},
      success: function success(data) {
        if (data == 0) alert("Error al insertar los datos");else alert("Datos modificados correctamente");
      },
      error: function error(data) {}
    });
  });
  $('#bt_modificar_datos_facturacion').click(function (e) {
    e.preventDefault();
    var form_data = $('#form-datos_facturacion').serialize();
    $.ajax({
      url: 'componentes/usuarios/user_controller/datos_facturacion.php',
      type: 'POST',
      cache: false,
      data: form_data,
      asyn: false,
      beforeSend: function beforeSend(data) {},
      success: function success(data) {
        if (data == 0) alert("Error al insertar los datos");else alert("Datos modificados correctamente");
      },
      error: function error(data) {}
    });
  });
  $('#bt_modificar_perfil').click(function (e) {
    e.preventDefault();
    var form_data = $('#form-modificar_perfil').serialize();
    $.ajax({
      url: 'componentes/usuarios/user_controller/modificar_perfil_usuario.php',
      type: 'POST',
      cache: false,
      data: form_data,
      beforeSend: function beforeSend(data) {},
      success: function success(data) {
        if (data == 0) alert("Error al insertar los datos");else alert("Datos modificados correctamente");
      },
      error: function error(data) {}
    });
  });
  $('#bt_send_mail_to_friend').click(function (e) {
    var data_form = $('#form-send-mail-to-friend').serialize();
    $.ajax({
      url: 'https://www.observatoriorh.com/revista/componentes/elementos/send_mail_to_friend.php',
      type: 'POST',
      cache: false,
      data: data_form,
      beforeSend: function beforeSend(data) {
        $('#bt_send_mail_to_friend').val("Enviando...");
      },
      success: function success(data) {
        if (data != 0) $('#bt_send_mail_to_friend').val("Mensaje Enviado");

        if (data == 0) {
          if (confirm("Todos los campos tienen que rellenarse correctamente")) {
            $('#bt_send_mail_to_friend').val("Enviar");
          } else {
            $('#ModalMail').modal("toggle");
          }
        } else setTimeout(function () {
          $('#ModalMail').modal("toggle");
          $('#bt_send_mail_to_friend').val("Enviar");
        }, 1500);
      },
      error: function error(data) {
        $('#bt_send_mail_to_friend').val("Error");
        setTimeout(function () {
          $('#bt_send_mail_to_friend').val("Enviar");
          $('#ModalMail').modal("toggle");
        }, 2500);
      }
    });
  });
});

function fAuthor(id, param) {
  $.ajax({
    url: '/resultados',
    type: 'POST',
    data: {},
    beforeSend: function beforeSend(data) {},
    success: function success(data) {
      deleteCookies();
      delete_cookie("autor_f");
      delete_cookie("nrevista");
      delete_cookie("r");
      delete_cookie("seccion");
      delete_cookie("totalRows");
      delete_cookie("author_show_h");
      createCookie('searchtype', 2);
      createCookie('r', 1);
      createCookie('autor_f', id);
      createCookie('seccion', "");
      createCookie('nrevista', "");
      location.href = "/resultados";
    },
    error: function error(data) {}
  });
}

function fTag(id, param) {
  $.ajax({
    url: '/resultados',
    type: 'POST',
    data: {},
    beforeSend: function beforeSend(data) {},
    success: function success(data) {
      deleteCookies();
      delete_cookie("g_tab");
      delete_cookie("g_tag_show_h");
      delete_cookie("g_tag_show_h");
      delete_cookie("totalRows");
      createCookie('searchtype', 4);
      createCookie('r', 1);
      createCookie('g_tag', id);
      location.href = "/resultados";
    },
    error: function error(data) {// console.log(data);
    }
  });
}

var origin = window.location.origin;

function barTopHover(id, url, url_hover) {
  $('.' + id).mouseover(function () {
    $('.' + id + ' li span').css({
      color: '#c8b900',
      cursor: 'pointer'
    });
    $('.' + id + ' li div').css({
      background: 'url("' + url_hover + '")no-repeat'
    });
  });
  $('.' + id).mouseout(function () {
    $('.' + id + ' li span').css({
      color: 'rgb(0,0,0,.8)'
    });
    $('.' + id + ' li div').css({
      background: 'url("' + url + '")no-repeat'
    });
  });
} // $('.calendario_ul').click(function(e){
//  e.preventDefault();
//  var today = new Date();
//  var date =today.getDate() + '/' + '0'+(today.getMonth()+1) + "/" + today.getFullYear();
//  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//  var dateTime = date+' '+time;
//  alert("Fecha actual, " + dateTime);
// });


$(function () {
  // if(typeof $.cookie('year_show_h')==='undefined')delete_cookie('year_show_h');
  var url_h_c = origin + '/images/calendario-hover.png',
      url_c = origin + '/images/calendario.png',
      url_h_m = origin + '/images/mail-hover.png',
      url_m = origin + '/images/mail.png';
  barTopHover('calendario_ul', url_c, url_h_c);
  barTopHover('mail_ul', url_m, url_h_m);
  barTopHover('suscripciones_ul', '', '');
});

function volver() {
  var origin = window.location.origin;
  location.href = origin;
}

function buy_newSubs(param, param2) {
  var id = "";
  if (param2 == 1) id = $('#id-suscripcion-home' + param).val();else id = $('#id-jornadas-home' + param).val();
  var origin = window.location.origin; //alert(origin);

  var url = origin + "/elementos/loadCart.php";
  var carrito = origin + "/carrito";
  $.ajax({
    url: carrito,
    type: 'post',
    data: {
      id_suscripcion: id,
      tipo_compra: 1
    },
    beforeSend: function beforeSend(data) {},
    success: function success(data) {
      location.href = carrito;
    },
    error: function error(data) {}
  });
}

function deleteCookies() {
  //delete_cookie0('year_show_h');
  delete_cookie('s_id');
  delete_cookie('hint');
  delete_cookie('hint_show_h');
  delete_cookie('seccion_show_h');
  delete_cookie('nrevista_show_h');
  delete_cookie('year_show_h');
  delete_cookie('author_show_h');
  delete_cookie('totalRows');
  delete_cookie('limit_q0');
  delete_cookie('limit_q');
  delete_cookie('hint_quick');
  delete_cookie('autor');
  delete_cookie('get_a_cz');
  delete_cookie('autor1');
  delete_cookie('autor2');
  delete_cookie('autor0');
  delete_cookie('autor00');
  delete_cookie("year");
  delete_cookie("nrevista");
  delete_cookie("seccion");
  delete_cookie("r");
  delete_cookie("autor_f");
  delete_cookie("seccion_f");
  delete_cookie("g_tag");
  delete_cookie("g_tag_show_h");

  if (getCookie('searchtype') == 4) {
    delete_cookie("searchtype");
    createCookie("searchtype", 1);
  }
}

$('#bt_del_all').on('click', function () {
  deleteCookies();
  location.href = "https://www.observatoriorh.com/revista/buscador";
});
$('#del_autor_pub').on('click', function () {
  delete_cookie('autor');
  delete_cookie('get_a_cz');
  delete_cookie('autor2');
  delete_cookie('autor0');
  delete_cookie("autor_f");
  delete_cookie('autor00');
  location.href = "https://www.observatoriorh.com/revista/buscador";
});
$('#del_year_pub').on('click', function () {
  delete_cookie("year");
  location.href = "https://www.observatoriorh.com/revista/buscador";
});

var delete_cookie = function delete_cookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

$('#bt_buscar_av_2').on('click', function () {
  var autor = $('#hint_autor').val();
  var nrevista = $('#hint_nrevista').val();
  var seccion = $('#hint_seccion').val();
  delete_cookie('hint_show_h');
  delete_cookie('totalRows');
  createCookie("r", 1);
  createCookie('autor_f', autor);
  createCookie('nrevista', nrevista);
  createCookie('seccion', seccion);
  location.href = "https://www.observatoriorh.com/revista/resultados";
});
$('#bt_buscar_av_1').on('click', function () {
  delete_cookie('totalRows');
  var value = $('#hint_quick').val();
  createCookie("hint_quick", value);
  createCookie("r", 1);
  location.href = "https://www.observatoriorh.com/revista/resultados";
});

function createCookie(name, value) {
  var date = new Date();
  date.setTime(date.getTime() + 30000 * 1000);
  var expires = "; expires=" + date.toGMTString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

function findYear(param) {
  var id = param;
  delete_cookie('totalRows');
  createCookie("year", id);
  createCookie("r", 1);
  location.href = "https://www.observatoriorh.com/revista/resultados";
}

function locateAuthor1(param) {
  var name = $('#hiddenautor_a' + param).val();
  createCookie("autor0", name);
  createCookie("r", 1);
  location.href = "https://www.observatoriorh.com/revista/resultados";
}

function findAuthor(param) {
  var id = param;
  var id = param;
  delete_cookie('totalRows');
  createCookie("autor00", id);
  $('#ul-modal').load(' #ul-modal');
  $('#exampleModalLongTitle').load(' #exampleModalLongTitle');
  $('#reload-cookie').load(" #reload-cookie");
  $('#exampleModalLong').modal('toggle');
}

function showArticles2(param) {
  var id = param;
  var seccion = $('#seccion_hidden' + id).val();
  var id_seccion = $('#seccion_hidden_id' + id).val();
  delete_cookie('totalRows');
  createCookie("r", 1);
  createCookie('seccion_f', seccion);
  createCookie('s_id', id_seccion);
  location.href = "https://www.observatoriorh.com/revista/resultados";
}

function showArticles(param) {
  var id = param;

  switch ($('#flecha' + id).attr('class')) {
    case 'fa fa-angle-right':
      $('#flecha' + id).removeClass('fa fa-angle-right');
      $('#flecha' + id).addClass('fa fa-angle-down');
      break;

    case 'fa fa-angle-down':
      $('#flecha' + id).removeClass('fa fa-angle-down');
      $('#flecha' + id).addClass('fa fa-angle-right');
      break;
  }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function goback() {
  delete_cookie('r');
  delete_cookie("g_tag");

  if (getCookie('searchtype') == 4) {
    delete_cookie("searchtype");
    createCookie("searchtype", 1);
  }

  location.href = "https://www.observatoriorh.com/revista/buscador";
}

function searchType(type) {
  var t = type;
  var tempScrollTop = $(window).scrollTop();
  createShortCookie('searchtype', type);
  deleteCookies();
  location.href = "https://www.observatoriorh.com/revista/buscador";
  $.ajax({
    type: "POST",
    url: 'buscador-avanzado.php',
    data: {
      t: t
    },
    success: function success(data) {}
  });
}

function removeChilds(id) {
  var myNode = document.getElementById(id);

  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

var result = $('#r').val();
var limit = 10;
var offset = 0;
var busy = false;
var total_rows_c = $('#total-rows_c').val();
var total_rows_n = $('#total-rows_n').val();

function displayRecords(lim, off) {
  var searchtype = $('#searchtype_hidden_val1').val();
  var hint = "";
  if (searchtype == 1) hint = $('#hint_quick').val();
  var year = $('#yearfinal').val();
  var autor = $('#autorhiddenval').val();
  var nrevista = "";
  if (searchtype == 2) nrevista = $('#hint_nrevista').val();
  var seccion = "";
  var seccion_id = "";
  if (searchtype == 2) seccion = $('#hint_seccion').val();

  if (searchtype == 3) {
    seccion_id = $('#seccionhiddenval_id').val();
    seccion = $('#seccionhiddenval').val();
  }

  $.ajax({
    type: "post",
    async: false,
    url: "https://www.observatoriorh.com/revista/componentes/elementos/loadMoreData.php?limit=" + lim + "&offset=" + off + "&searchtype=" + searchtype + "&hint=" + hint + "&year=" + year + "&autor=" + autor + "&nrevista=" + nrevista + "&idSeccion=" + seccion_id,
    data: {
      seccion: seccion
    },
    cache: false,
    beforeSend: function beforeSend() {
      busy = true; //removeChilds('load-more-image');
      //$('#load-more-image').append("<span><b>Cargando resultados...</b></span>");

      /*$('#load-more-image').append('<img style="width: 100%;margin:0 auto;" src="https://www.observatoriorh.com/revista/images/animated_loading.gif"/>');*/

      $('#load-more-image').show(); //$('#load-more').css({'display':'block'});
    },
    success: function success(html) {
      busy = false;
      $("#results").append(html);
      total_rows_n = $('#total-rows_n').val(); //removeChilds('load-more-image');
    },
    error: function error(data) {//alert("error: ".data);
    }
  });
}

if (result != 0 && navigation == 3) {
  displayRecords(limit, offset);
  $('#loader_message').click(function () {
    var d = $('#loader_message').find("button").attr("data-atr");

    if (d != "nodata") {
      offset = limit + offset;
      displayRecords(limit, offset);
    }
  });
  $(window).scroll(function () {
    //alert("TOP FOOTER " +$(".footer1_revistas").offset().top + " WS " + parseFloat($(window).height() - $(window).scrollTop()));
    if ($(window).scrollTop() > $(".footer1_revistas").offset().top - 500 && !busy) {
      //alert(1);
      busy = true;
      offset = limit + offset; //alert("OFFSET " + offset + "   TotalRows C " + total_rows_c + "  total_ROWSN   " + total_rows_n);

      if (total_rows_c !== 'undefined' && total_rows_c >= offset || total_rows_n !== 'undefined' && total_rows_n >= offset) {
        displayRecords(limit, offset);
      } else {
        $('#load-more-image').hide(); //alert("reached the limit");
      }
    }
  });
}

$(function () {
  $('#options-menu').on('click', function (e) {
    e.preventDefault(); //alert("dasdas");

    $('#div_popup_user2').show();
  });
  $('#boton_users1').on('click', function (e) {
    e.preventDefault(); //$('#form-users').submit();
  });
});
var btn = $('#back-to-top');
$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});
$(document).ready(function () {
  var $sidebarArrow = $('.childs-anteriores');
  $sidebarArrow.click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.menu-mobile').slideToggle(300);
  });
  $sidebarArrow = $('.childs-usuarios');
  $sidebarArrow.click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.menu-mobile-users').slideToggle(300);
  });
  $sidebarArrow = $('.child-usuarios-login');
  $sidebarArrow.click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.users-login-mobile').slideToggle(300);
  });

  var delete_cookie = function delete_cookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  var delete_cookie0 = function delete_cookie0(name) {
    document.cookie = name + '=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  if (navigation != 1 && navigation != 0) {
    delete_cookie0("autores");
    delete_cookie0("category");
  }

  if (navigation != 2) {
    delete_cookie("autor1");
    delete_cookie("year1");
  }

  if (navigation != 3) {
    delete_cookie("searchtype");
    delete_cookie('hint_quick');
    delete_cookie('autor');
    delete_cookie('get_a_cz');
    delete_cookie('autor1');
    delete_cookie('r');
    delete_cookie('autor0');
    delete_cookie('autor00');
    delete_cookie("year");
    delete_cookie("nrevista");
    delete_cookie("seccion");
    delete_cookie("autor_f");
    delete_cookie("seccion_f");
    delete_cookie0("g_tag");
    delete_cookie0("g_tag_show_h");
    delete_cookie0("totalRows");
    delete_cookie0("author_show_h");
    delete_cookie0("year_show_h");
  }
  /**
   * Dipe Progress On scroll para articulos
   * @param  {[type]} navigation [description]
   * @return {[type]}            [description]
   */


  if (navigation == -5) {
    var progressOnScroll = function progressOnScroll() {
      if (window.scrollY < 250) {
        $('.progress-container').hide();
      } else {
        $('.progress-container').show();
      }

      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - (footerHeight + 330);
      var scrolled = winScroll / height * 100; //console.log("windowScroll " + winScroll + " height " + height + " scrolled " + scrolled);

      document.getElementById("myBar1").style.width = scrolled + "%"; //alert("wtf");
    };

    window.onscroll = function () {
      progressOnScroll();
    };

    var footerHeight = $('.footer1_revistas').outerHeight();
  }
});

function delFilter() {
  $jq.ajax({
    url: 'delfiltros.php',
    type: 'POST',
    data: {},
    success: function success() {
      location.href = "https://www.observatoriorh.com/revista/buscador";
    }
  });
}

function toggleMenu(id, e) {
  //e.preventDefault();
  //$('.'+ id).toggle();
  var $sidebarArrow = $('.' + id);
  $sidebarArrow.click(function () {
    $(this).next().slideToggle(300);
  });
}

function myFunction(x) {//x.classList.toggle("change");
  //openNav();
  //$('.orh-logo-sidenav').fadeIn(1000);
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px"; //document.getElementById('main').style.marginRight = "250px";

  $('#main').addClass("ple");
  $('#float-panel-fixed').addClass("ple");
  setTimeout(function () {
    $('.showOn-l').fadeIn(100);
  }, 300);
}

$('#main').click(function (e) {
  if (this.classList.contains("ple")) {
    sidebar_view("", e, 0);
  }
});

function sidebar_view(elm, event, f) {
  event.preventDefault();
  var $sideNav = $('#mySidenav');
  var $ham;
  var $fixedNav = $('.float-panel.fixed');
  var $ham_aux;

  if (f == 0) {
    $ham = $('#nav-toggle');
    $ham_aux = $('#nav-toggle-u'); //$('.float-panel.fixed').addClass("ple");
  } else {
    $ham = $('#nav-toggle-u');
    $ham_aux = $('#nav-toggle'); //$('.float-panel.fixed.ple').removeClass("ple");
  }

  if ($sideNav.width() == 0) {
    openNav();
    $('.orh-logo-sidenav').fadeIn(1000);
    $ham_aux.addClass("active");
    $ham.addClass('active');
  } else {
    $ham.removeClass("active");
    $ham_aux.removeClass('active');
    closeNav();
  }
}

function closeNav() {
  $('.users-login-mobile').hide();
  document.getElementById("mySidenav").style.width = "0";
  $('#main').removeClass("ple");
  $('#float-panel-fixed').removeClass("ple");
  $('.showOn-l').hide();
  $('.orh-logo-sidenav').hide();
}

$(document).ready(function () {
  $('#bt_search_more').on('click', function (e) {
    e.preventDefault();
    var origin = window.location.origin;
    location.href = origin + "/revista/buscador";
  });
  $('#container-secciones-js').on('click', function () {});
  $('#add_suscripcion_jornada').on('change', function (e) {
    var origin = window.location.origin;
    var url = origin + "/carrito";
    var id_suscripcion = $('#add_suscripcion_jornada').val();
    $('#id_suscripcion_jornada').val(id_suscripcion);
    if ($(this).val() == "") return false; //alert($('#id_suscripcion_jornada').val());
    //$('#form-compra-suscripcion-jornada').submit();

    $.ajax({
      url: url,
      type: 'post',
      data: {
        id_suscripcion: id_suscripcion
      },
      beforeSend: function beforeSend(data) {
        $('#spiner-subscription-cart-bottom').show();
      },
      success: function success(data) {
        //alert(id_suscripcion);
        $('#refreshTable').load(' #refreshTable'); // let value = $('#refreshCarrito_top .c-units').text(),
        // newvalue = parseInt(value) > 0 ? parseInt(value) + 1 : 0;
        // $('#refreshCarrito_top .c-units').text(newvalue);
        // $('#refreshCarrito_topFixed').text(newvalue);
        //$('.cart-panel-options').empty();
        //$('.cart-panel-options').load(' .cart-panel-options');

        $('#refreshCarrito_topFixed').load(' #refreshCarrito_topFixed');
        $('#refreshCarrito_top').load(' #refreshCarrito_top');
        setTimeout(function () {
          $('#refreshCarrito_top').css({
            'padding-left': '0'
          });
        }, 50);
        $('#spiner-subscription-cart-bottom').hide();
      },
      error: function error(data) {}
    });
  });
});

function openModal(id) {
  $('#ModalMail #article_id').val(id);
  $('#ModalMail').modal('show');
}

function print(x) {
  var contentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var btn_class = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var divToPrint;

  if (contentId != '') {
    divToPrint = document.getElementById(contentId);
  } else {
    divToPrint = document.getElementById('content-articles' + x);
  }

  var ele = '';

  if (btn_class != '') {
    ele = document.getElementsByClassName(btn_class);
    Array.prototype.forEach.call(ele, function (el) {
      el.style.display = "none"; //el.classList.add('d-none');
    });
  }

  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
  newWin.document.close();
  setTimeout(function () {
    newWin.close();

    if (btn_class != '') {
      Array.prototype.forEach.call(ele, function (el) {
        el.style.display = "block";
      });
    }
  }, 10);
}

function __print(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  var block = document.getElementById('paso3');
  debugger;
  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
  newWin.document.close();
  setTimeout(function () {
    newWin.close();
  }, 10);
}

function facturacion() {
  var origin = window.location.origin;
  location.href = origin + "/revista/datos-facturacion";
}

function informaciones() {
  var origin = window.location.origin;
  location.href = origin + "/revista/informaciones";
}

function cuenta() {
  var origin = window.location.origin;
  location.href = origin + "/revista/cuenta";
}

function perfil() {
  var origin = window.location.origin;
  location.href = origin + "/revista/modificar-perfil";
}

function disconnect() {
  
  $.ajax({
    url: "https://www.observatoriorh.com/revista/index.php",
    type: 'POST',
    data: {
      dc: 1
    },
    cache:false
  }).done(function(response){
    location.reload()
  }).fail(function(err){
    console.error(err)
  })
}

function options_menu(param) {
  if (param == 1) {
    if ($('#user-options1').css('display') == 'none') {
      $('#user-options1').fadeIn(50);
    } else {
      $('#user-options1').fadeOut(50);
    }

    if ($('#cart-popup1').css('display') == 'block') {
      $('#cart-popup1').fadeOut(10);
    }
  } else {
    if ($('#user-options2').css('display') == 'none') {
      $('#user-options2').fadeIn(50);
    } else {
      $('#user-options2').fadeOut(50);
    }

    if ($('#cart-popup2').css('display') == 'block') {
      $('#cart-popup2').fadeOut(10);
    }
  }
}
/**Dipe
* div popup**/
// function enter(param){
//  if (param==1){
//    if($('#user-login1').css('display') == 'none')
//      {$('#user-login1').fadeIn(50);
//  }else{$('#user-login1').fadeOut(50);}
//  if($('#cart-popup1').css('display') == 'block')
//    {$('#cart-popup1').fadeOut(10);
// }
// }else{
//  if($('#user-login2').css('display') == 'none')
//    {$('#user-login2').fadeIn(50);
// }else{$('#user-login2').fadeOut(50);}
// if($('#cart-popup2').css('display') == 'block')
//  {$('#cart-popup2').fadeOut(10);
// }
// }
// }


function addmore_suscription(param, param2) {
  var idSuscripcion = $('#id_suscripcion' + param).val();

  if (param2 == 1) {
    $.ajax({
      type: 'post',
      async: false,
      url: origin,
      data: {
        id_suscripcion: idSuscripcion,
        action: 10
      },
      beforeSend: function beforeSend(data) {//
      },
      success: function success(data) {
        //$('#spiner-subcription-cart').hide();
        //location.reload();
        $('#refreshTable').load(' #refreshTable'); // let value = $('#refreshCarrito_top .c-units').text(),
        // newvalue = parseInt(value) > 0 ? parseInt(value) + 1 : 0;
        // $('#refreshCarrito_top .c-units').text(newvalue);
        // $('#refreshCarrito_topFixed').text(newvalue);

        $('#refreshCarrito_topFixed').load(' #refreshCarrito_topFixed');
        $('#refreshCarrito_top').load(' #refreshCarrito_top');
        setTimeout(function () {
          $('#refreshCarrito_top').css({
            'padding-left': '0'
          });
        }, 50); // $('#refreshCarrito_topFixed').load(' #refreshCarrito_topFixed');
        // $('#refreshCarrito_top').load(' #refreshCarrito_top');
        //$('#refreshResults1').load( '#refreshResults1');
      },
      error: function error(data) {}
    });
  } else {
    $.ajax({
      type: 'post',
      async: false,
      url: origin,
      data: {
        id_suscripcion: idSuscripcion,
        action: 11
      },
      beforeSend: function beforeSend(data) {//$('#spiner-subcription-cart-bottom').show();
      },
      success: function success(data) {
        //$('#spiner-subcription-cart').hide();
        $('#refreshTable').load(' #refreshTable'); // let value = $('#refreshCarrito_top .c-units').text(),
        // newvalue = parseInt(value) > 0 ? parseInt(value) + 1 : 0;
        // $('#refreshCarrito_top .c-units').text(newvalue);
        // $('#refreshCarrito_topFixed').text(newvalue);

        $('#refreshCarrito_topFixed').load(' #refreshCarrito_topFixed');
        $('#refreshCarrito_top').load(' #refreshCarrito_top');
        setTimeout(function () {
          $('#refreshCarrito_top').css({
            'padding-left': '0'
          });
        }, 50); // $('#refreshCarrito_top').load(' #refreshCarrito_top');
        // $('#refreshCarrito_topFixed').load(' #refreshCarrito_topFixed');
      },
      error: function error(data) {
        console.log(data);
      }
    });
  }
}

function ver_carrito(param) {
  if (param == 1) {
    if ($('#cart-popup1').css('display') == 'none') {
      $('#cart-popup1').fadeIn(50);
    } else {
      $('#cart-popup1').fadeOut(50);
    }

    if ($('#user-login1').css('display') == 'block') {
      $('#user-login1').fadeOut(10);
    }

    if ($('#user-options1').css('display') == 'block') {
      $('#user-options1').fadeOut(10);
    }
  } else {
    if ($('#cart-popup2').css('display') == 'none') {
      $('#cart-popup2').fadeIn(50);
    } else {
      $('#cart-popup2').fadeOut(50);
    }

    if ($('#user-login2').css('display') == 'block') {
      $('#user-login2').fadeOut(10);
    }

    if ($('#user-options2').css('display') == 'block') {
      $('#user-options2').fadeOut(10);
    }
  }
}

function createShortCookie(name, value) {
  var date = new Date();
  date.setTime(date.getTime() + 40 * 1000);
  var expires = "; expires=" + date.toGMTString();
  document.cookie = name + "=" + value + expires + "; path=/";
} // function createCookie(name, value) {
//  var date = new Date();
//  date.setTime(date.getTime()+(30000*1000));
//  var expires = "; expires="+date.toGMTString();
//  document.cookie = name + "="+value+expires+"; path=/";
// }


if (navigation == -5) {
  delete_cookie('year_show_h');
  delete_cookie("totalRows");
  delete_cookie("author_show_h");
}

function searchbar_mobile(elm) {
  var id = elm.id;
  var obj = $('#' + id);
  obj.empty();

  if ($('.searchbar').css('display').toLowerCase() == 'none') {
    obj.append("<i class='fas fa-times'></i>");
  } else {
    obj.append('<i class="fas fa-search"></i>');
  }

  $('.searchbar').toggle();
}

$('.searchbar-input-mobile').on('keyup', function (e) {
  /*e.preventDefault();
  e.stopInmediatePropagation();*/
  var value = $(this).val();

  if (e.keyCode == 13) {
    $.ajax({
      url: '/resultados',
      type: 'POST',
      data: {
        value: value
      },
      beforeSend: function beforeSend(data) {},
      success: function success(data) {
        deleteCookies();
        delete_cookie("totalRows");
        createCookie("searchtype", 1);
        createCookie("hint_quick", value);
        createCookie("r", 1);
        location.href = "/resultados";
      },
      error: function error(data) {
        console.log(data);
      }
    });
  }
});
$(document).ready(function () {
  var pathname = window.location.pathname;
  var origin = window.location.origin;
  $('#bt-solicitud-clave').click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var email = $('#email-recordar-clave').val();
    var parent = $('.recordarClave');
    $.ajax({
      url: 'https://www.observatoriorh.com/revista/',
      type: 'POST',
      data: {
        email: email,
        email_recovery: true
      },
      dataType: 'json',
      beforeSend: function beforeSend(data) {},
      success: function success(data) {
        console.log(data);
        var status = data.status;
        var data = data.data;

        switch (data) {
          case 1:
            var Template = "<div class='col-sm-12 mb-20'>" + "<div class='portrait'>" + "<span class='tipeportrait'>" + "Solicitud Clave" + "</span>" + "</div>" + "</div>" + "<div class='col-sm-12 recordar--clave'>" + "<h3>Mensaje enviado con éxito!</h3>" + "Se le ha enviado un correo con la nueva clave a <strong>{{email}}</strong>" + "<input onclick='volver()' type='button' value='Volver' class='bt_buscar_av_1 mr-10 mt-m2'/>" + "</div>";
            var Data = {
              email: email
            };
            break;

          case 2:
            var Template = "<div class='col-sm-12 mb-20'>" + "<div class='portrait'>" + "<span class='tipeportrait'>" + "Solicitud Clave" + "</span>" + "</div>" + "</div>" + "<div class='col-sm-12 recordar--clave'>" + "Mensaje fallido, no se encontro el email, <strong>{{email}}</strong> en la base de datos! " + "<input onclick='volver()' type='button' value='Volver' class='bt_buscar_av_1 mr-10 mt-m2'/>" + "</div>";
            var Data = {
              email: email
            };
            break;

          case 3:
            var Template = "<div class='col-sm-12 mb-20'>" + "<div class='portrait'>" + " <span class='tipeportrait'>" + " Solicitud Clave" + "  </span>" + "  </div>" + " </div>" + "<div class='col-sm-12 recordar--clave'>" + "Mensaje fallido, inserte un email correcto!, <strong>{{email}}</strong> " + "<input onclick='volver()' type='button' value='Volver' class='bt_buscar_av_1 mr-10 mt-m2'/>" + "</div>";
            var Data = {
              email: email
            };
            break;
        }

        parent.empty();
        window.history.pushState('', '', '/revista/solicitud-clave');
        parent.append(Mustache.render(Template, Data));
        return false;
      },
      error: function error(data) {
        console.log(data);
      }
    });
  });
});