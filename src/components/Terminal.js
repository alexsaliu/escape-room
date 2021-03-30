import {useState, useEffect, useRef} from 'react'

const text = `    const generateEmails = () => {
        //// Groups candidates according to their elligable jobs ////

        // Captures all jobs eligable for each candidate
        const candidateJobs = []
        for (let i = 0; i < candidates.length; i++) {
            const obj = {'id': i, 'jobIds': []}
            for (let j = 0; j < jobs.length; j++) {
                const matches = candidates[i].candidateTags.filter(tag => jobs[j].jobTags.includes(tag))
                if (matches.length) obj.jobIds.push(j)
            }
            candidateJobs.push(obj)
        }

        // Adds candidate ids to joblists shared between candidates
        const jobGroups = []
        for (let i = 0; i < candidateJobs.length; i++) {
            let added = false
            for (let j = 0; j < jobGroups.length; j++) {
                if (JSON.stringify(candidateJobs[i].jobIds) === JSON.stringify(jobGroups[j].jobIds)) {
                    jobGroups[j].candidateIds.push(i)
                    added = true
                    break
                }
            }
            if (!added) jobGroups.push({'candidateIds': [i], 'jobIds': [...candidateJobs[i].jobIds]})
        }

        setGroups(jobGroups)
        setSelectedGroupId(-2)
        setEmail('')
    }`

const Terminal = () => {
    const [input, setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        if (input.length > 30) {
            let value = input.split('')
            value.pop()
            setInput(value.join(''))
        }
    }, [input])

    useEffect(() => {
        window.addEventListener('click', clickPage)
        return () => {
            window.removeEventListener('click', clickPage)
        }
    }, [])

    function clickPage() {
        inputRef.current.focus()
    }

    return (
        <div className="terminal">
            <input ref={inputRef} type="text" onChange={(e) => setInput(e.target.value)} value={input}/>
            <div className="code">
                {text}
            </div>
            <div className="input">
                {input}
                <div className="input-cursor"></div>
            </div>
        </div>
    )
}

export default Terminal;
