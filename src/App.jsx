import Navbar from "./Navbar";
import Content from "./Content";
import ImageModal from "./ImageModal";
import { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [pg, setPg] = useState(1);

  // ✅ NEW: dynamic limit control
  const [limit, setLimit] = useState(20);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [selectedImg, setSelectedImg] = useState(null);
  const [filterAuthor, setFilterAuthor] = useState("");

  // 🔍 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 📦 fetch images
  const fetchImages = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pg}&limit=${limit}`
      );

      const data = await res.json();

      const formatted = data.map((d) => ({
        id: d.id,
        author: d.author,
        width: d.width,
        height: d.height,
        url: d.url,
        download_url: d.download_url,
      }));

      setImages(formatted);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [pg, limit]); // ✅ important: refetch when limit changes

  // 💾 save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ❤️ toggle favorite
  const toggleFavorite = (img) => {
    const exists = favorites.find((f) => f.id === img.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== img.id));
    } else {
      setFavorites([...favorites, img]);
    }
  };

  // 🔍 filtering
  const filteredImages = images.filter((img) => {
    const matchSearch =
      img.author.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchAuthor =
      filterAuthor === "" ||
      img.author.toLowerCase() === filterAuthor.toLowerCase();

    return matchSearch && matchAuthor;
  });

  return (
    <>
      <Navbar />

      {/* 🔥 CONTROLS SECTION */}
      <div className="flex flex-wrap justify-center gap-3 m-4">

        {/* search */}
        <input
          className="border p-2 rounded w-60"
          placeholder="Search author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* filter author */}
        <input
          className="border p-2 rounded w-60"
          placeholder="Filter by exact author"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        />

        {/* ✅ NEW: limit selector */}
        <select
          className="border p-2 rounded w-40"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={10}>10 images</option>
          <option value={20}>20 images</option>
          <option value={30}>30 images</option>
          <option value={50}>50 images</option>
        </select>
      </div>

      {/* GRID */}
      <Content
        images={filteredImages}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        openModal={setSelectedImg}
      />

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 m-5">
        <button
          onClick={() => setPg((p) => Math.max(1, p - 1))}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Prev
        </button>

        <h1 className="font-bold">Page {pg}</h1>

        <button
          onClick={() => setPg((p) => p + 1)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {selectedImg && (
        <ImageModal img={selectedImg} onClose={() => setSelectedImg(null)} />
      )}
    </>
  );
};

export default App;