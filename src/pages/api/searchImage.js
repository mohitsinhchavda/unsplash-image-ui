import { commoUnsplashFetchUtilFunc } from "../../apiUtilityFuncs";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await commoUnsplashFetchUtilFunc("search", req.query);
      const finalRes = await apiRes.json();
      res.status(200).json(finalRes);
    }
    catch{
      res.status(400).json([]);
    }
  }
}
