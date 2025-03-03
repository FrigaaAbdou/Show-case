function PageLoader() {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="w-20 h-20 border-[8px] border-blue-200 border-t-blue-600 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <p className="mt-4 text-blue-600 text-sm tracking-wide">
          Loading, please wait...
        </p>
      </div>
    )
  }
  
  export default PageLoader