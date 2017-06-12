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

// Waits for DOM to load before running
$(document).ready(() => {

    const $button = $("#py-submit");

    $button.unbind('click').bind('click', event => {
        parsePython();
    });

    $("#py-code").unbind('keydown').bind('keydown', function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var $this = $(this);
            var value = $this.val();

            // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start)
                      + "    "
                      + value.substring(end));

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 4;

            // prevent the focus lose
            e.preventDefault();
        }
    });
});
