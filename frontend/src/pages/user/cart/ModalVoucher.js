import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import voucherAPI from "api/voucherAPI";
import { SpinLoading } from "components/common";
import { formatCurrency } from "utils/priceUtils";
import moment from "moment";

const ModalVoucher = ({ close, isOpenModal, setData, data }) => {
  const [voucher, setVoucher] = useState([]);
  const dispatch = useDispatch();
  const [l1, setL1] = useState(false);

  useEffect(() => {
    setL1(true);
    voucherAPI
      .getListVoucherClient(Number(data?.total))
      .then((res) => res.json())
      .then((res) => {
        setVoucher(res.vouchers);
        setL1(false);
      });
  }, [data, dispatch]);

  return (
    <Modal
      className="modal-container modal-confirm-food-cart"
      title="Danh sách voucher hiện có"
      visible={isOpenModal}
      onCancel={close}
      footer={false}
    >
      <div>
        {l1 && <SpinLoading />}
        {voucher?.length > 0 ? (
          voucher?.map((item) => (
            <div key={item._id} style={{ marginBottom: 10 }}>
              <span
                style={{ fontSize: 18, color: "gray", cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(item.name);
                  setData({
                    ...data,
                    voucher: item.name,
                    voucherId: item._id,
                    voucherData: item,
                  });
                  close();
                }}
              >
                {item.name}:{" "}
              </span>
              <span>
                Đơn áp dụng cho hóa đơn tối thiểu{" "}
                {formatCurrency(item?.minOrder)}, có hạn đến ngày{" "}
                {moment(item?.expiredDate || new Date()).format("DD/MM/YYYY")}{" "}
                và còn số lượt dùng là: {item?.remainingSlot}, giảm giá{" "}
                {item?.discountOff}% - giá giảm tối đa:{" "}
                {formatCurrency(item?.discountMaximum)}
              </span>
            </div>
          ))
        ) : (
          <div className="center" style={{ fontSize: 18, color: "gray" }}>
            Không có voucher phù hợp!
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ModalVoucher;
