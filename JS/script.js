const logo = document.getElementById('logo');
const inputPesquisa = document.getElementById('inputPesquisa');
const buttonFecharPesquisa = document.querySelector('#inputPesquisa button');
const input = document.getElementById('input');
const hamburguer = document.getElementById('hamburguer');
const filtro = document.getElementById('filtro');
const checkbox = document.querySelectorAll('#filtro button.opcoes');
const pokedex = document.getElementById('pokedex');
const inicial = document.getElementById('inicial');
const imgInicial = inicial.querySelector('img');
// Cores dos tipos de Pokémon
const cores = {
    Normal:[
        '#AA8E6B' //(Marrom-escuro)
    ],
    Fogo:[
        '#B22222' //(Vermelho-escuro)
    ],
    Agua:[
        '#2980B9' //(Azul)
    ],
    Grama:[
        '#008000' //(Verde)
    ],
    Eletrico:[
        '#F39C12'//(Laranja-escuro)
    ],
    Gelo:[
        '#78E8F3' //(Azul-claro)
    ],
    Lutador:[
        '#9E4226' //(Marrom-avermelhado)
    ],
    Venenoso:[
        '#664B68' //(Roxo-escuro)
    ],
    Terrestre:[
        '#785C41' //(Marrom-escuro)
    ],
    Voador:[
        '#647A89' //(Cinza-azulado)
    ],
    Psiquico:[
        '#823A76' //(Roxo-escuro)
    ],
    Inseto:[
        '#A3A137' //(Verde-amarelado)
    ],
    Pedra:[
        '#7F8C8D' //(Cinza)
    ],
    Fantasma:[
        '#663A71' //(Roxo-escuro)
    ],
    Dragao:[
        '#983A6F' //(Rosa-escuro)
    ],
    Noturno:[
        '#533D3B' //(Marrom-escuro)
    ],
    Sombrio:[
        '#4D403E' //(Marrom-escuro)
    ],
    Metalico:[
        '#646464' //(Cinza)
    ],
    Fada:[
        '#CE6EAC' //(Rosa-claro)
    ],
    Desconhecido:[
        '#808080' //(Cinza)
    ]
};
// Mapeamento dos tipos de Pokémon em inglês para seus equivalentes em português
const tipos = {
    normal: 'Normal',
    fighting: 'Lutador',
    flying: 'Voador',
    poison: 'Venenoso',
    ground: 'Terrestre',
    rock: 'Pedra',
    bug: 'Inseto',
    ghost: 'Fantasma',
    steel: 'Metálico',
    fire: 'Fogo',
    water: 'Água',
    grass: 'Grama',
    electric: 'Elétrico',
    psychic: 'Psíquico',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Noturno',
    shadow: 'Sombrio',
    fairy: 'Fada',
    unknown: 'Desconhecido',
}
var controlCheck = false;
var controlPesquisa = false;
var controleInicial = false;
var src; // Variável para armazenar o src
var total; // Variável para armazenar o total
var contador = 10000; // Variável de contador com valor incial de 10000
var opcaoCheck = undefined;

imgInicial.src = './imagens/pokemon'+numeroAleatorio()+'.svg';

checkbox.forEach(element => {
    element.addEventListener("click",function(){
        if (controlCheck == false){
            checkbox.forEach(elemento => {
                let check = elemento.querySelector('span.checkbox');
                check.style.background = "#fff";
                elemento.disabled = true;
            });
            element.disabled = false;
            opcaoCheck = element.textContent;
            let check = element.querySelector('span.checkbox');
            check.style.background = "url(./imagens/check-solid.svg),#fff";
            check.style.backgroundSize = 'contain';
            check.style.backgroundRepeat = 'no-repeat';
            check.style.backgroundPosition = 'center';
            controlCheck = true;
            input.value = '';
            filtrar();
        }else{
            opcaoCheck = undefined;
            let check = element.querySelector('span.checkbox');
            check.style.background = "#fff";
            controlCheck = false;
            input.value = '';
            checkbox.forEach(elemento => {
                let check = elemento.querySelector('span.checkbox');
                check.style.background = "#fff";
                elemento.disabled = false;
            });
            filtrar();
        }

    })
});

// Verifica a posição do scroll e mostra ou oculta o botão
pokedex.onscroll = function (){
    if(window.innerWidth <= 991.98){
        showScrollTopButton();
    }
}

