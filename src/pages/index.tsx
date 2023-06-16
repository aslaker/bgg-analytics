import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BGG Analytics</title>
        <meta
          name="description"
          content="A simple web page visualizing and analyzing data from the Board Game Geek XML API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Chart</main>
    </>
  );
};

export default Home;
