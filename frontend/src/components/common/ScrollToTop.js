import React, { useEffect } from "react";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";

const ScrollToTop = () => {
  useEffect(() => {
    function handleScroll() {
      var rootElement = document.documentElement;

      let scrollToTopBtn = rootElement.querySelector(".block__scroll-top");
      var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

      if (rootElement.scrollTop / scrollTotal > 0.1) {
        scrollToTopBtn?.classList.add("show-scroll-to-top");
      } else {
        scrollToTopBtn?.classList.remove("show-scroll-to-top");
      }
    }
    document.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="block__scroll-top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <VerticalAlignTopIcon />
    </div>
  );
};

export default ScrollToTop;
