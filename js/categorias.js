$(function () {
    app.loadData("categorias").done(function (categorias) {
        
        var content = "<div class='row'>";
        
        for (var index = 0; index < categorias.length; index++) {
            var element = categorias[index];
            content +=
                "<div class='col-md-4'>" +
                    "<h3>" + element.nome + "</h3>" +
                    "<img class='img-circle' src='../img/" + element.imagem + "' alt='"+ element.nome +" ' width='150' height='85'>" +
                "</div>" ;
        }
       
       content += "</div>"; 
       
       $("#placeholder-categorias").html(content);
       
       $("#placeholder-categorias .col-md-4").on("click", function () {
           var categ = $(this).find("h3").text().split(" ")[1].replace("ô", "o");
          
           app.loadData(categ).done(function (c) {
             
             var resultado = "<p><strong>Portas: </strong>" +
c.portas + " </p><p><strong>Ocupantes: </strong>" + c.ocupantes + "</p><p><strong>Ar Condicionado: </strong>" + c.arCondicionado + "</p><p><strong>Tipo de Direção: </strong>" + c.tipodeDirecao + "</p><p><strong>Tipo de Câmbio: </strong>" 
+ c.tipodeCambio + "</p><p><strong>Trio Elétrico: </strong>"  + c.trioEletrico + "</p><p><strong>Air Bag: </strong>" + c.airBag + "</p><p><strong>Freios ABS: </strong>" + c.freiosABS + "</p><p><strong>Rádio: </strong>" + c.radio + "</p><p><strong>Bagagem: </strong>" + c.bagagem + "</p></div></div>";
            
             $("#categoria-selecionada").html(resultado);  
             $("#modal-detalhes").modal();
           });    
       });
    });
    
    
      
});