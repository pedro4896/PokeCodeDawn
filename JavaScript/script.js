var total;
var contador = 10000;
var numeracao;
var src;
var dados;
const posicionamento = document.getElementById('posicionamento');
const pokedex = document.getElementById('pokedex');

const cores = {
    Normal:[
        '#A8A878', //(Cor: Couro)
        '#C6C6A7' //(Cor: Bege)
    ],
    Fogo:[
        '#F08030', //(Cor: Laranja)
        '#E59448' //(Cor: Âmbar)
    ],
    Agua:[
        '#6890F0', //(Cor: Azul-piscina)
        '#78C0F8' //(Cor: Azul-claro)
    ],
    Grama:[
        '#78C850', //(Cor: Verde-folha)
        '#8CD750' //(Cor: Verde-claro)
    ],
    Eletrico:[
        '#F8D030', //(Cor: Amarelo-elétrico)
        '#F2D94E' //(Cor: Amarelo-pálido)
    ],
    Gelo:[
        '#98D8D8', //(Cor: Azul-gelo)
        '#BCE6E6' //(Cor: Azul-pálido)
    ],
    Lutador:[
        '#C03028', //(Cor: Vermelho-luta)
        '#D8675B' //(Cor: Vermelho-escuro)
    ],
    Venenoso:[
        '#A040A0', //(Cor: Roxo-veneno)
        '#C183C1' //(Cor: Roxo-claro)
    ],
    Terrestre:[
        '#E0C068', //(Cor: Marrom-terra)
        '#EBD69D' //(Cor: Bege-claro)
    ],
    Voador:[
        '#A890F0', //(Cor: Roxo-céu)
        '#C6B7F5' //(Cor: Lavanda)
    ],
    Psiquico:[
        '#F85888', //(Cor: Rosa-psíquico)
        '#FFA6C9' //(Cor: Rosa-claro)
    ],
    Inseto:[
        '#A8B820', //(Cor: Verde-inseto)
        '#C7D21F' //(Cor: Verde-claro)
    ],
    Pedra:[
        '#B8A038', //(Cor: Marrom-pedra)
        '#D6CCB1' //(Cor: Bege-claro)
    ],
    Fantasma:[
        '#705898', //(Cor: Roxo-fantasma)
        '#A292BC' //(Cor: Lilás-escuro)
    ],
    Dragao:[
        '#7038F8', //(Cor: Roxo-dragão)
        '#A890F0' //(Cor: Roxo-azulado)
    ],
    Noturno:[
        '#705848', //(Cor: Marrom-noturno)
        '#A8A878' //(Cor: Cinza-pardo)
    ],
    Sombrio:[
        '#9C6363', //(Cor: Marrom-escuro)
        '#5A5A5A' //(Cor: Cinza-escuro)
    ],
    Metalico:[
        '#B8B8D0', //(Cor: Prateado)
        '#D1D1E0' //(Cor: Cinza-claro)
    ],
    Fada:[
        '#EE99AC', //(Cor: Rosa-fada)
        '#FFC0CB' //(Cor: Rosa-claro)
    ],
    Desconhecido:[
        '#FFFFFF', //(Cor: Branco)
        '#F0F0F0' //(Cor: Cinza-pálido)
    ]
};

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
    psychic: 'Psiquico',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Noturno',
    shadow: 'Sombrio',
    fairy: 'Fada',
    unknown: 'Desconhecido',
}

