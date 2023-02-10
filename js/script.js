document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "script-php.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(`nome=${nome}&email=${email}`);

  // Armazena o e-mail do usuário no cookie
  document.cookie = `nome=${nome}&email=${email}`;
});

/*-----------VALIDATIONS-----------*/
function valida() {
  let x = document.getElementsByClassName("warning");
  let i;
  for (i = 0; i < x.length; i++) {
    x[i].classList.add("invisible");
  }
  x = document.getElementsByClassName("incomplete");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("incomplete");
  }

  if (document.getElementById("phone").value.length < 14) {
    document.getElementById("phone").classList.add("incomplete");
    document.getElementById("warning-phone").classList.remove("invisible");
    return 0;
  }

  if (document.getElementById("cep").value.length != 9) {
    document.getElementById("cep").classList.add("incomplete");
    document.getElementById("warning-cep").classList.remove("invisible");
    return 0;
  }

  return 1;
}

/*-------- SUBMIT ---------*/
$(document).ready(function () {
  function handleSubmit(event) {
    const endpoint = "http://127.0.0.1:7000/";
    event.preventDefault();

    if (valida()) {
      $.ajax({
        type: "POST",
        data: $("#form").serializeArray(),
        url: endpoint,
        success: function (result) {
          if (result.hasOwnProperty("success") && result.success) {
            // mensagem de sucesso
          } else {
            // mensagem de erro
          }
        },
      });
    }
  }

  var myCheckbox = document.getElementById("privacy");
  myCheckbox.checked = true;

  document
    .getElementById("form")
    .addEventListener("submit", handleSubmit, false);
});

var behavior = function (val) {
    return val.replace(/\D/g, "").length === 11
      ? "(00) 00000-0000"
      : "(00) 0000-00009";
  },
  options = {
    onKeyPress: function (val, e, field, options) {
      field.mask(behavior.apply({}, arguments), options);
    },
  };

$("#phone").mask(behavior, options);

/*-------- CEP ---------*/

var cepInput = document.getElementById("cep");
var streetInput = document.getElementById("street");
var addressInput = document.getElementById("addressNumber");
var neighborhoodInput = document.getElementById("neighborhood");
var cityInput = document.getElementById("city");
var ufInput = document.getElementById("uf");

cepInput.addEventListener("change", function () {
  var cep = cepInput.value;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://viacep.com.br/ws/" + cep + "/json/");
  xhr.send();

  xhr.addEventListener("load", function () {
    var endereco = JSON.parse(xhr.responseText);

    streetInput.value = endereco.logradouro;
    addressInput.value = endereco.numero;
    neighborhoodInput.value = endereco.bairro;
    cityInput.value = endereco.localidade;
    ufInput.value = endereco.uf;
  });
});

/*-------- VERIFY COOKIE EMAIL ---------*/

document.getElementById("email").addEventListener("blur", function () {
  var email = this.value;

  if (document.cookie.indexOf(email) !== -1) {
    this.value = "";

    alert("E-mail já existente no cookie");
  }
});
