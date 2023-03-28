import express from "express";
import Joi from "joi";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { URI, DB, USERSCOLLECTION } from "../../config.js";

const client = new MongoClient(URI);
const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.details[0].message }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await client.connect();
    await con
      .db(DB)
      .collection(USERSCOLLECTION)
      .insertOne({ email: userData.email, password: hashedPassword }); // Postinam ne tai, ką įrašytume į body Postman'e, o tai, kas šioje eilutėje

    await con.close();

    return res.status(201).send({ message: "Registration successful." }).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
  }
});

export default router;
