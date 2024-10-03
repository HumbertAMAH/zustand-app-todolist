"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, Rocket, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useStore } from "./store/Store";

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const { todos, addTodo, removeTodo, updateTodo } = useStore();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!todo.trim()) {
      toast.error("Veuillez saisir une tâche");
      return;
    }
    addTodo({ id: Date.now(), text: todo.trim(), completed: false });
    setTodo(""); // Réinitialiser l'input après l'ajout
  };

  const handleUpdateTodo = (id: number, text: string) => {
    if (editingId === id) {
      updateTodo(id, text);
      setEditingId(null);
      toast.success("Tâche modifiée avec succès");
    } else {
      setEditingId(id);
    }
  };
  return (
    <main>
      <Toaster />
      <div className="w-full bg-gray-500/10 h-40 text-center">
        <h1 className="text-3xl pt-10 font-semibold tracking-wide">
          Bienvenue sur le TodoApp
        </h1>
        <p className="mt-2">Une tâche réalisée avec Typescript et Zustand</p>
      </div>
      <div className="flex pt-16 space-x-2 w-5/6 mx-auto md:2/6 ">
        <Input
          placeholder="votre tâche ici..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button onClick={handleAddTodo}>
          <Rocket />
        </Button>
      </div>
      <div className="pt-8 overflow-scroll max-h-96">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center mx-auto space-x-2 mb-3 w-5/6 md:w-1/3"
          >
            <Input
              value={todo.text}
              disabled={editingId !== todo.id}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
            />
            <Button
              onClick={() => handleUpdateTodo(todo.id, todo.text)}
              size={"icon"}
              variant={"ghost"}
            >
              {editingId === todo.id ? <CheckCheck /> : <SquarePen />}
            </Button>
            <Button
              variant="destructive"
              size={"icon"}
              onClick={() => removeTodo(todo.id)}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
