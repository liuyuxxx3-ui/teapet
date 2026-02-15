import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, Ticket, Star, ChevronRight, Sparkles, Users, Calendar, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const memberLevels = [
  { level: 'normal', name: '普通会员', minGrowth: 0, discount: 100, color: 'bg-gradient-to-br from-gray-400 to-gray-500' },
  { level: 'silver', name: '银叶会员', minGrowth: 1000, discount: 95, color: 'bg-gradient-to-br from-blue-400 to-blue-500' },
  { level: 'gold', name: '金叶会员', minGrowth: 5000, discount: 90, color: 'bg-gradient-to-br from-amber-400 to-amber-500' },
  { level: 'jade', name: '玉叶会员', minGrowth: 10000, discount: 80, color: 'bg-gradient-to-br from-jade to-jade-dark' },
];

const privileges = [
  { icon: Gift, title: '专属礼包', desc: '每月会员专属礼包', levels: ['silver', 'gold', 'jade'] },
  { icon: Ticket, title: '购物折扣', desc: '会员专享折扣优惠', levels: ['silver', 'gold', 'jade'] },
  { icon: Star, title: '积分加速', desc: '消费积分倍数奖励', levels: ['gold', 'jade'] },
  { icon: Crown, title: '专属客服', desc: '一对一专属客服', levels: ['gold', 'jade'] },
  { icon: Sparkles, title: '进化加速', desc: '茶宠养成积分翻倍', levels: ['jade'] },
  { icon: Users, title: '线下活动', desc: '优先参与线下茶会', levels: ['jade'] },
];

const benefits = {
  normal: ['基础功能使用权', '消费累计积分', '养护教程免费查看'],
  silver: ['95折购物优惠', '积分兑换折扣', '优先参与线上茶友活动', '基础定制服务减免'],
  gold: ['90折购物优惠', '积分加速(1.5倍)', '专属客服', '匠人定制优先排队', '线下茶会参与资格'],
  jade: ['80折购物优惠', '积分全额抵扣', '一对一定制咨询', '限量款优先购买', '年度专属礼盒'],
};

