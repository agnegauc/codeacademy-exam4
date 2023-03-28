import express from "express";
import Joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import { URI, DB, PARTICIPANTSCOLLECTION } from "../../config.js";

const client = new MongoClient(URI);
const router = express.Router();

const participantSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  eventName: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  age: Joi.number().required(),
  dateOfBirth: Joi.string().trim().required(),
});

router.post("/", async (req, res) => {
  let participantData = req.body;

  try {
    await participantSchema.validateAsync(participantData);
  } catch (error) {
    return res.status(400).send({ error: error.details[0].message }).end();
  }

  try {
    const con = await client.connect();

    await con
      .db(DB)
      .collection(PARTICIPANTSCOLLECTION)
      .insertOne(participantData);

    await con.close();

    return res
      .status(201)
      .send({
        message: "Participant successfully added.",
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
});

router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let participantData = req.body;

  try {
    await participantSchema.validateAsync(participantData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.details[0].message }).end();
  }

  try {
    const con = await client.connect();

    await con
      .db(DB)
      .collection(PARTICIPANTSCOLLECTION)
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: participantData });

    await con.close();

    return res
      .status(201)
      .send({
        message: "Participant details updated.",
      })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  if (!id || id.length !== 24) {
    return res
      .status(400)
      .send({ message: "Please provide a correct participant ID." })
      .end();
  }

  try {
    const con = await client.connect();

    const participant = await con
      .db(DB)
      .collection(PARTICIPANTSCOLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    await con.close();

    if (participant.deletedCount) {
      return res
        .status(201)
        .send({
          message: "Participant successfully deleted.",
        })
        .end();
    }

    return res
      .status(404)
      .send({ message: "A participant with the provided ID does not exist." })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
});

router.get("/", async (_, res) => {
  try {
    const con = await client.connect();
    const participants = await con
      .db(DB)
      .collection(PARTICIPANTSCOLLECTION)
      .find()
      .toArray();

    await con.close();

    return res.send(participants).end();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
    return console.error(error);
  }
});

export default router;
