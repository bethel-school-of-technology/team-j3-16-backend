import { Router } from 'express';
import { addPrayer, deletePrayer, editPrayer, getAllPrayers, getOnePrayer } from '../controllers/prayerController';

const router = Router();

router.get('/', getAllPrayers);
router.get('/:postedBy/:prayerId', getOnePrayer);
router.post('/', addPrayer);
router.put('/:prayerId', editPrayer);
router.delete('/:prayerId', deletePrayer);


export default router;