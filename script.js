/*JS Document */
/*Objetivo: interação do menu */

/*Declaração das variáveis */
var modal_corpo = document.getElementById("corpo");
var nome_lista = document.getElementById("nome_lista");
var btn_menu = document.getElementById("btn-menu");
var list_created = document.getElementById("list_created");
var msg_inicial = document.getElementById("msg_inicial");
var lista_suspensa = document.getElementById("lista_suspensa");

document.addEventListener("DOMContentLoaded", function() {
//abrir menu suspenso
btn_menu.addEventListener("click", function() {
    if (lista_suspensa.style.display !== "none") {
        lista_suspensa.style.display = "none";
    } else {
        lista_suspensa.style.display = "block";
    }
});
// adiconar função de criar lista ao clicar no ícone inicial
document.getElementById("msg_inicial_icon").addEventListener("click",function(){
    event.stopPropagation();
    document.getElementById("nome_lista").style.display = "block";
    document.getElementById("msg_inicial").style.display = "none";

})

//Fechar itens se o usuário clicar fora deles
//var lista_suspensa = document.getElementById("lista_suspensa");

window.addEventListener("click", function(event) {
    
    var lista = document.getElementById("f_lista");
    

    if (event.target !== btn_menu && event.target !== modal_corpo && event.target !== add && event.target !== nome_lista && event.target !== list_created) {

        modal_corpo.style.display = "none";
        nome_lista.style.display = "none";
        list_created.style.display = "none";

        if (lista.children.length === 0) {
            document.getElementById("list_created").style.display = "none";
            checkListaVazia();
        } else {
            document.getElementById("list_created").style.display = "block";
        }
    }
});

var inputs = document.querySelectorAll("#corpo input");
inputs.forEach(function(input) {
    input.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});

/* PRIMEIRO BOTAO */
/* Relacionar qual botão */
botao_inserir = document.getElementById('f_botao');

/* Saída de dados */
/* Adicionar evento aos botões */
botao_inserir.addEventListener("click", inserir);

/* OBJETIVO: INSERIR ELEMENTO DOM */
/* Entrada de dados */
// Invalidar campo vazio
function atualizarValorItem() {
    const valorItemInputs = document.querySelectorAll(".valor_item");

    valorItemInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            const novoValor = this.value;
            this.setAttribute("value", novoValor);
            
    calcularTotal();
        });
    });
}
    
function inserir() {
    var texto1 = document.getElementById("item_usuario1").value;
    var texto3 = document.getElementById("item_usuario3").value;

    if (texto3 !== "" && texto1 !== "") {
        botao_inserir.style.background = "lightgray";
        botao_inserir.value = "INSERIDO";

        var item = document.createElement("li");
        var checkbox = document.createElement("input");
        var unidades = document.createElement("span");
        var valor_item = document.createElement("input");

        valor_item.type = "text";
        valor_item.setAttribute("value", "");
        valor_item.placeholder = "R$";
        valor_item.className = "valor_item";


        item.className = "item";

        checkbox.type = "checkbox";
        checkbox.className = "li_checkbox";
        unidades.className = "unidades";

        unidades.appendChild(document.createTextNode(texto1));
        item.appendChild(checkbox);
        item.appendChild(unidades);


        // Crie um span adicional para envolver o texto inserido pelo usuário
        var textoInserido = document.createElement("span");
        textoInserido.className = "texto-inserido"; // Adicione a classe desejada aqui

        textoInserido.appendChild(document.createTextNode(" " + texto3));
        item.appendChild(textoInserido);
        item.appendChild(valor_item);

    adicionarBotaoExcluir(item);
    document.getElementById("list_created").style.display = "block";

    function adicionarBotaoExcluir(liItem) {
    var lista = document.getElementById("f_lista");

    var botaoExcluir = document.createElement("span");
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.textContent = "❌";
    botaoExcluir.addEventListener("click", function() {
        liItem.remove();
        calcularTotal();

        if (lista.children.length === 0) {
            document.getElementById("list_created").style.display = "none";
            checkListaVazia();
        } else {
            document.getElementById("list_created").style.display = "block";
        }
    });
    liItem.appendChild(botaoExcluir);
    }

        checkbox.addEventListener("click", function() {
            var liItem = this.parentElement;
            var textoInserido = liItem.querySelector(".texto-inserido"); // Encontra o elemento com a classe "texto-inserido"
        
            if (this.checked) {
                if (textoInserido) {
                    textoInserido.style.textDecoration = "line-through"; // Aplica o estilo à classe "texto-inserido"
                }
                lista_tarefas.removeChild(liItem);
                lista_tarefas.appendChild(liItem);
            } else {
                if (textoInserido) {
                    textoInserido.style.textDecoration = "none"; // Remove o estilo da classe "texto-inserido"
                }
                lista_tarefas.removeChild(liItem);
                lista_tarefas.insertBefore(liItem, lista_tarefas.firstChild);
            }
            calcularTotal();
        });


        var lista_tarefas = document.getElementById("f_lista");
        lista_tarefas.appendChild(item);

        document.getElementById("item_usuario3").value = "";
        document.getElementById("item_usuario1").value = "";

    } else {
        window.alert("Inserir dados do item!");
    }
    checkListaVazia(); 
    
    atualizarValorItem();    
    
        setTimeout(function() {
            botao_inserir.style.background = "lightblue";
            botao_inserir.style.color = "black";
            botao_inserir.value = "INSERIR";
        }, 300);

    editar_item();
    }
