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
  btnRoot: {
    marginLeft: 8,
    color: theme.palette.primary.main
  }
}));

export default function NavBar({
  setPage
}) {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const router = useRouter();
  const { search: searchUriVal = "" } = router.query;

  useEffect(() => {
    setSearchQuery(searchUriVal);
  }, [searchUriVal]);

  const searchCallback = useCallback(async (event) => {
    event.preventDefault();
    if (searchQuery) {
      router.push(`/?search=${searchQuery}`);
      setPage(1);
    }
    else {
      router.push(`/`);
      setPage(1);
    }
  }, [searchQuery, router, setPage]);

  const onInputBlur = useCallback(() => {
    if (!searchQuery) {
      router.push(`/`);
      setPage(1);
    }
  }, [searchQuery, router, setPage]);

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
          <form style={{display : "contents"}} onSubmit={searchCallback}>
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
                root: classes.btnRoot
              }}
              disableFocusRipple
              type="submit"
            >
              Search
            </Button>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}