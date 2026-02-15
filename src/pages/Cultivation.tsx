import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Hand, Utensils, Gift, Sparkles, Leaf, Droplets, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import CheckInButton from '@/components/cultivation/CheckInButton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const interactionButtons = [
  { id: 'chat', label: 'AI聊天', icon: MessageCircle, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
  { id: 'pet', label: '抚摸', icon: Hand, color: 'bg-gradient-to-br from-pink-400 to-rose-500' },
  { id: 'feed', label: '喂食', icon: Utensils, color: 'bg-gradient-to-br from-jade to-jade-dark' },
  { id: 'gift', label: '送礼', icon: Gift, color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
];

export default function Cultivation() {
  const { state, dispatch } = useApp();
  const teaPet = state.currentTeaPet;
  const [showEvolution, setShowEvolution] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<string | null>(null);

  if (!teaPet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img
            src="/images/backgrounds/empty-state.png"
            alt="Empty"
            className="w-32 h-32 mx-auto mb-4"
          />
          <p className="text-ink/50">请先绑定茶宠</p>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = teaPet.lastCheckIn === today;

  const handleInteraction = (id: string) => {
    setSelectedInteraction(id);
    
    switch (id) {
      case 'chat':
        toast.success('AI聊天功能开发中，敬请期待！');
        break;
      case 'pet':
        dispatch({
          type: 'UPDATE_SCORES',
          payload: {
            id: teaPet.id,
            scores: { intimacy: Math.min(100, teaPet.scores.intimacy + 2) },
          },
        });
        toast.success('抚摸成功！亲密度 +2');
        break;
      case 'feed':
        dispatch({
          type: 'UPDATE_SCORES',
          payload: {
            id: teaPet.id,
            scores: { intimacy: Math.min(100, teaPet.scores.intimacy + 5) },
          },
        });
        toast.success('喂食成功！亲密度 +5');
        break;
      case 'gift':
        toast.success('送礼功能开发中，敬请期待！');
        break;
    }
    
    setTimeout(() => setSelectedInteraction(null), 500);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-center h-14 px-4 max-w-lg mx-auto">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Leaf size={18} />
            养成中心
          </h1>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Tea Pet Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rice to-rice-dark shadow-lg border border-willow/10">
            <motion.img
              src={teaPet.image}
              alt={teaPet.name}
              className="w-full h-full object-cover"
              animate={{
                scale: selectedInteraction ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-willow text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
              Lv.{teaPet.level} {teaPet.name}
            </div>
          </div>

          {/* Evolution Hint */}
          {teaPet.experience >= teaPet.maxExperience * 0.8 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4"
            >
              <button
                onClick={() => setShowEvolution(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg"
              >
                <Sparkles size={14} />
                可进化
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Score Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-willow/10">
          <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
            <Leaf size={16} className="text-willow" />
            三维积分
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplets size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink/70">润泽度</span>
                  <motion.span
                    key={teaPet.scores.moisture}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-semibold text-ink"
                  >
                    {teaPet.scores.moisture}
                  </motion.span>
                </div>
                <Progress value={teaPet.scores.moisture} className="h-2" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink/70">灵气值</span>
                  <motion.span
                    key={teaPet.scores.spirit}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-semibold text-ink"
                  >
                    {teaPet.scores.spirit}
                  </motion.span>
                </div>
                <Progress value={teaPet.scores.spirit} className="h-2" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart size={20} className="text-rose-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink/70">亲密度</span>
                  <motion.span
                    key={teaPet.scores.intimacy}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-semibold text-ink"
                  >
                    {teaPet.scores.intimacy}
                  </motion.span>
                </div>
                <Progress value={teaPet.scores.intimacy} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Check In Button */}
        <CheckInButton teaPetId={teaPet.id} hasCheckedIn={hasCheckedIn} />

        {/* Interaction Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {interactionButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <motion.button
                key={button.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleInteraction(button.id)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 ${button.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-ink/70">{button.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Streak Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-willow/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-ink/50 mb-1">连续打卡天数</div>
              <div className="text-3xl font-bold text-willow">
                {teaPet.checkInStreak} <span className="text-lg text-ink/50">天</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-willow/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-willow">
                  {Math.min(teaPet.checkInStreak + 1, 30)}
                </div>
                <div className="text-[10px] text-willow">目标</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < teaPet.checkInStreak % 7 ? 'bg-jade' : 'bg-willow/20'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Evolution Dialog */}
      <Dialog open={showEvolution} onOpenChange={setShowEvolution}>
        <DialogContent className="max-w-sm bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-ink">茶宠进化</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-lg"
            >
              <Sparkles size={48} className="text-white" />
            </motion.div>
            <p className="text-ink mb-2">您的茶宠即将进化到下一等级！</p>
            <p className="text-sm text-ink/50">进化后将解锁新的外观和特效</p>
          </div>
          <Button
            className="w-full bg-willow hover:bg-willow-dark"
            onClick={() => {
              setShowEvolution(false);
              toast.success('进化成功！茶宠等级提升！');
            }}
          >
            立即进化
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
