import {useState, useEffect, useRef} from 'react'

import { initialText } from './initialText.js'
import { codes } from './codes.js'
import { questions } from './codes.js'

const Terminal = ({deactivate, end}) => {
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
        if (end) return
        if (step === 6) {
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
                if (prevInput === codes[0]) {
                    setStep(1)
                    setCode(val => val + questions[1] + '<br>')
                }
                else {
                    setCode(val => val + questions[0] + '<br>')
                }
            }
            else if (stepRef.current === 1) {
                if (prevInput === codes[1]) {
                    setStep(2)
                    setCode(val => val + questions[2] + '<br>')
                }
                else {
                    setCode(val => val + questions[1] + '<br>')
                }
            }
            else if (stepRef.current === 2) {
                if (prevInput === codes[2]) {
                    setStep(3)
                    setCode(val => val + questions[3] + '<br>')
                }
                else {
                    setCode(val => val + questions[2] + '<br>')
                }
            }
            else if (stepRef.current === 3) {
                if (prevInput === codes[3]) {
                    setStep(4)
                    setCode(val => val + questions[4] + '<br>')
                }
                else {
                    setCode(val => val + questions[3] + '<br>')
                }
            }
            else if (stepRef.current === 4) {
                if (prevInput === codes[4]) {
                    setStep(5)
                    setCode(val => val + questions[5] + '<br>')
                }
                else {
                    setCode(val => val + questions[4] + '<br>')
                }
            }
            else if (stepRef.current === 5) {
                if (prevInput === codes[5]) {
                    setStep(6)
                    setCode(val => val + 'Virus deactivated!!!!!!!' + '<br>')
                }
                else {
                    setCode(val => val + questions[5] + '<br>')
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
