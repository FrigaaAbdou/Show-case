function PageLoader() {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="w-20 h-20 border-[8px] border-slate-400-200 border-t-yellow-400 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <p className="mt-4 text-yellow-400 text-sm tracking-wide">
          Loading, please wait...
        </p>
      </div>
    )
  }
  
  export default PageLoader