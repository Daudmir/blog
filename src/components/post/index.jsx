import { useState, useEffect } from "react";
import Link from "next/link";
import style from '../../styles/home.module.css'

function Posts() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts`);
      const posts = await res.json();
      setPostData(posts);
      console.log(posts);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black">
      <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-1">
        {postData.map((post) => (
          <div key={post.id} className=" bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <Link href={`/posts/${post.slug}`}>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{post.title.rendered}</h3>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
