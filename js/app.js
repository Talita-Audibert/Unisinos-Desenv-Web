$(function() {

    function loadContent(doc) {
        var url = "../html/" + doc;

        $.get(url, function(content) {
            $("#content").html(content);
        });
    }

    function init() {
        loadContent("home.html");
        
        $(".nav.masthead-nav").find("a").on("click", function(){
            var data = $(this).data();
            loadContent(data.load);
        });
        
    }

    init();

});
