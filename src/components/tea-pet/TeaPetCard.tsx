import { motion } from 'framer-motion';
import { ChevronRight, Droplets, Sparkles, Heart } from 'lucide-react';
import type { TeaPet } from '@/types';
import { Progress } from '@/components/ui/progress';

interface TeaPetCardProps {
  teaPet: TeaPet;
  onClick?: () => void;
}

export default function TeaPetCard({ teaPet, onClick }: TeaPetCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md cursor-pointer border border-willow/10"
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(74, 124, 89, 0.15)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-rice to-rice-dark flex-shrink-0 border border-willow/10">
          <img
            src={teaPet.image}
            alt={teaPet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-ink truncate">{teaPet.name}</h3>
            <span className="text-xs text-white bg-willow px-2 py-0.5 rounded-full">
              Lv.{teaPet.level}
            </span>
          </div>
          <p className="text-xs text-ink/50 mb-2">{teaPet.material} · {teaPet.type === 'golden-toad' ? '金蟾' : teaPet.type === 'pixiu' ? '貔貅' : teaPet.type === 'dragon-turtle' ? '龙龟' : '弥勒'}</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Droplets size={12} className="text-blue-500" />
              <Progress value={teaPet.scores.moisture} className="h-1.5 flex-1" />
              <span className="text-[10px] text-ink/50 w-6">{teaPet.scores.moisture}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-amber-500" />
              <Progress value={teaPet.scores.spirit} className="h-1.5 flex-1" />
              <span className="text-[10px] text-ink/50 w-6">{teaPet.scores.spirit}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={12} className="text-rose-500" />
              <Progress value={teaPet.scores.intimacy} className="h-1.5 flex-1" />
              <span className="text-[10px] text-ink/50 w-6">{teaPet.scores.intimacy}</span>
            </div>
          </div>
        </div>
        <ChevronRight size={20} className="text-willow flex-shrink-0" />
      </div>
      <div className="mt-3 pt-3 border-t border-willow/10 flex items-center justify-between">
        <span className="text-xs text-ink/50">
          连续打卡 <span className="text-willow font-medium">{teaPet.checkInStreak}</span> 天
        </span>
        <span className="text-xs text-ink/50">
          经验 {teaPet.experience}/{teaPet.maxExperience}
        </span>
      </div>
    </motion.div>
  );
}
