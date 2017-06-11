function parsePython() {

    const code = $("#py-code").val();

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
            $("#py-console").append("<pre style=\"margin: 0;\">" + output[i] + "</pre>");
        }
    });
}

// Waits for DOM to load before running
$(document).ready(() => {

    const $button = $("#py-submit");

    $button.unbind('click').bind('click', event => {
        parsePython();
    });
});