function showScrollTopButton(){
    var scrollTopButton = document.getElementById('up');
    if(pokedex.scrollTop > 20){
        scrollTopButton.style.display = 'flex';
    } else{
        scrollTopButton.style.display = 'none';
    }
}

function scrollToTop(){
    pokedex.scrollTop = 0;
}

function numeroAleatorio(){
    let random = Math.floor(Math.random() * 4); // Gera um número Aleatório de 0 a 1
    return random;
}

function abrirFiltro(){
    filtro.style.display = 'flex';
    setTimeout(() => {
        filtro.style.opacity = 1;
    }, 10);
}

function fecharFiltro(){
    filtro.style.opacity = 0;
    setTimeout(() => {
        filtro.style.display = 'none';
    }, 1000);
}

function controlePesquisa(){
    if (controlPesquisa == false) {
        if(window.innerWidth <= 991.98){
            logo.style.display = 'none';
        }
        inputPesquisa.style.display = 'flex';
        setTimeout(() => {
            inputPesquisa.style.opacity = 1;
        }, 10);
        controlPesquisa = true;  
    } else {
        inputPesquisa.style.opacity = 0;
        setTimeout(() => {
            inputPesquisa.style.display = 'none';
            if(window.innerWidth <= 991.98){
                logo.style.display = 'flex';
            }
        }, 1000);
        controlPesquisa = false;
        limparPesquisa();
        buttonFecharPesquisa.style.display = 'none';
    }
}

function limparPesquisa() {
    input.value = "";
    pesquisarPokemon();
}

/*
    * Função assíncrona para requisitar dados de uma URL.
    * @param{string} url - A URL para a qual a requisição será feita.
    * @returns {Promise} - Um Promise que será resolvida com os dados da resposta.
*/
async function requisitarDados(url) {
    try {
        const response = await fetch(url); // Faz a requisição à URL fornecida.
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição ' + response.status); // Lança um erro caso a resposta não seja OK
        }
        const data = await response.json(); // Extrai os dados da resposta como JSON
        return data; // Retorna os dados
    } catch (error) {
        // Trate o erro, se houver
        console.log(error); // Registra o erro no console
    }  
}

// Função para obter o total de Pokémons disponíveis na API.
function totalPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    requisitarDados(url)
    .then(data => {
        // Retorna o total de recursos disponíveis na API
        total = data.count;
        exibePokemon();
    })
}

