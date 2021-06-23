export async function fetchPhotos(page = 1) {
    try {
      const res = await fetch(`${process.env.UNSPLASH_BASE_URL}/photos?page=${page}&per_page=30`, {
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": `Bearer ${process.env.UNSPLASH_OAUTH_TOKEN}`
        }
      });
      return res.json();
    }
    catch {
      return Promise.reject([])
    }
  }
  
  export async function searchPhotos(search, page = 1) {
    try {
      const res = await fetch(`${process.env.UNSPLASH_BASE_URL}/search/photos?query=${search}&per_page=30&page=${page}`, {
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": `Bearer ${process.env.UNSPLASH_OAUTH_TOKEN}`
        }
      });
  
      return res.json();
    }
    catch {
      return Promise.reject([])
    }
  }