import { commoUnsplashFetchUtilFunc } from "../../apiUtilityFuncs";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await commoUnsplashFetchUtilFunc("search", req.query);
      const {results : finalRes} = await apiRes.json();
      res.status(200).json({resultsArr : finalRes, total : apiRes.headers.get("x-total")});
    }
    catch{
      res.status(400).json([]);
    }
  }
}
