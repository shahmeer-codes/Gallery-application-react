import React from "react";

const Content = ({ arr }) => {
  return (
    <div className="m-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {arr.map((d, i) => (
          <div
            key={i}
            className="p-2 bg-white shadow-md rounded hover:scale-105 transition"
          >
            <img
              loading="lazy"
              onClick={() => window.open(d.URL, "_blank")}
              src={d.download}
              className="rounded-xl w-full h-48 object-cover cursor-pointer"
              alt={d.name}
            />

            <h5 className="text-center font-semibold mt-2 text-sm">
              {d.name}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Content);