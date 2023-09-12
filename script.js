/*JS Document */

/* Objetivo: interatividade no botão */
/*Declaração das variáveis*/
var a;
var b;
var lista_tarefas;

/*Entrada de dados*/
/* PRIMEIRO BOTAO */
/*Relacionar qual botão */
a = document.getElementsByClassName('f_botao')[0];

/*Saída de dados*/
/*Adicionar evento aos botões */
a.addEventListener('mouseenter', entrar);
a.addEventListener('mouseout', sair);
a.addEventListener('touchend', sair);
a.addEventListener('click', inserir);

function entrar() {
    a.style.background = 'green';
    a.value = 'INSERIR';
};

function sair() {
    a.style.background = 'black';
    a.style.color = 'white';
    a.value = 'INSERIR';
};

/* OBJETIVO: INSERIR ELEMENTO DOM */
/*Entrada de dados*/
//invalidar campo vazio
function inserir() {
    var texto1 = document.getElementById('item_usuario1').value;
    var texto2 = document.getElementById('item_usuario2').value;
    var texto3 = document.getElementById('item_usuario3').value;

    if (texto3 !== "" && texto1!=="") {
        a.style.background = 'gray';
        a.value = 'INSERIDO';

        var item = document.createElement('li'); // Crie um elemento <li> para a lista
        var checkbox = document.createElement('input'); // Crie um elemento <input> para a caixa de seleção
        checkbox.type = 'checkbox'; // Defina o tipo como 'checkbox'
        var valor_item= document.createElement('input');
        valor_item.type='number';

        item.className = 'item'; // Adicione a classe 'item' ao elemento de lista
        checkbox.className='li_checkbox'
        valor_item.className = 'valor_item';
        item.appendChild(checkbox); // Anexe a caixa de seleção ao item da lista
        item.appendChild(document.createTextNode(texto1 + ' ' + texto2 + ' ' + texto3)); // Adicione os textos associados ao item da lista
        item.appendChild(valor_item);

        var lista_tarefas = document.getElementById('f_lista'); // Obtenha o pai onde deseja adicionar a item
        lista_tarefas.appendChild(item); // Adicione o item da lista (com a caixa de seleção e texto) à lista

        document.getElementById('item_usuario3').value = ""; // Esvazie o campo de texto3
        document.getElementById('item_usuario2').value = ""; // Esvazie o campo de texto2
        document.getElementById('item_usuario1').value = ""; // Esvazie o campo de texto1
    } else {
        window.alert('Inserir dados do item!');
    }
}

/*OBJETIVO: Quando clicar Enter, inserir item */
var input_text;

input_text = document.getElementById('item_usuario3');
input_text.addEventListener('keydown', clicou_enter);

function clicou_enter(tecla) {
    if (tecla.key == 'Enter') {
        inserir();
    }
}

/*SEGUNDO BOTAO*/
/*Relacionar qual botão*/
b = document.getElementsByClassName('f_botao')[1];

/*Saída de dados*/
/*Adicionar eventos ao botão */
b.addEventListener('click', excluir);
b.addEventListener('mouseenter', entrar2);
b.addEventListener('mouseout', sair2);

function entrar2(){

    b.style.background = 'red';
}
function sair2(){

    b.style.background = 'black';
    b.value='EXCLUIR';
}
function click2(){

    b.style.background = 'black';
}
function excluir() {
    
    b.value = 'SELECIONE';

    var selecionado;
    var listaItens;

    listaItens=document.getElementsByTagName('li');

    for(var selecionado =0 ; selecionado <listaItens.length;selecionado++){
        listaItens[selecionado].addEventListener('click',excluir_selecionado);            
    }

    
    function excluir_selecionado(){
    

    this.parentNode.removeChild(this);
    }
}

// Adicione um evento de clique a todos os checkboxes
var checkboxes = document.querySelectorAll('.li_checkbox');

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        // Chame uma função para calcular o total quando um checkbox é clicado
        calcularTotal();
    });
});

// Função para calcular o total
function calcularTotal() {
    var total = 0;
    
    // Percorra todos os itens da lista
    var itens = document.querySelectorAll('.item');
    itens.forEach(function(item) {
        var checkbox = item.querySelector('.li_checkbox');
        var valorItem = item.querySelector('.valor_item');
        
        // Verifique se o checkbox está marcado
        if (checkbox.checked) {
            // Converta o valor do item para número e some ao total
            var valor = parseFloat(valorItem.value);
            if (!isNaN(valor)) {
                total += valor;
            }
        }
    });
    
    // Atualize o texto da <p> com o total formatado
    var totalCompras = document.getElementById('total_compras');
    totalCompras.textContent = 'TOTAL: R$ ' + total.toFixed(2);
}

