import * as Router from 'koa-router';
import * as uploadController from '../../controllers/upload_controller'
const router = new Router();
router.prefix('/upload');
router.get('/checkFile',uploadController.checkFile);
router.get('/mergeFile',uploadController.mergeFile);
// router.post('/uploadFile',uploadController.uploadFileLimits.single('data'),uploadController.upload)
router.post('/uploadFile',uploadController.upload)
export const uploadRouter = router;