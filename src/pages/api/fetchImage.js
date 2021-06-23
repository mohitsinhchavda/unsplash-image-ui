import { fetchPhotos } from "../../api";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await fetchPhotos(req.query.page || 1);
      res.status(200).json(apiRes);
    }
    catch{
      res.status(400).json([]);
    }
  }
}
