import * as React from "react";
import { FormInstance } from "antd/lib/form";
import { Input, Form, InputNumber, Select, message } from "antd";

import "./EditTable.less";

interface EditTableCellProps {
  record: any;
  type?: string;
  editable: boolean;
  dataIndex: string;
  selectValue?: string[];
  handleSave: (record: object) => void;
  children: Array<undefined | string | number>;
}

interface EditTableRowProps {
  index: number;
}

const EditTableContext = React.createContext<FormInstance>({} as any);

const EditTableRow = ({ index, ...rest }: EditTableRowProps) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditTableContext.Provider value={form}>
        <tr {...rest} />
      </EditTableContext.Provider>
    </Form>
  );
};

const EditFormComponent = React.forwardRef<any, any>(
  (
    {
      type,
      children,
      dataIndex,
      selectValue,
      ...rest
    }: Omit<
      EditTableCellProps & { onBlur: () => void },
      "editable" & "handleSave" & "record"
    >,
    ref
  ) => {
    const renderType = (type?: string) => {
      switch (type) {
        case "input":
          return <Input ref={ref} {...rest} />;
        case "input-number":
          return <InputNumber ref={ref} {...rest} style={{ width: "100%" }} />;
        case "select":
          return (
            <Select ref={ref} {...rest} open={true} autoFocus={true}>
              {selectValue!.map((t) => (
                <Select.Option key={t} value={t}>
                  {t}
                </Select.Option>
              ))}
            </Select>
          );
        default:
          return <Input ref={ref} {...rest} />;
      }
    };

    return (
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        initialValue={children[1]}
      >
        {renderType(type)}
      </Form.Item>
    );
  }
);

export const EditTableCell: React.FC<EditTableCellProps> = ({
  record,
  editable,
  dataIndex,
  handleSave,
  selectValue,
  ...rest
}) => {
  const refComp = React.useRef<any>();
  const [editing, setEditing] = React.useState<boolean>(false);
  const form = React.useContext(EditTableContext);

  React.useEffect(() => {
    if (editing && refComp.current) {
      refComp.current!.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleEdit();
      handleSave({ ...record, ...values });
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <td {...rest}>
      {editing && editable ? (
        <EditFormComponent
          {...rest}
          ref={refComp}
          onBlur={save}
          dataIndex={dataIndex}
          selectValue={selectValue}
        />
      ) : (
        <NormalCell onClick={handleEdit} {...rest} />
      )}
    </td>
  );
};

const NormalCell: React.FC<any> = ({ children, ...rest }) => (
  <div {...rest}>{children[1]}</div>
);

export const components = {
  body: {
    row: EditTableRow,
    cell: EditTableCell,
  },
};
