document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    // Coletando os dados
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var nascimento = document.getElementById('nascimento').value;

    var cep = document.getElementById('cep').value;
    var rua = document.getElementById('rua').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var uf = document.getElementById('uf').value;
    var ibge = document.getElementById('ibge').value;
    var ddd = document.getElementById('ddd').value;
    var gia = document.getElementById('gia').value;


    // Criando uma nova linha
    var trrow = document.createElement("tr");

    // Criando e populando as células
    var cell1 = document.createElement("td");
    cell1.textContent = nome;
    trrow.appendChild(cell1);

    var cell2 = document.createElement("td");
    cell2.textContent = telefone;
    trrow.appendChild(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = nascimento;
    trrow.appendChild(cell3);

    //cep
    var cell4 = document.createElement("td");
    cell4.textContent = cep;
    trrow.appendChild(cell4);

    var cell5 = document.createElement("td");
    cell5.textContent = rua;
    trrow.appendChild(cell5);

    var cell6 = document.createElement("td");
    cell6.textContent = bairro;
    trrow.appendChild(cell6);

    var cell7 = document.createElement("td");
    cell7.textContent = cidade;
    trrow.appendChild(cell7);

    var cell8 = document.createElement("td");
    cell8.textContent = uf;
    trrow.appendChild(cell8);

    var cell9 = document.createElement("td");
    cell9.textContent = ibge;
    trrow.appendChild(cell9);

    var cell10 = document.createElement("td");
    cell10.textContent = ddd;
    trrow.appendChild(cell10);

    var cell11 = document.createElement("td");
    cell11.textContent = gia;
    trrow.appendChild(cell11);

    // Adicionando botões de edição e exclusão
    var cellAcao = document.createElement("td");

    // Botão de edição
    var botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.onclick = function () {
        editarLinha(trrow);
    };
    cellAcao.appendChild(botaoEditar);

    // Botão de exclusão
    var botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'excluir-btn';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function () {
        excluirLinha(trrow);
    };
    cellAcao.appendChild(botaoExcluir);

    trrow.appendChild(cellAcao);

    // Adicionando a nova linha à tabela
    document.getElementById('tabela').appendChild(trrow);

    // Exibindo a mensagem de alerta
    exibirAlerta('Sucesso! Operação realizada com êxito.', 'success');

    // Limpa o formulário
    document.getElementById('nome').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('nascimento').value = "";
    document.getElementById('cep').value = "";
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
    document.getElementById('ddd').value = "";
    document.getElementById('gia').value = "";
});

function exibirAlerta(mensagem, tipo) {
    var alerta = document.createElement('div');
    alerta.classList.add('alert', 'show', 'alert-' + tipo);
    alerta.textContent = mensagem;
    document.getElementById('alertContainer').appendChild(alerta);

    // Fecha o alerta após 5 segundos
    setTimeout(function () {
        alerta.classList.remove('show');
        setTimeout(function () {
            alerta.remove();
        }, 500);
    }, 5000);
}

function editarLinha(button) {
    var linha = button.parentNode.parentNode;
    var celulas = linha.getElementsByTagName('td');
    var nome = celulas[0].textContent;
    var numero = celulas[1].textContent;
    var nascimento = celulas[2].textContent;
    var cep = celulas[3].textContent;
    var rua = celulas[4].textContent;
    var bairro = celulas[5].textContent;
    var cidade = celulas[6].textContent;
    var uf = celulas[7].textContent;
    var ibge = celulas[8].textContent;
    var ddd = celulas[9].textContent;
    var gia = celulas[10].textContent;

    // Aqui você pode preencher o formulário com os dados da linha para edição
    document.getElementById('nome').value = nome;
    document.getElementById('telefone').value = numero;
    document.getElementById('nascimento').value = nascimento;
    document.getElementById('cep').value = cep;
    document.getElementById('rua').value = rua;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('uf').value = uf;
    document.getElementById('ibge').value = ibge;
    document.getElementById('ddd').value = ddd;
    document.getElementById('gia').value = gia;

    // Remover a linha antiga
    linha.remove();

}

function excluirLinha(button) {
    var linha = button.parentNode.parentNode;
    linha.remove();
}


//Utilização do cep 

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
    document.getElementById('ibge').value = ("");
    document.getElementById('ddd').value = ("")
    document.getElementById('gia').value = ("")
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        document.getElementById('ibge').value = (conteudo.ibge);
        document.getElementById('ddd').value = (conteudo.ddd);
        document.getElementById('gia').value = (conteudo.gia);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('ibge').value = "...";
            document.getElementById('ddd').value = "...";
            document.getElementById('gia').value = "...";
            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

//mascara
var cepInput = document.getElementById('cep');
var maskOptionsCpf = {
    mask: '00000-000' // Define a máscara como ###.###.###-##
};
$(document).ready(function () {
    $('#cep').inputmask();
});