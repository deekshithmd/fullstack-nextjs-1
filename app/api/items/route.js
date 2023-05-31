/**
 * @returns {Promise<Object>} A promise that resolves to an object containing the items data.
 */

import items from "@/data/items";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ items: items.data });
}
