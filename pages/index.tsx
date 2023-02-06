import React from "react";
import { Card } from "react-bootstrap";
import { InferGetStaticPropsType } from "next";
import { ITodo } from "../types";
import Todo from "../components/Todo";
import FormTodo from "../components/Form Todo";

export default function indexPage({
  todos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [todosList, setTodosList] = React.useState(todos);

  const addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Math.random(),
      description: text,
      isDone: false,
    };
    const newTodos = [...todosList, newTodo];
    setTodosList(newTodos);
  };

  const markTodo = (id: number) => {
    const newTodos = todosList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: true,
        };
      }
      return todo;
    });
    setTodosList(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = todosList.filter((todo) => {
      return todo.id !== id;
    });
    setTodosList(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todosList.map((todo, index) => (
            <Card key={index}>
              <Card.Body>
                <Todo todo={todo} markTodo={markTodo} removeTodo={removeTodo} />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const todos: ITodo[] = [
    {
      id: 2,
      description: "Test next.js app",
      isDone: true,
    },
    {
      id: 1,
      description: "Build next.js app",
      isDone: true,
    },
  ];

  return {
    props: {
      todos,
    },
  };}