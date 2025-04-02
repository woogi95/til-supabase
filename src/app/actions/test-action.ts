"use server";
const TODOS: string[] = [];
export const getTodos = async (): Promise<string[]> => {
  // 일부러 지연
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return TODOS;
};
export const createTodos = async (data: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 새로운 todo 를 추가해서
  TODOS.push(data);
  return TODOS;
};
