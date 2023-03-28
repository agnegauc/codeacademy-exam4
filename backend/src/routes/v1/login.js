import express from "express";
import Joi from "joi";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { URI, DB, USERSCOLLECTION, jwtSecret } from "../../config.js";

const client = new MongoClient(URI);
const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  let userData = req.body;
  const expiresIn = 100000000;
  const issuedAt = new Date().getTime();

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.details[0].message }).end();
  }

  try {
    const con = await client.connect();
    const usersByEmail = await con
      .db(DB)
      .collection(USERSCOLLECTION)
      .find({ email: userData.email })
      .toArray();

    await con.close();

    if (usersByEmail.length === 0) {
      return res
        .status(400)
        .send({ error: "User with this email address does not exist." })
        .end();
    }

    const isAuthed = bcrypt.compareSync(
      userData.password,
      usersByEmail[0].password
    );

    if (isAuthed) {
      const token = jwt.sign({ id: usersByEmail[0].id, issuedAt }, jwtSecret, {
        algorithm: "HS256",
        expiresIn,
      });

      return res.send({ message: "Login successful!", token }).end();
    }

    return res.status(400).send({ error: "Incorect password." }).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
  }
});

export default router;
