import * as Router from 'koa-router';
import {testPost} from '../../controllers'
let router = new Router();
router.prefix('/test');
router.get('/testGet',testPost);
router.post('/testPost',testPost);
export const testRouter = router;
