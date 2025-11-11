function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function showScreen(screenId) {
    var screens = document.querySelectorAll('.screen');
    screens.forEach(function (screen) {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Ponto de Equilíbrio
function calcularPontoEquilibrio() {
    var custoFixo = parseFloat(document.getElementById('custoFixo').value);
    var precoVenda = parseFloat(document.getElementById('precoVenda').value);
    var custoVariavel = parseFloat(document.getElementById('custoVariavel').value);

    if (isNaN(custoFixo) || isNaN(precoVenda) || isNaN(custoVariavel)) {
        alert('Por favor, preencha todos os campos com valores válidos!');
        return;
    }

    if (precoVenda <= custoVariavel) {
        alert('O preço de venda deve ser maior que o custo variável!');
        return;
    }

    var margemContribuicao = precoVenda - custoVariavel;
    var pontoEquilibrio = custoFixo / margemContribuicao;
    var receitaEquilibrio = pontoEquilibrio * precoVenda;
    var unidadesArredondadas = Math.ceil(pontoEquilibrio);

    document.getElementById('unidades').textContent = unidadesArredondadas.toLocaleString('pt-BR');
    document.getElementById('receita').textContent = formatarMoeda(receitaEquilibrio);
    document.getElementById('margem').textContent = formatarMoeda(margemContribuicao);

    document.getElementById('interpretationPE').innerHTML =
        '<strong>Interpretação:</strong> Você precisa vender ' +
        '<span class="highlight-purple">' + unidadesArredondadas + ' unidades</span> ' +
        'por mês para cobrir todos os seus custos. A partir dessa quantidade, cada venda adicional ' +
        'gera <span class="highlight-pink">' + formatarMoeda(margemContribuicao) + '</span> de lucro!';

    document.getElementById('resultsPE').classList.add('show');
}

function limparPontoEquilibrio() {
    document.getElementById('custoFixo').value = '';
    document.getElementById('precoVenda').value = '';
    document.getElementById('custoVariavel').value = '';
    document.getElementById('resultsPE').classList.remove('show');
}

// Lucratividade
function calcularLucratividade() {
    var receitaTotal = parseFloat(document.getElementById('receitaTotal').value);
    var lucroLiquido = parseFloat(document.getElementById('lucroLiquido').value);

    if (isNaN(receitaTotal) || isNaN(lucroLiquido)) {
        alert('Por favor, preencha todos os campos com valores válidos!');
        return;
    }

    if (receitaTotal <= 0) {
        alert('A receita total deve ser maior que zero!');
        return;
    }

    var lucratividade = (lucroLiquido / receitaTotal) * 100;

    document.getElementById('lucrPercent').textContent = lucratividade.toFixed(2) + '%';
    document.getElementById('lucrReceita').textContent = formatarMoeda(receitaTotal);
    document.getElementById('lucrLucro').textContent = formatarMoeda(lucroLiquido);

    var interpretacao = '';
    if (lucratividade < 0) {
        interpretacao = '<strong>Atenção:</strong> Sua lucratividade é <span class="highlight-purple">' + lucratividade.toFixed(2) + '%</span> (negativa). ' +
            'Isso significa que sua empresa está tendo prejuízo. É necessário reduzir custos ou aumentar as vendas.';
    } else if (lucratividade < 5) {
        interpretacao = '<strong>Interpretação:</strong> Sua lucratividade é <span class="highlight-purple">' + lucratividade.toFixed(2) + '%</span>. ' +
            'Este valor está baixo. Para cada R$ 100 em vendas, você lucra apenas <span class="highlight-green">R$ ' + (lucratividade).toFixed(2) + '</span>. ' +
            'Considere otimizar seus custos.';
    } else if (lucratividade < 10) {
        interpretacao = '<strong>Interpretação:</strong> Sua lucratividade é <span class="highlight-purple">' + lucratividade.toFixed(2) + '%</span>. ' +
            'Este é um valor razoável. Para cada R$ 100 em vendas, você lucra <span class="highlight-green">R$ ' + (lucratividade).toFixed(2) + '</span>.';
    } else if (lucratividade < 20) {
        interpretacao = '<strong>Interpretação:</strong> Sua lucratividade é <span class="highlight-purple">' + lucratividade.toFixed(2) + '%</span>. ' +
            'Excelente! Para cada R$ 100 em vendas, você lucra <span class="highlight-green">R$ ' + (lucratividade).toFixed(2) + '</span>. Sua empresa está saudável!';
    } else {
        interpretacao = '<strong>Interpretação:</strong> Sua lucratividade é <span class="highlight-purple">' + lucratividade.toFixed(2) + '%</span>. ' +
            'Fantástico! Para cada R$ 100 em vendas, você lucra <span class="highlight-green">R$ ' + (lucratividade).toFixed(2) + '</span>. Sua margem está muito boa!';
    }

    document.getElementById('interpretationLucr').innerHTML = interpretacao;
    document.getElementById('resultsLucr').classList.add('show');
}

function limparLucratividade() {
    document.getElementById('receitaTotal').value = '';
    document.getElementById('lucroLiquido').value = '';
    document.getElementById('resultsLucr').classList.remove('show');
}

// Rentabilidade
function calcularRentabilidade() {
    var lucroLiquido = parseFloat(document.getElementById('rentLucroLiquido').value);
    var investimento = parseFloat(document.getElementById('investimento').value);

    if (isNaN(lucroLiquido) || isNaN(investimento)) {
        alert('Por favor, preencha todos os campos com valores válidos!');
        return;
    }

    if (investimento <= 0) {
        alert('O investimento deve ser maior que zero!');
        return;
    }

    var rentabilidade = (lucroLiquido / investimento) * 100;

    document.getElementById('rentPercent').textContent = rentabilidade.toFixed(2) + '%';
    document.getElementById('rentLucro').textContent = formatarMoeda(lucroLiquido);
    document.getElementById('rentInvest').textContent = formatarMoeda(investimento);

    var interpretacao = '';
    if (rentabilidade < 0) {
        interpretacao = '<strong>Atenção:</strong> Sua rentabilidade (ROI) é <span class="highlight-purple">' + rentabilidade.toFixed(2) + '%</span> (negativa). ' +
            'Seu investimento está gerando prejuízo. É necessário reavaliar a estratégia do negócio.';
    } else if (rentabilidade < 5) {
        interpretacao = '<strong>Interpretação:</strong> Sua rentabilidade (ROI) é <span class="highlight-purple">' + rentabilidade.toFixed(2) + '%</span>. ' +
            'Para cada R$ 100 investidos, você obtém <span class="highlight-green">R$ ' + (rentabilidade).toFixed(2) + '</span> de retorno. ' +
            'Este valor está abaixo do ideal. Considere otimizar seus investimentos.';
    } else if (rentabilidade < 15) {
        interpretacao = '<strong>Interpretação:</strong> Sua rentabilidade (ROI) é <span class="highlight-purple">' + rentabilidade.toFixed(2) + '%</span>. ' +
            'Para cada R$ 100 investidos, você obtém <span class="highlight-green">R$ ' + (rentabilidade).toFixed(2) + '</span> de retorno. ' +
            'Este é um retorno razoável sobre o investimento.';
    } else if (rentabilidade < 30) {
        interpretacao = '<strong>Interpretação:</strong> Sua rentabilidade (ROI) é <span class="highlight-purple">' + rentabilidade.toFixed(2) + '%</span>. ' +
            'Excelente! Para cada R$ 100 investidos, você obtém <span class="highlight-green">R$ ' + (rentabilidade).toFixed(2) + '</span> de retorno. ' +
            'Seu investimento está gerando bons resultados!';
    } else {
        interpretacao = '<strong>Interpretação:</strong> Sua rentabilidade (ROI) é <span class="highlight-purple">' + rentabilidade.toFixed(2) + '%</span>. ' +
            'Fantástico! Para cada R$ 100 investidos, você obtém <span class="highlight-green">R$ ' + (rentabilidade).toFixed(2) + '</span> de retorno. ' +
            'Seu retorno sobre investimento está excepcional!';
    }

    document.getElementById('interpretationRent').innerHTML = interpretacao;
    document.getElementById('resultsRent').classList.add('show');
}

function limparRentabilidade() {
    document.getElementById('rentLucroLiquido').value = '';
    document.getElementById('investimento').value = '';
    document.getElementById('resultsRent').classList.remove('show');
}

// Permitir calcular com Enter
document.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            var screen = e.target.closest('.screen').id;
            if (screen === 'pontoEquilibrio') {
                calcularPontoEquilibrio();
            } else if (screen === 'lucratividade') {
                calcularLucratividade();
            } else if (screen === 'rentabilidade') {
                calcularRentabilidade();
            }
        }
    });
});