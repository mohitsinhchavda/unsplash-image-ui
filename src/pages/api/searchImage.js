import { searchPhotos } from "../../api";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await searchPhotos(req.query.search, req.query.page);
      res.status(200).json(apiRes);
    }
    catch{
      res.status(400).json([]);
    }
  }
}
