import Img from "next/image";
import useSWR from 'swr';
import Loader from "./Loader";
import NoDataComponent from "./NoDataComponent";
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

const fetcher = url => fetch(url).then(r => r.json());

const useStyles = makeStyles((theme) => ({
    img: {
        margin: "4px",
        display: "inline-block",
    },
}));

export default function ImgList({
    page,
}) {

    const classes = useStyles();

    const router = useRouter();
    const { search: searchQueryUri } = router.query;
    const {
        data,
    } = useSWR(
        `/api/${searchQueryUri ? "searchImage" : "fetchImage"}?page=${page}${searchQueryUri ? "&" + "query=" + searchQueryUri : ""}`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    );

    return (
        !data
            ?
            <Loader />
            :
            !data || !Array.isArray(data) || (Array.isArray(data) && data.length === 0)
                ?
                <NoDataComponent />
                :
                data
                    .map(photo => {
                        return (
                            <div className={classes.img} key={photo.id}>
                                <Img
                                    src={photo.urls.regular}
                                    layout='fixed'
                                    width={photo.width / 15}
                                    height={photo.height / 15}
                                    blurDataURL={photo.urls.thumb}
                                    placeholder="blur"
                                />
                            </div>
                        )
                    })
    );
}