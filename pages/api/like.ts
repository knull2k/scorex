// NEXT js backend route: LIKE/DISLIKE FUNC
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // give me the userId, postId, like
    const { userId, postId, like } = req.body;

    const data = like
      ? await client
          // patch = want to change something (postId) in the client
          .patch(postId)
          // happen for the 1st like only
          .setIfMissing({ likes: [] })
          // after = at the end,
          //   likes[-1] = end of the array,
          // [_key,...] = what we want to insert for new object inside array
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
            // commit = save it
          ])
          .commit()
      : await client
          .patch(postId)
          // checking all the likes & find the like inside likes array that has _ref
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
