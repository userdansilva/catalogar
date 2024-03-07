import { Router } from "express";
import { CardController } from "../Controllers/CardController";

const mainRouter = Router();

mainRouter.get("/", CardController.index);
mainRouter.get("/camisas", CardController.shirts);
mainRouter.get("/canecas", CardController.mugs);
mainRouter.get("/bones", CardController.caps);
mainRouter.get("/busca", CardController.search);

export { mainRouter };