/*---------EDITAR ITEM DA LISTA ----------------------------------------------*/
        
    // Adicione um ouvinte de evento de clique aos elementos da classe "texto-inserido" e "unidades"
    function editar_item(){
    var elementosTextoInserido = document.getElementsByClassName('texto-inserido');
    

    for (var i = 0; i < elementosTextoInserido.length; i++) {
        elementosTextoInserido[i].addEventListener('click', function() {
            event.stopPropagation();
    
            var linhaClicada = this.closest('.item');
    
            // Obtenha os valores de "texto-inserido" e "unidades" da linha clicada
            var valorTextoInserido = linhaClicada.querySelector('.texto-inserido').textContent.trim();
            var valorUnidades = linhaClicada.querySelector('.unidades').textContent.trim();
            var valorItem = linhaClicada.querySelector('.valor_item').value;

            // Exiba a div de edição
            document.getElementById("corpo_alterar").style.display = "block";
    
            // Atualize os campos "item_usuario4", "item_usuario5" e "item_usuario6" com os valores obtidos
            document.getElementById("item_usuario4").value =
                valorUnidades;
            document.getElementById("item_usuario5").value =
                valorTextoInserido;
            document.getElementById("item_usuario6").value =
                valorItem;
    
            linhaClicada.remove();
            AtribuirFunctionsApósAlterarItem()
        });
    }
    /*
    for (var i = 0; i < elementosUnidades.length; i++) {
        elementosUnidades[i].addEventListener('click', function() {
            event.stopPropagation();
    
            // Localize o elemento pai (linha com classe "item")
            var linhaClicada = this.closest('.item');
    
            // Obtenha os valores de "texto-inserido" e "unidades" da linha clicada
            var valorTextoInserido = linhaClicada.querySelector('.texto-inserido').textContent.trim();
            var valorUnidades = linhaClicada.querySelector('.unidades').textContent.trim();
            // Exiba a div de edição
            document.getElementById("corpo_alterar").style.display = "block";
            // Atualize os campos "item_usuario4" e "item_usuario5" com os valores obtidos
    
            document.getElementById("item_usuario4").value = valorUnidades;
            document.getElementById("item_usuario5").value = valorTextoInserido;
    
            linhaClicada.remove();
            AtribuirFunctionsApósAlterarItem()
        });
    }*/
    }
    function AtribuirFunctionsApósAlterarItem(){
    document.getElementById('f_botao_alterar').addEventListener('click', function() {
        // Move a definição das variáveis para dentro do evento de clique do botão
        var texto1 = document.getElementById("item_usuario4").value;
        var texto3 = document.getElementById("item_usuario5").value;
        var texto4 = document.getElementById("item_usuario6").value;
        
        if (texto3 !== "" && texto1 !== "") {
            botao_inserir.style.background = "lightgray";
            botao_inserir.value = "INSERIDO";
    
            var item = document.createElement("li");
            var checkbox = document.createElement("input");
            var unidades = document.createElement("span");
            var valor_item = document.createElement("input");
            
            valor_item.type = "text";
            valor_item.value = texto4;
            valor_item.placeholder = "R$";
            valor_item.className = "valor_item";
    
            item.className = "item";
    
            checkbox.type = "checkbox";
            checkbox.className = "li_checkbox";
            unidades.className = "unidades";
    
            unidades.appendChild(document.createTextNode(texto1));
            item.appendChild(checkbox);
            item.appendChild(unidades);
    
            // Crie um span adicional para envolver o texto inserido pelo usuário
            var textoInserido = document.createElement("span");
            textoInserido.className = "texto-inserido"; // Adicione a classe desejada aqui
    
            textoInserido.appendChild(document.createTextNode(" " + texto3));
            item.appendChild(textoInserido);
            item.appendChild(valor_item);
    
            adicionarBotaoExcluir(item);
            document.getElementById("list_created").style.display = "block";
        }
        
        function adicionarBotaoExcluir(liItem) {
            var lista = document.getElementById("f_lista");
        
            var botaoExcluir = document.createElement("span");
            botaoExcluir.className = "botao-excluir";
            botaoExcluir.textContent = "❌";
            botaoExcluir.addEventListener("click", function() {
                liItem.remove();
                calcularTotal();
        
                if (lista.children.length === 0) {
                    document.getElementById("list_created").style.display = "none";
                    checkListaVazia();
                } else {
                    document.getElementById("list_created").style.display = "block";
                }
            });
            liItem.appendChild(botaoExcluir);
        }
        
        adicionarFuncionalidadeAItensCarregados()

        var lista_tarefas = document.getElementById("f_lista");
        lista_tarefas.appendChild(item);
        
        document.getElementById("item_usuario4").value = "";
        document.getElementById("item_usuario5").value = "";
        document.getElementById("item_usuario6").value = "";
        
        document.getElementById("corpo_alterar").style.display="none";
        
        alert("Item editado com sucesso!");

        var checkboxes = document.querySelectorAll(".li_checkbox");

        checkbox.addEventListener("click", function() {
            var liItem = this.parentElement;
            var textoInserido = liItem.querySelector(".texto-inserido");
        
            if (this.checked) {
                if (textoInserido) {
                    textoInserido.style.textDecoration = "line-through"; 
                }
                lista_tarefas.removeChild(liItem);
                lista_tarefas.appendChild(liItem);
            } else {
                if (textoInserido) {
                    textoInserido.style.textDecoration = "none"; 
                }
                lista_tarefas.removeChild(liItem);
                lista_tarefas.appendChild(liItem);
            }
            
        calcularTotal()
            }
            ); 
            
            document.getElementById("msg_inicial").style.display="none";
            

        setTimeout(function() {
            botao_inserir.style.background = "lightblue";
            botao_inserir.style.color = "black";
            botao_inserir.value = "INSERIR";
        }, 300);
    
    //-----------------------------------------------------------------

        
    var elementosTextoInserido = document.getElementsByClassName('texto-inserido');
       
    for (var i = 0; i < elementosTextoInserido.length; i++) {
        elementosTextoInserido[i].addEventListener('click', function() {
            event.stopPropagation();
    
            var linhaClicada = this.closest('.item');
    
            // Obtenha os valores de "texto-inserido" e "unidades" da linha clicada
            var valorUnidades = linhaClicada.querySelector('.unidades').textContent.trim();
            var valorTextoInserido = linhaClicada.querySelector('.texto-inserido').textContent.trim();
            var valorItem = linhaClicada.querySelector('.valor_item').value;
            // Exiba a div de edição
            document.getElementById("corpo_alterar").style.display = "block";
    
            // Atualize os campos "item_usuario4" e "item_usuario5" com os valores obtidos
            document.getElementById("item_usuario4").value =
                valorUnidades;
            document.getElementById("item_usuario5").value =
                valorTextoInserido;
            document.getElementById("item_usuario6").value = valorItem;
    
            linhaClicada.remove();
        });
    }
    /*
    for (var i = 0; i < elementosUnidades.length; i++) {
        elementosUnidades[i].addEventListener('click', function() {
            event.stopPropagation();
    
            // Obtenha os valores de "texto-inserido" e "unidades" da linha clicada
            var valorTextoInserido = linhaClicada.querySelector('.texto-inserido').textContent.trim();
            var valorUnidades = linhaClicada.querySelector('.unidades').textContent.trim();
            var valorItem = linhaClicada.querySelector('.valor_item').textContent.trim();
            // Exiba a div de edição
            document.getElementById("corpo_alterar").style.display = "block";
    
            // Atualize os campos "item_usuario4" e "item_usuario5" com os valores obtidos
            document.getElementById("item_usuario4").value =
                valorUnidades;
            document.getElementById("item_usuario5").value =
                valorTextoInserido;
            document.getElementById("item_usuario6").value =
                valorTextoInserido;
        
            linhaClicada.remove();
        });
    }*/
    });

//----------------------------------------------------------------

 
}

