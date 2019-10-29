(function () {

    var demoButton = $("#demoButton");
    var downloadButton = $("#downloadButton");

    var firstNameInput = $("#firstNameInput");
    var lastNameInput = $("#lastNameInput");
    var emailInput = $("#emailInput");

    var downloadList = $("#downloadList");

    demoButton.click(function () {

        demoButton.attr("disabled", true);
        firstNameInput.attr("disabled", true);
        lastNameInput.attr("disabled", true);
        emailInput.attr("disabled", true);

        $.ajax({
            type: 'POST',
            url: "https://api.rbmk.io/licenses/generate",
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify ({
                "type": "alpha",
                "email": emailInput.val(),
                "firstName": firstNameInput.val(),
                "lastName": lastNameInput.val()
            }),
            success: function(data) {
                var wasEmailed = data.data.wasEmailed;
                if (wasEmailed) {
                    demoButton.removeClass("btn-primary");
                    demoButton.addClass("btn-success");
                    demoButton.text("Email has been sent");

                    var buttons = downloadList.children();
                    buttons.show();
                } else {
                    demoButton.removeClass("btn-primary");
                    demoButton.addClass("btn-warning");
                    demoButton.text("An error has occurred");
                }
            },
            error: function () {
                demoButton.removeClass("btn-primary");
                demoButton.addClass("btn-warning");
                demoButton.text("An error has occurred");
            }
        });

        return false;
    });

    downloadButton.click(function () {
        var buttons = downloadList.children();
        buttons.show();

        return false;
    });

    $(document).ready(function () {
        var buttons = downloadList.children();
        buttons.hide();
    });

})();