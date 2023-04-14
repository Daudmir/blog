import { useState, useEffect } from "react";
import Link from "next/link";
import style from '../../styles/home.module.css'

function Home() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://blog.test/wp-json/wp/v2/pages?slug=home");
      const [page] = await res.json();
      setPageData(page);
    }
    fetchData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-10">{pageData.title.rendered}</h1>
        <div
          className={style.main}
          dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
        />
        <Link href="/posts" className="bg-gray-800 text-white font-bold py-2 px-4 rounded mt-8 inline-block">
        Posts
        </Link>

      </div>
    </div>
  );
}

export default Home;
