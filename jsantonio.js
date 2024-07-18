document.addEventListener('DOMContentLoaded',()=>{
    const characterContainer = document.getElementById('character-container')
    const searchBar = document.getElementById('search-bar')

    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        fetchCharacter(searchTerm);
    })
    function fetchCharacter(query = ''){
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(response => response.json())
        .then(data=>{
            characterContainer.innerHTML = ''
            data.results.forEach(character=>{
                const characterCard = document.createElement('div')
                characterCard.classList.add('character-card')
                characterCard.innerHTML = `
                <img src = '${character.image}' alt='${character.name}'>
                <h3> ${character.name}</h3>
                <p>Status: ${character.status}</p>
                <p>${character.species}</p>
                `
                characterContainer.appendChild(characterCard)
            })
        })
        .catch(error=> console.error('Error fetching character:', error))
    }
    fetchCharacter()
})