function exibePokemon() {
    for (let index = 1; index < 22; index++) {
        setTimeout(function(){
            // Verifica se o índice é maior ou igual a 1010
            if(index >= 1010){
                contador++;   
                numeracao = contador;   
            }
            else{
                numeracao = index;
            }

            url = 'https://pokeapi.co/api/v2/pokemon/'+numeracao+'/';
            requisitarDados(url)
            .then(data => {
                // Obtém o nome do Pokémon e capitaliza a primeira letra
                let nomePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                // retorna o primeiro tipo de natureza do Pokémon
                let apiTipo = data.types[0].type.name;

                // retorna o nome do tipo em português
                let entradaTipo = apiTipo.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                    let substituicao = tipos[match];
                    return substituicao;
                });
                
                // retorna uma das duas cores referentes ao tipo de Pokémon
                let corBack = cores[entradaTipo.normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "")][0];

                if (data.sprites.other['official-artwork'].front_default != undefined){
                    src = data.sprites.other['official-artwork'].front_default;  
                }else if(data.sprites.other.dream_world.front_default != undefined){
                    src = data.sprites.other.dream_world.front_default;
                }else{
                    src = './imagens/interrogacao.png';
                }

                let posicao = data.location_area_encounters;
                // Extrair o número entre "pokemon" e "encounters" usando expressões regulares
                const regex = /pokemon\/(\d+)\/encounters/;
                const matches = posicao.match(regex);

                let numeroPokemon;
                if (matches && matches.length > 1) {
                    numeroPokemon = matches[1];
                }

                let item = document.createElement('div');
                item.classList.add('item');
                item.style.order = index;
                item.style.backgroundColor = corBack;
                item.setAttribute('data-ordem', index);
                item.setAttribute('data-nome', nomePokemon);
                item.setAttribute('data-identificador_link', numeroPokemon);
                item.setAttribute('data-background', corBack);

                let nomenclatura = document.createElement('div');
                nomenclatura.classList.add('nomenclatura');

                let nome = document.createElement('span');
                nome.classList.add('nome');
                nome.textContent = nomePokemon;
                nomenclatura.appendChild(nome);

                let ordem = document.createElement('span');
                ordem.classList.add('ordem');
                ordem.textContent = '#' + index;
                nomenclatura.appendChild(ordem);

                item.appendChild(nomenclatura);

                let conteudo = document.createElement('div');
                conteudo.classList.add('conteudo');
                item.appendChild(conteudo);

                let caracteristicas = document.createElement('div');
                caracteristicas.classList.add('caracteristicas');
                conteudo.appendChild(caracteristicas);

                let elemento = document.createElement('div');
                elemento.classList.add('elemento');
                caracteristicas.appendChild(elemento);

                let tipoElemento = ''; // Variável para armazenar os tipos do Pokémon em português
                apiTipo = data.types;
                for (let index = 0; index < apiTipo.length; index++) {
                    // retorna o nome do tipo do Pokémon em português
                    entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                        substituicao = tipos[match];
                        
                        // Cria um elemento div para representar o tipo do Pokémon
                        let img  = document.createElement('img');
                        img.src = './imagens/' + (substituicao.charAt(0).toUpperCase() + substituicao.slice(1)).normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "") + '.svg';
                        img.title = substituicao.charAt(0).toUpperCase() + substituicao.slice(1);
                        img.alt = substituicao.charAt(0).toUpperCase() + substituicao.slice(1);
                        elemento.appendChild(img);
                        
                        tipoElemento += substituicao.charAt(0).toUpperCase() + substituicao.slice(1) + ',';
                    });    
                }

                item.setAttribute('data-Elemento', tipoElemento);

                let especificacao = document.createElement('div');
                especificacao.classList.add('especificacao');
                caracteristicas.appendChild(especificacao);

                let div = document.createElement('div');
                especificacao.appendChild(div);

                let peso = document.createElement('div');
                peso.classList.add('peso');
                div.appendChild(peso);

                let span = document.createElement('span');
                span.textContent = (data.weight * 0.1).toFixed(1) + " kg";
                peso.appendChild(span);

                span = document.createElement('span');
                span.classList.add('valorPeso');
                span.textContent = 'Peso';
                peso.appendChild(span);

                div = document.createElement('div');
                especificacao.appendChild(div);

                altura = document.createElement('div');
                altura.classList.add('altura');
                div.appendChild(altura);

                span = document.createElement('span');
                span.textContent = (data.height * 0.1).toFixed(1) + " m";
                altura.appendChild(span);

                span = document.createElement('span');
                span.classList.add('valorAltura');
                span.textContent = 'Altura';
                altura.appendChild(span);

                let picture = document.createElement('div');
                picture.classList.add('picture');
                conteudo.appendChild(picture);

                let img = document.createElement('img');
                img.classList.add('picturePokemon');
                img.src = src;
                img.title = nomePokemon;
                img.alt = nomePokemon;
                picture.appendChild(img);

                img = document.createElement('img');
                img.classList.add('pictureBack');
                img.src = './imagens/pokebola-opacity.svg';
                item.appendChild(img);

                pokedex.appendChild(item);

                // Adiciona evento de clique aos cards de Pokémon
                item.addEventListener('click',function(){
                    visualizarPokemon(item)
                });
            });
        },500);
    }
}

function voltar(){
    const visualizarPokemon = document.getElementById('visualizarPokemon');
    visualizarPokemon.style.display = 'none';

    pokedex.style.display = 'flex';

    showScrollTopButton();
}

