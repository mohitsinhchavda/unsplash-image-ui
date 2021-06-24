export async function commoUnsplashFetchUtilFunc(action = "list", paramsArgs) {
  let uri;
  switch(action){
    case "search" : uri = `${process.env.UNSPLASH_BASE_URL}/search/photos`; break;
    case "list" : uri = `${process.env.UNSPLASH_BASE_URL}/photos`; break;
  }
  try {
    console.log(`theURL`, `${uri}?${parseQueryObjToString(paramsArgs)}`)
    const res = await fetch(`${uri}?${parseQueryObjToString(paramsArgs)}`, {
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${process.env.UNSPLASH_OAUTH_TOKEN}`
      }
    });
    console.log(res,`RES FROM UNSPLASH`)
    return res;
  }
  catch (error){
    console.log(error,`REAL ERROR PRINTED`)
    return Promise.reject([]);
  }
}

export function parseQueryObjToString(params = {}) {
  return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
}