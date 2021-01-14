import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser'; // * Cookie Encryption

import { ObjectId, MongoClient } from 'mongodb'; // * connect db
import * as crypto from 'crypto';
import * as fs from 'fs';
import { join } from 'path';

// * Using Angular Service
import { MongoService } from './src/app/mongo.service'
import {Product} from "./src/model/product.model";
import {User} from "./src/model/user.model";

export const api = express.Router(); // => import { api } in other file

api.use(
  cors({
    origin: true,
    credentials: true,
  })
);
api.use(bodyParser.json());
api.use(cookieParser());

/**
 * Connecting to DB
 */
const dbUrl =
  'mongodb+srv://dbUser:SqyB0tGfGGBZrL6L@cluster0.is1ed.mongodb.net/cluster0';

export const dbClient = MongoClient.connect(dbUrl, {
  useUnifiedTopology: true,
}).then((connection) => connection.db('cluster0'));

dbClient.then(() => {
  console.log('Connected to the database.');
});

/**
 * Helper Function
 */
/*async function retrieveFromDb(
  collectionName,
  project = {},
  query = {}
): Promise<any[]> {
  project['_id'] = 0;
  const db = await dbClient;
  return new Promise((resolve) => {
    db.collection(collectionName)
      .aggregate([
        { $match: query },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        { $project: project },
      ])
      .toArray((err, objects) => {
        resolve(objects);
      });
  });
}*/
// * Use Angular Mongo Service
const mongoService = new MongoService(dbClient)

/**
 * Retrieving products
 */
api.get('/products', async (req, res) => {
  console.log('GET products from API');

  /*const products = await retrieveFromDb('products', {
    description: 0, // ? no description
  });*/
  const products = await mongoService.retrieveFromDb<Product>(
    'products',
    {
    description: 0, // ? no description
  });

  res.send(products);
});

api.get('/products/:id', async (req, res) => {

  /*const products = await retrieveFromDb(
    'products',
    {}, // ? with description
    { _id: ObjectId(req.params.id) }
  );*/
  const products = await mongoService.retrieveFromDb<Product>(
    'products',
    {}, // ? with description
    { _id: ObjectId(req.params.id) }
  );

  if (products.length == 0) {
    res.sendStatus(404);
  } else {
    res.send(products[0]);
  }
});

/**
 * Cookie Encryption
 * Generate a private key that will use to encrypt and decrypt cookies
 * `openssl genrsa -out ./privkey.pem 2048`
 */
const key = fs.readFileSync(
  join(process.cwd(), 'privkey.pem'),
  'utf8'
);

function encrypt(toEncrypt: string): string {
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.privateEncrypt(key, buffer);
  return encrypted.toString('base64');
}

export function decrypt(toDecrypt: string): string {
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = crypto.publicDecrypt(key, buffer);
  return decrypted.toString('utf8');
}

/**
 * User Authentication
 */
const hash = crypto.createHash('sha512');

api.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = hash // TODO: Use salt on production
    .update(req.body.password)
    .digest('hex');

  /*const foundUsers = await retrieveFromDb(
    'users',
    { password: 0 },
    { email: email, password: password }
  ); */
  const foundUsers = await mongoService.retrieveFromDb<User>(
    'users',
    { password: 0 },
    { email: email, password: password }
  );

  if (foundUsers.length == 0) {
    res.sendStatus(401);
  } else {
    const user = foundUsers[0];
    res.cookie('loggedIn', encrypt(`${user.id}`), {
      maxAge: 600 * 1000,
      httpOnly: true,
    });

    delete user.id;
    res.send(user);
  }
});

api.get('/isLoggedIn', async (req, res) => {
  if (req.cookies.loggedIn) {
    const userId = decrypt(req.cookies.loggedIn);

    /*const foundUsers = await retrieveFromDb(
      'users',
      { _id: 0, password: 0 },
      { _id: ObjectId(userId) }
    );*/
    const foundUsers = await mongoService.retrieveFromDb<User>(
      'users',
      { _id: 0, password: 0 },
      { _id: ObjectId(userId) }
    );

    const user = foundUsers[0];
    res.send(user);
  } else {
    res.sendStatus(401);
  }
});

/**
 * Favorite
 */

api.post('/favorites/:id', async (req, res) => {
  const userId = decrypt(req.cookies.loggedIn);

  const newFavorite = req.params.id;

  /*const user = await retrieveFromDb(
    'users',
    { _id: 0, password: 0 },
    { _id: ObjectId(userId) }
  );*/
  const user = await mongoService.retrieveFromDb<User>(
    'users',
    { _id: 0, password: 0 },
    { _id: ObjectId(userId) }
  );

  const currentFavorites = user[0].favorite;

  if (!currentFavorites.includes(newFavorite)) {
    currentFavorites.push(newFavorite);
    await (await dbClient)
      .collection('users')
      .updateOne(
        { _id: ObjectId(userId) },
        { $set: { favorite: currentFavorites } }
      );
    res.status(202);
  }
  res.send(user[0]);
});
