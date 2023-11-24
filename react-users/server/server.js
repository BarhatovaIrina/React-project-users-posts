import express from 'express'
import mainRoute from './routes/mainRoute.js'
import userRoute from './routes/user/userRoute.js'
import cors from 'cors'

const app = express();
const PORT = 3900;
app.use(express.json())
app.use(cors())
app.use('/', mainRoute)
app.use('/auth', userRoute)

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})