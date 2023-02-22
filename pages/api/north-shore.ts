import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcb&days=2',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('response', response)

  const json = await response.json();
  res.status(200).json(json);

  } catch(error) {
    console.log('error', error)
  }

};


