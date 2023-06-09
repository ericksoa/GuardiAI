// File: lib/pr-review-bot.ts

import axios from 'axios';
import { config } from 'dotenv';
import { OpenAIApi, Configuration } from 'openai';

config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

interface PullRequestData {
  files: Array<{
    filename: string;
    changes: string;
  }>;
}

interface SecurityIssue {
  description: string;
}

export const analyzePullRequest = async (prUrl: string): Promise<string> => {
  const prData = await fetchPullRequestData(prUrl);
  const securityIssues = await checkForSecurityIssues(prData);
  console.log("securityIssues: ", securityIssues)

  if (securityIssues.length > 0) {
    const message =
      "I've reviewed your pull request and found the following security issues:\n" +
      securityIssues.map((issue) => `- ${issue.description}`).join('\n') +
      '\nPlease address these issues and update your pull request.';
    return message;
  } else {
    return "I've reviewed your pull request and found no security issues. Approved!";
  }
};

const fetchPullRequestData = async (prUrl: string): Promise<PullRequestData> => {

  const apiUrl = prUrl.replace('https://github.com/', 'https://api.github.com/repos/').replace('/pull/', '/pulls/');
  const prNumber = apiUrl.split('/').pop();
  const diffUrl = `${apiUrl.split('/').slice(0, -1).join('/')}/${prNumber}.diff`;
  const filesUrl = apiUrl + "/files"

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  const response = await axios.get(filesUrl, { headers });

  const changeData = response.data.map((d:any) => ({filename: d.filename, rawUrl: d.raw_url}))

  const changesWithContent = await Promise.all(changeData.map(async (cd:any) => ({filename: cd.filename, content: (await axios.get(cd.rawUrl, { headers })).data}) ))

  //const changes = response.data.split('\n').filter((line: string) => line.startsWith('+') || line.startsWith('-'));

  const returnThis = changesWithContent.map(cwc => ({filename: cwc.filename, changes: cwc.content}))

  return {
    files: returnThis,
  };
};

const checkForSecurityIssues = async (prData: PullRequestData): Promise<SecurityIssue[]> => {
  const issuePromises = prData.files.map(async (file) => {
    const prompt = `Review the following code changes for security issues:\n\n${file.changes}\n\nDoes this code have any security issues? If so, please describe them.`;

    console.log("prompt: ", prompt)

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    const answer = response?.data?.choices?.[0]?.text?.trim();

    if (answer && answer.toLowerCase() !== 'no' && answer !== '') {
      return { description: answer };
    } else {
      return null;
    }
  });

  //lets create a really dumb pull request:

  const issues = await Promise.all(issuePromises);
  return issues.filter((issue) => issue !== null) as SecurityIssue[];
};
