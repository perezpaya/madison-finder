
window.onload = function () {

  console.log("Loaded core")

  var form = document.forms["search-form"]
  if(form.addEventListener) {
    form.addEventListener("submit", function(evt){
      evt.preventDefault();
      submit(form)
    }, true);
  } else {
    form.attachEvent('onsubmit', function(evt){
      evt.preventDefault();
      submit(form)
    });
  }

}

function submit (form) {
  var email = form["email"].value;
  checkEmail(email)
}

function checkEmail(email) {
  emailRequest(email, function (req, emails) {
    if (!emails) return failure()
    if (emails && emails.length >= 1) {
      registeredAlert(email)
    } else {
      safeAlert(email)
    }
  })
}

function registeredAlert (email) {
  swal({
    title: "Sad news :(",
    text: email + " its registered in Ashley Madison and its data has been leaked.",
    type: "error",
    confirmButtonText: "Close"
  });
}

function safeAlert (email) {
  swal({
    title: "Good news!!",
    text: email + " was not registered in Ashley Madison",
    type: "success",
    confirmButtonText: "Close"
  });
}

function failure () {
  swal({
    title: "Failed to search email",
    text: "We might have some issues at the moment, come back later",
    type: "error",
    confirmButtonText: "Close"
  });
}

function emailRequest(email, cb) {
  var xmlhttp = new XMLHttpRequest()
  var server = "178.62.247.160"
  var url = "http://" + server + "/" + email

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var emails = JSON.parse(xmlhttp.responseText)
      cb(xmlhttp, emails)
    } else {
      cb(xmlhttp, null)
    }
  }

  xmlhttp.open("GET", url, true)
  xmlhttp.send()

}