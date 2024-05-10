import { Router } from 'express';
import { addPrayer, deletePrayer, editPrayer, getAllPrayers, getOnePrayer } from '../controllers/prayerController';

const router = Router();

router.get('/', getAllPrayers);
router.get('/:id', getOnePrayer);
router.post('/', addPrayer);
router.put('/:id', editPrayer);
router.delete('/:id', deletePrayer);

export default router;

// import {NextFunction, Request, Response, Router} from 'express';

// const router = Router();

// function helloWorld(req: Request, res: Response, next: NextFunction){
//     res.send('Hello World')
// }

// function info(req: Request, res: Response, next: NextFunction){
//     res.send('Server is running at port 3000');
// }

// router.get('/', helloWorld);
// router.get('/info', info)

// export default router;