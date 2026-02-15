import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Share2, Edit2, Trash2, Droplets, Sparkles, Heart, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { TeaPet } from '@/types';
import TeaPetCard from '@/components/tea-pet/TeaPetCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function Archive() {
  const { state } = useApp();
  const [selectedTeaPet, setSelectedTeaPet] = useState<TeaPet | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleTeaPetClick = (teaPet: TeaPet) => {
    setSelectedTeaPet(teaPet);
    setIsDetailOpen(true);
  };

  const handleShare = () => {
    toast.success('分享功能开发中，敬请期待！');
  };

  const handleEdit = () => {
    toast.success('编辑功能开发中，敬请期待！');
  };

  const handleDelete = () => {
    toast.success('删除功能开发中，敬请期待！');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <div className="w-10" />
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Leaf size={18} />
            茶宠档案
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 flex justify-end"
          >
            <Plus size={24} />
          </motion.button>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {state.teaPets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <img
              src="/images/backgrounds/empty-state.png"
              alt="Empty"
              className="w-40 h-40 mb-4"
            />
            <p className="text-ink/50 mb-4">还没有绑定茶宠</p>
            <Button className="bg-willow hover:bg-willow-dark">
              <Plus size={18} className="mr-2" />
              扫码绑定
            </Button>
          </motion.div>
        ) : (
          state.teaPets.map((teaPet, index) => (
            <motion.div
              key={teaPet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TeaPetCard
                teaPet={teaPet}
                onClick={() => handleTeaPetClick(teaPet)}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 bg-white/95 backdrop-blur-sm">
          {selectedTeaPet && (
            <>
              {/* 3D Preview Area */}
              <div className="relative bg-gradient-to-br from-rice to-rice-dark p-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-willow/10">
                  <img
                    src={selectedTeaPet.image}
                    alt={selectedTeaPet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md"
                  >
                    <Share2 size={18} className="text-ink" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-ink">{selectedTeaPet.name}</h2>
                    <span className="px-3 py-1 bg-willow text-white text-sm rounded-full">
                      Lv.{selectedTeaPet.level}
                    </span>
                  </div>
                  <p className="text-ink/60">{selectedTeaPet.description}</p>
                </div>

                {/* Level Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ink/70">升级进度</span>
                    <span className="text-sm text-willow">
                      {selectedTeaPet.experience}/{selectedTeaPet.maxExperience}
                    </span>
                  </div>
                  <Progress
                    value={(selectedTeaPet.experience / selectedTeaPet.maxExperience) * 100}
                    className="h-3"
                  />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rice rounded-xl p-4">
                    <div className="text-sm text-ink/50 mb-1">材质</div>
                    <div className="font-medium text-ink">{selectedTeaPet.material}</div>
                  </div>
                  <div className="bg-rice rounded-xl p-4">
                    <div className="text-sm text-ink/50 mb-1">绑定日期</div>
                    <div className="font-medium text-ink">
                      {new Date(selectedTeaPet.bindDate).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedTeaPet.customText && (
                    <div className="bg-rice rounded-xl p-4 col-span-2">
                      <div className="text-sm text-ink/50 mb-1">刻字</div>
                      <div className="font-medium text-ink">{selectedTeaPet.customText}</div>
                    </div>
                  )}
                </div>

                {/* Scores */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-ink flex items-center gap-2">
                    <Leaf size={16} className="text-willow" />
                    三维积分
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-blue-500">
                        {selectedTeaPet.scores.moisture}
                      </div>
                      <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
                        <Droplets size={12} />
                        润泽度
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-amber-500">
                        {selectedTeaPet.scores.spirit}
                      </div>
                      <div className="text-xs text-amber-600 flex items-center justify-center gap-1">
                        <Sparkles size={12} />
                        灵气值
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-rose-500">
                        {selectedTeaPet.scores.intimacy}
                      </div>
                      <div className="text-xs text-rose-600 flex items-center justify-center gap-1">
                        <Heart size={12} />
                        亲密度
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 border-willow text-willow hover:bg-willow/10"
                    onClick={handleEdit}
                  >
                    <Edit2 size={18} className="mr-2" />
                    编辑档案
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 text-rose-500 border-rose-200 hover:bg-rose-50"
                    onClick={handleDelete}
                  >
                    <Trash2 size={18} className="mr-2" />
                    删除
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
