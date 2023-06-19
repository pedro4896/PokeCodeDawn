var total; // Variável para armazenar o total
var contador = 10000; // Variável de contador com valor incial de 10000
var numeracao; // Variável para armazenar a numeração
var src; // Variável para armazenar o src
var dados; // Variável para armazenar os dados
const pokedex = document.getElementById('pokedex'); // Constante que representa o elemento com id 'pokedex'

// Cores dos tipos de Pokémon
const cores = {
    Normal:[
        '#704F30', //(Marrom-escuro)
       ' #5A5141' //(Cinza-escuro)
    ],
    Fogo:[
        '#BB3322', //(Vermelho-escuro)
        '#8B3D2A' //(Marrom-avermelhado)
    ],
    Agua:[
        '#2D709A', //(Azul-escuro)
        '#1C4A69' //(Azul-marinho)
    ],
    Grama:[
        '#3C8031', //(Verde-escuro)
        '#2A5931' //(Verde-marinho)
    ],
    Eletrico:[
        '#D5C34D', //(Amarelo-dourado)
        '#A99639' //(Marrom-amarelado)
    ],
    Gelo:[
        '#78E8F3', //(Azul-claro)
        '#50B4BF' //(Azul-turquesa)
    ],
    Lutador:[
        '#9E4226', //(Marrom-avermelhado)
        '#6D4D3B' //(Marrom-escuro)
    ],
    Venenoso:[
        '#8D4D8A', //(Roxo-escuro)
        '#664B68' //(Roxo-escuro)
    ],
    Terrestre:[
        '#957E59', //(Marrom-claro)
        '#785C41'//(Marrom-escuro)
    ],
    Voador:[
        '#86A7C3', //(Azul-claro)
        '#647A89' //(Cinza-azulado)
    ],
    Psiquico:[
        '#A94496', //(Roxo-escuro)
        '#823A76' //(Roxo-escuro)
    ],
    Inseto:[
        '#A3A137', //(Verde-amarelado)
        '#77741C' //(Verde-escuro)
    ],
    Pedra:[
        '#926D48', //(Marrom-avermelhado)
        '#674D3B' //(Marrom-escuro)
    ],
    Fantasma:[
        '#663A71', //(Roxo-escuro)
        '#492F4C' //(Roxo-escuro)
    ],
    Dragao:[
        '#983A6F', //(Rosa-escuro)
        '#6B2C49' //(Vermelho-arroxeado)
    ],
    Noturno:[
        '#533D3B', //(Marrom-escuro)
        '#3C2D2B' //(Marrom-escuro)
    ],
    Sombrio:[
        '#4D403E', //(Marrom-escuro)
        '#362B29' //(Marrom-escuro)
    ],
    Metalico:[
        '#8C8C8C', //(Cinza)
        '#646464' //(Cinza)
    ],
    Fada:[
        '#CE6EAC', //(Rosa-claro)
        '#96506B' //(Roxo-escuro)
    ],
    Desconhecido:[
        '#C0C0C0', //(Cinza)
        '#808080' //(Cinza-escuro)
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

// Função para exibir a lista de pokémons
function exibePokemon() {
    let url; // URL da API para obter os dados do Pokémon
    let apiTipo; // Tipo do Pokémon na API
    let entradaTipo; // Tipo do Pokémon em português
    let substituicao;  // Variável temporária para substituição de tipos
    let corBack; // Cor de fundo do Pokémon
    let item; // Elemento HTML para representar o Pokémon
    let posicao; // Localização do Pokémon
    let numeroPokemon;  // Número do Pokémon
    let nome; // Nome do Pokémon
    let img; // Elemento HTML para a imagem do Pokémon
    let pokemon; // Elemento HTML para o nome do Pokémon
    let order; // Elemento HTMl para a ordem do Pokémon

    for (let index = 1; index < 22; index++){
        setTimeout(function () {
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
                nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                // retorna o primeiro tipo de natureza do Pokémon
                apiTipo = data.types[0].type.name;

                // retorna o nome do tipo em português
                entradaTipo = apiTipo.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                    substituicao = tipos[match];
                    return substituicao;
                });
                
                // retorna uma das duas cores referentes ao tipo de Pokémon
                corBack = cores[entradaTipo.normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "")][numeroAleatorio()];

                // Verifica se existem imagens disponíveis para o Pokémon
                if (data.sprites.other.dream_world.front_default != undefined){
                    src = data.sprites.other.dream_world.front_default;  
                }else if(data.sprites.other['official-artwork'].front_default != undefined){
                    src = data.sprites.other['official-artwork'].front_default;
                }else{
                    src = './imagens/interrogacao.png';
                }
 
                // Cria um elementos div para representar o Pokémon
                item = document.createElement('div');
                item.classList.add('item');
                item.style.order = index;
                item.style.cursor = 'pointer';
                item.style.backgroundColor = corBack;
                item.setAttribute('data-posicao', index);
                item.setAttribute('data-nome', nome);

                posicao = data.location_area_encounters;
                // Extrair o número entre "pokemon" e "encounters" usando expressões regulares
                const regex = /pokemon\/(\d+)\/encounters/;
                const matches = posicao.match(regex);

                if (matches && matches.length > 1) {
                    numeroPokemon = matches[1];
                }
                item.setAttribute('data-Pokemon', numeroPokemon);

                // Criando o elemento img para a imagem do Pokémon
                img = document.createElement('img');
                img.setAttribute('id','pokemon');
                img.setAttribute('src', src);
                img.setAttribute('title', nome);
                img.setAttribute('alt', nome);
                img.setAttribute('data-Pokemon', numeroPokemon);
                img.setAttribute('data-posicao', index);
                img.setAttribute('data-nome', nome);
                
                //Criando o elemento span para o nome do Pokémon
                pokemon = document.createElement('span');
                pokemon.setAttribute('id','name');
                pokemon.style.order = 3;
                pokemon.textContent = nome;
                pokemon.setAttribute('data-Pokemon', numeroPokemon);
                pokemon.setAttribute('data-posicao', index);
                pokemon.setAttribute('data-nome', nome);

                // Cria um elemento div para a ordem do Pokémon
                order = document.createElement('div');
                order.setAttribute('id','ordem');
                order.setAttribute('data-Pokemon', numeroPokemon);
                order.setAttribute('data-posicao', index);
                order.setAttribute('data-nome', nome);

                let tipoElemento = ''; // Variável para armazenar os tipos do Pokémon em português
                apiTipo = data.types;
                for (let index = 0; index < apiTipo.length; index++) {
                    // retorna o nome do tipo do Pokémon em português
                    entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                        substituicao = tipos[match];
                        
                        // Cria um elemento div para representar o tipo do Pokémon
                        let elemento = document.createElement('div');
                        elemento.setAttribute('title', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                        elemento.setAttribute('alt', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                        tipoElemento += substituicao.charAt(0).toUpperCase() + substituicao.slice(1) + ',';
                        elemento.classList.add('elementos');

                        // Define a imagem de fundo do elemento div com base no tipo do Pokémon
                        elemento.style.background = 'url(./imagens/' + (substituicao.charAt(0).toUpperCase() + substituicao.slice(1)).normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "") + '.svg)';
                        elemento.style.backgroundSize = 'contain';
                        elemento.style.backgroundRepeat = 'no-repeat';
                        elemento.style.backgroundPosition = 'center';

                        // Adiciona o elemento div ao elemento order
                        order.appendChild(elemento);
                    });    
                }

                // Cria um elemento div para representar o número do pokémon
                let elemento = document.createElement('div');
                elemento.textContent = '#'+ index;
                elemento.classList.add('elementos');
                order.appendChild(elemento);

                // Define o atributo 'data-elemento' com os tipos do Pokémon nos elementos relevantes
                item.setAttribute('data-elemento', tipoElemento);
                img.setAttribute('data-elemento', tipoElemento);
                pokemon.setAttribute('data-elemento', tipoElemento);
                order.setAttribute('data-elemento', tipoElemento);

                // Adicionando a imagem, o nome e a ordem do Pokémon ao item
                item.appendChild(img);
                item.appendChild(pokemon);
                item.appendChild(order);

                // Adicionando o item a pokedex
                pokedex.appendChild(item);

                // Adiciona evento de clicque aos cards de Pokémon
                item.onclick = visualizarPokemon;

                // Chama a função "filtrar"
                filtrar();
            })
        },500);  
    }
}

