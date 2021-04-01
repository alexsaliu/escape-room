import { useState } from 'react'

import Warning from './components/Warning.js'
import Terminal from './components/Terminal.js'

function App() {
    const [deactivated, setDeactivated] = useState(false)

    const deactivate = () => {
        console.log("OK");
        setDeactivated(true)
    }

    return (
        <div className="app">
            <Terminal deactivate={deactivate} />
            <Warning deactivated={deactivated} />
        </div>
    )
}

export default App;
