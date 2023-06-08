var total;
var contador = 10000;
var numeracao;
var src;
const posicionamento = document.getElementById('posicionamento');
const pokedex = document.getElementById('pokedex');
const pokemon = document.getElementById("pokemon");

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

function totalPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')//('https://pokeapi.co/api/v2/pokemon/'+cont+'/')
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao fazer a requisição ' + response.status);
        }
        return response.json();
    })

    .then(data => {
        // Retorna o total de recursos disponíveis na API
        total = data.count;
        trocaPokemon();
    })
    .catch(error => {
        // Trate o erro, se houver
        console.log(error);
    });
    
}

function trocaPokemon() {
    for (let index = 1; index < 22; index++){
        setTimeout(function () {
            if(index >= 1010){
                contador++;   
                numeracao = contador;   
            }
            else{
                numeracao = index;
            }

            fetch(('https://pokeapi.co/api/v2/pokemon/'+numeracao+'/'))
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro ao fazer a requisição ' + response.status);
                }
                return response.json();
            })

            .then(data => {
                
                // retorna o primeiro tipo de natureza do pokemon
                let apiTipo = data.types[0].type.name;

                // retorna o nome do tipo em português
                let entradaTipo = apiTipo.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                    let substituicao = tipos[match];
                    return substituicao;
                });
                
                // retorna uma das 3 cores referênte ao tipo de pokemon
                let corBack = cores[entradaTipo.normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "")][numeroAleatorio()];

                if (data.sprites.other.dream_world.front_default != undefined){
                    src = data.sprites.other.dream_world.front_default;  
                }else if(data.sprites.other['official-artwork'].front_default != undefined){
                    src = data.sprites.other['official-artwork'].front_default;
                }else{
                    src = './imagens/interrogacao.png';
                }
 

                var item = document.createElement('div');
                item.classList.add('item');
                item.style.order = index;
                item.style.cursor = 'pointer';
                item.style.backgroundColor = corBack;

                var posicao = data.location_area_encounters;
                // Extrair o número entre "pokemon" e "encounters" usando expressões regulares
                const regex = /pokemon\/(\d+)\/encounters/;
                const matches = posicao.match(regex);

                if (matches && matches.length > 1) {
                    var numeroPokemon = matches[1];
                }
                item.setAttribute('data-Pokemon', numeroPokemon);
                

                // Criando o elemento img
                var nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                var img = document.createElement('img');
                img.setAttribute('id','pokemon');
                img.setAttribute('src', src);
                img.setAttribute('title', nome);
                img.setAttribute('alt', nome);
                img.setAttribute('data-Pokemon', numeroPokemon);
                
                //Criando o elemento h5
                var pokemon = document.createElement('span');
                pokemon.setAttribute('id','name');
                pokemon.style.order = 3;
                pokemon.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                pokemon.setAttribute('data-Pokemon', numeroPokemon);

                var order = document.createElement('span');
                order.setAttribute('id','ordem');
                order.textContent = '#'+ index;
                order.setAttribute('data-Pokemon', numeroPokemon);

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
            .catch(error => {
                // Trate o erro, se houver
                console.log(error);
            });   
        },500);  
    }
}

function numeroAleatorio(){
    let random = Math.floor(Math.random() * 2); // Gera um número Aleatório de 0 a 1
    return random;
}

function visualizarPokemon(event){
    const posicaoPokemon = event.target.getAttribute('data-Pokemon');
    console.log(posicaoPokemon);

    const itens = document.querySelectorAll('.item');
    itens.forEach(element => {
       element.style.display = 'none';
    });
}

totalPokemon();