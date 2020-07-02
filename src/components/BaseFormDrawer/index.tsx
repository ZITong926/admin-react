import * as React from 'react'
import { Drawer, Button, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { DrawerProps } from 'antd/lib/drawer'
import BaseForm, { BaseFormProps } from '@/components/BaseForm'

type BaseFormDrawerProps = DrawerProps & BaseFormProps

const FooterComp = ({
  form,
  onClose
}: {
  onClose: (e: any) => void
  form: FormInstance
}) => (
  <div style={{ textAlign: 'right' }}>
    <Button onClick={onClose} style={{ marginRight: 8 }}>
      取消
    </Button>
    <Button type="primary" onClick={() => form.submit()}>
      确定
    </Button>
  </div>
)

const BaseFormDrawer = ({
  children,
  visible,
  title,
  className,
  closable,
  onClose,
  width,
  footer,
  ...rest
}: BaseFormDrawerProps) => {
  const [form] = Form.useForm()
  return (
    <Drawer
      width={width}
      title={title}
      closable={false}
      visible={visible}
      onClose={onClose}
      className={className}
      footer={footer ? footer : <FooterComp form={form} onClose={onClose!} />}
    >
      {children ? (
        React.cloneElement(children as any)
      ) : (
        <BaseForm form={form} {...rest} />
      )}
    </Drawer>
  )
}

export default BaseFormDrawer
