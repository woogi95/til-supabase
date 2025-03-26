"use server";

import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

type Linkaddress = Database["public"]["Tables"]["todos"];

export type TodosRow = Linkaddress["Row"];
export type TodosRowInsert = Linkaddress["Insert"];
export type TodosRowUpdate = Linkaddress["Update"];

// create 기능
export async function createTodo(todos: TodosRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .insert([{ title: todos.title, content: todos.content }])
    .select()
    .single();

  return { data, error, status };
}
