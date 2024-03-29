import express from 'express'

import { getAllPlaces, getOnePlace } from '../controllers/places'

const router = express.Router()

router.get('/all', getAllPlaces)
router.get('/:id', getOnePlace)

export default router
