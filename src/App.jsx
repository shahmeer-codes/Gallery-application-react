import Navbar from "./Navbar";
import Content from "./Content";
import ImageModal from "./ImageModal";
import { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [pg, setPg] = useState(1);
  const [limit, setLimit] = useState(20);

  // 🔍 search (debounced)
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🎯 author filter (NEW DROPDOWN)
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  // ❤️ favorites
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // 🖼 modal
  const [selectedImg, setSelectedImg] = useState(null);

  // 🔥 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 📦 fetch images
  const fetchImages = async () => {
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
  };

  useEffect(() => {
    fetchImages();
  }, [pg, limit]);

  // 💾 favorites save
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

  // 🎯 get unique authors for dropdown
  const authors = ["all", ...new Set(images.map((img) => img.author))];

  // 🔍 FILTER LOGIC (search + dropdown)
  const filteredImages = images.filter((img) => {
    const matchSearch = img.author
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchAuthor =
      selectedAuthor === "all" || img.author === selectedAuthor;

    return matchSearch && matchAuthor;
  });

  return (
    <>
      <Navbar />

      {/* CONTROLS */}
      <div className="flex flex-wrap justify-center gap-3 m-4">

        {/* 🔍 SEARCH */}
        <input
          className="border p-2 rounded w-60"
          placeholder="Search author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🎯 AUTHOR DROPDOWN */}
        <select
          className="border p-2 rounded w-60"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          {authors.map((author, i) => (
            <option key={i} value={author}>
              {author === "all" ? "All Authors" : author}
            </option>
          ))}
        </select>

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

      {selectedImg && (
        <ImageModal img={selectedImg} onClose={() => setSelectedImg(null)} />
      )}
    </>
  );
};

export default App;