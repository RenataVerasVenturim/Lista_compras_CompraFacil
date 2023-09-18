/*JS Document */
/*Objetivo: interação do menu */


// Abrir
var btn_menu = document.getElementById("btn-menu");
var lista_suspensa = document.getElementById("lista_suspensa");

btn_menu.addEventListener("click", function() {
    if (lista_suspensa.style.display !== "none") {
        lista_suspensa.style.display = "none";
    } else {
        lista_suspensa.style.display = "block";
    }
});


// Fechar itens se o usuário clicar fora deles
//var lista_suspensa = document.getElementById("lista_suspensa");
var modal_corpo = document.getElementById('corpo');
var add = document.getElementById('add');
var nome_lista = document.getElementById('nome_lista');
var btn_menu = document.getElementById("btn-menu");
var list_created=document.getElementById('list_created');
var msg_inicial=document.getElementById('msg_inicial');

window.addEventListener('click', function(event) {
    if (event.target !== btn_menu && event.target !== modal_corpo && event.target !== add && event.target !== nome_lista && event.target !== list_created) {

        modal_corpo.style.display = 'none';
        nome_lista.style.display='none';
        list_created.style.display='none';

        var lista = document.getElementById('f_lista');
        if (lista.children.length === 0) {
            document.getElementById('list_created').style.display = 'none';
            checkListaVazia();
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
/* Declaração das variáveis */
var a;
var b;
var lista_tarefas;

/* Entrada de dados */
/* PRIMEIRO BOTAO */
/* Relacionar qual botão */
a = document.getElementsByClassName('f_botao')[0];

/* Saída de dados */
/* Adicionar evento aos botões */
a.addEventListener('click', inserir);

/* OBJETIVO: INSERIR ELEMENTO DOM */
/* Entrada de dados */
// Invalidar campo vazio
function inserir() {
    var texto1 = document.getElementById('item_usuario1').value;
    var texto3 = document.getElementById('item_usuario3').value;

    if (texto3 !== "" && texto1 !== "") {
        a.style.background = 'lightgray';
        a.value = 'INSERIDO';

        var item = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        var valor_item = document.createElement('input');
        valor_item.type = 'number';
        valor_item.placeholder = 'R$';
        var unidades = document.createElement('span');

        item.className = 'item';
        checkbox.className = 'li_checkbox';
        valor_item.className = 'valor_item';
        unidades.className = 'unidades';

        unidades.appendChild(document.createTextNode(texto1));
        item.appendChild(checkbox);
        item.appendChild(unidades);
        item.appendChild(document.createTextNode(' ' + texto3));
        item.appendChild(valor_item);
        adicionarBotaoExcluir(item);
        document.getElementById('list_created').style.display = 'block';

        function adicionarBotaoExcluir(liItem) {
            var botaoExcluir = document.createElement('span');
            botaoExcluir.className = 'botao-excluir';
            botaoExcluir.textContent = '❌';
            botaoExcluir.addEventListener('click', function() {
                liItem.remove();
                calcularTotal();

                var lista = document.getElementById('f_lista');
                if (lista.children.length === 0) {
                    document.getElementById('list_created').style.display = 'none';
                    checkListaVazia();
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
                lista_tarefas.removeChild(liItem);
                lista_tarefas.appendChild(liItem);
            } else {
                liItem.style.textDecoration = 'none';
                lista_tarefas.removeChild(liItem);
                lista_tarefas.insertBefore(liItem, lista_tarefas.firstChild);
            }
            calcularTotal();
        });

        var lista_tarefas = document.getElementById('f_lista');
        lista_tarefas.appendChild(item);

        document.getElementById('item_usuario3').value = "";
        document.getElementById('item_usuario1').value = "";

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

/* OBJETIVO: Quando clicar Enter, inserir item */
var input_text;

input_text = document.getElementById('item_usuario3');
input_text.addEventListener('keydown', clicou_enter);

function clicou_enter(tecla) {
    if (tecla.key == 'Enter') {
        inserir();
    }
}

// Adicione um evento de clique a todos os checkboxes
var checkboxes = document.querySelectorAll('.li_checkbox');

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        calcularTotal();
    });
});

function calcularTotal() {
    var total = 0;

    var checkboxes = document.querySelectorAll('.li_checkbox');
    checkboxes.forEach(function(checkbox) {
        var item = checkbox.closest('.item');
        var valorItem = parseFloat(item.querySelector('.valor_item').value);
        var unidadesText = item.querySelector('.unidades').textContent;
        var qnt = parseFloat(unidadesText);

        if (!isNaN(valorItem) && !isNaN(qnt)) {
            if (checkbox.checked) {
                total += valorItem * qnt;
            }
        }
    });

    var totalCompras = document.getElementById('total_compras');
    totalCompras.textContent = 'TOTAL: R$ ' + total.toFixed(2);
}

calcularTotal();

document.getElementById('add').addEventListener('click', function() {
    var lista = document.getElementById('f_lista');
    if (lista.children.length > 0) {
        document.getElementById('corpo').style.display = 'block';
    } else {
        document.getElementById('nome_lista').style.display = 'block';
        document.getElementById('msg_inicial').style.display = 'none';
    }
});

document.getElementById('fechar-corpo').addEventListener('click', function() {
    document.getElementById('corpo').style.display = 'none';
    var lista = document.getElementById('f_lista');
    if (lista.children.length === 0) {
        checkListaVazia();
    } else {
        document.getElementById('list_created').style.display = 'block';
    }
});

document.getElementById('fechar-lista-nome').addEventListener('click', function() {
    document.getElementById('nome_lista').style.display = 'none';
    document.getElementById('input_nome').value="";
    checkListaVazia();
});


function checkListaVazia() {
    var lista = document.getElementById('f_lista');
    var msgInicial = document.getElementById('msg_inicial');

    if (lista.children.length === 0) {
        msgInicial.style.display = 'block';
        document.getElementById('nome_lista').style.display='none';
        document.getElementById('corpo').style.display='none';
        document.getElementById('list_created').style.display='none';
        return true;
    } else {
        msgInicial.style.display = 'none';

    }
}

var nome_lista = document.getElementById('nome_lista');

nome_lista.addEventListener('click', function(event) {
    event.stopPropagation();
});

var elementosFilhos = nome_lista.querySelectorAll('*');
elementosFilhos.forEach(function(elemento) {
    elemento.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

var btnNome = document.getElementById('btn-nome');
var inputNome = document.getElementById('input_nome');
var tituloLista = document.querySelector('#list_created h1');

btnNome.addEventListener('click', function() {
    var nomeDaLista = inputNome.value;

    if (nomeDaLista.trim() !== '') {
        tituloLista.textContent = nomeDaLista;
        document.getElementById('nome_lista').style.display = 'none';
        document.getElementById('corpo').style.display = 'block';
    } else {
        alert('Por favor, insira o nome da lista.');
    }
});

document.getElementById('link-calculadora').addEventListener('click', function() {
    document.getElementById('calculadora-modal').style.display = 'block';
});

document.getElementById('fechar-calculadora').addEventListener('click', function() {
    document.getElementById('calculadora-modal').style.display = 'none';
    document.getElementById('valor1').value="";
    document.getElementById('valor2').value="";
    document.getElementById('quantidade1').value="";
    document.getElementById('quantidade2').value="";
    document.getElementById('resultado').textContent="";
});


window.addEventListener('click', function(event) {
    var modal = document.getElementById('calculadora-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('valor1').value="";
        document.getElementById('valor2').value="";
        document.getElementById('quantidade1').value="";
        document.getElementById('quantidade2').value="";
        document.getElementById('resultado').textContent="";
    }
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('sobre_app-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('calcular').addEventListener('click', function() {
    var valor1 = parseFloat(document.getElementById('valor1').value);
    var quantidade1 = parseFloat(document.getElementById('quantidade1').value);
    var valor2 = parseFloat(document.getElementById('valor2').value);
    var quantidade2 = parseFloat(document.getElementById('quantidade2').value);

    if (isNaN(valor1) || isNaN(quantidade1) || isNaN(valor2) || isNaN(quantidade2)) {
        document.getElementById('resultado').textContent = 'Por favor, insira valores válidos.';
    } else {
        var precoPorUnidade1 = valor1 / quantidade1;
        var precoPorUnidade2 = valor2 / quantidade2;

        if (precoPorUnidade1 < precoPorUnidade2) {
            document.getElementById('resultado').textContent = 'A opção 1 é a mais econômica';
        } else if (precoPorUnidade1 > precoPorUnidade2) {
            document.getElementById('resultado').textContent = 'A opção 2 é a mais econômica.';
        } else {
            document.getElementById('resultado').textContent = 'As opções têm o mesmo preço por unidade.';
        }
    }
});

document.getElementById('link-sobre_app').addEventListener('click', function() {
    document.getElementById('sobre_app-modal').style.display = 'block';
});

document.getElementById('fechar-sobre_app').addEventListener('click', function() {
    document.getElementById('sobre_app-modal').style.display = 'none';
});

document.getElementById('fechar-list_created').addEventListener('click', function() {

    location.reload();
    
        /*var lista = document.getElementById('f_lista');
        if (lista.children.length === 0) {
            checkListaVazia();
        } else {
            document.getElementById('list_created').style.display = 'block';
        }
        checkListaVazia();*/
    });
//criar salvamento da lista
// Função para exibir as listas salvas quando o link "LISTAS" for clicado
// Array global para armazenar listas salvas
let listasSalvas = JSON.parse(localStorage.getItem("minhas_listas")) || [];

// Função para carregar e exibir a lista selecionada
function carregarListaSelecionada(index) {
    const listaSelecionada = listasSalvas[index];
    if (listaSelecionada) {
        document.getElementById("list_created").innerHTML = listaSelecionada.conteudo;
        document.querySelector("#list_created h1").textContent = listaSelecionada.titulo; // Atualize o h1 com o título correto
        document.getElementById("listas-salvas").style.display = "none";
        calcularTotal();
        atribuirEventoExcluir();
        adicionarFuncionalidadeAItensCarregados();
    }
}



function atribuirEventoExcluir() {
    var botoesExcluir = document.querySelectorAll('.botao-excluir');

    botoesExcluir.forEach(function(botao) {
        botao.addEventListener('click', function() {
            var liItem = this.parentElement;
            liItem.remove();
            calcularTotal();
        });
    });
}

function exibirListasSalvas() {
    const listaDropdown = document.getElementById("listas-salvas");

    listaDropdown.innerHTML = ""; // Limpar itens anteriores

    listasSalvas.forEach((lista, index) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.classList.add("minhas_listas_salvas");
        link.textContent = lista.titulo; // Usar o título da lista
        link.addEventListener("click", () => {
            carregarListaSelecionada(index); // Carregar a lista selecionada
            msgInicial.style.display = 'none'; // Esconder msgInicial ao clicar na lista
        });
        listItem.appendChild(link);
        listaDropdown.appendChild(listItem);
    });


    var msgInicial = document.getElementById('msg_inicial');

}


// Adicione um evento de clique para o link "LISTAS"
document.getElementById("minhas_listas").addEventListener("click", exibirListasSalvas);

// Função para salvar a lista no localStorage
function salvarLista() {
    const tituloLista = document.querySelector("#list_created h1").textContent; // Obtenha o texto do h1

    if (tituloLista) {
        const listasSalvas = JSON.parse(localStorage.getItem("minhas_listas")) || [];
        listasSalvas.push({ titulo: tituloLista, conteudo: document.getElementById("list_created").innerHTML });
        localStorage.setItem("minhas_listas", JSON.stringify(listasSalvas));
        alert("Lista salva com sucesso!");

        // Após salvar a lista, atualize as listas exibidas
        exibirListasSalvas();

        // Verifique o estado do localStorage após o salvamento
        console.log(localStorage.getItem("minhas_listas"));

        event.stopPropagation();

        location.reload();

    } else {
        alert("A lista está vazia. Adicione itens antes de salvar.");
    }
}

// Função para carregar listas do localStorage e exibi-las no menu suspenso
function carregarListas() {
    exibirListasSalvas();
}

// Chame a função para carregar listas quando a página for carregada
carregarListas();

// Adicione um evento de clique para o botão "Salvar Lista"
document.getElementById("salvar-lista").addEventListener("click", salvarLista);
var todaslistas = document.getElementById('minhas_listas');
var listas_salvas = document.getElementById('listas-salvas');

todaslistas.addEventListener('click', function(){
    if(listas_salvas.style.display === "none" || listas_salvas.style.display === "" ){
        listas_salvas.style.display = "block";
        
    }else{
        listas_salvas.style.display="none";
    }
})

// Função para adicionar funcionalidade aos itens carregados do armazenamento
function adicionarFuncionalidadeAItensCarregados() {
    // Selecione todos os itens carregados do armazenamento
    var itensCarregados = document.querySelectorAll('.item');

    itensCarregados.forEach(function(item) {
        var checkbox = item.querySelector('.li_checkbox');
        checkbox.addEventListener('click', function() {
            calcularTotal();
        });

        // Adicione funcionalidade para riscar e mover para o final da lista
        checkbox.addEventListener('click', function() {
            var liItem = this.parentElement;
            if (liItem) {
                if (this.checked) {
                    liItem.style.textDecoration = 'line-through';
                    var lista_tarefas = document.getElementById('f_lista');
                    if (lista_tarefas.contains(liItem)) {
                        lista_tarefas.removeChild(liItem);
                        lista_tarefas.appendChild(liItem);
                    }
                } else {
                    liItem.style.textDecoration = 'none';
                    var lista_tarefas = document.getElementById('f_lista');
                    if (lista_tarefas.contains(liItem)) {
                        lista_tarefas.removeChild(liItem);
                        lista_tarefas.insertBefore(liItem, lista_tarefas.firstChild);
                    }
                }
                calcularTotal();
            }
        });
        
        });
    }

/*limpar excluindo todas as listas */
/*   var listaSuspensa = document.getElementById('listas-salvas');
    listaSuspensa.innerHTML = '';
    localStorage.setItem("minhas_listas", JSON.stringify([]));
    // Limpe a lista suspensa no DOM
    var listaSuspensa = document.getElementById('listas-salvas');
    listaSuspensa.innerHTML = '';

    // Limpe o armazenamento local (localStorage)
    localStorage.setItem("minhas_listas", JSON.stringify([]));*/
    document.getElementById('excluir-list_created').addEventListener('click', function() {
        var listaParaExcluir = document.getElementById('list_created'); // Obtém o elemento lista_created
    
        var listaSalvaIndex = -1; // Inicialize o índice da lista a ser removida como -1
    
        // Obtém o título da lista atual
        var tituloListaAtual = document.querySelector("#list_created h1").textContent;
    
        // Percorre as listas salvas no armazenamento local e encontre a correspondente à lista que está sendo fechada
        var listasSalvas = JSON.parse(localStorage.getItem("minhas_listas")) || [];
        listasSalvas.forEach(function(lista, index) {
            if (lista.titulo === tituloListaAtual) {
                listaSalvaIndex = index; // Encontrou a lista, armazena o índice
            }
        });
    
        // Remove a lista do armazenamento local usando o índice encontrado
        if (listaSalvaIndex !== -1) {
            listasSalvas.splice(listaSalvaIndex, 1); // Remove a lista do array
            localStorage.setItem("minhas_listas", JSON.stringify(listasSalvas)); // Atualiza o armazenamento local
        }
    
        // Remove a lista do DOM
        listaParaExcluir.remove();
    
        var msgInicial = document.getElementById('msg_inicial');
        msgInicial.style.display = 'block';
    });
    