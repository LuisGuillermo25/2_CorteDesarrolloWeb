const apiUrl = 'https://rickandmortyapi.com/api/character';
const cardContainer = document.getElementById('cardContainer');
const characterFilter = document.getElementById('characterFilter');

async function fetchCharacters() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results; // Retorna la lista de personajes
}

function createCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Usamos el estado como descripción
    const description = character.status; // Breve descripción del personaje
    const species = character.species; // Especie del personaje
    const gender = character.gender; // Género del personaje
    const location = character.location.name; // Ubicación del personaje

    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
        <p><strong>Estado:</strong> ${description}</p>
        <p><strong>Especie:</strong> ${species}</p>
        <p><strong>Género:</strong> ${gender}</p>
        <p><strong>Ubicación:</strong> ${location}</p>
    `;
    return card;
}

function displayCharacters(characters) {
    cardContainer.innerHTML = ''; // Limpia el contenedor antes de mostrar los personajes
    characters.forEach(character => {
        const card = createCard(character);
        cardContainer.appendChild(card);
    });
}

function populateFilter(characters) {
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.id;
        option.textContent = character.name;
        characterFilter.appendChild(option);
    });
}

characterFilter.addEventListener('change', (event) => {
    const selectedId = event.target.value;
    if (selectedId === 'all') {
        displayCharacters(characters); // Muestra todos los personajes
    } else {
        const filteredCharacter = characters.find(char => char.id == selectedId);
        displayCharacters([filteredCharacter]); // Muestra solo el personaje seleccionado
    }
});

let characters = [];
fetchCharacters().then(data => {
    characters = data; // Almacena los personajes en la variable
    displayCharacters(characters); // Muestra todos los personajes al cargar
    populateFilter(characters); // Llena el filtro con los nombres de los personajes
}).catch(error => {
    console.error('Error al cargar los personajes:', error);
});