const Appbar = () => {
  return (
    <div className="flex justify-between w-full px-7 py-3 border-b-2 border-slate-50 mb-2">
      <h1 className="font-bold">Medium</h1>
      <div>
        <img
          src={
            "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
          }
          alt="author image"
          className="rounded-full w-8 h-8"
        />
      </div>
    </div>
  );
};

export default Appbar;
