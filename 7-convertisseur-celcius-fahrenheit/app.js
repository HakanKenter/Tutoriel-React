const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

/**
T(°F) = T(°C) × 9/5 + 32
T(°C) = (T(°F) - 32) × 5/9
**/

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5 ) + 32
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

function tryConvert (temperature, convert) {
    const value = parseFloat(temperature)
    // si c'est pas un nombre
    if(Number.isNaN(value)) {
        return '';
    }
    return (Math.round(convert(value) * 100) / 100).toString()
}

class Temperature extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    } 

    render () {
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        const {temperature} = this.props
        return <div className='form-group'>
        <label htmlFor={name}>Temperature (en {scaleName})</label>
        <input type="text" id={name} value={temperature} className='form-control' onChange={this.handleChange}/>
        </div>
    }
}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    // handleTemperatureChange (temperature) {
    //     this.setState({temperature})
    // } 

    handleCelsiusChange (temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    } 

    handleFahrenheitChange (temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    } 

    render () {
        // destructuration,/
        //permet de dire que je récupère la température depuis
        // this.state
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toCelsius)
        return <div>
            {/* <div className='form-group'>
                <label htmlFor="celsuis">Temperature en Celsius</label>
                <input id="celsius" value={temperature} className='form-control' onChange={this.handleChange}/>
            </div> */}
            <Temperature scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
            <Temperature scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            <BoilingVerdict celsius={celsius} />
        </div>
    }
}

ReactDOM.render(<Calculator />, document.getElementById("app"))