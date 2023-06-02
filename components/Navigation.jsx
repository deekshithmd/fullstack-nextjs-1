"use client";
import axios from "axios";
export const Navigation = () => {
  const getData = async () => {
    const res = await axios.get("http://localhost:3000/api");
    console.log("Response", res);
  };
  return (
    <div>
      <h1>Navigation</h1>
      <button onClick={getData}>load</button>
    </div>
  );
};
