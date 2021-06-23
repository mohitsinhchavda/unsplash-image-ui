import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import NavBar from '../components/NavBar';
import Loader from "../components/Loader";
import NoDataComponent from "../components/NoDataComponent";
import ImgList from "../components/ImgList";
import { fetchPhotos, searchPhotos } from '../api';

const rowsPerPage = 10;


export default function Home({
  res
}) {
  const router = useRouter()
  const { page: currentPage, search: searchQueryUri } = router.query;

  const [photosList, setPhotosList] = useState([]);

  const [status, setStatus] = useState({
    loading: false,
  });

  useEffect(() => {
    if (Array.isArray(res)) {
      // on refresh if page has less than current page no. data
      // then fetch it
      if (res.length !== 0 && res.length <= currentPage * rowsPerPage) {
        async function fetchAndSetData(){
          const newApiRes = await fetch(`/api/fetchImage/?page=${currentPage}`);
          const newRes = await newApiRes.json();
          setPhotosList([...res, ...newRes]);
          setStatus({
            loading: false
          });
        }
        fetchAndSetData();
      }
      else {
        setPhotosList(res);
        setStatus({
          loading: false
        });
      }
    }
    else if (Array.isArray(res.results)) {
      setPhotosList(res.results);
      setStatus({
        loading: false
      });
    }
  }, []);

  useEffect(() => {

    if (currentPage && photosList.length !== 0 && photosList.length < currentPage * rowsPerPage) {

      async function fetchAndSetData(){
        setStatus({
          loading: true
        });
  
        let newRes;
  
        if (searchQueryUri) {
          const newApiRes = await fetch(`/api/searchImage/?search=${searchQueryUri}&page=${currentPage}`);
          const { results = [] } = await newApiRes.json();
          newRes = [...results];
        }
        else{
          const newApiRes = await fetch(`/api/fetchImage/?page=${currentPage}`);
          newRes = await newApiRes.json();
        }
  
        setPhotosList((prevPhotoList) => [...prevPhotoList, ...newRes || []]);
  
        setStatus({
          loading: false
        });
      }
      fetchAndSetData();
    }
    else {
      setStatus({
        loading: false
      });
    }

  }, [currentPage, photosList, searchQueryUri])

  const [page, setPage] = useState(Number(currentPage) || 1);


  return (
    <div className={styles.container}>
      <Head>
        <title>Mohit&apos;s Unsplash Image</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        photosList={photosList}
        setPhotosList={setPhotosList}
        setStatus={setStatus}
      />

      {
        status.loading
          ?
          <Loader />
          :
          !photosList || !Array.isArray(photosList) || (Array.isArray(photosList) && photosList.length === 0)
            ?
            <NoDataComponent />
            :
            <ImgList
              photosList={photosList}
              setPhotosList={setPhotosList}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setStatus={setStatus}
            />
      }
    </div>
  )
}

export async function getServerSideProps(context) {

  const { search, page } = context.query;

  let res;

  if (search) {
    res = await searchPhotos(search).catch(() => []);
  }
  else {
    res = await fetchPhotos(page || 1).catch(() => []);
  }

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      res
    },
  }
}