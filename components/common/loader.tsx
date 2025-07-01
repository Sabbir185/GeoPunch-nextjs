"use client";
import LandingLoader from "@/components/loader";

const MainLoader = () => {
  return (
    <div
      style={{ zIndex: 99999 }}
      className="left-0 w-full top-0 h-screen flex justify-center items-center bg-white"
      id="main-loader"
    >
      <Loader />
    </div>
  );
};

export const showLoader = () => {
  setTimeout(() => {
    const loader = document.getElementById("main-loader");
    if (loader) {
      loader.classList.remove("hidden");
    } else {
      console.warn(
        "Element with ID 'main-loader' not found. Ensure the component is mounted."
      );
    }
  }, 0); // Delay to ensure DOM rendering
};

export const hideLoader = () => {
  setTimeout(() => {
    const loader = document.getElementById("main-loader");
    if (loader) {
      loader.classList.add("hidden");
    } else {
      console.warn(
        "Element with ID 'main-loader' not found. Ensure the component is mounted."
      );
    }
  }, 0); // Delay to ensure DOM rendering
};

export default MainLoader;

export const Loader = () => {
  return (
    <div className="inline-block">
      <div className="relative">
        {/* <InfinitySpin width="200" color="#000000" /> */}
        {/* <MagnifyingGlass
                    visible={true}
                    // height="80"
                    width="200"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="white"
                    color="#ff8d1f"
                /> */}
        <LandingLoader />
      </div>
    </div>
  );
};

