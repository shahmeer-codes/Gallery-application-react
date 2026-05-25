import Navbar from "./Navbar";
import Content from "./Content";
import ImageModal from "./ImageModal";
import { useEffect, useState, useCallback } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [pg, setPg] = useState(1);
  const [limit] = useState(20);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [selectedImg, setSelectedImg] = useState(null);
  const [filterAuthor, setFilterAuthor] = useState("");

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  
  const fetchImages = useCallback(async () => {
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
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [pg, limit]);

 
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const toggleFavorite = (img) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === img.id);

      if (exists) {
        return prev.filter((f) => f.id !== img.id);
      } else {
        return [...prev, img];
      }
    });
  };

  const filteredImages = images.filter((img) => {
    const matchSearch = img.author
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchAuthor =
      filterAuthor === "" ||
      img.author.toLowerCase() === filterAuthor.toLowerCase();

    return matchSearch && matchAuthor;
  });

  return (
    <>
      <Navbar />

      <div className="flex flex-wrap justify-center gap-3 m-4">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="border p-2 rounded w-64"
          placeholder="Filter by exact author"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        />
      </div>

      <Content
        images={filteredImages}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        openModal={setSelectedImg}
      />

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