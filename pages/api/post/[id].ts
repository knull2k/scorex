// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: "Response success from index.ts" });
  if (req.method === "GET") {
    const { id } = req.query;
    // sanity query
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === "PUT") {
    /* COMMENT FUNCTIONALITY */
    const { comment, userId } = req.body;
    const { id }: any = req.query;

    const data = await client
      // patch = want to change something (postId) in the client
      .patch(id)
      // happen for the 1st like only
      .setIfMissing({ comments: [] })
      // after = at the end,
      //   likes[-1] = end of the array,
      // [_key,...] = what we want to insert for new object inside array
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
        // commit = save it
      ])
      .commit();

    res.status(200).json(data);
  }
  /* COMMENT FUNCTIONALITY */
}
