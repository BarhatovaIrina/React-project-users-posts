import express from 'express'
import mainRoute from './routes/mainRoute.js'
import userRoute from './routes/user/userRoute.js'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './swagger.js'

const app = express();
const PORT = 3900;
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))
app.use('/', mainRoute)
app.use('/auth', userRoute)

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})