import {useState} from 'react'

import hazard from './hazard-red.png'

const Warning = () => {
    return (
        <div className="warning">
            <img className="spinning" src={hazard} />
            <div className="msg">Virus released in</div>
            <div className="time">5:00</div>
        </div>
    )
}

export default Warning;
