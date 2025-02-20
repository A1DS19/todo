import { List } from "antd";
import { Todo } from "../services/service";
import { TodoItem } from "./to-do-item";

type todoTabProps = {
  todos: Todo[],
  onRemove: (todo:Todo) => void,
  onToggle: (todo:Todo) => void
};

export function TodoTab({todos, onToggle, onRemove}:todoTabProps){
  return (
  <List
      locale={{ emptyText: "no todos" }}
      dataSource={todos}
      renderItem={(todo:Todo) => {
        return (
        <TodoItem
            todo={todo}
            onRemove={() => onRemove(todo)}
            onToggle={() => onToggle(todo)}
          />
        );
      }}
      pagination={{
        position: 'bottom',
        pageSize: 5
      }}
    />
  );
}
