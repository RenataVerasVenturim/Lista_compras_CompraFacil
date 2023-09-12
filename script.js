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
        valor_item.placeholder = 'R$';
        var unidades=document.createElement('span');

        // Adicione o elemento <span> ao elemento <li> com a classe 'item'
       

        item.className = 'item'; // Adicione a classe 'item' ao elemento de lista
        checkbox.className='li_checkbox'
        valor_item.className = 'valor_item';
        unidades.className='unidades';
        
        unidades.appendChild(document.createTextNode(texto1));
        item.appendChild(checkbox);                
        item.appendChild(unidades); // Adicione os textos associados ao item da lista
        item.appendChild(document.createTextNode(' ' + texto2 + ' ' + texto3)); // Adicione os textos associados ao item da lista
        item.appendChild(valor_item);

        checkbox.addEventListener('click', function() {
            calcularTotal();
        });
        
        var lista_tarefas = document.getElementById('f_lista'); // Obtenha o pai onde deseja adicionar a item
        lista_tarefas.appendChild(item); // Adicione o item da lista (com a caixa de seleção e texto) à lista

        document.getElementById('item_usuario3').value = ""; // Esvazie o campo de texto3
        document.getElementById('item_usuario2').value = "unidade(s)"; // Esvazie o campo de texto2
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
        // Chame a função para calcular o total sempre que um checkbox for clicado
        calcularTotal();
    });
});

function calcularTotal() {
    var total = 0;

    // Percorra todos os checkboxes
    var checkboxes = document.querySelectorAll('.li_checkbox');
    checkboxes.forEach(function(checkbox) {
        // Encontre o item pai do checkbox
        var item = checkbox.closest('.item');

        // Obtenha o valor do item e as unidades do item atual
        var valorItem = parseFloat(item.querySelector('.valor_item').value);
        var unidadesText = item.querySelector('.unidades').textContent;
        var qnt = parseFloat(unidadesText);

        // Verifique se os valores são válidos
        if (!isNaN(valorItem) && !isNaN(qnt)) {
            // Se o checkbox estiver marcado, adicione o valor do item ao total
            if (checkbox.checked) {
                total += valorItem * qnt;
            }
        }
    });

    // Atualize o texto da <p> com o total formatado
    var totalCompras = document.getElementById('total_compras');
    totalCompras.textContent = 'TOTAL: R$ ' + total.toFixed(2);
}

// Chame a função de cálculo inicial para considerar o item que já estava presente
calcularTotal();

