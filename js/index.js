$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel').carousel();
    $('.collapsible').collapsible();

    $('#send_mail').on("click",function () {
        console.log("initiated");
        link_will_be = "mailto:shobhitmalarya8@gmail.com?Subject=Hello%from%website;";
        msg_body = $('#msg').val();
        link_will_be = link_will_be+"body="+msg_body.replace(" ","%");
        $('#actual_send_mail').attr("href", link_will_be);
        $('#actual_send_mail').click();
    });

});
