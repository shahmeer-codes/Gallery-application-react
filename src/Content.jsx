import React from "react";

const Content = ({ images, favorites, toggleFavorite, openModal }) => {
  const isFav = (id) => favorites.some((f) => f.id === id);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
      {images.map((img) => (
        <div
          key={img.id}
          className="shadow rounded p-2 bg-white relative hover:scale-105 transition"
        >
          {/* ❤️ Favorite button */}
          <button
            onClick={() => toggleFavorite(img)}
            className="absolute top-2 right-2 text-xl"
          >
            {isFav(img.id) ? "❤️" : "🤍"}
          </button>

          {/* IMAGE */}
          <img
            src={img.download_url}
            loading="lazy"
            className="w-full h-48 object-cover rounded cursor-pointer"
            onClick={() => openModal(img)}
          />

          {/* INFO */}
          <div className="mt-2 text-center text-sm">
            <p className="font-bold">{img.author}</p>
            <p className="text-gray-500 text-xs">
              {img.width} × {img.height}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Content);