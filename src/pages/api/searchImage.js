import { commoUnsplashFetchUtilFunc } from "../../apiUtilityFuncs";

export default async function handler(req, res) {
  if(req.method === "GET"){
    try{
      const apiRes = await commoUnsplashFetchUtilFunc("search", req.query);
      const {results : finalRes, total} = await apiRes.json();
      res.status(200).json({resultsArr : finalRes, total : Math.ceil(Number(total)/10)});
    }
    catch{
      res.status(400).json({
        resultsArr : {
          errors : [
            "Limit Exhausted"
          ]
        },
        total : 0
      });
    }
  }
}
