// src/components/TaskDialog.tsx
"use client";
import { useEffect, useRef } from "react";
import { Task, Quadrant } from "@/types/task";

export default function TaskDialog({
  open,
  initial,
  onClose,
  onSubmit,
  initialQuadrant, // ⬅️ เพิ่ม prop
}: {
  open: boolean;
  initial: Task | null;
  onClose: () => void;
  onSubmit: (
    payload: Omit<Task, "id" | "createdAt"> & { id?: string }
  ) => void;
  initialQuadrant?: Quadrant; // ⬅️ เพิ่ม type
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // เปิด/ปิด dialog
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) el.showModal();
    else el.close();
  }, [open]);

  // ปิดเมื่อคลิก backdrop
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) onClose();
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      id: initial?.id,
      title: (fd.get("title") as string) ?? "",
      note: (fd.get("note") as string) || "",
      due: (fd.get("due") as string) || undefined,
      quadrant: (fd.get("quadrant") as Quadrant) ?? "Q1",
      done: initial?.done ?? false,
    };
    onSubmit(payload);
    onClose();
  }

  // ใช้ key เพื่อ reset ค่าฟอร์มเมื่อ quadrant ตั้งต้นเปลี่ยน
  const formKey = `${initial?.id ?? "new"}-${initialQuadrant ?? "Q1"}`;

  return (
    <dialog
      ref={ref}
      className="inset-0 m-auto rounded-2xl p-0 border border-zinc-200 bg-transparent
                 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm
                 open:animate-[fadeIn_140ms_ease-out]"
    >
      <form
        key={formKey}                  // ⬅️ สำคัญมาก
        onSubmit={handleSubmit}
        className="w-[min(92vw,560px)] bg-white rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 bg-zinc-50">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            {initial ? "Edit Task" : "New Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full 
                       bg-black text-white hover:bg-zinc-800"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium text-zinc-700">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              placeholder="What needs to be done?"
              defaultValue={initial?.title ?? ""}
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2
                         text-zinc-900 placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-zinc-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="note" className="text-sm font-medium text-zinc-700">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Optional details…"
              defaultValue={initial?.note ?? ""}
              rows={3}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2
                         text-zinc-900 placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-zinc-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="due" className="text-sm font-medium text-zinc-700">
                Due date
              </label>
              <input
                id="due"
                type="date"
                name="due"
                defaultValue={initial?.due ?? ""}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2
                           text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-zinc-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quadrant" className="text-sm font-medium text-zinc-700">
                Quadrant
              </label>
              <select
                id="quadrant"
                name="quadrant"
                defaultValue={initial?.quadrant ?? initialQuadrant ?? "Q1"}  // ⬅️ ใช้ค่าที่ส่งมา
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2
                           text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-zinc-400"
              >
                <option value="Q1">Do Now (Urgent • Important)</option>
                <option value="Q2">Schedule (Not Urgent • Important)</option>
                <option value="Q3">Delegate (Urgent • Not Important)</option>
                <option value="Q4">Delete (Not Urgent • Not Important)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-200 bg-zinc-50 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm 
                       bg-white text-zinc-900 hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
}