const BLogDetailSkeleton = () => {
  return (
    <div className="max-w-screen-lg p-2">
      <div className="h-5 bg-gray-200 rounded-full w-96"></div>
      <div className="py-5 border-b-2 border-slate-50">
        <div className="flex items-center gap-2 my-2">
          <div className="h-8 bg-gray-200 rounded-full w-8"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full w-24 mt-3 pl-1"></div>
      </div>
      <div className="h-56 bg-gray-200 my-3 w-full"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-96 my-1"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-96 my-1"></div>
    </div>
  );
};

export default BLogDetailSkeleton;
