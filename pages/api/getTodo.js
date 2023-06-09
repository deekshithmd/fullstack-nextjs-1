import { connectToDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDB();
  const todos = await db.collection("todo").find().toArray();
  res.status(200).json(todos);
}
