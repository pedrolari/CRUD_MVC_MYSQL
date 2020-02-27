//constantes
const url_revista = "http://revistaorh.servidordepruebas.net/revista/";

//app.js
var openMinCart = function openMinCart(t) {
  var $parent;

  if (!t) {
    $parent = $('#cart_holder');
  } else {
    $parent = $('#cart_holder_bottom');
  }

  $parent.empty();
  $.ajax({
    url: url_revista + 'inc/carrito/controller.php',
    data: {},
    type: 'POST',
    dataType: 'json',
    cache: false,
    beforeSend: function beforeSend() {}
  }).done(function (response) {
    tempMinCart($parent, response, t);
  }).fail(function (response) {
    $('#cart_holder').empty();
    $('#cart_holder_bottom').empty();
  });
};

var empty_cart = function empty_cart() {
  $.ajax({
    url: url_revista + "inc/carrito/controller.php",
    type: 'POST',
    data: {
      empty: true
    },
    dataType: 'json',
    cache: false
  }).done(function (response) {
    updatejUnit(response.len);
    openMinCart(1);
    $('#cart_holder_bottom').empty();
    $('#cart_holder').empty();
    check_empty_cart(response.len);
    $('#refreshTable').load(' #refreshTable');
  }).fail(function (response) {
    openMinCart(1);
    $('#cart_holder_bottom').empty();
    $('#cart_holder').empty(); // check_empty_cart(response.len)

    console.error(response);
  });
};

var tempMinCart = function tempMinCart($parent, data, t) {
  var Template;
  data.price = data.price.toFixed(2);

  if (!t) {
    Template = "<div id='cart-popup1'>";
  } else {
    Template = "<div id='cart-popup2'>";
  }

  Template += "<div class='cart-panel-options'>" + "<div class='cart-header col-sm-12 mt0'>" + "<div class='row'>" + "<div class='col-sm-6'>" + "<a class='fs14' href='"+url_revista+"carrito'>Articulos ({{len}})</a>" + "</div>" + "<div class='col-sm-6'>" + "<button class='no-style-button right mr5 f-bold white' style='padding:0' title='Vacia el carrito' onclick='empty_cart()'>Vaciar</button>" + "</div>" + "</div>" + "</div>" + //END CART HEADER
  "<div class='cart-items style-15 bg-white'>" + "<div class='cart-item col-sm-12'>" + "{{#data}}" + "<div class='row'>" + "<div class='col-sm-2 item-logo'>" + "<div>" + "<i style='color:#003c52' class='far fa-file-alt'></i>" + "</div>" + "</div>" + //END COL 4
  "<div class='col-sm-8 item-title'>" + "<div>" + "<a href='{{uri}}' class='fs12 black'>{{{title}}}</a>" + "</div>" + "</div>" + //END COL 4
  "<div class='col-sm-2 item-action'>" + "<div>";

  if (!t) {
    Template += "<a onclick='delete_item(this, {{t}}, 1)' data-id='{{id}}' title='Eliminar || {{title}}' class='pointer black'><i class='fas fa-trash-alt'></i></a>";
  } else {
    Template += "<a onclick='delete_item(this, {{t}}, 2)' data-id='{{id}}' title='Eliminar || {{title}}' class='pointer black'><i class='fas fa-trash-alt'></i></a>";
  }

  Template += "</div>" + "</div>" + //END COL 4
  "</div>" + //END ROW
  "{{/data}}" + "{{^data}}" + //EMPTY DATA
  "<div class='col-sm-12'>" + "<div>" + "<i class='fas fa-inbox'></i>&nbsp;&nbsp; No hay ningún artículo en el carrito." + "</div>" + "</div>" + //END COL 12
  "{{/data}}" + "</div>" + //END CART ITEM
  "</div>" + //END CART ITEMS
  "<div class='cart-price bg-primary col-sm-12 white'>" + "<div class='row'>" + "<div class='col-sm-6'>" + "<div>" + "<strong>Total:</strong>" + "</div>" + "</div>" + //END COL 6
  "<div class='col-sm-6 text-right'>" + "<div>" + "<strong>{{price}} &euro; </strong>" + "</div>" + "</div>" + //END COL 6
  "</div>" + //END ROW
  "</div>" + //END ITEMS PRICE
  "<div class='cart-link col-sm-12 bg-white'>" + "<div>" + "<a class='fs14' href= '"+ url_revista +"carrito'>Ver carrito <i class='fa fa-shopping-cart' aria-hidden='true'></i></a>" + "</div>" + "</div>" + //END CART LINK
  "</div>" + //END CART PANEL OPTIONS
  "</div>";
  $parent.append(Mustache.render(Template, data));
};

var check_empty_cart = function check_empty_cart(len) {
  if (len == 0 && window.location.pathname == "/carrito/pedido") {
    location.href = "/carrito";
  } else {
    return false;
  }
};

