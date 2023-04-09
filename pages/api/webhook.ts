import { NextApiRequest, NextApiResponse } from 'next';
import { analyzePullRequest } from '../../lib/pr-review-bot';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const prUrl = req.body.pull_request.html_url;
      console.log("Hello, I am in the post!")
      console.log("prURL: " + prUrl)
      const reviewMessage = await analyzePullRequest(prUrl);
      res.status(200).json({ message: reviewMessage });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
