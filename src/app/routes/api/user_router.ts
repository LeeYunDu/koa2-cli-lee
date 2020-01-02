import * as Router from 'koa-router';
import {getUser,registerUser,uploadFileTest,uploadFileLimits} from './../../controllers'
let router = new Router();
router.prefix('/user');
router.get('/getUser',getUser);
router.post('/registerUser',registerUser);
router.post('/uploadFile',uploadFileLimits.single('file'),uploadFileTest);
export const userRouter = router;
