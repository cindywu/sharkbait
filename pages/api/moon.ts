import type { NextApiRequest, NextApiResponse } from 'next';

export default async(_req: NextApiRequest, res: NextApiResponse) => {
  const key = process.env.NEXT_PUBLIC_MOON_API_KEY;
  const today = new Date()
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`
  // const date = '2023-02-12' // low
  // const date = '2023-02-13' // high

  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/honolulu%2C%20hawaii/${date}/${date}?unitGroup=metric&key=CH9KWXZK8BWBS2AF6B7XYWZ4J&contentType=json`);

  const json = await response.json();
  const moonphase = json.days[0].moonphase;
  res.status(200).json(moonphase);
};