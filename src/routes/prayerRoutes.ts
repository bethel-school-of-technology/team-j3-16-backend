import { Router } from 'express';
import { addPrayer, deletePrayer, editPrayer, getAllPrayers, getOnePrayer } from '../controllers/prayerController';

const router = Router();

router.get('/', getAllPrayers);
router.get('/:prayer_id', getOnePrayer);
router.post('/', addPrayer);
router.put('/:prayer_id', editPrayer);
router.delete('/:prayer_id', deletePrayer);

export default router;