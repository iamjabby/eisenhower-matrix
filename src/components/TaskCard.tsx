// src/components/TaskCard.tsx
"use client";
import { Task } from "@/types/task";

export default function TaskCard({
    task,
    onToggle,
    onEdit,
    onDelete,
    draggableProps,
}: {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    draggableProps?: React.HTMLAttributes<HTMLDivElement>;
}) {
    return (
        <div
            {...draggableProps}
            className="group rounded-2xl border bg-white p-3 shadow-sm hover:shadow-md transition border-zinc-200"
        >
            <div className="flex items-start gap-3">
                <button
                    onClick={() => onToggle(task.id)}
                    className={`mt-1 h-6 w-6 shrink-0 rounded-lg border flex items-center justify-center
            border-zinc-300
            ${task.done ? "bg-black text-white" : "bg-white text-transparent"}`}
                    aria-label="toggle task"
                    title="Mark as done"
                >
                    ✓
                </button>

                <div className="flex-1">
                    <div
                        className={`font-semibold leading-snug ${task.done ? "line-through opacity-60" : ""
                            }`}
                    >
                        {task.title}
                    </div>
                    {task.note && (
                        <div className="text-sm text-zinc-600">{task.note}</div>
                    )}
                    {task.due && (
                        <div className="mt-1 text-xs text-zinc-500">
                            Due: {new Date(task.due).toLocaleDateString()}
                        </div>
                    )}
                </div>

                <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    <button
                        onClick={() => onEdit(task)}
                        className="rounded-lg border px-2 py-1 text-xs 
               bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="rounded-lg border px-2 py-1 text-xs 
               bg-red-500 text-white border-red-600 hover:bg-red-600"
                    >
                        Del
                    </button>
                </div>
            </div>
        </div>
    );
}