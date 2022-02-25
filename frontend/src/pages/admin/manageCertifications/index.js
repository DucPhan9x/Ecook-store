import { EnhancedTable } from "components/admin/manageCertification";
import { SpinLoading } from "components/common";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListCertificationPerPage } from "redux/actions/certification";

const ManageCertifications = () => {
  const [queries, setQueries] = useState({
    page: 1,
    orderBy: "createAt",
    orderType: "asc",
    numOfPerPage: 5,
  });
  const dispatch = useDispatch();
  const { loadingGetListCertification } = useSelector(
    (store) => store.certification
  );

  useEffect(() => {
    document.title = "Quản lý chứng nhận | ECook";
    window.scrollTo(0, 0);
    dispatch(getListCertificationPerPage(queries));
  }, [dispatch, queries]);

  return (
    <div className="manage-certification-container">
      <EnhancedTable setQueries={setQueries} queries={queries} />
      {loadingGetListCertification && <SpinLoading />}
    </div>
  );
};

export default ManageCertifications;
