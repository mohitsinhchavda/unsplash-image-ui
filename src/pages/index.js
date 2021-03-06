import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import NavBar from '../components/NavBar';
import ImgListContainer from "../components/ImgListContainer";

export default function Home(props) {

  const [page, setPage] = useState(1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mohit&apos;s Unsplash Image</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        setPage={setPage}
      />
      <ImgListContainer
        page={page}
        setPage={setPage}
      />
    </div>
  )
}