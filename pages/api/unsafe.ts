// pages/api/unsafe.ts
// Don't use this code, it's for demonstration purposes only

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

const unsafeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const userFile = req.query.file as string;
      const data = await fs.readFile(userFile, 'utf8');
      res.status(200).send(data);
    } catch (error) {
      res.status(404).json({ error: 'File not found' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default unsafeHandler;
