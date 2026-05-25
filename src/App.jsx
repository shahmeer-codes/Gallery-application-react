import Navbar from "./Navbar";
import Content from "./Content";
import { useEffect, useState } from "react";
const App = () => {
  const [num, setnum] = useState("");
  const [arr, setArr] = useState([]);
  const [pg, setPg] = useState(18);
  async function srch(num) {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${pg}&limit=${num}`,
    );
    const data = await response.json();

    const newarr = data.map((d) => {
      return {
        name: d.author,
        download: d.download_url,
        URL: d.url,
      };
    });
    setArr(newarr);
  }
  function pg_inc() {
    if (pg < 100) {
      setPg(pg + 1);
      srch(num);
    }
  }
  function pg_dec() {
    if (pg > 1) {
      setPg(pg - 1);
      srch(num);
    }
  }
  useEffect(() => {
    async function frist() {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=18&limit=20`,
      );
      const data = await response.json();

      const newarr = data.map((d) => {
        return {
          name: d.author,
          download: d.download_url,
          URL: d.url,
        };
      });
      setArr(newarr);
    }

    frist();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-center m-5">
        <input
          value={num}
          onChange={(elm) => {
            setnum(elm.target.value);
          }}
          className="h-8 w-150 p-4 border-2 border-black text-lg rounded"
          type="search"
          placeholder="Enter no. of images "
        />
        <button
          onClick={() => {
            srch(num);
          }}
          className="bg-green-600 flex justify-center items-center font-bold text-white h-9 ml-1 p-4 rounded"
        >
          Get
        </button>
      </div>
      <Content arr={arr} />
      <div className=" flex justify-center items-center">
        <div className="relative bottom-7 flex justify-center items-center h-10 w-50 bg-amber-400 shadow-2xl gap-3 rounded">
          <button
            onClick={pg_dec}
            style={{ opacity: pg == 1 ? 0.5 : 1 }}
            className="flex justify-center items-center active:scale-95 font-bold bg-black text-white p-3 h-10 w-20 rounded"
          >
            Pre
          </button>
          <h1 className="flex justify-center items-center font-bold w-50">
            Page : {pg}
          </h1>
          <button
            style={{ opacity: pg == 100 ? 0.5 : 1 }}
            onClick={pg_inc}
            className="flex justify-center items-center active:scale-95 font-bold bg-black text-white p-3 h-10 w-20 rounded"
          >
            Nex
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
