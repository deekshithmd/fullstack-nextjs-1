import items from "../../data/items";
export default function handler(req, res) {
  return res.status(200).json({ items });
}
