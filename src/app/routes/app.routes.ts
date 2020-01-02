import { userRouter } from "./api/user_router";
import { testRouter} from './api/test_router'
import * as Router from "koa-router";
let router = new Router();
router
  .use("/api",testRouter.routes(),testRouter.allowedMethods())
  .use("/api", userRouter.routes(), userRouter.allowedMethods())
  .get("/*", (ctx, next) => {
    ctx.body = {
      message: "server alive",
      time: new Date()
    };
    ctx.status = 200;
    next()
  });

export const appRoutes = router;
