function Field ({name, value, onChange, children}) {
    // Une autre manière d'envoyer les props
    // const {name, value, onChange, children} = this.props
    return <div className="form-group">
        <label htmlFor={name} >{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className='form-control'/>
    </div>
}

function Checkbox ({name, value, onChange, children}) {
    // Une autre manière d'envoyer les props
    // const {name, value, onChange, children} = this.props
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className='form-check-input'/>
        <label htmlFor={name} className="form-check-label" >{children}</label>
    </div>
}


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // checked: true
            nom: '',
            prenom: '',
            newsletter: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
        // this.setState({
        //     checked: e.target.checked
        // })
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false,
        })
    }

    render() {
        console.log('render')
        return <form className="container" onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange} >Nom </Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange} >Prénom </Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange}>S'abonner à la newsletter</Checkbox>
            <div className="form-group">
                <button className="btn btn-primary">Envoyer</button>
            </div>
            {JSON.stringify(this.state)}
            {/* <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" values={this.state.nom} onChange={this.handleChange} id="nom" name="nom"/>
            </div>
            <div>
                <label htmlFor="prenom">Prenom</label>
                <input type="text" values={this.state.prenom} onChange={this.handleChange} id="prenom" name="prenom"/>
            </div>
            <div>
                <label htmlFor="newletter">S'abonner à la newsletter ?</label>
                <input type="checkbox" checked={this.state.newsletter} onChange={this.handleChange} id="newsletter" name="newsletter"/>
            </div>
            <input type="text" defaultValue="Salut"/>
            {JSON.stringify(this.state)} */}
        </form>
        // <div>
        //     {JSON.stringify(this.state.nom)}
        //     <label htmlFor="nom" >Mon nom</label>
        //     <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />

        //     {this.state.checked ?<div>Un message affiché si on coche le checkbox</div> : null }
        // </div>
    }

}

ReactDOM.render(<Home />, document.querySelector('#app'))
