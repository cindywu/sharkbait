import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcc&days=2');

  const json = await response.json();
  json ? res.status(200).json(json) : res.status(404).json({ message: 'Not Found' });
};


