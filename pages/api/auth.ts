// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: "Response success from index.ts" });
  if (req.method === "POST") {
    const user = req.body;
    // create user if not exist
    client
      .createIfNotExists(user)
      //   this will create user inside sanity db
      .then(() => res.status(200).json("Login success"));
  }
}