/* OBJETIVO: Quando clicar Enter, inserir item */
var input_text;

input_text = document.getElementById("item_usuario3");
input_text.addEventListener("keydown", clicou_enter);

function clicou_enter(tecla) {
    if (tecla.key === "Enter") {
        inserir();
    }
}

// Adicione um evento de clique a todos os checkboxes
var checkboxes = document.querySelectorAll(".li_checkbox");

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
        calcularTotal();
    });
});

function calcularTotal() {
    var total = 0;

    var checkboxes = document.querySelectorAll(".li_checkbox");
    checkboxes.forEach(function(checkbox) {
        var item = checkbox.closest(".item");
        var valorItemText = item.querySelector(".valor_item").value;
        
        // Substitua as vírgulas por pontos
        var valorItem = parseFloat(valorItemText.replace(",", "."));

        var unidadesText = item.querySelector(".unidades").textContent;
        var qnt = parseFloat(unidadesText);

        if (!isNaN(valorItem) && !isNaN(qnt)) {
            if (checkbox.checked) {
                total += valorItem * qnt;
            }
        }
    });


    var totalCompras = document.getElementById("total_compras");
    totalCompras.textContent = "TOTAL: R$ " + total.toFixed(2);
}
calcularTotal();

document.getElementById("add").addEventListener("click", function() {
    var lista = document.getElementById("f_lista");
    if (lista.children.length > 0) {
        document.getElementById("corpo").style.display = "block";
    } else {
        document.getElementById("nome_lista").style.display = "block";
        document.getElementById("msg_inicial").style.display = "none";
    }
});

