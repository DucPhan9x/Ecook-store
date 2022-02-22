import { EnhancedTable, ModalAdd } from "components/admin/manageVoucher";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import { VOUCHERS_DATA } from "utils/dummyData";
import GiftVoucherIcon from "assets/icons/gift-voucher.png";

const ManageVouchers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data
    document.title = "Quản lý voucher | ECook";
    window.scrollTo(0, 0);
    setData(VOUCHERS_DATA);
  }, []);

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  return (
    <div className="manage-vouchers-container">
      <div className="manage-vouchers-container-top flex j-space-between">
        <button className="btn-admin" onClick={() => setIsOpenModalAdd(true)}>
          <img
            style={{ width: "24px", height: 24, marginRight: 5 }}
            src={GiftVoucherIcon}
            alt=""
          />
          Tạo mới
        </button>
        <SearchField onChange={(e) => console.log(e.target.value)} />
      </div>
      <EnhancedTable data={data} />
      <ModalAdd
        isModalVisible={isOpenModalAdd}
        close={() => setIsOpenModalAdd(false)}
        handleSubmit={(formData) => console.log({ formData })}
      />
    </div>
  );
};

export default ManageVouchers;
