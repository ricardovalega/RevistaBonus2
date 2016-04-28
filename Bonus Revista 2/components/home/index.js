'use strict';

app.home = kendo.observable({
    onShow: function () {
        // $('#fondoinicio').css({
        //     "height": screen.height + "px"
        // });
        // $('#inicio').css({
        //     "height": (screen.height / 3) + "px",
        //     "margin-top": ((screen.height) / 2) + "px"
        // })
    },
    afterShow: function () {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home

(function (parent) {
    var homeModel = kendo.observable({
        fields: {
            usuario: '',
            contrasena: '',
        },
        submit: function () {
            //console.log(buscarModel.fields.busdocumento+"-"+buscarModel.fields.busnumero);
        },
        cancel: function () {},
        sesion: function () {
            var username = homeModel.fields.usuario;
            var password = homeModel.fields.contrasena;
            console.log(username + "-" + password);
            $.ajax({
                url: servidor + 'authenticate',
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        'Authorization',
                        'Basic ' + btoa(username + ":" + password));
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var headers = XMLHttpRequest.getResponseHeader("Token");
                    console.log("token variable: " + headers);
                    $('#token').val(headers);
                    if (headers == null) {
                        alert("Datos errados en usuario o contraseña.");
                    } else {
                        app.mobileApp.navigate('#components/buscar/view.html');
                    }
                }
            });

        }
    });

    parent.set('homeModel', homeModel);
})(app.home);

/*
(function(parent){
    $("#darclic").click(function () {
        console.log("Click.");
    });
}).(app.home);
*/

/*

function sesion() {
    var username = $("#usuario").val();
    var password = $("#contrasena").val();
    console.log(username + "-" + password + "-" + servidor);
    $.ajax({
        url: servidor + 'authenticate',
        type: 'POST',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(username + ":" + password));
        },
        complete: function (XMLHttpRequest, textStatus) {
            var headers = XMLHttpRequest.getResponseHeader("Token");
            console.log("token variable: " + headers);
            $('#token').val(headers);
            if (headers == null) {
                alert("No seas palomilla, pon bien el usuario y contraseña.");
            } else {
                app.mobileApp.navigate('#components/buscar/view.html');
            }
        }
    });

}*/

console.log(screen.width + " x " + screen.height)