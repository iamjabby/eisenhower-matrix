"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Quadrant } from "@/types/task";
import TaskCard from "@/components/TaskCard";
import TaskDialog from "@/components/TaskDialog";

const Q_META: Record<Quadrant, { title: string; desc: string }> = {
  Q1: { title: "Do Now",     desc: "Urgent • Important" },
  Q2: { title: "Schedule",   desc: "Not Urgent • Important" },
  Q3: { title: "Delegate",   desc: "Urgent • Not Important" },
  Q4: { title: "Delete",     desc: "Not Urgent • Not Important" },
};

const Q_DOT: Record<Quadrant, string> = {
  Q1: "bg-red-500",
  Q2: "bg-emerald-500",
  Q3: "bg-amber-500",
  Q4: "bg-zinc-400",
};

export default function Page() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks:v1", []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [draftQuadrant, setDraftQuadrant] = useState<Quadrant | undefined>(undefined);
  const [dragId, setDragId] = useState<string | null>(null);

  const filtered = useMemo(() => tasks, [tasks]);

  function createOrUpdate(
    payload: Omit<Task, "id" | "createdAt"> & { id?: string }
  ) {
    if (payload.id) {
      setTasks(prev =>
        prev.map(t => (t.id === payload.id ? ({ ...t, ...payload } as Task) : t))
      );
    } else {
      const t: Task = {
        id: crypto.randomUUID(),
        title: payload.title,
        note: payload.note,
        due: payload.due,
        quadrant: payload.quadrant,
        done: payload.done,
        createdAt: Date.now(),
      };
      setTasks(prev => [t, ...prev]);
    }
  }

  function toggleDone(id: string) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function move(id: string, q: Quadrant) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, quadrant: q } : t)));
  }

  function onDropQuadrant(q: Quadrant) {
    if (dragId) move(dragId, q);
    setDragId(null);
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      {/* Header */}
      <header className="sticky top-0 z-20 -mx-4 md:-mx-6 mb-4 border-b bg-zinc-50/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/60 border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-0.5">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Eisenhower Matrix</h1>
            <p className="text-sm text-zinc-600">โฟกัสสิ่งสำคัญก่อนสิ่งเร่งด่วน ✦</p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            {/* ลิงก์ไปหน้าอธิบายเต็ม */}
            <Link
              href="/about"
              className="rounded-xl border px-4 py-2 bg-white text-black hover:opacity-90 border-black/50"
            >
              Learn more
            </Link>

            <button
              onClick={() => {
                setEditing(null);
                setDraftQuadrant(undefined); // New Task → เลือก Quadrant เอง
                setDialogOpen(true);
              }}
              className="rounded-xl border px-4 py-2 bg-black text-white hover:opacity-90 border-black/10"
            >
              + New Task
            </button>
            
          </div>
        </div>
      </header>

      {/* Grid 4 ช่อง */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {(["Q1", "Q2", "Q3", "Q4"] as Quadrant[]).map((q) => {
          const list = filtered.filter(t => t.quadrant === q);
          return (
            <div
              key={q}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropQuadrant(q)}
              className="rounded-2xl border bg-white p-3 border-zinc-200 shadow-sm"
            >
              <div className="mb-2 flex items-baseline justify-between">
                <div>
                  <div className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${Q_DOT[q]}`} aria-hidden />
                    {Q_META[q].title}
                  </div>
                  <div className="text-xs text-zinc-500">{Q_META[q].desc}</div>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {list.length} tasks
                </span>
              </div>

              <div className="space-y-2 min-h-28">
                {list.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggleDone}
                    onEdit={(t) => {
                      setEditing(t);
                      setDraftQuadrant(undefined); // edit → ใช้ quadrant ของงานนั้น
                      setDialogOpen(true);
                    }}
                    onDelete={remove}
                    draggableProps={{
                      draggable: true,
                      onDragStart: () => setDragId(task.id),
                      onDragEnd: () => setDragId(null),
                    }}
                  />
                ))}

                {list.length === 0 && (
                  <button
                    onClick={() => {
                      setEditing(null);
                      setDraftQuadrant(q); // ตั้งค่าเริ่มต้นตามช่องที่กด
                      setDialogOpen(true);
                    }}
                    className="w-full rounded-xl border border-dashed px-3 py-4 text-sm text-zinc-500 hover:bg-zinc-50 border-zinc-300"
                  >
                    ยังไม่มีงานในช่องนี้ — คลิกเพื่อเพิ่มงานใหม่
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <TaskDialog
        open={dialogOpen}
        initial={editing}
        initialQuadrant={draftQuadrant}
        onClose={() => setDialogOpen(false)}
        onSubmit={(p) => createOrUpdate(p)}
      />
    </main>
  );
}