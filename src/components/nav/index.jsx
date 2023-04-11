import { useEffect, useState, useContext } from "react";
import Link from "next/link";

const Navigation = () => {
  const [menuItems, setmenuItems] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/pages`);
      let data = await res.json();
      data = data.filter((page) => page.slug !== "home"); // Exclude the page named "home"
      setmenuItems(data);
      console.log(data)
    };

    fetchPages();
  }, []);

  return (
    <nav className="px-4 py-3 flex justify-between items-center">
      <div
        className="text-lg font-semibold"
      >
        <Link href={`/`}>
          <h2 className="text-2xl">Code Blog</h2>
        </Link>
      </div>
      <div
        className="flex space-x-4"
      >
        {menuItems.map((page) => (
          <Link key={page.id} href={`/${page.slug}`}>
            <h2>{page.slug}</h2>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;