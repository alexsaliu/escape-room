import { useState } from 'react'

import Warning from './components/Warning.js'
import Terminal from './components/Terminal.js'

function App() {
    const [deactivated, setDeactivated] = useState(false)
    const [end, setEnd] = useState(false)

    const deactivate = () => {
        setDeactivated(true)
    }

    const timerEnd = () => {
        setEnd(true)
    }

    return (
        <div className="app">
            <Terminal deactivate={deactivate} end={end} />
            <Warning deactivated={deactivated} timerEnd={timerEnd} />
        </div>
    )
}

export default App;
