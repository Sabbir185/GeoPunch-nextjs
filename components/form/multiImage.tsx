import { useState } from "react";
import { useI18n } from "@/context/i18n";
import { Form, Modal, Upload } from "antd";
import Image from "next/image";
import Swal from "sweetalert2";
import { useAction } from "@/helpers/hooks";
import { deleteProductImage } from "@/helpers/backend";

const MultipleImageInput = (props: any) => {
  const i18n = useI18n()
  const max = props.max || 1;
  const name = props.name || "img";
  const label = props.label;
  const children = props?.children;
  const onChange = props.onChange;
  const onRemove = props.onRemove;
  const listType = props.listType || "picture-card";

  return (
    <div className="form-group">
      <Form.Item
        name={name}
        label={i18n.t(label)}
        rules={[
          {
            required: props?.required,
            message: `${i18n?.t('Please upload')} ${!!label ? i18n?.t(label) : i18n?.t("an image")}`,
          },
        ]}
      >
        <Input
          max={max}
          listType={listType}
          pdf={props?.pdf}
          noWebp={props?.noWebp}
          onChange={onChange}
          onRemove={onRemove}
        >
          {children}
        </Input>
      </Form.Item>
    </div>
  );
};

const Input = ({ value, onChange, listType, max, noWebp, pdf, children, onRemove }: any) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const i18n = useI18n()


  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    if (max > 1) {
      const removedFiles = (value || []).filter(file => !fileList.includes(file));

      removedFiles.forEach(removedFile => {
        if (removedFile.url) {
          // useAction( deleteFile, { file: removedFile.url });
        }
      });

    } else {
      if (fileList.length < (value?.length || 0)) {
        const removedFile = value.find(file => !fileList.includes(file));
        if (!!removedFile?.url) {
          // useAction(
          //   deleteFile,
          //   { file: removedFile?.url },
          // );
        }
      }

    }

    onChange(fileList);
  };

  return (
    <>
      <Upload
        accept={`image/png, image/gif, image/jpeg, ${!noWebp && "image/webp"}${pdf ? ", application/pdf" : ""
          }`}
        listType={listType}
        onPreview={handlePreview}
        onRemove={async (e: any) => {
          console.log("🚀 ~ Input ~ e:", e)

          if (onRemove && e?.url && e?.id) {
            const { isConfirmed } = await Swal.fire({
              title: "Are you sure?",
              text: i18n?.t('Are you sure you want to delete this data?'),
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: i18n?.t('Yes, Delete'),
              cancelButtonText: i18n?.t('No'),
            });

            if (isConfirmed) {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              await useAction(onRemove, { "imageUrl": e?.url, id: e?.id }, () => { });
            } else {
              return false
            }
          }
        }}
        fileList={value || []}
        onChange={handleChange}
        maxCount={max}
        action={null}
        beforeUpload={() => false}
      >
        {(value?.length || 0) < max && (children || `+ ${i18n?.t('upload')}`)}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancel}
        title={i18n?.t('Preview')}
      >
        {previewImage.endsWith(".pdf") ? (
          <embed
            src={previewImage}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <Image alt="image" layout="responsive" width={500} height={500} src={previewImage} />
        )}
      </Modal>
    </>
  );
};

export default MultipleImageInput;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

