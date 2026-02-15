import { motion } from 'framer-motion';
import { Droplets, Sparkles, Heart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  moisture: number;
  spirit: number;
  intimacy: number;
}

interface ScoreItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

function ScoreItem({ icon, label, value, color, bgColor }: ScoreItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-[#4A4A4A]">{label}</span>
          <motion.span
            key={value}
            initial={{ scale: 1.2, color }}
            animate={{ scale: 1, color: '#1A1A1A' }}
            className="text-sm font-semibold"
          >
            {value}
          </motion.span>
        </div>
        <Progress value={value} className="h-2" />
      </div>
    </div>
  );
}

export default function ScoreDisplay({ moisture, spirit, intimacy }: ScoreDisplayProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md space-y-4">
      <h3 className="font-semibold text-[#1A1A1A] mb-3">三维积分</h3>
      <ScoreItem
        icon={<Droplets size={20} className="text-blue-500" />}
        label="润泽度"
        value={moisture}
        color="#3B82F6"
        bgColor="bg-blue-100"
      />
      <ScoreItem
        icon={<Sparkles size={20} className="text-amber-500" />}
        label="灵气值"
        value={spirit}
        color="#F59E0B"
        bgColor="bg-amber-100"
      />
      <ScoreItem
        icon={<Heart size={20} className="text-rose-500" />}
        label="亲密度"
        value={intimacy}
        color="#F43F5E"
        bgColor="bg-rose-100"
      />
    </div>
  );
}
