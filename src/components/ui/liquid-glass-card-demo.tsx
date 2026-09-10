import { Button } from "./button";
import { LiquidCard } from "./liquid-glass-card";

export default function DemoOne() {
  return (
    <div className="w-full max-w-[420px] mx-auto p-4">
      <LiquidCard className="w-full min-w-[320px] p-2">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Boipeba Paradise"
            className="h-[420px] w-full rounded-sm object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80"
            alt="Paradise View"
            className="absolute top-36 left-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-white/60 object-cover shadow-2xl transition-all duration-500 hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full rounded-b-md bg-gradient-to-t from-black/85 via-black/60 to-transparent p-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#57d2f4]">01 · Chegada</span>
              <h3 className="text-2xl text-white font-bold tracking-tight mt-1">CHEGA DIA 28 OU 29?</h3>
              <p className="text-xs text-white/80 leading-relaxed mt-1.5">
                Comprou o Full Pass? Sem stress. Seu kit de acesso ficará reservado em seu nome até o dia da sua chegada.
              </p>
              <Button className="mt-3 bg-[#57d2f4] text-[#04151f] hover:bg-[#7de0f8] font-bold text-xs uppercase tracking-wider">
                Kit Garantido
              </Button>
            </div>
          </div>
        </div>
      </LiquidCard>
    </div>
  );
}
export { DemoOne };
