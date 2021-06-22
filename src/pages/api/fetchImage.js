// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchPhotos } from "..";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await fetchPhotos();
      const finlJson = await apiRes.json();
      res.status(200).json(finlJson);
    }
    catch{
      res.status(400).json([]);
    }
  }
}
