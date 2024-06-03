import { Router } from 'express';
import { allUsers, findUser, register, login, deleteUser, editUserInfo, allPostsByUser } from '../controllers/userController';


const router = Router();

// router.post('/', register);
router.post('/register', register);
router.post('/login', login);

router.get('/', allUsers);
router.get('/:userId', findUser);

router.put('/:userId', editUserInfo);
router.delete('/:id', deleteUser);

router.get('/posts/:postedBy', allPostsByUser);

export default router;