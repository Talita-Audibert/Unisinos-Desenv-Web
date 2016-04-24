$(function() {

    function loadContent(doc) {
        var url = "../html/" + doc;

        $.get(url, function(content) {
            $("#content").html(content);
        });
    }

    function init() {
        loadContent("home.html");
        
        $(".nav.navbar-nav").find("a").on("click", function(){
            var data = $(this).data();
            loadContent(data.load);
            $(".active").removeClass("active");
            $(this).addClass("active");
        });
        
    }

    init();

});
