var total;
var contador = 10000;
var numeracao;
var src;
var dados;
const posicionamento = document.getElementById('posicionamento');
const pokedex = document.getElementById('pokedex');

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

                order = document.createElement('div');
                order.setAttribute('id','ordem');
                order.setAttribute('data-Pokemon', numeroPokemon);
                order.setAttribute('data-posicao', index);
                order.setAttribute('data-cor', corBack);
                apiTipo = data.types;
                for (let index = 0; index < apiTipo.length; index++) {
                    entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                        substituicao = tipos[match];
                        let elemento = document.createElement('div');
                        elemento.setAttribute('title', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                        elemento.setAttribute('alt', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                        elemento.classList.add('elementos');
                        elemento.style.background = 'url(./imagens/' + (substituicao.charAt(0).toUpperCase() + substituicao.slice(1)).normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "") + '.svg)';
                        elemento.style.backgroundSize = 'contain';
                        elemento.style.backgroundRepeat = 'no-repeat';
                        elemento.style.backgroundPosition = 'center';
                        order.appendChild(elemento);
                    });    
                }

                let elemento = document.createElement('div');
                elemento.textContent = '#'+ index;
                elemento.classList.add('elementos');
                order.appendChild(elemento);

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
    window.scrollTo(0, 0);

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

        const ordem = document.querySelector('#visualizarPokemon #order');
        ordem.textContent = '#'+ posicaoPokemon;

        const img = document.querySelector('#visualizarPokemon #pokemon')
        console.log('url(' + src + ')');
        img.style.background = 'url(' + src + ')';
        img.style.backgroundPosition = 'center';
        img.style.backgroundRepeat = 'no-repeat';
        img.style.backgroundSize = 'contain';
        img.setAttribute('title', nome); 
        img.setAttribute('alt', nome);

        const nomenclatura = document.querySelector('#visualizarPokemon #nome')
        nomenclatura.textContent = nome;

        const apiTipo = data.types;
        const natureza = document.getElementById('natureza');
        for (let index = 0; index < apiTipo.length; index++) {
            entradaTipo = apiTipo[index].type.name.replace(/(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/gi, function(match) {
                substituicao = tipos[match];
                let container = document.createElement('div');
                container.classList.add('tipo');
                let elemento = document.createElement('div');
                elemento.setAttribute('title', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                elemento.setAttribute('alt', substituicao.charAt(0).toUpperCase() + substituicao.slice(1));
                elemento.classList.add('elementos');
                elemento.style.background = 'url(./imagens/' + (substituicao.charAt(0).toUpperCase() + substituicao.slice(1)).normalize("NFD").replace(/[\u0300-\u036f^`´~¨]/gi, "") + '.svg)';
                elemento.style.backgroundSize = 'contain';
                elemento.style.backgroundRepeat = 'no-repeat';
                elemento.style.backgroundPosition = 'center';
                let elemento_nome = document.createElement('div');
                elemento_nome.textContent = substituicao.charAt(0).toUpperCase() + substituicao.slice(1);
                container.appendChild(elemento);
                container.appendChild(elemento_nome);
                natureza.appendChild(container);
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