async function requisitarDados(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Trate o erro, se houver
        console.log(error);
    }  
}

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
    let url; let apiTipo; let entradaTipo;
    let substituicao; let corBack; let item;
    let posicao; let numeroPokemon; let nome;
    let img; let pokemon; let order;
    for (let index = 1; index < 22; index++){
        setTimeout(function () {
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
                // retorna o primeiro tipo de natureza do pokemon
                apiTipo = data.types[0].type.name;

                // retorna o nome do tipo em português
                entradaTipo = apiTipo.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                    substituicao = tipos[match];
                    return substituicao;
                });
                
                // retorna uma das 2 cores referênte ao tipo de pokemon
                corBack = cores[entradaTipo.normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "")][numeroAleatorio()];

                if (data.sprites.other.dream_world.front_default != undefined){
                    src = data.sprites.other.dream_world.front_default;  
                }else if(data.sprites.other['official-artwork'].front_default != undefined){
                    src = data.sprites.other['official-artwork'].front_default;
                }else{
                    src = './imagens/interrogacao.png';
                }
 
                item = document.createElement('div');
                item.classList.add('item');
                item.style.order = index;
                item.style.cursor = 'pointer';
                item.style.backgroundColor = corBack;
                item.setAttribute('data-posicao', index);
                item.setAttribute('data-cor', corBack);

                posicao = data.location_area_encounters;
                // Extrair o número entre "pokemon" e "encounters" usando expressões regulares
                const regex = /pokemon\/(\d+)\/encounters/;
                const matches = posicao.match(regex);

                if (matches && matches.length > 1) {
                    numeroPokemon = matches[1];
                }
                item.setAttribute('data-Pokemon', numeroPokemon);
                
                

                // Criando o elemento img
                nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                img = document.createElement('img');
                img.setAttribute('id','pokemon');
                img.setAttribute('src', src);
                img.setAttribute('title', nome);
                img.setAttribute('alt', nome);
                img.setAttribute('data-Pokemon', numeroPokemon);
                img.setAttribute('data-posicao', index);
                img.setAttribute('data-cor', corBack);
                
                //Criando o elemento h5
                pokemon = document.createElement('span');
                pokemon.setAttribute('id','name');
                pokemon.style.order = 3;
                pokemon.textContent = nome;
                pokemon.setAttribute('data-Pokemon', numeroPokemon);
                pokemon.setAttribute('data-posicao', index);
                pokemon.setAttribute('data-cor', corBack);

                order = document.createElement('span');
                order.setAttribute('id','ordem');
                order.textContent = '#'+ index;
                order.setAttribute('data-Pokemon', numeroPokemon);
                order.setAttribute('data-posicao', index);
                order.setAttribute('data-cor', corBack);

                // Adicionando a image e o título à div
                item.appendChild(img);
                item.appendChild(pokemon);
                item.appendChild(order);

                // Adicionando o item a pokedex
                pokedex.appendChild(item);

                // Adicionando a pokedex ao posicionamento
                posicionamento.appendChild(pokedex);

                // Adicionando o posicionamento ao corpo do documento
                document.body.appendChild(posicionamento);

                // Adiciona evento de click aos cards de pokemon
                item.onclick = visualizarPokemon;
            })
        },500);  
    }
}

function numeroAleatorio(){
    let random = Math.floor(Math.random() * 2); // Gera um número Aleatório de 0 a 1
    return random;
}

function visualizarPokemon(event){
    pokedex.style.padding = '0px';
    const itens = document.querySelectorAll('.item');
    itens.forEach(element => {
       element.style.display = 'none';
    });

    const visualizarPokemon = document.getElementById('visualizarPokemon');
    visualizarPokemon.style.display = 'flex';
    const numeroPokemon = event.target.getAttribute('data-Pokemon');
    const posicaoPokemon = event.target.getAttribute('data-posicao');
    let url = 'https://pokeapi.co/api/v2/pokemon/'+numeroPokemon+'/';

    requisitarDados(url)
    .then(data => {
        console.log(data);
        nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        if (data.sprites.other.dream_world.front_default != undefined){
            src = data.sprites.other.dream_world.front_default;  
        }else if(data.sprites.other['official-artwork'].front_default != undefined){
            src = data.sprites.other['official-artwork'].front_default;
        }else{
            src = './imagens/interrogacao.png';
        }

        const order = document.querySelector('#visualizarPokemon #ordem');
        order.textContent = '#'+ posicaoPokemon;

        const img = document.querySelector('#visualizarPokemon #pokemon')
        img.setAttribute('src', src); img.setAttribute('title', nome); img.setAttribute('alt', nome);

        const nomenclatura = document.querySelector('#visualizarPokemon #nome')
        nomenclatura.textContent = nome;

        // retorna o primeiro tipo de natureza do pokemon
        const apiTipo = data.types;
        const natureza = document.getElementById('natureza');
        for (let index = 0; index < apiTipo.length; index++) {
            entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                substituicao = tipos[match];
                let elemento = document.createElement('span');
                elemento.textContent = substituicao;
                corBack = cores[substituicao.normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "")][0];
                elemento.style.backgroundColor = corBack;
                natureza.appendChild(elemento);
            });    
        }
                
        const valorPeso = document.querySelector('#visualizarPokemon #caracteristicas #peso #valorPeso');
        valorPeso.textContent = (data.weight * 0.1).toFixed(1) + " kg";

        const valorAltura = document.querySelector('#visualizarPokemon #caracteristicas #altura #valorAltura');;
        valorAltura.textContent = (data.height * 0.1).toFixed(1) + " m";

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
        requisitarDados(url)
        .then(data => {
            let desc = data.flavor_text_entries;
            desc.forEach(element => {
                if(element && element.language.name == 'en'){
                    const texto = element.flavor_text;

                    // Verificando se o texto já existe em algum elemento <li>
                    let duplicado = false;
                    const lista = ul.querySelectorAll('li');
                    lista.forEach(el => {
                        if(el.textContent === texto){
                            duplicado = true;
                            return;
                        }
                    });

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

totalPokemon();