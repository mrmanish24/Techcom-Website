// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // MongoDB connection URI
const client = new MongoClient(uri);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const db = await client.connect();
  const collection = db.db("pc-build").collection("products");

  switch (method) {
    case "GET":
      const type = query.type as string;
      const products = await collection.find({ type }).toArray();
      res.status(200).json(products);
      break;
    case "POST":
      const newItem = body;
      // Check if the item already exists
      const existingProduct = await collection.findOne({
        name: newItem.name,
        type: newItem.type,
      });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" });
      }
      await collection.insertOne(newItem);
      res.status(201).json(newItem);
      break;
    default:
      res.status(405).end();
  }

  await client.close();
};

export default handler;