document.getElementById("fechar-corpo").addEventListener("click", function() {
    
    document.getElementById("corpo").style.display = "none";
    var lista = document.getElementById("f_lista");
    if (lista.children.length === 0) {
        checkListaVazia();
    } else {
        document.getElementById("list_created").style.display = "block";
    }
});
document.getElementById("fechar-corpo-alterar").addEventListener('click',function(){

    event.stopPropagation();
    document.getElementById("corpo_alterar").style.display = "none";
    document.getElementById("item_usuario4").value="";
    document.getElementById("item_usuario5").value="";
}
)

document.getElementById("fechar-lista-nome").addEventListener("click", function() {
    document.getElementById("nome_lista").style.display = "none";
    document.getElementById("input_nome").value = "";
    checkListaVazia();
});

function checkListaVazia() {
    var lista = document.getElementById("f_lista");
    var msgInicial = document.getElementById("msg_inicial");

    if (lista.children.length === 0) {
        msgInicial.style.display = "block";
        document.getElementById("nome_lista").style.display = "none";
        document.getElementById("corpo").style.display = "none";
        document.getElementById("list_created").style.display = "none";
        return true;
    } else {
        msgInicial.style.display = "none";
    }
}

nome_lista.addEventListener("click", function(event) {
    event.stopPropagation();
});

var elementosFilhos = nome_lista.querySelectorAll("*");
elementosFilhos.forEach(function(elemento) {
    elemento.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});

var btnNome = document.getElementById("btn-nome");
var inputNome = document.getElementById("input_nome");
var tituloLista = document.querySelector("#list_created h1");

btnNome.addEventListener("click", function() {
    var nomeDaLista = inputNome.value;

    if (nomeDaLista.trim() !== "") {
        tituloLista.textContent = nomeDaLista;
        document.getElementById("nome_lista").style.display = "none";
        document.getElementById("corpo").style.display = "block";
    } else {
        alert("Por favor, insira o nome da lista.");
    }
});

document.getElementById("info-calculadora").addEventListener("click", function() {
    var tooltip = document.getElementById("tooltip-calculadora");
    tooltip.style.display = (tooltip.style.display === "block") ? "none" : "block";
});


document.getElementById("link-calculadora").addEventListener("click", function() {
    document.getElementById("calculadora-modal").style.display = "block";
});

