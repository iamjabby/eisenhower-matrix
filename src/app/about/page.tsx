// src/app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-6xl p-4 md:p-6">
            {/* Header เหมือนหน้าแรก */}
            <header className="sticky top-0 z-20 -mx-4 md:-mx-6 mb-4 border-b 
                   bg-zinc-50/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/60 
                   border-zinc-200">
                <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between">

                    {/* กล่องซ้าย */}
                    <div className="flex-1">
                        <Link
                            href="/"
                            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-100"
                        >
                            ← Back
                        </Link>
                    </div>

                    {/* Title ตรงกลาง */}
                    <h1 className="flex-1 text-center text-xl md:text-2xl font-extrabold tracking-tight">
                        About — Eisenhower Matrix
                    </h1>

                    {/* กล่องขวา (เว้นว่างเพื่อ balance) */}
                    <div className="flex-1" />
                </div>
            </header>

            {/* เนื้อหา */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold">Eisenhower Matrix คืออะไร?</h2>
                <p className="mt-2 text-sm text-zinc-700 leading-6">
                    เป็นเครื่องมือจัดการเวลา/งาน โดยแยกงานตาม{" "}
                    <span className="font-medium text-zinc-900">ความเร่งด่วน (Urgency)</span>{" "}
                    และ <span className="font-medium text-zinc-900">ความสำคัญ (Importance)</span>{" "}
                    เพื่อให้เราโฟกัสกับสิ่งที่มีผลกระทบสูงก่อนสิ่งที่แค่เร่งด่วน
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-zinc-200 p-3">
                        <div className="font-semibold flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                            Q1 — Do Now
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">ด่วน + สำคัญ → ลงมือทำทันที</p>
                        <ul className="text-sm text-zinc-600 list-disc pl-5 mt-1 space-y-1">
                            <li>เดดไลน์ใกล้</li>
                            <li>ปัญหาฉุกเฉิน</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-zinc-200 p-3">
                        <div className="font-semibold flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                            Q2 — Schedule
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">ไม่ด่วน + สำคัญ → ตั้งเวลา/วางแผน</p>
                        <ul className="text-sm text-zinc-600 list-disc pl-5 mt-1 space-y-1">
                            <li>พัฒนาทักษะ/ออกกำลังกาย</li>
                            <li>วางแผนโปรเจกต์ระยะยาว</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-zinc-200 p-3">
                        <div className="font-semibold flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                            Q3 — Delegate
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">ด่วน + ไม่สำคัญ → มอบหมาย</p>
                        <ul className="text-sm text-zinc-600 list-disc pl-5 mt-1 space-y-1">
                            <li>งานปลีกย่อยซ้ำ ๆ</li>
                            <li>สิ่งที่คนอื่นทำได้พอๆ กัน</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-zinc-200 p-3">
                        <div className="font-semibold flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-zinc-400" />
                            Q4 — Delete
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">ไม่ด่วน + ไม่สำคัญ → ตัดทิ้ง/เลื่อน</p>
                        <ul className="text-sm text-zinc-600 list-disc pl-5 mt-1 space-y-1">
                            <li>สกอล/คอนเทนต์ไร้จุดหมาย</li>
                            <li>กิจกรรมไม่เพิ่มคุณค่า</li>
                        </ul>
                    </div>
                </div>

                <h3 className="mt-5 font-semibold">แนวทางใช้งานที่แนะนำ</h3>
                <ul className="mt-2 text-sm text-zinc-700 list-disc pl-5 space-y-1">
                    <li>เริ่มวันด้วยการเคลียร์ Q1 ก่อน แล้วกันเวลาสำหรับ Q2 ทุกวัน</li>
                    <li>ทบทวนทั้งสี่ช่องสั้น ๆ วันละ 1–2 ครั้ง</li>
                    <li>ถามตัวเองว่า “สิ่งนี้ช่วยเป้าระยะยาวไหม?” ถ้าไม่ → Q4</li>
                    <li>งานที่ใครทำแทนได้ ให้ลอง Q3 (Delegate)</li>
                </ul>

            </section>
        </main>
    );
}