import * as React from "react";
import { Modal, Form } from "antd";
import { ModalProps } from "antd/lib/modal";
import BaseForm, { BaseFormProps } from "@/components/BaseForm";

type BaseFormModalProps = ModalProps & BaseFormProps;

const BaseFormModal: React.FC<BaseFormModalProps> = ({
  title,
  visible,
  children,
  onCancel,
  ...rest
}) => {
  const [form] = Form.useForm();

  const handleonOk = () => {
    form.submit();
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleonOk}
      onCancel={onCancel}
    >
      {children ? (
        React.cloneElement(children as any)
      ) : (
        <BaseForm form={form} {...rest} />
      )}
    </Modal>
  );
};

export default BaseFormModal;
