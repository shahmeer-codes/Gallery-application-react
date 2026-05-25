const ImageModal = ({ img, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.download_url}
          className="max-h-[70vh] rounded"
        />

        <div className="mt-3 text-center">
          <h2 className="font-bold">{img.author}</h2>
          <p className="text-sm text-gray-600">
            {img.width} × {img.height}
          </p>

          <a
            href={img.download_url}
            target="_blank"
            className="text-blue-600 underline"
          >
            Open Original
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-3 bg-black text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;