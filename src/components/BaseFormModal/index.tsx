import { Modal } from "antd"
import * as React from "react"
import { ModalProps } from "antd/lib/modal"
import { FormInstance } from "antd/lib/form"
import BaseForm, { FormFieldsProps } from "@/components/BaseForm"

interface BaseFormModalProps extends ModalProps {
  form: FormInstance
  fields: FormFieldsProps[]
  handleCommit: (values: any) => void
}

const BaseFormModal: React.FC<BaseFormModalProps> = ({
  form,
  title,
  fields,
  visible,
  children,
  onCancel,
  handleCommit
}) => {
  const handleonOk = () => {
    form.submit()
  }
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
        <BaseForm form={form} fields={fields} handleFinished={handleCommit} />
      )}
    </Modal>
  )
}

export default BaseFormModal
