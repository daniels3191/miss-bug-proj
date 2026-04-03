import express from 'express'
import { makeId } from './services/util.service.js'

const app = express()

const bugs = [{
    "_id": "abc123",
    "title": "Cannot save a new car",
    "description": "problem when clicking Save",
    "severity": 3,
    "createdAt": 1542107359454,
},
{
    "_id": "abc124",
    "title": "Big bag",
    "description": "A TV show bug",
    "severity": 2,
    "createdAt": 15421073594,
}]

app.get('/api/bug', (req, res) => res.send(bugs))

app.get('/api/bug/save', (req, res) => {
    const { _id, title, description, severity } = req.query
    const bugToSave = {
        _id,
        title,
        description,
        severity: +severity,
    }

    if (_id) {
        const idx = bugs.findIndex(bug => bug._id === _id)
        bugs[idx] = { ...bugs[idx], ...bugToSave }
    } else {
        bugToSave._id = makeId()
        bugToSave.createdAt = Date.now()
        bugs.push(bugToSave)
    }

    res.send(bugToSave)
})

app.get('/api/bug/:_id', (req, res) => {
    const _id = req.params._id
    const bug = bugs.find(bug => bug._id === _id)

    res.send(bug)
})

app.get('/api/bug/:_id/remove', (req, res) => {
    const _id = req.params._id
    const idx = bugs.findIndex(bug => bug._id === _id)    

    if (idx === -1) {
        res.send('Cant remove')
        return
    }

    bugs.splice(idx, 1)
    res.send('OK')
})


const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))