import express, { Router } from "express";
import controller from "../controllers/teams";
import reqParamsValidation from "../middlewares/reqParamsValidation";

const router: Router = express.Router();

router.get("/teams", controller.getTeams);
router.get("/teams/:id", reqParamsValidation.idValidation, controller.getTeam);
router.post("/teams", controller.addTeam);
router.put(
  "/teams/:id",
  reqParamsValidation.idValidation,
  controller.updateTeam
);
router.delete("/teams", controller.deleteOneOrMayTeam);

export = router;
