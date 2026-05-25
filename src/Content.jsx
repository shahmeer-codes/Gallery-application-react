const Content = ({ arr }) => {
  return (
    <div className="m-10 rounded text-black">
      <div className="grid grid-cols-4 m-5 gap-5">
        {arr.map((d, i) => {
          return (
            <div key={i} className="h-fit w-fit p-2">
              <img
                onClick={() => {
                  window.open(`${d.URL}`, "blank");
                }}
                src={d.download}
                className="rounded-2xl object-cover"
              ></img>
              <h5 className="flex justify-center items-center font-bold">
                {d.name}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
