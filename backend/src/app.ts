import express from 'express'
import cors from 'cors'

import placesRouter from './routers/places'
import healthCheckRouter from './routers/healthCheck'
import errorHandler from './middlewares/errorHandler'

const prefix = '/api/v1'
export const isProd = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors())
app.use(express.json())
app.use(`/`, placesRouter)
app.use(`${prefix}/health-check`, healthCheckRouter)
app.use(errorHandler)

export default app