document.getElementById("fechar-calculadora").addEventListener("click", function() {
    document.getElementById("calculadora-modal").style.display = "none";
    document.getElementById("valor1").value = "";
    document.getElementById("valor2").value = "";
    document.getElementById("quantidade1").value = "";
    document.getElementById("quantidade2").value = "";
    document.getElementById("resultado").textContent = "";
});

window.addEventListener("click", function(event) {
    var modal = document.getElementById("calculadora-modal");
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("valor1").value = "";
        document.getElementById("valor2").value = "";
        document.getElementById("quantidade1").value = "";
        document.getElementById("quantidade2").value = "";
        document.getElementById("resultado").textContent = "";
    }

    var modal = document.getElementById("sobre_app-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("calcular").addEventListener("click", function() {
    var valor1 = parseFloat(document.getElementById("valor1").value);
    var quantidade1 = parseFloat(document.getElementById("quantidade1").value);
    var valor2 = parseFloat(document.getElementById("valor2").value);
    var quantidade2 = parseFloat(document.getElementById("quantidade2").value);

    if (isNaN(valor1) || isNaN(quantidade1) || isNaN(valor2) || isNaN(quantidade2)) {
        document.getElementById("resultado").textContent = "Por favor, insira valores válidos.";
    } else {
        var precoPorUnidade1 = valor1 / quantidade1;
        var precoPorUnidade2 = valor2 / quantidade2;

        if (precoPorUnidade1 < precoPorUnidade2) {
            document.getElementById("resultado").textContent = "O produto 1 é o mais econômico";
        } else if (precoPorUnidade1 > precoPorUnidade2) {
            document.getElementById("resultado").textContent = "O produto 2 é o mais econômico.";
        } else {
            document.getElementById("resultado").textContent = "As opções têm o mesmo preço por quantidade.";
        }
    }
});
document.getElementById("link-sobre_app").addEventListener("click", function() {
    document.getElementById("sobre_app-modal").style.display = "block";
});

document.getElementById("fechar-sobre_app").addEventListener("click", function() {
    document.getElementById("sobre_app-modal").style.display = "none";
});

document.getElementById("fechar-list_created").addEventListener("click", function() {
    location.reload();
});

// Criar salvamento da lista
let listasSalvas = JSON.parse(localStorage.getItem("minhas_listas")) || [];

