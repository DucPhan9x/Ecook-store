import React from "react";
import { Modal } from "antd";
import { ORDERS_DATA } from "utils/dummyData";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import { useHistory } from "react-router-dom";

const ModalDetailOrder = ({ isModalVisible, close, data }) => {
  const [item, setItem] = useState();
  const history = useHistory();
  useEffect(() => {
    if (!data) return;
    setItem(ORDERS_DATA?.find((i) => i._id === data));
  }, [data]);
  return (
    <Modal
      className="modal-container modal-detail-order-container"
      title="Chi tiết đơn hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      {item?.voucher?._id && (
        <div className="note-voucher">
          Đã áp dụng voucher {item?.voucher?.name} giảm{" "}
          <span style={{ fontWeight: 600 }}>
            {formatCurrency(item?.discountOff)}
          </span>{" "}
          cho hóa đơn tối thiểu {formatCurrency(item?.voucher?.minOrder)}
        </div>
      )}
      <div className="shipment-fee">
        Phí ship: {formatCurrency(item?.shipmentFee)}
      </div>
      {item?.items.map((row, index) => (
        <div className="row-detail-order flex items-center">
          <img src={row?.imageUrl} alt="" />
          <div className="flex items-center j-space-between full-width">
            <div className="row-detail-order-info">
              <span>
                {row.name} (1{row.unit})
              </span>
              <span>x {row.quantity}</span>
            </div>
            <div className="row-detail-order-price">
              <div className="row-detail-order-price-real">
                {getPriceItem(
                  row.discountOff,
                  row.unitPrice,
                  row.discountMaximum,
                  row.quantity
                )}
              </div>
              {row.discountOff > 0 && (
                <div className="row-detail-order-price-discount">
                  {formatCurrency(row.quantity * row.unitPrice)}
                </div>
              )}
            </div>
            <div>
              <button
                className="btn btn-client"
                onClick={() => history.push(`/food?id=${row._id}`)}
              >
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
};

export default ModalDetailOrder;
