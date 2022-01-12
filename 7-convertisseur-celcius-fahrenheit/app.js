const scaleNames = {
    c: 'Celsius',
    f: 'Fhrenheit'
}

function BoilingVerdict ({celsius}) {
    if (celsius >= 100) {
        return <div className='alert alert-success'>
            L'eau bout
        </div>
    }
    return <div className="alert alert-info">
        L'eau ne bout pas
    </div>
}

class Temperature extends React.Component {

    constructor() {
        super(props)
        this.state = {scale: scaleNames.c}
    }


    render () {
        return <div className='form-group'>
        <label htmlFor="celsuis">Temperature en Celsius</label>
        <input id="celsius" value={temperature} className='form-control' onChange={this.handleChange}/>
        </div>
    }
}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            temperature: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({temperature : e.target.value})
    } 

    render () {
        // destructuration,/
        //permet de dire que je récupère la température depuis
        // this.state
        const {temperature} = this.state
        return <div>
            <div className='form-group'>
                <label htmlFor="celsuis">Temperature en Celsius</label>
                <input id="celsius" value={temperature} className='form-control' onChange={this.handleChange}/>
            </div>
            <Temperature scale='c' />
            <Temperature scale='f' />
            <BoilingVerdict celsius={parseFloat(temperature)} />
        </div>
    }
}

ReactDOM.render(<Calculator />, document.getElementById("app"))