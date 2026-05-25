import Navbar from "./Navbar";
import Content from "./Content";
import { useEffect, useState } from "react";

const App = () => {
  const [num, setNum] = useState(20);
  const [arr, setArr] = useState([]);
  const [pg, setPg] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (page, limit) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );

      const data = await response.json();

      const newArr = data.map((d) => ({
        name: d.author,
        download: d.download_url,
        URL: d.url,
      }));

      setArr(newArr);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(pg, num);
  }, [pg]);

  const handleSearch = () => {
    fetchImages(pg, num);
  };

  const nextPage = () => {
    if (pg < 100) setPg((prev) => prev + 1);
  };

  const prevPage = () => {
    if (pg > 1) setPg((prev) => prev - 1);
  };

  return (
    <>
      <Navbar />

      {/* Search Section */}
      <div className="flex justify-center m-5 gap-2">
        <input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="h-10 w-[300px] p-3 border-2 border-black rounded"
          type="number"
          placeholder="Number of images"
        />

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 rounded font-bold"
        >
          Get
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center font-bold text-lg">
          Loading images...
        </div>
      )}

      <Content arr={arr} />

      {/* Pagination */}
      <div className="flex justify-center items-center mb-5">
        <div className="flex items-center gap-3 bg-amber-400 p-3 rounded shadow-lg">
          <button
            onClick={prevPage}
            disabled={pg === 1}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <h1 className="font-bold">Page: {pg}</h1>

          <button
            onClick={nextPage}
            disabled={pg === 100}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default App;