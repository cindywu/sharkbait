import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'edge',
}

export default async(_req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch('https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a7708dfd&days=1&intervalHours=24');

  const json = await response.json();
  res.status(200).json(json);
};