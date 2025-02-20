import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import {
  get,
  get_by_id,
  create,
  update,
  remove,
  Todo,
  TodoRequest
} from '../services/service';
import { TodoTab } from './to-do-tab';
import { TodoForm } from './to-do-form';

const { TabPane } = Tabs;
const { Content } = Layout;

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  async function onCreate(todo:TodoRequest){
    const result = await create(todo);
    if (result) {
      setTodos((existing_todos) => [...existing_todos, result]);
      setActiveTodos((existing_todos) => [...existing_todos, result]);

    }
  }

  async function onRemove(todo:Todo){
    const result = await remove(todo.id);
    if (result == 1) {
      setTodos(todos.filter((todo) => todo.id != todo.id));
    }
  }

  async function onToggle(todo:Todo){
    const updatedTodo:Todo = {
      ...todo,
      completed: !todo.completed
    };
    const result = await update(todo.id, updatedTodo);
    setTodos(todos.filter((todo) => todo.id != todo.id));
    setTodos((existing_todos) => [...existing_todos, result]);
  }

  const load_todos = useCallback(async () => {
    const todos = await get();
    setTodos(todos);
    setActiveTodos(todos.filter((todo) => todo.completed != true));
    setCompletedTodos(todos.filter((todo) => todo.completed != false));
  }, []);

  useEffect(() => {
    load_todos();
  }, []);

  return (
  <Layout className='layout'>
      <Content style={{ padding: '0 50px' }}>
        <div className='to-do-list'>
          <Row>
            <Col span={14} offset={5}>
              <h1>
                to-do
              </h1>
              <TodoForm onCreate={onCreate}/>
              <Tabs defaultActiveKey='all'>
                <TabPane tab='all' key='all'>
                  <TodoTab
                    todos={todos}
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />
                </TabPane>
                <TabPane tab='active' key='active'>
                  <TodoTab
                    todos={activeTodos}
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />
                </TabPane>
                <TabPane tab='completed' key='completed'>
                  <TodoTab
                    todos={completedTodos}
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />

                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
  </Layout>
  );
}
