import { parseQueryObjToString } from "./apiUtilityFuncs";

export const useFetchImages = async (
    action = "list",
    params = { page: 1 },
    beforeStartFetchingCallback = () => null,
    afterSuccessFetchingCallback = () => null,
    afterErrorFetchingCallback = () => null,
) => {
    let promise;
    beforeStartFetchingCallback();
    switch (action) {
        case "search": promise = fetch(`/api/searchImage?${parseQueryObjToString(params)}`); break;
        case "list": promise = fetch(`/api/fetchImage?${parseQueryObjToString(params)}`); break;
    }

    try {
        const apiRes = await promise;
        const res = await apiRes.json();

        if (Array.isArray(res)) {
            afterSuccessFetchingCallback([...res]);
            return [...res];
        }
        else if (Array.isArray(res.results)) {
            afterSuccessFetchingCallback([...res.results]);
            return [...res.results];
        }
    }
    catch{
        afterErrorFetchingCallback();
        return [];
    }
}
