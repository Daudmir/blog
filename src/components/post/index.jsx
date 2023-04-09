import { useState, useEffect } from "react";
import Link from "next/link";

function Posts() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts`);
      const posts = await res.json();
      setPostData(posts);
    }
    fetchData();
  }, []);

  return (
    <div>
      {postData.map((post) => (
         <Link href={`/posts/${post.slug}`}>
          <div key={post.id} className="">
            <h3 className="text-4xl p-3 text-blue-600">
              {post.title.rendered}
            </h3>
          </div>
          </Link>
      ))}
    </div>
  );
}

export default Posts;