import { connectToDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDB();
  switch (method) {
    case "GET":
      const todos = await db.collection("todo").find().toArray();
      res.status(200).json(todos);
      break;
    case "POST":
      const todo = req.body;
      let myTodos = await db.collection("todo").insertOne(todo);
      if (myTodos?.acknowledged) {
        const todos = await db.collection("todo").find().toArray();
        res.status(200).json(todos);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
