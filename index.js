const cotacaoList = $("#cotacaoList")

async function searchCotacoes(){
    cotacaoList.html('')
    const moeda = $('#moeda')
    var dataInicial = $("#data-inicial")
    var dataFinal = $("#data-final")

    if(dataFinal.val() < dataInicial.val()){
        alert("data final menor do que a inicial")
    }
    else{
    dataInicial = dataAtualFormatada(dataInicial.val())
    dataFinal =  dataAtualFormatada(dataFinal.val())

    const response = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27"+moeda.val()+"%27&@dataInicial=%27"+dataInicial+"%27&@dataFinalCotacao=%27"+dataFinal+"%27&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
    if(response.ok){
        const cotacoes = await response.json();
        cotacoes.value.forEach((cotacao) => {
            createRow(cotacao);
        });
    }}
}

async function createRow({ cotacaoCompra, cotacaoVenda , dataHoraCotacao}){
    const row = $('<tr/>',{
        class: 'row'
    });
    const cotacaoDeCompraColumn = $('<td/>')
    const cotacaoDeVendaColumn = $('<td/>')
    const dataHoraCotacaoColumn = $('<td/>')

    cotacaoDeCompraColumn.text(cotacaoCompra)
    cotacaoDeVendaColumn.text(cotacaoVenda)
    dataHoraCotacaoColumn.text(dataHoraCotacao)

    row.attr("class","cotacoes-row")
    row.append(cotacaoDeCompraColumn)
    row.append(cotacaoDeVendaColumn)
    row.append(dataHoraCotacaoColumn)

    cotacaoList.append(row)
}

function dataAtualFormatada(data){
    return  data.substring(5,7) + "-" + data.substring(8,10) + "-" + data.substring (0,4)

}
