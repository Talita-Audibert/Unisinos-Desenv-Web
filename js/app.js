$(function () {

	function supports_history_api() {
	  return !!(window.history && history.pushState);
	}

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

        $(".navbar a").on("click", function (evt) {
			evt.preventDefault();
			
            var page = $(this).attr('href');
			if (supports_history_api()) { history.pushState({state: 'new'}, '', page); }
            loadContent(page);
			if (page != 'home.html') {
				$(".active").removeClass("active");
				$(this).parent().addClass("active");
			}
			
			return false;
        });
		
		if (supports_history_api())
		window.onpopstate = function(evt) {
			var page = window.location.pathname.substring(1);
			$(".navbar a").parent().removeClass("active");
			if (page != 'home.html') {
				$('a[href="' + page + '"]').parent().addClass("active");
			}
			loadContent(page);
		};

    }

    window.app = {
        init: init,
        loadContent: loadContent,
        loadData: loadData

    };

    app.init();

});
