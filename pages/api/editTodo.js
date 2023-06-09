import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDB();
  const { id } = req.query;
  const { todo, completed } = req.body;
  const updateResult = await db.collection("todo").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        todo,
        completed,
      },
    }
  );
  if (updateResult?.acknowledged) {
    const todos = await db.collection("todo").find().toArray();
    res.status(200).json(todos);
  }
}
