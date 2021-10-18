import express from 'express'

import { getAllPlaces } from '../controllers/places'

const router = express.Router()

router.get('/', getAllPlaces)
// router.get('/:name', getPlacesByName)

export default router
