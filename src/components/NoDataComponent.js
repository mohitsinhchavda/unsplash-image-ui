import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        height : "80vh"
    },
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h4">
                No Images available, because the limit of unsplash API (50 Req./Hr) exhausted, Please try again after 1 hour.
            </Typography>
        </div>
    );
}