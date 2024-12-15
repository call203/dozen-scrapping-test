"use client";

/** 로딩 스피너 */
const LoadingSpinner = () => {
  return (
    <div
      role="status"
      className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
    >
      <div
        className="w-10 h-10 rounded-full animate-spin
                    border-4 border-solid border-blue border-t-transparent"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