export default function Member() {
  const { state } = useApp();
  const user = state.user;
  const [showLevelDetail, setShowLevelDetail] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  if (!user) return null;

  const currentLevelIndex = memberLevels.findIndex((l) => l.level === user.memberLevel);
  const currentLevel = memberLevels[currentLevelIndex];
  const nextLevel = memberLevels[currentLevelIndex + 1];
  
  const progress = nextLevel
    ? ((user.growthValue - currentLevel.minGrowth) / (nextLevel.minGrowth - currentLevel.minGrowth)) * 100
    : 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Header Card */}
      <div className="relative bg-gradient-to-br from-willow via-willow-dark to-ink text-white px-4 pt-12 pb-8 rounded-b-[32px]">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/backgrounds/member-card-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown size={24} className="text-amber-400" />
                <span className="text-2xl font-bold">{currentLevel.name}</span>
              </div>
              <div className="text-white/70">成长值 {user.growthValue}</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">{currentLevel.discount}%</span>
            </div>
          </div>

          {/* Progress */}
          {nextLevel && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">距离{nextLevel.name}还需</span>
                <span className="text-sm font-bold">{nextLevel.minGrowth - user.growthValue}成长值</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto -mt-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md text-center border border-willow/10"
          >
            <div className="text-2xl font-bold text-willow">{user.points}</div>
            <div className="text-xs text-ink/50">我的积分</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md text-center border border-willow/10"
          >
            <div className="text-2xl font-bold text-willow">5</div>
            <div className="text-xs text-ink/50">优惠券</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md text-center border border-willow/10"
          >
            <div className="text-2xl font-bold text-willow">3</div>
            <div className="text-xs text-ink/50">专属礼</div>
          </motion.button>
        </div>

        {/* Level List */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ink flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              会员等级
            </h3>
            <button
              onClick={() => setShowLevelDetail(true)}
              className="text-sm text-willow flex items-center"
            >
              详情 <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {memberLevels.map((level) => {
              const isCurrent = level.level === user.memberLevel;
              return (
                <div
                  key={level.level}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isCurrent ? 'bg-willow/10 border border-willow/30' : 'bg-rice'
                  }`}
                >
                  <div className={`w-10 h-10 ${level.color} rounded-full flex items-center justify-center`}>
                    <Crown size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isCurrent ? 'text-willow' : 'text-ink'}`}>
                      {level.name}
                    </div>
                    <div className="text-xs text-ink/50">
                      {level.minGrowth === 0 ? '注册即送' : `成长值≥${level.minGrowth}`}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-willow">{level.discount}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privileges */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ink flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              会员特权
            </h3>
            <button
              onClick={() => setShowBenefits(true)}
              className="text-sm text-willow flex items-center"
            >
              全部 <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {privileges.filter((p) => p.levels.includes(user.memberLevel)).map((privilege) => {
              const Icon = privilege.icon;
              return (
                <div key={privilege.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-willow/10 rounded-xl flex items-center justify-center mb-2">
                    <Icon size={22} className="text-willow" />
                  </div>
                  <div className="text-sm font-medium text-ink">{privilege.title}</div>
                  <div className="text-xs text-ink/50">{privilege.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Member Day */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={18} />
                <span className="font-bold">会员日</span>
              </div>
              <div className="text-sm text-white/80">每月15日专属福利</div>
            </div>
            <Button
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30"
              onClick={() => toast.success('会员日活动即将开始！')}
            >
              查看详情
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
            <Leaf size={16} className="text-willow" />
            成长任务
          </h3>
          <div className="space-y-3">
            {[
              { title: '每日签到', reward: '+10成长值', completed: true },
              { title: '茶宠打卡', reward: '+20成长值', completed: false },
              { title: '分享动态', reward: '+15成长值', completed: false },
              { title: '商城消费', reward: '消费1元=1成长值', completed: false },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-rice rounded-xl">
                <div>
                  <div className="font-medium text-ink">{task.title}</div>
                  <div className="text-xs text-willow">{task.reward}</div>
                </div>
                <Button
                  size="sm"
                  className={task.completed ? 'bg-jade' : 'bg-willow hover:bg-willow-dark'}
                  disabled={task.completed}
                  onClick={() => toast.success('任务完成！')}
                >
                  {task.completed ? '已完成' : '去完成'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Detail Dialog */}
      <Dialog open={showLevelDetail} onOpenChange={setShowLevelDetail}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Leaf size={18} className="text-willow" />
              会员等级说明
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {memberLevels.map((level) => (
              <div key={level.level} className="border border-willow/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${level.color} rounded-full flex items-center justify-center`}>
                    <Crown size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-ink">{level.name}</div>
                    <div className="text-sm text-ink/50">
                      成长值≥{level.minGrowth} · 购物{level.discount}折
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  {benefits[level.level as keyof typeof benefits].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ink/70">
                      <Sparkles size={14} className="text-amber-500" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Benefits Dialog */}
      <Dialog open={showBenefits} onOpenChange={setShowBenefits}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Leaf size={18} className="text-willow" />
              全部特权
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {privileges.map((privilege) => {
              const Icon = privilege.icon;
              const hasAccess = privilege.levels.includes(user.memberLevel);
              return (
                <div
                  key={privilege.title}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    hasAccess ? 'bg-willow/10' : 'bg-rice opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    hasAccess ? 'bg-willow' : 'bg-ink/30'
                  }`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-ink">{privilege.title}</div>
                    <div className="text-sm text-ink/50">{privilege.desc}</div>
                  </div>
                  <div className="text-xs text-willow">
                    {privilege.levels.map((l) => memberLevels.find((ml) => ml.level === l)?.name).join('/')}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
