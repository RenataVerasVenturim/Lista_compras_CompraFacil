/*JS Document */
/*Objetivo: interação do menu */

//abrir
        const btn_menu = document.getElementById("btn-menu");
        const lista_suspensa = document.getElementById("lista_suspensa");

        btn_menu.addEventListener("click", function() {
            if (lista_suspensa.style.display === "" || lista_suspensa.style.display === "none") {
        lista_suspensa.style.display = "block";
    } else {
        lista_suspensa.style.display = "none";
    }
        });
 // Feche a lista suspensa se o usuário clicar fora dele
 
 window.addEventListener('click', function(event) {
    if (event.target !== lista_suspensa && event.target !== btn_menu) {
        lista_suspensa.style.display = "none";
    }
});
 // Feche inserir se o usuário clicar fora dele
 var modal_corpo=document.getElementById('corpo');
 var add=document.getElementById('add');

 window.addEventListener('click', function(event) {
    if (event.target !== modal_corpo && event.target !== add) {
        modal_corpo.style.display = 'none';

        var lista = document.getElementById('f_lista');
                if (lista.children.length === 0) {
                    document.getElementById('list_created').style.display = 'none';
                    checkListaVazia();
  ;
                } else {
                    document.getElementById('list_created').style.display = 'block';
                }
    }
});
var inputs = document.querySelectorAll('#corpo input');
inputs.forEach(function(input) {
    input.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


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
a.addEventListener('click', inserir);


/* OBJETIVO: INSERIR ELEMENTO DOM */
/*Entrada de dados*/
//invalidar campo vazio
function inserir() {
    var texto1 = document.getElementById('item_usuario1').value;
    /*var texto2 = document.getElementById('item_usuario2').value;*/
    var texto3 = document.getElementById('item_usuario3').value;

    if (texto3 !== "" && texto1!=="") {
        a.style.background = 'lightgray';
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
        item.appendChild(document.createTextNode(/*' ' + texto2 +*/ ' ' + texto3)); // Adicione os textos associados ao item da lista
        item.appendChild(valor_item);
        adicionarBotaoExcluir(item);
        document.getElementById('list_created').style.display = 'block';

        function adicionarBotaoExcluir(liItem) {
            var botaoExcluir = document.createElement('span');
            botaoExcluir.className = 'botao-excluir';
            botaoExcluir.textContent = '❌'; // Unicode "x"
            botaoExcluir.addEventListener('click', function() {
                liItem.remove(); // Remove a linha quando o botão "x" for clicado
                calcularTotal();

                var lista = document.getElementById('f_lista');
                if (lista.children.length === 0) {
                    document.getElementById('list_created').style.display = 'none';
                    checkListaVazia();
  ;
                } else {
                    document.getElementById('list_created').style.display = 'block';
                }
            });
            liItem.appendChild(botaoExcluir);
        }

        checkbox.addEventListener('click', function() {
            var liItem = this.parentElement; 
            if (this.checked) {
                liItem.style.textDecoration = 'line-through'; 
                // Mova o item para o final da lista (mantendo a ordem dos outros itens)
                lista_tarefas.removeChild(liItem);
                lista_tarefas.appendChild(liItem);
            } else {
                liItem.style.textDecoration = 'none';
                // Mova o item de volta para a posição original na lista
                lista_tarefas.removeChild(liItem);
                lista_tarefas.insertBefore(liItem, lista_tarefas.firstChild);
            }
            calcularTotal();
        });

        var lista_tarefas = document.getElementById('f_lista'); // Obtenha o pai onde deseja adicionar a item
        lista_tarefas.appendChild(item); // Adicione o item da lista (com a caixa de seleção e texto) à lista

        document.getElementById('item_usuario3').value = ""; // Esvazie o campo de texto3
        /*document.getElementById('item_usuario2').value = "unidade(s)"; // Esvazie o campo de texto2*/
        document.getElementById('item_usuario1').value = ""; // Esvazie o campo de texto1
       
        setTimeout(function() {
            a.style.background = 'lightblue';
            a.style.color = 'black';
            a.value = 'INSERIR';
        }, 300);
    } else {
        window.alert('Inserir dados do item!');
    }
    checkListaVazia();
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
/*b = document.getElementsByClassName('f_botao')[1];

/*Saída de dados*/
/*Adicionar eventos ao botão */
/*b.addEventListener('click', excluir);
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
    b.value = 'EXCLUÍDO';

    var listaItens = document.querySelectorAll('.li_checkbox:checked');

    listaItens.forEach(function(item) {
        item.closest('.item').remove();
    });

    // Após a exclusão, recalcule o total
    calcularTotal();
}
*/

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

document.getElementById('add').addEventListener('click', function() {
    // Remove a classe CSS que esconde a div #corpo
    document.getElementById('corpo').style.display = 'block';

    // Esconde a div #msg_inicial definindo o estilo diretamente
    document.getElementById('msg_inicial').style.display = 'none';
});
// Adicione um evento para fechar o "corpo" quando o botão "Fechar Corpo" for clicado
document.getElementById('fechar-corpo').addEventListener('click', function() {
    document.getElementById('corpo').style.display = 'none';
    var lista = document.getElementById('f_lista');
    if (lista.children.length === 0) {
        checkListaVazia();
    } else {
        document.getElementById('list_created').style.display = 'block';
    }
});


function checkListaVazia() {
    var lista = document.getElementById('f_lista');
    var msgInicial = document.getElementById('msg_inicial');
    
    // Verifique se a lista está vazia (sem <li> elementos)
    if (lista.children.length === 0) {
        msgInicial.style.display = 'block'; // Mostrar a mensagem inicial
    } else {
        msgInicial.style.display = 'none'; // Ocultar a mensagem inicial
    }
}