function delete_item(el, t, x) {
  var id = el.getAttribute('data-id');
  var $el = $(el);
  var $parent;
  $el.empty();
  $.ajax({
    type: 'POST',
    url: url_revista +  "inc/carrito/controller.php",
    data: {
      id: id,
      action: t
    },
    dataType: 'json',
    beforeSend: function beforeSend(data) {
      tempMinPreloader($el);
    }
  }).done(function (response) {
    switch (x) {
      case 1:
        $parent = $('#cart_holder');
        $parent.empty();
        updatejUnit(response.len);
        tempMinCart($parent, response, 0);
        check_empty_cart(response.len);
        break;

      case 2:
        $parent = $('#cart_holder_bottom');
        $parent.empty();
        updatejUnit(response.len);
        tempMinCart($parent, response, 1);
        check_empty_cart(response.len);
        break;

      case 0:
        updatejUnit(response.len);
        check_empty_cart(response.len);
        break;
    }

    $('#refreshTable').load(' #refreshTable');
  }).fail(function (response) {
    console.error(response);
  });
}

var btnRegUser = document.getElementById('btn-reg_user'),
    $parentReg = $('#registro-usuarios');

if ($(btnRegUser).length != 0) {
  btnRegUser.addEventListener('click', async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var email = document.getElementById('email-reg').value,
        password = document.getElementById('password-reg').value,
        rpassword = document.getElementById('rpassword-reg').value;
    var keep = false;

    if (email !== '' && password !== '' && password == rpassword) {
      keep = true;
    }

    if (!keep) {
      alert('Rellena todos los campos correctamente');
      return false;
    }

    if (!__isEmail(email)) {
      alert('Email incorrecto');
      return false;
    }

    if (grecaptcha.getResponse().length == 0) {
      alert('Captcha Invalido');
      return false;
    }

    var formdata = $('#form-ui-reg').serializeArray();
    var captcha = await captcha_verify({
      captcha: formdata[7]['value']
    });

    if (captcha == "FALSE") {
      alert('Captcha Invalido');
      return false;
    }

    await send_user_data(email, password);
  });
}

var send_user_data = function send_user_data(email, password) {
  $.ajax({
    url: url_revista + 'php/reg_user.php',
    type: 'POST',
    data: {
      email: btoa(email),
      password: btoa(password),
      type: "registro_usuarios"
    },
    cache: false,
    dataType: 'json'
  }).done(function (response) {
    var data = response,
        status = data.status,
        Template;
    var messageErrorReg = document.getElementById('message-error-reg');
    messageErrorReg.innerHTML = "";

    switch (status) {
      case "ERROR":
        message_error("El usuario '".concat(email, "' ya esta registrado en la web, si se le ha olvidado la contrase\xF1a <a href='"+url_revista+"recordar-clave' target='_blank'>pulse aqui</a>"), messageErrorReg);
        break;

      case "OK":
        $parentReg.empty();
        Template = "" + "<div class='p20'>" + "<p>Inserte el código que le hemos enviado por email para activar la cuenta</p>" + "<input type='text' id='vc-text' placeholder='Código' class='form-text'/>" + "<div id='verifyResult'></div>" + "<button class='btn right bg-primary-corp mt20' style='background-image: none;' data-i='{{id}}' onclick='verifyCode(this,event)' id='btn-vcode'>Activar</button>" + "</div>" + "";
        var Data = {
          id: data.i
        };
        $parentReg.append(Mustache.render(Template, Data));
        break;
    }
  }).fail(function (response) {
    console.error(response);
  });
};

function __sendCode(el) {
  var id = el.getAttribute('data-i');
  $.ajax({
    url: url_revista + 'php/reg_user.php',
    type: 'POST',
    data: {
      i: id,
      type: "resendCode"
    },
    cache: false,
    dataType: 'json'
  }).done(function (response) {
    var status = response.status;

    switch (status) {
      case 'OK':
        $('#verifyResult').empty();
        var Template = "" + "<div class='col-md-12 msg-success-reg'><span class='blue'>Código reenviado con exito revisa tu email.</span></div>",
            Data = {
          id: id
        };
        $('#verifyResult').append(Mustache.render(Template, Data));
        break;

      case 'ERROR':
        break;
    }
  }).fail(function (response) {
    console.error(response);
  });
}

function verifyCode(el, event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  var id = el.getAttribute('data-i'),
      code = $('#vc-text').val();
  $.ajax({
    url: url_revista + 'php/reg_user.php',
    type: 'POST',
    data: {
      i: id,
      type: "vc",
      cod: code
    },
    cache: false,
    dataType: 'json'
  }).done(function (response) {
    var data = response,
        status = data.status;

    switch (status) {
      case 'OK':
        var user = data.data[0].user,
            password = data.data[0].password;
        $.ajax({
          url: url_revista,
          type: 'POST',
          data: {
            submit_login: "ENTRAR2",
            user: user,
            password: password
          },
          cache: false
        }).done(function (response) {
          // console.log(response);
          location.href = url_revista + "carrito/pedido";
        }).fail(function (response) {
          console.error(response);
        });
        break;

      case 'ERROR':
        $('#verifyResult').empty();
        var Template = "" + "<div class='col-md-12 msg-error-reg'><span class='red'>Código incorrecto </span><a class='pointer' data-i='{{id}}' onclick='__sendCode(this)'>reenviar</a></div>",
            Data = {
          id: id
        };
        $('#verifyResult').append(Mustache.render(Template, Data));
        break;
    }
  }).fail(function (response) {
    console.error(response);
  });
}