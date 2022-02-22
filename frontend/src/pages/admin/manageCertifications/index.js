import { EnhancedTable } from "components/admin/manageCertification";
import React from "react";
import { useEffect } from "react";
import { CERTIFICATIONS_DATA } from "utils/dummyData";

const ManageCertifications = () => {
  useEffect(() => {
    document.title = "Quản lý chứng nhận | ECook";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="manage-certification-container">
      <EnhancedTable data={CERTIFICATIONS_DATA} />
    </div>
  );
};

export default ManageCertifications;
