/*
    Un composant est une fonction.
    Les composant vont permettre de pourvoir réutiliser au maximum notre code.
    Et de créer des bmlocs que l'on va pouvoir conserver et utiliser de manière modulable.
*/

// Une manière de nommée les composants sous forme de hooks
function WelcomeFunct ({name, children}) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

// Une manière de nommée les composants sous forme de classe
// On fait étendre cette classe de la classe React.Component
// Pour lui dire qu'elle va se comporter comme un composant
class Welcome extends React.Component {

    // Notre constructeur
    // Il faut nécessairement appeler la function super()
    // Pour appeler la méthode parente, sinon erreur !
    // Si on l'a l'intention de ne rien faire au niveau du 
    // constructeur, pas besoin !
    // constructor (props) {
    //     super(props)
    //     console.log(props)
    // }

    // Cette function est obligatoire à l'intérieur
    // Elle s'occupe du rendu et devra retourner un éléments
    // Ces props sont appelées au niveau du constructeur
    render() {
        return <div>
        <h1>Bonjour {this.props.name}</h1>
        <p>
            {this.props.children}
        </p>
    </div>
    }
}

// Avec cette classe (composant) Clock on créé un date qui se met automatiquement 
// à jour toutes les seconde
class Clock extends React.Component {

    constructor (props) {
        super(props)
        // l'Etat de notre composant
        // C'est un objet qui va représenter les données
        // Qui sont utiles à l'intérieur du composant 
        // Et qui ne seront pas forcément exposés par des propriétées
        this.state = {date: new Date()}
        this.timer = null
    }

    // Cycle de vie d'un composant 
    // PERMET de relancer le composant par exemple toutes les secondes
    // Permet de déterminé quand un composant est monté
    componentDidMount() {
        // ICI on utilise un setIntervale pour executer
        // la tick() function a chaque intervalle
        // De base on doit faire 'this.tick', mais si on
        // fait ça le contexte de 'this' sera perdu,
        // il faut donc faire this.tick.bind(this)
        this.timer = window.setInterval(this.tick.bind(this), 100)
    }

    // Permet de déterminer quand un composant est supprimé
    componentwillUnmount() {
        // Supprime l'intérvale qui est sauvegarder dans la variable timer
        window.clearInterval(this.timer)
    }

    tick () {
        // Pour changer l'état d'un composant -> setState()
        this.setState({date: new Date()})
    }

    render () {
        const date = new Date();
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

// Composant qui incrémente
class Incrementer extends React.Component {

    constructor (props) {
        super(props)
        this.state = 0
    }

}

// Composant dans un composant
function Home () {
    return <div>
        <Welcome name="Dorothée" />
        <Welcome name="Jean" />
        <Clock />
        {/* <Increment /> */}
    </div>
}
// Lorsque notre composant est monté (mis dans notre dome)
// il va automatiquement appeler le component didMount()
// Qui va demander une mise à jour de l'état toutes les secondes
// A chaque fois que l'état se met à jour, React va re-rendre notre
// Composant
// Il va comparer les modifications et re-rendre uniquement ce qui
// a changer (la date), du coup il remettra a jour que cette information là !


ReactDOM.render(<Home />, document.querySelector('#app'))
