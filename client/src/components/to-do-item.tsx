import { Button, List, Popconfirm, Switch, Tag, Tooltip } from "antd";
import { Todo } from "../services/service"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type todoItemProps = {
  todo: Todo,
  onRemove: (todo: Todo) => void,
  onToggle: (todo: Todo) => void
};

export function TodoItem({todo, onRemove, onToggle}:todoItemProps) {

  return (
  <List.Item
      actions={[
        <Tooltip title={todo.completed ? `mark a incomplete` : `mark as complete`}>
          <Switch
            checkedChildren={<CheckOutlined/>}
            unCheckedChildren={<CloseOutlined/>}
            onChange={() => onToggle(todo)}
            defaultChecked={todo.completed}
            />
        </Tooltip>,
        <Popconfirm
          title="are you sure?"
          onConfirm={() => onRemove(todo)}
        >
      <Button type="primary" className="remove-to-do-button">X</Button>
      </Popconfirm>
      ]}
    >
      <div className="to-do-item">
        <Tag color={todo.completed ? 'cyan' : 'red'} className="to-do-tag">
          {todo.title}
        </Tag>
      </div>
    </List.Item>
  );
}
