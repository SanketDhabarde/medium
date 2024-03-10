const BlogSkeleton = () => {
  return (
    <div className="w-11/12 lg:w-1/2 p-3 my-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded-full w-3/4 my-3"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-3/4  my-1"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-3/4  mt-3"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-3/4  mt-3"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-24 mt-3"></div>
    </div>
  );
};

export default BlogSkeleton;
