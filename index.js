const moeda = $("#moeda")
const dataInicial = $("#data-inicial")
const dataFinal = $("#data-final")
const cotacaoList = $("#cotacaoList")


async function searchCotacoes(){
    cotacaoList.html = ''
    const cotacaoNameForSearch = $('#professorNameForSearch')
    const response = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27EUR%27&@dataInicial=%2707-06-2022%27&@dataFinalCotacao=%2707-25-2022%27&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
    if(response.ok){
        const cotacoes = await response.json();
        cotacoes.forEach((cotacao) => {
            createRow(cotacao);
        });
    }
}

async function showAllCotacoes(){
    const response = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27EUR%27&@dataInicial=%2707-06-2022%27&@dataFinalCotacao=%2707-25-2022%27&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
    if(response.ok){
        const Cotacoes = await response.json();
        Cotacoes.value.forEach((cotacao) => {
            createRow(cotacao);
        });
    }
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

showAllCotacoes()