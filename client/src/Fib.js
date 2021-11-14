import axios from 'axios'
import {useState, useEffect} from 'react'

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    const fetchValues = async () => {
        const res = await axios.get('/api/values/current')
        setValues(res.data)
    }

    const fetchIndexes = async () => {
        const res = await axios.get('/api/values/all')
        setSeenIndexes(res.data)
    }

    const renderSeenIndexes = () => {
        return seenIndexes.map(({number}) => number).join(', ')
    }

    const renderValues = () => {
        const entries = []
        for(let key in values){
            entries.push(
                <div key={key}>For index {key}, I calculated {values[key]} </div>
            )
        }
        return entries
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const res = await axios.post('/api/values', {index})
        await axios.post('/api/values', {index})
        setIndex('')
    }

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={e => setIndex(e.target.value)}/>
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
                {renderSeenIndexes()}

            <h3>Calculated values</h3>
                {renderValues()}

        </div>
    )
}

export default Fib
