$(function () {


    function loadContent(doc) {
        var url = "../html/" + doc;

        $.get(url, function (content) {
            $("#content").html(content);
        });
    }

    function loadData(name) {
        var url = "../data/" + name + ".json";

        return $.get(url);
    }

    function init() {
        loadContent("home.html");

        $(".nav.navbar-nav").find("a").on("click", function () {
            var data = $(this).data();
            loadContent(data.load);
            $(".active").removeClass("active");
            $(this).parent().addClass("active");

        });

    }

    window.app = {
        init: init,
        loadContent: loadContent,
        loadData: loadData

    };

    app.init();

});
