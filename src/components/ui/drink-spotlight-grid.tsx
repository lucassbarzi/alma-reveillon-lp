import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, Wine, GlassWater, Flame } from 'lucide-react'

const DRINKS = [
  { name: 'Beefeater London Gin', category: 'Gin Premium', icon: Sparkles },
  { name: 'Absolut Vodka', category: 'Vodka Sueca', icon: GlassWater },
  { name: 'Jameson Irish Whiskey', category: 'Whiskey Irlandês', icon: Flame },
  { name: 'Cerveja Premium', category: 'Puro Malte Gelada', icon: Sparkles },
  { name: 'Aperol Spritz', category: 'Sunset Cocktail', icon: Wine },
  { name: 'Red Bull Energy Drink', category: 'Energy & Flavors', icon: Flame },
  { name: 'Tônica & Refrigerantes', category: 'Mixers Selecionados', icon: GlassWater },
  { name: 'Sucos Naturais & Água de Coco', category: 'Tropical Refresh', icon: Sparkles },
]

export default function DrinkSpotlightGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-8">
      {DRINKS.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:-translate-y-0.5"
          >
            {/* Efeito Glow no fundo */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-white/20" />
            
            <div className="relative z-10 flex flex-col justify-between h-full gap-3">
              <div className="flex items-center justify-between text-white/80">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#f4fbfd]/90">
                  {item.category}
                </span>
                <Icon size={14} className="text-white/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
              </div>
              <h4 className="text-sm font-medium tracking-wide text-white leading-snug">
                {item.name}
              </h4>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
