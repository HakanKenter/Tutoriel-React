class Field extends React.Component {

    render () {
        return <div className="form-group">
            <input type="text" className="forml-control" ref={this.props.forwardRef} />
        </div>
    }
}

const FieldWithRef = React.forwardRef((props, ref) => {
    return <Field forwardRef={ref} />
})

class Home extends React.Component {

    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.input = React.createRef()
    }

    handleClick (e) {
        console.log(this.input.current.value)
    }

    render () {
        return <div>
            <FieldWithRef ref={this.input} />
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }

}

ReactDOM.render(<Home/>, document.getElementById("app"))

/**
 * On utilise les Ref pour deux cas en générale
 * Un element du dom non traiter par react
 * donc qui na pas de value par exemple
 * ou un element externe pour lequel on voudrai par exemple
 * récuperer la valeur
 * _____________________________
 * Quand il s'agit de class, la méthode est différente comme
 * on peut le voir au dessus.
 * Il faut utiliser 'forwardRef' et scibler l'élément 
 * pour lequel nous souhaitons utiliser Ref
 */