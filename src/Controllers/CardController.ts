import { Request, Response } from "express";
import { Card } from "../Models/Card";

export const CardController = {
  index: (req: Request, res: Response) => {
    res.render("home", {
      title: "Home",
      cards: Card.getAll(),
    });
  },
  shirts: (req: Request, res: Response) => {
    res.render("home", {
      title: "Home",
      cards: Card.getByType("TSHIRT"),
    })
  },
  mugs: (req: Request, res: Response) => {
    res.render("home", {
      title: "Home",
      cards: Card.getByType("MUG"),
    })
  },
  caps: (req: Request, res: Response) => {
    res.render("home", {
      title: "Home",
      cards: Card.getByType("CAP"),
    })
  },
  search: (req: Request, res: Response) => {
    if (req.query.q) {
      res.render("home", {
        title: "Home",
        cards: Card.getByTitle(req.query.q as string),
        query: req.query.q,
      })
    } else {
      res.render("home", {
        title: "Home",
        cards: Card.getAll(),
      })
    }
  },
}