// Função que retorna um número aleatório entre 0 e 1
function numeroAleatorio(){
    let random = Math.floor(Math.random() * 2); // Gera um número Aleatório de 0 a 1
    return random;
}

// Função para visualizar as informações do Pokémon
function visualizarPokemon(event){
    // Obtém o elemento 'desconhecido' e o oculta-o
    const desconhecido = document.getElementById('desconhecido');
    desconhecido.style.display = 'none';
    atualizaElementos(); // Chama a função 'atualizaElementos()'

    // Verifica o tamanho da janela e realiza ações com base nisso
    if (window.innerWidth <= 575.98) {
        document.getElementById('conteudoCollapse').style.display = 'none';
        collapsar = false;
    }

    if (window.innerWidth <= 991.98){
        // Oculta o elemento 'pokedex' e ajsuta o padding
        pokedex.style.display = 'none';
        pokedex.style.padding = '0px';

        // Exibe o elemento 'voltar'
        const voltar = document.querySelector('#seta');
        voltar.style.display = 'flex';

        // Oculta todos os elementos com a classe 'item'
        const itens = document.querySelectorAll('.item');
        itens.forEach(element => {
           element.style.display = 'none';
        });
    }
    
    // Faz o scroll para o topo da página
    window.scrollTo(0, 0);

    // Exibe o elemento 'visualizarPokemon'
    const visualizarPokemon = document.getElementById('visualizarPokemon');
    visualizarPokemon.style.display = 'flex';

    // Obtém o número e a posição do Pokémon clicado
    const numeroPokemon = event.target.getAttribute('data-Pokemon');
    const posicaoPokemon = event.target.getAttribute('data-posicao');

    // Monta a URL da API do Pokémon
    let url = 'https://pokeapi.co/api/v2/pokemon/'+numeroPokemon+'/';

    // Faz  uma requisição para obter os dados do Pokémon
    requisitarDados(url)
    .then(data => {
        console.log(data);
        nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        // Verifica se existem sprites disponíveis e define a source (src) da imagem do Pokémon
        if (data.sprites.other.dream_world.front_default != undefined){
            src = data.sprites.other.dream_world.front_default;  
        }else if(data.sprites.other['official-artwork'].front_default != undefined){
            src = data.sprites.other['official-artwork'].front_default;
        }else{
            src = './imagens/interrogacao.png';
        }

        // Atualiza o número do Pokémon na visualização
        const ordem = document.querySelector('#visualizarPokemon #order #numeracao');
        ordem.textContent = '#'+ posicaoPokemon;

        // Atualiza a imagem do Pokémon na visualização
        const img = document.querySelector('#visualizarPokemon #pokemon')
        console.log('url(' + src + ')');
        img.style.background = 'url(' + src + ')';
        img.style.backgroundPosition = 'center';
        img.style.backgroundRepeat = 'no-repeat';
        img.style.backgroundSize = 'contain';
        img.setAttribute('title', nome); 
        img.setAttribute('alt', nome);

        // Atualiza o nome do Pokémon na visualização
        const nomenclatura = document.querySelector('#visualizarPokemon #nome')
        nomenclatura.textContent = nome;

        // Cria elementos HTML para exibir os tipos
        let apiTipo = data.types;
        const natureza = document.getElementById('natureza');
        for (let index = 0; index < apiTipo.length; index++) {
            entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                substituicao = tipos[match];
                // Cria um elemento div para exibir o ícone do tipo
                let container = document.createElement('div');
                container.classList.add('tipo');

                // cria um elemento duv para exibir o ícone do tipo
                let elemento = document.createElement('div');
                elemento.setAttribute('title', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                elemento.setAttribute('alt', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                elemento.classList.add('elementos');
                elemento.style.background = 'url(./imagens/' + (substituicao.charAt(0).toUpperCase() + substituicao.slice(1)).normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "") + '.svg)';
                elemento.style.backgroundSize = 'contain';
                elemento.style.backgroundRepeat = 'no-repeat';
                elemento.style.backgroundPosition = 'center';

                // Cria um elemento div para exibir o nome do tipo
                let elemento_nome = document.createElement('div');
                elemento_nome.textContent = substituicao.charAt(0).toUpperCase() + substituicao.slice(1);

                // Adiciona o ícone e o nome do tipo ao container div
                container.appendChild(elemento);
                container.appendChild(elemento_nome);

                // Adiciona o container div ao elemento "natureza"
                natureza.appendChild(container);
            });    
        }
               
        // Atualiza o peso do Pokémon na visualização
        const valorPeso = document.querySelector('#visualizarPokemon #caracteristicas #peso #valorPeso');
        valorPeso.textContent = (data.weight * 0.1).toFixed(1) + " kg";

        // Atualiza a altura do Pokémon na visualização
        const valorAltura = document.querySelector('#visualizarPokemon #caracteristicas #altura #valorAltura');;
        valorAltura.textContent = (data.height * 0.1).toFixed(1) + " m";

        // Atualiza os valores de status do Pokémon na visualização
        const hp = document.querySelector('#visualizarPokemon #status #container #valorStatus #hp');
        hp.textContent = data.stats[0].base_stat + '/300';
        hp.style.width = ((data.stats[0].base_stat / 300) * 100) + '%';
        hp.style.backgroundColor = '#8CD750';

        const ataque = document.querySelector('#visualizarPokemon #status #container #valorStatus #ataque');
        ataque.textContent = data.stats[1].base_stat + '/300';
        ataque.style.width = ((data.stats[1].base_stat / 300) * 100) + '%';
        ataque.style.backgroundColor = '#C03028';

        const defesa = document.querySelector('#visualizarPokemon #status #container #valorStatus #defesa');
        defesa.textContent = data.stats[2].base_stat + '/300';
        defesa.style.width = ((data.stats[2].base_stat / 300) * 100) + '%';
        defesa.style.backgroundColor = '#F08030';

        const velocidade = document.querySelector('#visualizarPokemon #status #container #valorStatus #velocidade');
        velocidade.textContent = data.stats[5].base_stat + '/300';
        velocidade.style.width = ((data.stats[5].base_stat / 300) * 100) + '%';
        velocidade.style.backgroundColor = '#78C0F8';

        const exp = document.querySelector('#visualizarPokemon #status #container #valorStatus #exp');
        exp.textContent = data.base_experience + '/1000';
        exp.style.width = ((data.base_experience / 1000) * 100) + '%';
        exp.style.backgroundColor = '#F8D030';
        
        const ul = document.querySelector('#descricao ul');
        url = 'https://pokeapi.co/api/v2/pokemon-species/' + nome.toLowerCase();
        
         // Faz uma requisição para obter os dados de descrição do Pokémon
        requisitarDados(url)
        .then(data => {
            let desc = data.flavor_text_entries;

            // Itera sobre as descrições e as adiciona à lista de descrição
            desc.forEach(element => {
                if(element && element.language.name == 'en'){
                    const texto = element.flavor_text;

                    // Verifica se o texto já existe em algum elemento <li>
                    let duplicado = false;
                    const lista = ul.querySelectorAll('li');
                    lista.forEach(el => {
                        if(el.textContent === texto){
                            duplicado = true;
                            return;
                        }
                    });

                    // Adiciona o texto à lista de descrição
                    if(!duplicado){
                        li = document.createElement('li');
                        li.textContent = texto;
                        ul.appendChild(li);
                    }
                }
            });
        })
    })
}

