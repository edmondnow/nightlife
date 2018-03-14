$("document").ready(function(){
  if(document.cookie){
    $("#loginEmail").val(document.cookie.substr(6,))
    $("#loginCheck").prop("checked", true);
  }

$('input').click( function () {
  $('h1').css("-ms-transition","all 0.30s ease-in-out");
  $('h1').css("-moz-transition","all 0.30s ease-in-out");
$('h1').css("-webkit-transition","all 0.30s ease-in-out");
  $('h1').css("-o-transition","all 0.30s ease-in-out");
$('h1').css("text-shadow","1.2px 1.2px #48A2FB")
});

$("#loginSubmit").click(function(){

  var remember = $("#loginCheck").prop('checked');
  if(remember){
    var today = new Date();
    var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
    var email = $("#loginEmail").val();

    //check out later
    document.cookie='login' + "=" + escape(email) + "; path=/; expires=" + expiry.toGMTString()
  } else {
    var today = new Date();
    var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours
    document.cookie="login=null; path=/; expires=" + expired.toGMTString();
  }
})

})