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

    $button.unbind('click').bind('click', event => {
        parsePython();
        enableContinue();
    });
});
