var editor = ace.edit("py-code");
document.getElementById('py-code').style.fontSize='1em';
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/python");
editor.getSession().setUseSoftTabs(true);

function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
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
        document.cookie = "username=" + generateUUID();
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
