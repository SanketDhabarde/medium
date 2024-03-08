const BlogSkeleton = () => {
  return (
    <div className="w-11/12 lg:w-1/2 p-3 my-3">
      <div className="flex items-center gap-2">
        <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded-full w-52 my-3"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-52 my-1"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-24 mt-3"></div>
        </div>
        <div>
          <div className="w-20 h-20 lg:w-28 lg:h-28 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
