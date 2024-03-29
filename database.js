const { MongoClient } = require("mongodb");

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const bcrypt = require("bcrypt");
const uuid = require("uuid");

if (!userName) {
  throw Error("Database not configured. Set environment variables");
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db("startup").collection("score");
const userCollection = client.db("startup").collection("login");

const purhcaseCollection = client.db("startup").collection("purchase");

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = { score: { $gt: 0 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

function addPurchase(purchases) {
  purhcaseCollection.insertOne(purchases);
}

function getPurchase() {
  const cursor = purhcaseCollection.find();
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  getPurchase,
  addPurchase,
};
