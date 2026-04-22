import { Router, type IRouter } from "express";
import healthRouter from "./health.ts";
import agentRouter from "./agen.ts";
const router: IRouter = Router();
router.use(healthRouter);
router.use(agentRouter);
export default router;