function visualizarPokemon(item) {
    if(window.innerWidth <= 991.98){
        pokedex.style.display = 'none';

        const visualizarPokemon = document.getElementById('visualizarPokemon');
        visualizarPokemon.style.display = 'flex';

        const up = document.getElementById('up');
        up.style.display = 'none';
    } else{
        if(controleInicial == false){
            inicial.style.display = 'none';
    
            const visualizarPokemon = document.getElementById('visualizarPokemon');
            visualizarPokemon.style.display = 'flex';
    
            controleInicial = true;
        }
    }

    atualizaElementos();
    const menu = document.querySelectorAll('#sobre ul li a');
    menu.forEach(element => {
      element.classList.remove('active', 'show');  
    });
    
    const evolucao_descricao = document.getElementById('descricao-tab');
    evolucao_descricao.classList.add('active', 'show');
    const descricao = document.getElementById('descricao');
    descricao.classList.add('active', 'show');
    
    // Obtém o número e a posição do Pokémon clicado
    const numeroPokemon = item.getAttribute('data-identificador_link');
    const posicaoPokemon = item.getAttribute('data-ordem');
    const corBack = item.getAttribute('data-background');

    // Monta a URL da API do Pokémon
    let url = 'https://pokeapi.co/api/v2/pokemon/'+numeroPokemon+'/';
    requisitarDados(url)
    .then(data => {
        let nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        let src;

        // Verifica se existem sprites disponíveis e define a source (src) da imagem do Pokémon
        if (data.sprites.other['official-artwork'].front_default != undefined){
            src = data.sprites.other['official-artwork'].front_default;  
        }else if(data.sprites.other.dream_world.front_default != undefined){
            src = data.sprites.other.dream_world.front_default;
        }else{
            src = './imagens/interrogacao.png';
        }

        let contain = document.querySelector('#visualizarPokemon .contain');
        contain.style.background = corBack;

        let nomePokemon = document.querySelector('#visualizarPokemon .contain .nomenclatura .nome');
        nomePokemon.textContent = nome;

        let ordemPokemon = document.querySelector('#visualizarPokemon .contain .nomenclatura .ordem');
        ordemPokemon.textContent = '#' + posicaoPokemon;

        let imgPokemon = document.querySelector('#visualizarPokemon .picture .picturePokemon');
        imgPokemon.src = src;

        let altura = document.querySelector('#descricao .height');
        altura.style.order = 2;
        altura.textContent = (data.height * 0.1).toFixed(1) + " m";

        let peso = document.querySelector('#descricao .weight');
        peso.style.order = 3;
        peso.textContent = (data.weight * 0.1).toFixed(1) + " kg";

        let habilidades = document.querySelector('#descricao .habilidades');
        habilidades.style.order = 4;
        var nomeHabilidades = '';
        for (let index = 0; index < data.abilities.length; index++) {
            if(index == (data.abilities.length - 1)){
                nomeHabilidades += data.abilities[index].ability.name.charAt(0).toUpperCase() + data.abilities[index].ability.name.slice(1);
            }else{
                nomeHabilidades += data.abilities[index].ability.name.charAt(0).toUpperCase() + data.abilities[index].ability.name.slice(1) + ', ';
            }   
        }
        habilidades.textContent = nomeHabilidades;

        const corStatus = corBack;

        const hp = document.getElementById('hp');
        hp.style.width = ((data.stats[0].base_stat / 300) * 100) + '%';
        hp.style.backgroundColor = corStatus;
        const valorHP = document.querySelector('#valorHP span');
        valorHP.textContent = data.stats[0].base_stat;

        const ataque = document.getElementById('ataque');
        ataque.style.width = ((data.stats[1].base_stat / 300) * 100) + '%';
        ataque.style.backgroundColor = corStatus;
        const valorAtaque = document.querySelector('#valorAtaque span');
        valorAtaque.textContent = data.stats[1].base_stat;

        const defesa = document.getElementById('defesa');
        defesa.style.width = ((data.stats[2].base_stat / 300) * 100) + '%';
        defesa.style.backgroundColor = corStatus;
        const valorDefesa = document.querySelector('#valorDefesa span');
        valorDefesa.textContent = data.stats[2].base_stat;

        const espAtaque = document.getElementById('espAtaque');
        espAtaque.style.width = ((data.stats[3].base_stat / 300) * 100) + '%';
        espAtaque.style.backgroundColor = corStatus;
        const valorEspAtaque = document.querySelector('#valorEspAtaque span');
        valorEspAtaque.textContent = data.stats[3].base_stat;

        const espDefesa = document.getElementById('espDefesa');
        espDefesa.style.width = ((data.stats[4].base_stat / 300) * 100) + '%';
        espDefesa.style.backgroundColor = corStatus;
        const valorEspDefesa = document.querySelector('#valorEspDefesa span');
        valorEspDefesa.textContent = data.stats[4].base_stat;

        const velocidade = document.getElementById('velocidade');
        velocidade.style.width = ((data.stats[5].base_stat / 300) * 100) + '%';
        velocidade.style.backgroundColor = corStatus;
        const valorVelocidade = document.querySelector('#valorVelocidade span');
        valorVelocidade.textContent = data.stats[5].base_stat;

        const total = document.getElementById('total');
        var totalValor = 0;
        for (let index = 0; index < data.stats.length; index++) {
            totalValor += data.stats[index].base_stat;    
        }
        total.style.width = ((totalValor / 1800) * 100) + '%';
        total.style.backgroundColor = corStatus;
        const valorTotal = document.querySelector('#valorTotal span');
        valorTotal.textContent = totalValor;

        const acordeao = document.getElementById('acordeao');

        for (let index = 0; index < data.moves.length; index++) {
            const card = document.createElement('div');
            card.classList.add('card');
            acordeao.appendChild(card);
            
            // card-header
            const card_header = document.createElement('button');
            card_header.setAttribute('type', 'button');
            card_header.setAttribute('id', ('heading_'+ index));
            card_header.setAttribute('data-toggle', 'collapse');
            card_header.setAttribute('data-target', ('#collapse_' + index));
            card_header.setAttribute('aria-expanded', 'false');
            card_header.setAttribute('aria-controls', ('collapse_' + index));
            card_header.classList.add('card-header', 'collapsed');
            card_header.textContent = '#'+ (index + 1) + ' ' +  data.moves[index].move.name.charAt(0).toUpperCase() + data.moves[index].move.name.slice(1);
            card.appendChild(card_header);

            const urlMove = data.moves[index].move.url;

            //card-body
            requisitarDados(urlMove)
            .then(data => {
                const div = document.createElement('div');
                div.setAttribute('id', ('collapse_' + index));
                div.setAttribute('aria-labelledby', ('heading_'+ index));
                div.setAttribute('data-parent', '#acordeao');
                div.classList.add('collapse');
                card.appendChild(div);
    
                const card_body = document.createElement('div');
                card_body.classList.add('card-body');
                card_body.textContent = data.effect_entries[0].effect;
                div.appendChild(card_body);
            });
        }

        url = 'https://pokeapi.co/api/v2/pokemon-species/'+numeroPokemon+'/';
        requisitarDados(url)
        .then(data => {

            let genero = document.querySelector('#descricao .especie');
            genero.style.order = 1;
            genero.textContent = data.genera[7].genus;

            let ovos = document.querySelector('#descricao .ovos');
            ovos.style.order = 6;
            var nomeOvos = '';
            for (let index = 0; index < data.egg_groups.length; index++) {
                if (index == (data.egg_groups.length - 1)) {
                    nomeOvos += data.egg_groups[index].name.charAt(0).toUpperCase() + data.egg_groups[index].name.slice(1); 
                } else {
                    nomeOvos += data.egg_groups[index].name.charAt(0).toUpperCase() + data.egg_groups[index].name.slice(1) + ', '; 
                }  
            }
            ovos.textContent = nomeOvos;

            let valorEvolucao = document.getElementById('valorEvolucao');
            const urlEvolution = data.evolution_chain.url;
            requisitarDados(urlEvolution)
            .then(data => {
                const chain = data.chain;
                const evolutions = obterEvolucoes(chain);

                if (evolutions.length > 0) {
                    evolutions.forEach(evolution => {
                        filtraEvolucoes(evolution, nome);
                    });
                } else {
                    valorEvolucao.textContent = 'Esse Pokémon não possui evolução!';
                }
            });
        });
    });
}

