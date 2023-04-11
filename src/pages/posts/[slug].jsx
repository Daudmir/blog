import Head from "next/head";
import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt.rendered} />
      </Head>
      <div className="max-w-7xl mx-auto">
      <div className="p-6 mt-20">
                  <h3 className="text-2xl font-bold">{post.title.rendered}</h3>
                </div>
        <div
          className="mx-36 mt-16 leading-8"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts?slug=${params.slug}`
  );
  const posts = await res.json();

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: posts[0],
    },
    revalidate: 1,
  };
}