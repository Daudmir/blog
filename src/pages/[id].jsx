import Head from "next/head";
import { useRouter } from "next/router";

export default function Page({ pageData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{pageData[0].slug}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-36 mt-16 leading-8">
        <h2 className="text-xl text-blue-500 text-center">
          {pageData[0].title.rendered}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: pageData[0].content.rendered }}
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/pages`);
  const pages = await res.json();

  const paths = pages.map((page) => ({
    params: { id: page.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  let pageData;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/wp/v2/pages?slug=${params.id}`
  );
  pageData = await res.json();

  return {
    props: {
      pageData,
    },
  };
}