function filtraEvolucoes(cadeiaEvolutiva, nome) {
    const palavraChave = nome.toLowerCase();

    // Regex para identificar a palavra-chave e as palavras antes e depois dela
    const regex = new RegExp(`(?:^|\\b(\\w+)\\b\\s*->\\s*)${palavraChave}\\s*(?:->\\s*(\\w+)\\b)?`, 'g');
    let match;
    while ((match = regex.exec(cadeiaEvolutiva)) !== null) {
        const palavraAnterior = match[1];
        const palavraPosterior = match[2];

        exibeEvolucao(palavraPosterior);
      
        //console.log(`Palavra anterior: ${palavraAnterior}`);
        //console.log(`Palavra posterior: ${palavraPosterior}`);
    }
}

function exibeEvolucao(evolucao){
    let valorEvolucao = document.getElementById('valorEvolucao');
    const itens = pokedex.querySelectorAll('.item');
    valorEvolucao.textContent = '';

    if(evolucao === undefined){
        valorEvolucao.textContent = 'Esse Pokémon não possui evolução!';
    } else{
        let encontrado = false;
        itens.forEach(element => {
            const nomePokemon = element.querySelector('.nome').textContent.toLowerCase();

            if(nomePokemon == evolucao){
                encontrado = true;
                valorEvolucao.textContent = '';
                let cloneItem = element.cloneNode(true);
                valorEvolucao.appendChild(cloneItem);
                valorEvolucao.addEventListener('click', function(){
                    const evolucao_tab = document.getElementById('evolucao-tab');
                    evolucao_tab.classList.remove('active', 'show');
                    const evolucao = document.getElementById('evolucao');
                    evolucao.classList.remove('active', 'show');

                    const evolucao_descricao = document.getElementById('descricao-tab');
                    evolucao_descricao.classList.add('active', 'show');
                    const descricao = document.getElementById('descricao');
                    descricao.classList.add('active', 'show');


                    const item = this.querySelector('.item');
                    visualizarPokemon(item);
                });
            }
        });

        if(!encontrado){
            valorEvolucao.textContent = 'Não foi possível encontrar a evolução desse Pokémon.';
        }
    }
}

