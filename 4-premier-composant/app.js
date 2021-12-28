/*
    Un composant est une fonction.
    Les composant vont permettre de pourvoir réutiliser au maximum notre code.
    Et de créer des bmlocs que l'on va pouvoir conserver et utiliser de manière modulable.
*/
function Welcome ({name, children}) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

ReactDOM.render(<Welcome name="Dorothée" >Bonjour tout le monde</Welcome>, document.querySelector('#app'))
