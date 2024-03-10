import { Request, Response } from "express";
import { Card } from "../Models/Card";

export const CardController = {
  index: (req: Request, res: Response) => {
    res.render("pages/home", {
      title: "Home",
      cards: Card.getAll(),
    });
  },
  shirts: (req: Request, res: Response) => {
    res.render("pages/home", {
      title: "Home",
      cards: Card.getByTypeCode("TSHIRT"),
    })
  },
  mugs: (req: Request, res: Response) => {
    res.render("pages/home", {
      title: "Home",
      cards: Card.getByTypeCode("MUG"),
    })
  },
  caps: (req: Request, res: Response) => {
    res.render("pages/home", {
      title: "Home",
      cards: Card.getByTypeCode("CAP"),
    })
  },
  search: (req: Request, res: Response) => {
    if (!req.query.q) {
      return res.redirect("/");
    }

    res.render("pages/home", {
      title: "Home",
      cards: Card.getByTitle(req.query.q as string),
      query: req.query.q,
    })
  },
}