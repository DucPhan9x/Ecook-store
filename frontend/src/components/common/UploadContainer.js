import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const PicturesWall = ({ setImageUrl, form }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileImage, setFileImage] = useState([]);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    toDataURL(form.imageUrl).then((dataUrl) => {
      setFileImage([dataUrl]);
    });
  }, [form]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || "Ảnh sản phẩm");
  };

  const handleChange = ({ fileList }) => {
    setFileImage(fileList);
    setImageUrl({ ...form, imageUrl: fileList || "" });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileImage}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileImage.length ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="image_product" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
