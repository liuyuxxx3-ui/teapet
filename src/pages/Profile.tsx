import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  MapPin,
  Headphones,
  Settings,
  ChevronRight,
  Crown,
  Gift,
  Ticket,
  Star,
  Bell,
  Users,
  Swords,
  Leaf,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const menuItems = [
  { id: 'orders', label: '我的订单', icon: ShoppingBag, path: '/orders' },
  { id: 'favorites', label: '我的收藏', icon: Heart, action: () => toast.success('收藏功能开发中') },
  { id: 'address', label: '收货地址', icon: MapPin, action: () => toast.success('地址功能开发中') },
  { id: 'service', label: '在线客服', icon: Headphones, action: () => toast.success('客服功能开发中') },
  { id: 'settings', label: '设置', icon: Settings, action: () => toast.success('设置功能开发中') },
];

const memberBenefits = [
  { icon: Gift, label: '专属礼包', path: '/member' },
  { icon: Ticket, label: '优惠券', path: '/member' },
  { icon: Star, label: '积分加速', path: '/member' },
  { icon: Crown, label: '专属客服', path: '/member' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { state } = useApp();
  const user = state.user;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink/50 mb-4">请先登录</p>
          <Button className="bg-willow hover:bg-willow-dark">立即登录</Button>
        </div>
      </div>
    );
  }

  const memberLevelNames = {
    normal: '普通会员',
    silver: '银叶会员',
    gold: '金叶会员',
    jade: '玉叶会员',
  };

  const nextLevelGrowth = {
    normal: 1000,
    silver: 5000,
    gold: 10000,
    jade: 20000,
  };

  const currentLevelMax = nextLevelGrowth[user.memberLevel];
  const progress = (user.growthValue / currentLevelMax) * 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Header Background */}
      <div className="relative h-48 bg-gradient-to-br from-willow via-willow-dark to-ink">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/backgrounds/member-card-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* 装饰元素 */}
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-24 h-24 border border-white/10 rounded-full" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/10 rounded-full" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-24 relative z-10 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-willow/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-md">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-willow text-white text-2xl">
                {user.nickname[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-ink">{user.nickname}</h2>
              <div 
                className="flex items-center gap-2 mt-1 cursor-pointer"
                onClick={() => navigate('/member')}
              >
                <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs rounded-full">
                  {memberLevelNames[user.memberLevel]}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/notifications')}
              className="relative p-2 bg-rice rounded-full"
            >
              <Bell size={20} className="text-ink/70" />
              {state.notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {state.notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </motion.button>
          </div>

          {/* Level Progress */}
          <div 
            className="bg-rice rounded-xl p-4 cursor-pointer"
            onClick={() => navigate('/member')}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-ink/70">成长值</span>
              <span className="text-sm text-willow">
                {user.growthValue}/{currentLevelMax}
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="text-xs text-ink/50">
              再获得 {currentLevelMax - user.growthValue} 成长值可升级
            </div>
          </div>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/member')}
          className="mt-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm mb-1">我的积分</div>
              <div className="text-3xl font-bold">{user.points}</div>
            </div>
            <Button
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/member');
              }}
            >
              去兑换
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 grid grid-cols-4 gap-3"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/battle')}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md flex flex-col items-center border border-willow/10"
          >
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mb-2">
              <Swords size={18} className="text-rose-500" />
            </div>
            <span className="text-xs text-ink/70">斗茶</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md flex flex-col items-center border border-willow/10"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <ShoppingBag size={18} className="text-blue-500" />
            </div>
            <span className="text-xs text-ink/70">商城</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/social')}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md flex flex-col items-center border border-willow/10"
          >
            <div className="w-10 h-10 bg-jade/20 rounded-full flex items-center justify-center mb-2">
              <Users size={18} className="text-jade" />
            </div>
            <span className="text-xs text-ink/70">社交</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/customize')}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md flex flex-col items-center border border-willow/10"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Gift size={18} className="text-purple-500" />
            </div>
            <span className="text-xs text-ink/70">定制</span>
          </motion.button>
        </motion.div>

        {/* Member Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-ink flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              会员特权
            </h3>
            <button 
              className="text-sm text-willow flex items-center"
              onClick={() => navigate('/member')}
            >
              全部 <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {memberBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.button
                  key={benefit.label}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2"
                  onClick={() => navigate(benefit.path)}
                >
                  <div className="w-12 h-12 bg-willow/10 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-willow" />
                  </div>
                  <span className="text-xs text-ink/70">{benefit.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-willow/10"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => item.path ? navigate(item.path) : item.action?.()}
                className={`w-full flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-willow/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rice rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-willow" />
                  </div>
                  <span className="text-ink">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-willow" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 grid grid-cols-3 gap-3"
        >
          <div 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-md cursor-pointer border border-willow/10"
            onClick={() => navigate('/archive')}
          >
            <div className="text-2xl font-bold text-willow">{state.teaPets.length}</div>
            <div className="text-xs text-ink/50">我的茶宠</div>
          </div>
          <div 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-md cursor-pointer border border-willow/10"
            onClick={() => navigate('/orders')}
          >
            <div className="text-2xl font-bold text-willow">2</div>
            <div className="text-xs text-ink/50">我的订单</div>
          </div>
          <div 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-md cursor-pointer border border-willow/10"
            onClick={() => navigate('/battle')}
          >
            <div className="text-2xl font-bold text-willow">5</div>
            <div className="text-xs text-ink/50">我的徽章</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
