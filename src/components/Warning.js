import { useState, useEffect } from 'react'

import hazardRed from './hazard-red.png'
import hazardGreen from './hazard-green.png'

const Warning = ({deactivated}) => {
    const [timer, setTimer] = useState(4 * 60 - 1)

    useEffect(() => {
        if (timer === 0) {
            document.querySelector('.code').style.color = "var(--red)"
        }
        else {
            setTimeout(() => {
                setTimer(val => val - 1)
            }, 1000)
        }
    }, [timer])

    return (
        <div style={deactivated ? {boxShadow: '0 0 10px 5px var(--green)'} : {}} className="warning">
            <img className={deactivated ? '' : "spinning"} src={deactivated ? hazardGreen : hazardRed} />
            { deactivated ?
                <div style={{color: 'var(--green)'}} className="msg">Virus Deactivated</div> :
                <div className="msg">Virus released in</div>
            }
            {
                deactivated ?
                <div style={{color: 'var(--green)'}} className="time">We aren't gonna die!</div> :
                <div className="time">{Math.round(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</div>
            }
        </div>
    )
}

export default Warning;