function adicionarBotoesAoConteudoSalvo() {
    // Botão "Salvar Alterações"
    const botaoSalvarAlteracoesExistente = document.getElementById("salvar-alteracoes");

    if (!botaoSalvarAlteracoesExistente) {
        // Código para criar e adicionar o botão "Salvar Alterações"
        const botaoSalvarAlteracoes = document.createElement("button");
        botaoSalvarAlteracoes.id = "salvar-alteracoes"; // ID do botão "Salvar Alterações"
        botaoSalvarAlteracoes.classList.add("btn");
        botaoSalvarAlteracoes.textContent = "Salvar Alterações";

        // Atribuir evento de clique ao botão "Salvar Alterações"
        botaoSalvarAlteracoes.addEventListener("click", function() {
            // Obtém o conteúdo atual da lista que está aberta
            var novoConteudoLista = document.getElementById("list_created").innerHTML;

            // Obtém o título da lista atual
            var tituloListaAtual = document.querySelector("#list_created h1").textContent;

            // Percorre as listas salvas no armazenamento local e encontra a correspondente à lista que está sendo editada
            var listaSalvaIndex = -1;
            listasSalvas.forEach(function(lista, index) {
                if (lista.titulo === tituloListaAtual) {
                    listaSalvaIndex = index;
                }
            });

            // Atualiza o conteúdo da lista salva correspondente
            if (listaSalvaIndex !== -1) {
                listasSalvas[listaSalvaIndex].conteudo = novoConteudoLista;
                localStorage.setItem("minhas_listas", JSON.stringify(listasSalvas)); // Atualiza o armazenamento local
                alert("Alterações foram salvas com sucesso!"); // Mensagem de sucesso (opcional)
            } else {
                alert("Lista não encontrada. As alterações não puderam ser salvas.");
            }

            location.reload();
        });

        // Adicione o botão "Salvar Alterações" ao conteúdo salvo
        const listaCriada = document.getElementById("list_created");
        listaCriada.appendChild(botaoSalvarAlteracoes);
    } else {
        // Se o botão "Salvar Alterações" existir, exclua-o e crie um novo
        botaoSalvarAlteracoesExistente.remove();

        const botaoSalvarAlteracoes = document.createElement("button");
        botaoSalvarAlteracoes.id = "salvar-alteracoes"; // ID do botão "Salvar Alterações"
        botaoSalvarAlteracoes.classList.add("btn");
        botaoSalvarAlteracoes.textContent = "Salvar Alterações";

        // Atribuir evento de clique ao botão "Salvar Alterações"
        botaoSalvarAlteracoes.addEventListener("click", function() {
            // Obtém o conteúdo atual da lista que está aberta
            var novoConteudoLista = document.getElementById("list_created").innerHTML;

            // Obtém o título da lista atual
            var tituloListaAtual = document.querySelector("#list_created h1").textContent;

            // Percorre as listas salvas no armazenamento local e encontra a correspondente à lista que está sendo editada
            var listaSalvaIndex = -1;
            listasSalvas.forEach(function(lista, index) {
                if (lista.titulo === tituloListaAtual) {
                    listaSalvaIndex = index;
                }
            });

            // Atualiza o conteúdo da lista salva correspondente
            if (listaSalvaIndex !== -1) {
                listasSalvas[listaSalvaIndex].conteudo = novoConteudoLista;
                localStorage.setItem("minhas_listas", JSON.stringify(listasSalvas)); // Atualiza o armazenamento local
                alert("Alterações foram salvas com sucesso!"); // Mensagem de sucesso (opcional)
            } else {
                alert("Lista não encontrada. As alterações não puderam ser salvas.");
            }

            location.reload();
        });

        // Adicione o novo botão "Salvar Alterações" ao conteúdo salvo
        const listaCriada = document.getElementById("list_created");
        listaCriada.appendChild(botaoSalvarAlteracoes);
    }

    // Botão "Excluir Lista Atual"
    const botaoExcluirListaAtualExistente = document.getElementById("excluir-list-created");

    if (botaoExcluirListaAtualExistente) {
        // Se o botão existir, remova-o
        botaoExcluirListaAtualExistente.remove();
    }

    // Código para criar e adicionar o botão "Excluir Lista Atual"
    const botaoExcluirListaAtual = document.createElement("button");
    botaoExcluirListaAtual.id = "excluir-list-created"; // ID do botão de exclusão
    botaoExcluirListaAtual.classList.add("btn");
    botaoExcluirListaAtual.textContent = "Excluir Lista Atual";

    // Atribuir evento de clique ao botão "Excluir Lista Atual"
    botaoExcluirListaAtual.addEventListener("click", function() {
        // Obtém o título da lista atual
        var tituloListaAtual = document.querySelector("#list_created h1").textContent;

        // Remove a lista atual do localStorage
        var listasSalvas = JSON.parse(localStorage.getItem("minhas_listas")) || [];
        var novaListaSalvas = listasSalvas.filter(function(lista) {
            return lista.titulo !== tituloListaAtual;
        });
        localStorage.setItem("minhas_listas", JSON.stringify(novaListaSalvas));

        // Remove a lista atual do DOM
        var listaParaExcluir = document.getElementById("list_created");
        listaParaExcluir.remove();

        // Exiba uma mensagem ou realize outras ações após excluir a lista atual
        alert("A lista atual foi excluída.");

        location.reload();
    });

    // Adicione o botão "Excluir Lista Atual" ao conteúdo salvo
    const listaCriada = document.getElementById("list_created");
    listaCriada.appendChild(botaoExcluirListaAtual);
}

// carregar lista selecionada
function carregarListaSelecionada(index) {
    const listaSelecionada = listasSalvas[index];
    if (listaSelecionada) {
        document.getElementById("list_created").innerHTML = listaSelecionada.conteudo;
        document.querySelector("#list_created h1").textContent = listaSelecionada.titulo; // Atualize o h1 com o título correto
        document.getElementById("listas-salvas").style.display = "none";
        calcularTotal();

        // Adicione os botões "Excluir lista" e "Salvar alterações" ao conteúdo salvo
        adicionarBotoesAoConteudoSalvo();

        // Atribua eventos ao botão excluir
        atribuirEventoExcluir();
        // Adicione funcionalidade aos itens carregados
        adicionarFuncionalidadeAItensCarregados();
        calcularTotal()
        editar_item()
    }
}
function atribuirEventoExcluir() {
    var botoesExcluir = document.querySelectorAll(".botao-excluir");

    botoesExcluir.forEach(function(botao) {
        botao.addEventListener("click", function() {
            var liItem = this.parentElement;
            liItem.remove();
            calcularTotal();
        });
    });
}

