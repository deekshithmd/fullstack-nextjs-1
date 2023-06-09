import { connectToDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDB();
  const todo = req.body;
  const addResult = await db.collection("todo").insertOne(todo);
  if (addResult?.acknowledged) {
    const todos = await db.collection("todo").find().toArray();
    res.status(200).json(todos);
  }
}
