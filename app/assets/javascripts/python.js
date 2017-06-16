var editor = ace.edit("py-code");
document.getElementById('py-code').style.fontSize='1em';
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/python");
editor.getSession().setUseSoftTabs(true);

function parsePython() {

    const code = editor.getValue();

    const postParameters = {"code": code};

    $.post("/parse-py", postParameters, responseJSON => {

        let output = "";

        if (responseJSON['output'] === "") {
            output = ["None"];
        } else {
            output = responseJSON['output'].split("\n");
            output.length = output.length - 1;
        }

        console.log(output);

        for (let i = 0; i < output.length; i++) {
            $("#py-console").append("<pre class=\"console-output\">" + output[i] + "</pre>");
        }
    });
}

function enableContinue() {

    const $button = $("#tutorial-continue");

    $button.prop('disabled', false);
    $button.attr('class', 'btn btn-outline-success');

}

// Waits for DOM to load before running
$(document).ready(() => {

    const $button = $("#py-submit");
    const $continueButton = $("#tutorial-continue");

    $button.unbind('click').bind('click', event => {
        parsePython();
        if (check()) {
            enableContinue();
        }
    });

    $continueButton.unbind('click').bind('click', event => {
        const num = $("#tutorial-page").data('num') + 1;
        window.location.href = num;
    });

});
