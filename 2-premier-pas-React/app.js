/*
    Diffénrence entre React et JS est clairement exposé dans ces deux fonction
    qui font exactement la même chose, à la différence que L'incrémentation avec JS
    va modifier la totalité de l'élément séléctionné (#app), tandis que React ne``
    va modifier que l'élément <span> qui est concerné par l'incrémentation.

    React permet donc de faire le moins de mofication possible.
*/ 

// Les éléments React représentent un "virtual DOM"

let n = 0

// Ne recharge que la span
function render2() {
    // Pour créer un élement du Dom
    // Crée un objet de type h1 qui permet de représenter l'élément
    // Quand il fait un render il dit:
    // Pour lélément qui a l'ID app, j'ai branché cette élément title
    const title = React.createElement(
        'h1', 
        {}, 
        'Bonjour tout le monde ',
        React.createElement('span', {}, n)
    )
    console.log(title)

    // Pour avoir un rendu dans le Dom
    ReactDOM.render(title, document.querySelector('#app'))
}

render2()

// Recharge l'élément #app
function render() {
    document.querySelector('#app').innerHTML = '<h1>Bonjour tout le monde <span>'+ n + '</span></h1>'
}


// render()

window.setInterval(() => {
    n++
    // Maintenant un nouveau rendu est demandé
    // Donc il compare est vois quelles sont les modifications apportées
    // Il va changer uniquement l'élément pour lequel on a apporté des
    // modifications.
    render2()
    // render()
}, 1000)

