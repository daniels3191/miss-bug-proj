import express from 'express'
import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()
app.use(express.static('public'))

app.get('/api/bug', (req, res) =>

    bugService.query()
        .then(bugs => res.send(bugs))
)


app.get('/api/bug/save', (req, res) => {
    const { _id, title, description, severity } = req.query
    const bugToSave = {
        _id,
        title,
        description,
        severity: +severity,
    }

    bugService.save(bugToSave)
    .then((savedBug) => res.send(savedBug))


    
})

app.get('/api/bug/:_id', (req, res) => {
    const bug_id = req.params._id
    
    bugService.get(bug_id)
        .then(bug => {res.send(bug)})
        .catch(err => {
            loggerService.error(err)
            res.status(404).send('Cant find bug')
        })

})


app.get('/api/bug/:_id/remove', (req, res) => {
    const bug_id = req.params._id

    bugService.remove(bug_id)
    .then(bug_id =>   {
        console.log(bug_id);
        
        res.send(`The bug ${bug_id} has been removed`)
    })
    .catch(err => {
        loggerService.error(err)
         res.status(404).send('Cant remove the bug')
    })

    
})


const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))