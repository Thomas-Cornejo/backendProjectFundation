import { Router } from 'express'
import { createAnimal, getAnimal, getAnimals, deleteAnimal, updateAnimal } from '../controllers/animal.controller.js'
import { getBreeds } from '../controllers/breed.controller.js'
const router = Router()

router.get('/', getAnimals)
router.post('/crear', createAnimal)

router.delete('/:id', deleteAnimal)
router.get('/:id', getAnimal)

router.put('/:id', updateAnimal) 

router.get('/breeds', getBreeds)
export default router