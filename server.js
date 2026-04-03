import express from 'express'
const app = express()
app.get('/dani', (req, res) => res.send('Hello Dani'))

const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))