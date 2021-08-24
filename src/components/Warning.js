import { useState, useEffect } from 'react'

import hazardRed from './hazard-red.png'
import hazardGreen from './hazard-green.png'
import alarm from './alarm.mp3'
import loomingdread from './looming_dread.mp3'

const Warning = ({deactivated, timerEnd}) => {
    const [timer, setTimer] = useState(3 * 60 - 1)
    const [audio1, setAudio1] = useState(new Audio(alarm))
    const [audio2, setAudio2] = useState(new Audio(loomingdread))

    useEffect(() => {
        if (audio1 && audio2) {
            audio1.play()
            audio2.play()
            audio1.volume = 0.4
        }
    }, [timer])

    useEffect(() => {
        console.log(deactivated);
        if (deactivated) {
            audio1.volume = 0
            audio2.volume = 0
            setAudio1(null)
            setAudio2(null)
        }
    }, [deactivated])

    useEffect(() => {
        if (timer === 0 && !deactivated) {
            document.querySelector('.code').style.color = "var(--red)"
            audio2.volume = 0.2
            timerEnd()
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
                <div className="time">{Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</div>
            }
        </div>
    )
}

export default Warning;
