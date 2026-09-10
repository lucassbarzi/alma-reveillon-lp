"use client";

import HoverStack from "./hover-stack";

export default function HoverStackDemo() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-[4vw] overflow-hidden bg-[#03120e] px-4 py-16 text-white">
      <div className="flex w-full flex-col items-center text-center">
        <span className="text-xs uppercase tracking-widest text-[#7ce577]">Avisos Importantes</span>
        <h1
          style={{ fontWeight: 400 }}
          className="text-4xl md:text-5xl font-['Tusker','Arial_Narrow',sans-serif] uppercase tracking-tight text-white mt-2"
        >
          Hover Stack Cards
        </h1>
      </div>

      <HoverStack />
    </section>
  );
}

export { HoverStackDemo };
