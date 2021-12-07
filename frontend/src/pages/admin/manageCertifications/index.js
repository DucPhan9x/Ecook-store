import { EnhancedTable } from "components/admin/manageCertification";
import SearchField from "components/common/input/SearchField";
import React from "react";
import { CERTIFICATIONS_DATA } from "utils/dummyData";

const ManageCertifications = () => {
  return (
    <div className="manage-certification-container">
      <div className="manage-certification-container--top">
        <SearchField onChange={(e) => console.log(e.target.value)} />
      </div>
      <EnhancedTable data={CERTIFICATIONS_DATA} />
    </div>
  );
};

export default ManageCertifications;
