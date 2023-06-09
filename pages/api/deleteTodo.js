import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDB();
  const body = req.body;

  const deleteResult = await db.collection("todo").deleteOne({
    _id: new ObjectId(body?.id),
  });

  if (deleteResult?.acknowledged) {
    const todos = await db.collection("todo").find().toArray();
    res.status(200).json(todos);
  }
}
