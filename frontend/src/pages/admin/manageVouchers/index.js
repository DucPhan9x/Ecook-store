import { EnhancedTable, ModalAdd } from "components/admin/manageVoucher";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import GiftVoucherIcon from "assets/icons/gift-voucher.png";
import { useDispatch, useSelector } from "react-redux";
import { createVoucher, getListVoucherPerPage } from "redux/actions/voucher";
import { SpinLoading } from "components/common";

const ManageVouchers = () => {
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "name",
    orderType: "asc",
    numOfPerPage: 5,
  });

  const {
    loadingGetListVoucher,
    createVoucherState,
    updateVoucherState,
    removeTempVoucherState,
  } = useSelector((store) => store.voucher);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch data
    document.title = "Quản lý voucher | ECook";
    window.scrollTo(0, 0);
    //
    dispatch(getListVoucherPerPage(queries));
  }, [queries, dispatch]);

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  return (
    <div className="manage-vouchers-container">
      {(loadingGetListVoucher ||
        createVoucherState.loading ||
        updateVoucherState.loading ||
        removeTempVoucherState.loading) && <SpinLoading />}
      <div className="manage-vouchers-container-top flex j-space-between">
        <button className="btn-admin" onClick={() => setIsOpenModalAdd(true)}>
          <img
            style={{ width: "24px", height: 24, marginRight: 5 }}
            src={GiftVoucherIcon}
            alt=""
          />
          Tạo mới
        </button>
        <SearchField
          onSubmit={(value) =>
            setQueries({ ...queries, searchText: value, page: 1 })
          }
        />
      </div>
      <EnhancedTable queries={queries} setQueries={setQueries} />
      <ModalAdd
        isModalVisible={isOpenModalAdd}
        close={() => setIsOpenModalAdd(false)}
        handleSubmit={(formData) => {
          dispatch(createVoucher(formData));
          setIsOpenModalAdd(false);
        }}
      />
    </div>
  );
};

export default ManageVouchers;
