import React, { useEffect } from "react";

const HomePageClient = () => {
  useEffect(() => {
    document.title = "Trang chủ | ECook";
  }, []);
  return <div className="homepage-user">Homepage user</div>;
};

export default HomePageClient;
