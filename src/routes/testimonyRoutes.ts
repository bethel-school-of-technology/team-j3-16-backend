import { Router } from 'express';
import { addTestimony, allTestimonies, deleteTestimony, editTestimony, getOneTestimony } from '../controllers/testimonyController';

const router = Router();

router.get('/', allTestimonies);
router.get('/:testyId', getOneTestimony);
router.post('/', addTestimony);
router.put('/:testyId', editTestimony);
router.delete('/:testyId', deleteTestimony);

export default router;