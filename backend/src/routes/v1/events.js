import express from "express";
import { MongoClient } from "mongodb";
import {
  URI,
  DB,
  EVENTSCOLLECTION,
  PARTICIPANTSCOLLECTION,
} from "../../config.js";

const client = new MongoClient(URI);
const router = express.Router();

router.get("/", async (req, res) => {
  const { eventName } = req.body;

  if (!eventName) {
    try {
      const con = await client.connect();

      const events = await con
        .db(DB)
        .collection(EVENTSCOLLECTION)
        .find()
        .toArray();

      await con.close();

      return res.status(200).send(events).end();
    } catch (error) {
      res.status(500).send(error).end();
      return console.error(error);
    }
  }

  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(PARTICIPANTSCOLLECTION)
      .find({ eventName: { $regex: eventName } })
      .toArray();

    await con.close();

    return res.send(data).end();
  } catch (err) {
    res.status(500).send({ err }).end();
  }
});

export default router;
