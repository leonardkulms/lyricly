// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLyrics } from 'genius-lyrics-api';

export default async function handler(req, res) {
  let path = req.query.q;
  let lyrics = await getLyrics(path);
  res.status(200).json({text: lyrics});
}
