import express from 'express'

import placesRouter from './routers/places'
import errorHandler from './middlewares/errorHandler'

const prefix = '/api/v1'

const app = express()

app.use(express.json())

app.use(`${prefix}/places`, placesRouter)
app.use(errorHandler)

export default app
