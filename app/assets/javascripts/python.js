function parsePython() {

    const code = $("#py-code").val();

    const postParameters = {"code": code};

    $.post("/parse-py", postParameters, responseJSON => {
        $("#py-console").append("<p style=\"margin: 0;\">" + responseJSON['output'] + "</p>");
    });
}

// Waits for DOM to load before running
$(document).ready(() => {

    const $button = $("#py-submit");

    $button.unbind('click').bind('click', event => {
        parsePython();
    });
});
