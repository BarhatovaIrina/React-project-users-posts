import express from 'express'
import mainRoute from './routes/mainRoute.js'
import cors from 'cors'

const app = express();
const PORT = 3900;
app.use(express.json())
app.use(cors())
app.use('/', mainRoute)

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})