//Função de pesquisa do Pokémon
function pesquisarPokemon() {
    document.getElementById('tipoElemento').value = 'Todos';

    // Captura o campo de entrada e o botão de pesquisa
    const inputNomePokemon = document.getElementById('input');
   
    // Obtém a mensagem de erro ao encontrar o pokemon
    const nenhumPokemon = document.getElementById('nenhumPokemon');
    
     // Obtém todos os elementos com a classe "item" dentro da Pokédex
    const itensPokemon = document.querySelectorAll('.item');

    let encontrouResultado = false;

    if(inputNomePokemon.value == ''){
        nenhumPokemon.style.display = 'none';
        itensPokemon.forEach(element => {
            element.style.display = 'flex';
        });
    }else{
        // Obtém o valor digitado pelo usuário
        const nomePokemon = inputNomePokemon.value.trim().toLowerCase();

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

// Função para voltar a área de lista dos Pokémons
function voltar(){
    // Desloca a janela para o topo da página
    window.scrollTo(0, 0);

    // Verifica se a largura da janela está abaixo ou igaul a 991.98 pixelx, indiciando que é um dispositivo de tela pequena
    if (window.innerWidth <= 991.98) {
        // Exibe novamente a Pokédex
        pokedex.style.display = 'flex';
    }

    // Oculta o boão de voltar
    const voltar = document.querySelector('#seta');
    voltar.style.display = 'none';

    // Oculta a seção de visualização do Pokémon
    const visualizarPokemon = document.getElementById('visualizarPokemon');
    visualizarPokemon.style.display = 'none';

    // Chama uma funçao para atualizar os elementos da Pokédex
    atualizaElementos();
    
    // Define um espaçamento interno de 20 pixels para a Pokédex
    pokedex.style.padding = '20px';

    // Captura todos os elementos com a classe 'item' dentro da Pokédex
    const itens = document.querySelectorAll('.item');
    // Exibe todos os itens da Pokédex que estavam ocultos
    itens.forEach(element => {
       element.style.display = 'flex';
    });

    // Chama a uma função para filtrar os Pokémons com base nos critérios selecionados
    filtrar();
}

// Função para atualizar os elementos
function atualizaElementos(){
    // remove todos os elementos da lista de descrição
    const descricao = document.querySelectorAll('#descricao ul li');
    descricao.forEach(element => {
        element.remove();
    });

    // Remove todos os elementos de natureza
    const natureza = document.querySelectorAll('#natureza .tipo');
    natureza.forEach(element => {
        element.remove();
        
    });
}

// Função para filtrar a lista de visualização
function filtrar() {
    // Obtém todos os itens de Pokémon
    const itensPokemon = document.querySelectorAll('.item');

    // obtém o valor selecionado no campo de filtro
    const input = document.getElementById('tipoElemento').value;

    // Obtém a mensagem de erro ao encontrar o pokemon
    const nenhumPokemon = document.getElementById('nenhumPokemon');

    let encontrouResultado = false;

    // Itera sobre os itens de Pokémon e exibe apenas aqueles que correspondem ao filtro selecionado
    itensPokemon.forEach(element => {
        const tipo = element.getAttribute('data-elemento');

        if(input === 'Todos'){
            element.style.display = 'flex'; // Exibe o item 
            encontrouResultado = true;
        }else{
            if(tipo.includes(input)){
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

// Função para esconder ou exibir os conteudo do botão hamburguer
var collapsar = false;
function apresentaConteudo(){
    // Obtém o elemento de colapso
    const collapse = document.getElementById('conteudoCollapse');
    
    // Verifica se o estado de colapso é verdadeiro
    if(collapsar == true){
        collapse.style.display = 'none'; // Oculta o conteúdo
        collapsar = false; // Define o estado de colapso como falso
    }else{
        collapse.style.display = 'flex'; // Exibe o conteúdo
        collapsar = true; // Define o estado de colapso como verdadeiro
    }
}

totalPokemon();