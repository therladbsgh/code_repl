var editor = ace.edit("py-code");
document.getElementById('py-code').style.fontSize='1em';
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/python");
editor.getSession().setUseSoftTabs(true);

function generateUsername () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function parsePython() {

    const code = editor.getValue();

    const username = getCookie("username");

    App.python.parse(username, code);
}

function printPythonOutput(responseOutput) {

    const $button = $("#py-submit");

    let output = "";

    if (responseOutput === "") {
        output = ["None"];
    } else {
        output = responseOutput.split("\n");
        output.length = output.length - 1;
    }

    console.log(output);

    for (let i = 0; i < output.length; i++) {
        $("#py-console").append("<pre class=\"console-output\">" + output[i] + "</pre>");
    }

    let update = function() {
        $button.popover('dispose');
        console.log($("#py-console").text());
        if (check()) {
            enableContinue();
            $button.popover({
                title: "You passed!",
                content: "Congratulations! Click the 'Continue' button on the bottom right to go to the next lesson."
            })
        } else {
            $button.popover({
                title: "You failed!",
                content: "Oh no! Check your code and try again."
            })
        }

        $button.popover('show');
    }

    update();
}

function enableContinue() {

    const $button = $("#tutorial-continue");

    $button.prop('disabled', false);
    $button.attr('class', 'btn btn-outline-success');

}


// Waits for DOM to load before running
$(document).ready(() => {

    if (document.cookie.indexOf('username=') === -1) {
        document.cookie = "username=" + generateUsername();
    }

    const $button = $("#py-submit");
    const $continueButton = $("#tutorial-continue");

    $(document).click(function (evt) {
        if (evt.target.id == "py-submit") {
            return;
        } else {
            $button.popover('hide');
        }
    });

    $button.unbind('click').bind('click', event => {

        $button.popover('dispose');

        parsePython();
    });

    $continueButton.unbind('click').bind('click', event => {
        const num = $("#tutorial-page").data('num') + 1;
        window.location.href = num;
    });

});
