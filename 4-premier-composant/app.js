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
        this.timer = window.setInterval(this.tick.bind(this), 1000)
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
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

// Composant qui commence à 10 et qui toutes les secondes,
// incrémente la valeur
class Incrementer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            n: props.start,
            timer: null
        }
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount() {
        this.play()
    }

    componentwillUnmount() {
        window.clearInterval(this.state.timer)
    }

    increment() {
        this.setState((state, props) => ({n: state.n + props.step}))
    }

    pause () {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })
    }

    play () {
        // this.timer = window.setInterval(this.increment.bind(this), 1000)
        window.clearInterval(this.state.timer)
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000)
        })
    }

    reset () {
        this.pause()
        this.play()
        this.setState((state, props) => ({n : props.start}))
    }

    toggle() {
        return this.state.timer ? this.pause() : this.play()
    }

    label() {
        return this.state.timer ? 'Pause' : 'Lecture'
    }

    render () {
        console.log('render')
        return <div>
            <hr></hr>
            <h2>Composant Increment</h2>
            Valeur: {this.state.n} 
            <button onClick={this.toggle}>{this.label()}</button> 
            <button onClick={this.reset}>Réinitialiser</button> 
        </div>
    }
}

// DefaultProps (fourni dans la documentation React)
// permet d'envoyer des props par default 
// si rien n'est donnée
// Mais cette manière d'écrire à évolué
Incrementer.defaultProps = {
    start: 0,
    step: 1
}

// class ManuelIncrementer extends React.Component {

//     constructor (props) {
//         super(props)
//         this.state = {n: 0}
//     }

//     increment(e) {
//         e.preventDefault()
//         this.setState((state, props) => ({n: state.n + 1}))
//     }

//     render() {
//         return <div>
//             <hr></hr>
//             <div>Valeur : {this.state.n} <a href="http://grafikart.fr" onClick={this.increment.bind(this)} >Incrémenter</a></div>
//         </div>
//     }

// }

// Composant dans un composant
function Home () {
    return <div>
        <Welcome name="Dorothée" />
        <Welcome name="Jean" />
        {/* <ManuelIncrementer /> */}
        {/* <Clock />*/}
        <Incrementer />
        {/* <Incrementer start={10} step={10} />  */}
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
