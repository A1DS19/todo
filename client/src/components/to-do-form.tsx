import { Button, Col, Form, Input, Row } from "antd";
import { TodoRequest } from "../services/service";
import { PlusCircleFilled } from "@ant-design/icons";

type TodoFormProps = {
  onCreate: (todo:TodoRequest) => void
};

export function TodoForm({onCreate}:TodoFormProps){
  const [form] = Form.useForm();

  function onFinish(){
    onCreate({
      title: form.getFieldValue('title'),
      completed: false
    });
    form.resetFields();
  }

  return (
  <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="to-do-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} xl={20}>
          <Form.Item name={"title"} rules={[{ required:true, message:"this field is required" }]}>
            <Input placeholder="what needs to be done?" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled/>
            add
          </Button>
        </Col>
      </Row>
  </Form>
  )
}