function exibirListasSalvas() {
    const listaDropdown = document.getElementById("listas-salvas");

    var msgInicial = document.getElementById("msg_inicial");

    listaDropdown.innerHTML = ""; // Limpar itens anteriores

    listasSalvas.forEach((lista, index) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.classList.add("minhas_listas_salvas");
        link.textContent = lista.titulo; // Usar o título da lista
        link.addEventListener("click", () => {
            carregarListaSelecionada(index); // Carregar a lista selecionada
            msgInicial.style.display = "none"; // Esconder msgInicial ao clicar na lista
        });
        listItem.appendChild(link);
        listaDropdown.appendChild(listItem);
        
    });
    calcularTotal()
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
document.getElementById("salvar-lista").addEventListener("click", function() {
    // Após salvar a lista, oculta o botão "Salvar Lista"
    this.style.display = "none";
    salvarLista();
});

var todaslistas = document.getElementById("minhas_listas");
var listas_salvas = document.getElementById("listas-salvas");

todaslistas.addEventListener("click", function() {
    if (listas_salvas.style.display === "none" || listas_salvas.style.display === "") {
        listas_salvas.style.display = "block";
    } else {
        listas_salvas.style.display = "none";
    }
});

// Função para adicionar funcionalidade aos itens carregados do armazenamento
function adicionarFuncionalidadeAItensCarregados() {
    // Selecione todos os itens carregados do armazenamento
    var itensCarregados = document.querySelectorAll(".item");

    itensCarregados.forEach(function(item) {
        var checkbox = item.querySelector(".li_checkbox");
        checkbox.addEventListener("click", function() {
            calcularTotal();
        });

        
// Selecione todos os elementos .li_checkbox dentro de .item
var checkboxes = document.querySelectorAll(".item .li_checkbox");

// Itere sobre cada checkbox e atribua a função de clique
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
        var textoInserido = this.parentElement.querySelector(".texto-inserido");
        var lista_tarefas = document.getElementById("f_lista");
        var liItem = this.parentElement;
        if (textoInserido && liItem) {
            if (this.checked) {
                textoInserido.style.textDecoration = "line-through";
                if (lista_tarefas.contains(liItem)) {
                    lista_tarefas.removeChild(liItem);
                    lista_tarefas.appendChild(liItem);
                }
            } else {
                textoInserido.style.textDecoration = "none";
                if (lista_tarefas.contains(liItem)) {
                    lista_tarefas.removeChild(liItem);
                    lista_tarefas.insertBefore(liItem, lista_tarefas.firstChild);
                }
            }
            calcularTotal();
        }
    });
});


        
        
        // Adicione a função location.reload() quando necessário
        var fecharListaCreatedButton = document.getElementById("fechar-list_created");
        fecharListaCreatedButton.addEventListener("click", function() {
            location.reload();
        });
    });
    
    atualizarValorItem() 
}

/*limpar excluindo todas as listas------------------------------------------- */
   /*var listaSuspensa = document.getElementById('listas-salvas');
    listaSuspensa.innerHTML = '';
    localStorage.setItem("minhas_listas", JSON.stringify([]));
    // Limpe a lista suspensa no DOM
    var listaSuspensa = document.getElementById('listas-salvas');
    listaSuspensa.innerHTML = '';

    // Limpe o armazenamento local (localStorage)
    localStorage.setItem("minhas_listas", JSON.stringify([]));*/

//-------------------------------------------------------------------------------
})

if ('caches' in window) {
    caches.open('pwabuilder-page').then(function(cache) {
      cache.match('style.css').then(function(response) {
        if (response) {
          console.log('style.css encontrado no cache:', response);
        } else {
          console.log('style.css não encontrado no cache.');
        }
      });
  
      cache.match('script.js').then(function(response) {
        if (response) {
          console.log('script.js encontrado no cache:', response);
        } else {
          console.log('script.js não encontrado no cache.');
        }
      });
    });
  }
  