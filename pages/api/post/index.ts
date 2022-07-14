// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: "Response success from index.ts" });
  if (req.method === "GET") {
    // allPostsQuery comes from utils > queries.ts
    const query = allPostsQuery();

    // now we can fetch data from sanity by setting up the sanity client
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = req.body;

    client.create(document).then(() => res.status(201).json("Video Uploaded!"));
  }
}
