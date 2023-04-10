import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { analyzePullRequest } from '../../lib/pr-review-bot';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const prUrl = req.body.pull_request.html_url;
      const reviewMessage = await analyzePullRequest(prUrl);

      // Post the review feedback as a comment on the pull request
      const issueUrl = req.body.pull_request.issue_url;
      const commentUrl = `${issueUrl}/comments`;

      const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
      const headers = {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      };

      await axios.post(commentUrl, { body: reviewMessage }, { headers });

      res.status(200).json({ message: 'Review feedback posted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