function obterEvolucoes(chain) {
    const evolutions = [];
    const speciesName = chain.species.name;
  
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach(evolution => {
        const nextEvolutions = obterEvolucoes(evolution);
        nextEvolutions.forEach(nextEvolution => {
          evolutions.push(`${speciesName} -> ${nextEvolution}`);
        });
      });
    } else {
      evolutions.push(speciesName);
    }
  
    return evolutions;
  }
  

function atualizaElementos() {
    let acordeao = document.getElementById('acordeao');
    while (acordeao.firstChild) {
        acordeao.removeChild(acordeao.firstChild);
    }
}

//Função de pesquisa do Pokémon
function pesquisarPokemon() {
    checkbox.forEach(elemento => {
        let check = elemento.querySelector('span.checkbox');
        check.style.background = "#fff";
        elemento.disabled = false;
    });
    controlCheck = false;

    // Obtém a mensagem de erro ao encontrar o pokemon
    const nenhumPokemon = document.getElementById('nenhumPokemon');
    
     // Obtém todos os elementos com a classe "item" dentro da Pokédex
    const itensPokemon = document.querySelectorAll('.item');

    let encontrouResultado = false;

    if(input.value == ''){
        nenhumPokemon.style.display = 'none';
        buttonFecharPesquisa.style.display = 'none';
        itensPokemon.forEach(element => {
            element.style.display = 'flex';
        });
    }else{
        // Obtém o valor digitado pelo usuário
        buttonFecharPesquisa.style.display = 'flex';
        const nomePokemon = input.value.trim().toLowerCase();

        // Itera sobre os itens e exibe apenas aqueles que correspondem ao nome pesquisado 
        for (let i = 0; i < itensPokemon.length; i++) {
            const item = itensPokemon[i];
            const nomeItem = item.getAttribute('data-nome').toLowerCase();

            if (nomeItem.includes(nomePokemon)) {
                item.style.display = 'flex'; // Exibe o item
                encontrouResultado = true;
            }else{
                item.style.display = 'none'; // Esconde o item
            }  
        }

        if(encontrouResultado){
            nenhumPokemon.style.display = 'none';
        } else{
            nenhumPokemon.style.display = 'block';
        }
    }
}

// Função para filtrar a pesquisa de Pokémons
function filtrar() {
    // Obtém todos os itens de Pokémon
    const itensPokemon = document.querySelectorAll('.item');

    // Obtém a mensagem de erro ao encontrar o pokemon
    const nenhumPokemon = document.getElementById('nenhumPokemon');

    let encontrouResultado = false;

    // Itera sobre os itens de Pokémon e exibe apenas aqueles que correspondem ao filtro selecionado
    itensPokemon.forEach(element => {
        const tipo = element.getAttribute('data-elemento');
    
        if(opcaoCheck === undefined){
            element.style.display = 'flex'; // Exibe o item 
            encontrouResultado = true;
        }else{
            if(tipo.includes(opcaoCheck)){
                element.style.display = 'flex'; // Exibe  item
                encontrouResultado = true;
            }else{
                element.style.display = 'none'; // Esconde o item
            }
        }
    });

    // Exibe ou oculta a mensa de erro se nenhum resultado for encontrado
    if(encontrouResultado){
        nenhumPokemon.style.display = 'none'; // Oculta a mensgem de erro
    } else{
        nenhumPokemon.style.display = 'block'; // Exibe a mensagem de erro
    }
}

totalPokemon();