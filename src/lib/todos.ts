export const getTodos = async (): Promise<Todo[]> => {
  const resp = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
  });
  const todos = await resp.json();
  return todos;
};

export const addTodo = async (title: string) => {
  return fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const deleteTodo = async (id: number) => {
  return fetch("http://localhost:3000/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

export const editTodo = async (id: number, title: string) => {
  return fetch("http://localhost:3000/api/todos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title }),
  });
};
