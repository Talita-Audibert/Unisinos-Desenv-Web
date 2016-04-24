$(function () {
    $.get("../data/categorias.json", function (categorias) {
        
        var content = "<div class='row'>";
        
        for (var index = 0; index < categorias.length; index++) {
            var element = categorias[index];
            content +=
                "<div class='col-md-4'>" +
                    "<h3>" + element.nome + "</h3>" +
                    "<img class='img-circle' src='../img/" + element.imagem + "' alt='"+ element.nome +" ' width='140' height='140'>" +
                "</div>" ;
        }
       content += "</div>"; 
       $("#placeholder-categorias").html(content);
    });
});