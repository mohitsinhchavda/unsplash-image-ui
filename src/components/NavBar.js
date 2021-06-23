import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    width: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  btnRoot : {
    marginLeft : 8,
    color: theme.palette.primary.main
  }
}));

export default function NavBar({
  photosList,
  setPhotosList,
  setStatus,
}) {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState();

  const onSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const router = useRouter();
  const { search: searchUriVal } = router.query;

  useEffect(() => {
    setSearchQuery(searchUriVal);
  }, []);

  const searchCallback = useCallback(async () => {
    setStatus({
      loading: true
    });
    if (searchQuery) {
      router.push(`/?search=${searchQuery}&page=1`);
      const { results = [] } = await fetch(`/api/searchImage/?search=${searchQuery}&page=1`).then(res => res.json());
      setPhotosList(results);
    }
    else {
      router.push(`/?page=1`);
      const results = await fetch(`/api/fetchImage`).then(res => res.json());
      setPhotosList(results || []);
    }
  }, [searchQuery]);

  const onInputBlur = useCallback(() => {
    if (!searchQuery) {
      router.push(`/?page=1`);
    }
  }, [searchQuery]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Unsplash Images
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Type here..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearch}
              value={searchQuery}
              onBlur={onInputBlur}
              autoFocus
            />
          </div>
          <Button
            variant="contained"
            classes={{
              root : classes.btnRoot
            }}
            onClick={searchCallback}
            disableFocusRipple
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}