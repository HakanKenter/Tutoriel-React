let n = 0

// fonction qui va permettre d'afficher deux chiffre minimum
// donc de 0à 9 on aura : 01, 02, 03 etc...
function numberFormat(n) {
    return n.toString().padStart(2, '0')
}

function render() {
    const items = [
        'Tache 1',
        'Tache 2',
        'Tache 3',
    ]
    // Si on ne veut pas avoir de balise div supplémentaire
    // (obligatoire) pour entourer toutes les balises on peut
    // utiliser ce qu'on appelent un 'Fragment' avec cette syntaxe là:
    // <></> qui permet de ne pas forcément créer un nouvelle balise 
    // Pour pouvoir faire marcher les éléments
    // Mais dans notre cas ici la version de babel ne supporte pas cette écriture
    // on va donc prendre l'alternative qui est "React.Fragment"
    const title = <React.Fragment><h1 className="title" id={'title'+n}>
        Bonjour les gens <span>{n}</span>
        </h1>
        <ul>{items.map((item, k)=> <li key={k}>{item}</li>)}</ul>
    </React.Fragment>

    ReactDOM.render(title, document.querySelector('#app'))
}

render()

window.setInterval(() => {
    n++
    render()
}, 1000)

