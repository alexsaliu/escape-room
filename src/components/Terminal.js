import {useState, useEffect, useRef} from 'react'

import { initialText } from './initialText.js'

const Terminal = ({deactivate}) => {
    const [input, _setInput] = useState('')
    const [code, setCode] = useState(initialText)

    const [step, _setStep] = useState(0)
    const [code1, setCode1] = useState('')

    const inputRef = useRef('')
    const stepRef = useRef(0)

    const setInput = (value) => {
        inputRef.current = value
        _setInput(value)
    }
    const setStep = (value) => {
        stepRef.current = value
        _setStep(value)
    }

    useEffect(() => {
        if (step === 4) {
            deactivate()
        }
    }, [step])

    useEffect(() => {
        document.addEventListener("keydown", keyDown)
        return () => {
            document.removeEventListener("keydown", keyDown)
        }
    }, [])

    const keyDown = (e) => {
        console.log(e);
        if (e.key === 'Backspace') {
            let value = inputRef.current.split('')
            let lastChar = value.pop()
            if (lastChar ===  '>') value.splice(value.length - 18)
            setInput(value.join(''))
        }
        if (e.code === "Space") {
            setInput(inputRef.current + '<span>&nbsp;</span>')
        }
        else if (e.key.length < 2) {
            setInput(inputRef.current + e.key)
        }
        if (e.key === 'Enter') {
            const prevInput = inputRef.current
            setCode(val => val + prevInput + '<br>')
            setInput('')
            if (stepRef.current === 0) {
                if (prevInput === 'y') {
                    setStep(1)
                    setCode(val => val + 'Input wine code:' + '<br>')
                }
                else {
                    setCode(val => val + 'Initiate deactivation protocal? [y/n]:<br>')
                }
            }
            else if (stepRef.current === 1) {
                if (prevInput === 'jellyfish') {
                    setStep(2)
                    setCode(val => val + 'Input buddha code:' + '<br>')
                }
                else {
                    setCode(val => val + 'Input wine code:' + '<br>')
                }
            }
            else if (stepRef.current === 2) {
                if (prevInput === 'hardqueen') {
                    setStep(3)
                    setCode(val => val + 'Input gym code:' + '<br>')
                }
                else {
                    setCode(val => val + 'Input buddha code:' + '<br>')
                }
            }
            else if (stepRef.current === 3) {
                if (prevInput === 'georgeferguson') {
                    setStep(4)
                    setCode(val => val + 'Input shower code:' + '<br>')
                }
                else {
                    setCode(val => val + 'Input gym code:' + '<br>')
                }
            }
            const element = document.querySelector(".terminal")
            element.scrollTop = element.scrollHeight
        }
        return true
    }

    return (
        <div className="terminal">
            <div className="code" dangerouslySetInnerHTML={{__html: code}}></div>
            <div className="input">
                <div dangerouslySetInnerHTML={{__html: input}}></div>
                <div className="input-cursor"></div>
            </div>
        </div>
    )
}

export default Terminal;
