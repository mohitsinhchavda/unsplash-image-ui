import Img from "next/image";
import Loader from "./Loader";
import NoDataComponent from "./NoDataComponent";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    img: {
        margin: "4px",
        display: "inline-block",
    },
}));

export default function ImgList({
    data,
    resultsArr,
    error,
}) {

    const classes = useStyles();

    return (
        !data
            ?
            <Loader />
            :
            error || !Array.isArray(resultsArr) || (Array.isArray(resultsArr) && resultsArr.length === 0)
                ?
                <NoDataComponent />
                :
                resultsArr
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