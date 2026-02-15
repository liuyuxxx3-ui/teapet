import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, Box, Palette, Swords, Bell, ChevronRight, ShoppingBag, Crown, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockBattleRecords } from '@/data/teaPets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const quickActions = [
  { id: 'scan', label: '扫码绑定', icon: QrCode, color: 'bg-gradient-willow', action: 'scan' },
  { id: '3d', label: '3D展示', icon: Box, color: 'bg-gradient-jade', action: 'archive' },
  { id: 'custom', label: '定制设计', icon: Palette, color: 'bg-gradient-to-br from-amber-400 to-orange-500', action: 'customize' },
  { id: 'battle', label: '斗茶PK', icon: Swords, color: 'bg-gradient-to-br from-rose-400 to-red-500', action: 'battle' },
];

const notificationTypes = {
  activity: { label: '活动', color: 'bg-willow' },
  welfare: { label: '福利', color: 'bg-amber-500' },
  reminder: { label: '提醒', color: 'bg-jade' },
  system: { label: '系统', color: 'bg-ink' },
};

export default function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const user = state.user;
  const unreadCount = state.notifications.filter((n) => !n.isRead).length;
  const recentNotifications = state.notifications.slice(0, 3);

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'scan':
        toast.success('扫码功能需要摄像头权限，请在微信中打开');
        break;
      case 'archive':
        navigate('/archive');
        break;
      case 'customize':
        navigate('/customize');
        break;
      case 'battle':
        navigate('/battle');
        break;
      default:
        break;
    }
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const handleViewAllTeaPets = () => {
    navigate('/archive');
  };

  const handleViewTeaPetDetail = () => {
    if (state.currentTeaPet) {
      navigate('/archive');
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header - 古风渐变 */}
      <header className="bg-gradient-to-br from-willow via-willow-dark to-ink text-white px-4 pt-12 pb-8 rounded-b-[32px] relative overflow-hidden">
        {/* 装饰性柳叶背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border border-white/20 rounded-full" />
          <Leaf className="absolute top-16 right-16 w-8 h-8 text-white/20 rotate-45" />
          <Leaf className="absolute bottom-16 left-16 w-6 h-6 text-white/20 -rotate-12" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 border-2 border-white/30 shadow-lg">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-willow text-white text-lg">
                  {user?.nickname?.[0] || '茶'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{user?.nickname || '茶友'}</h2>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="bg-white/20 text-white border-0 text-xs cursor-pointer hover:bg-white/30"
                    onClick={() => navigate('/member')}
                  >
                    <Crown size={10} className="mr-1" />
                    {user?.memberLevel === 'silver' ? '银叶会员' : user?.memberLevel === 'gold' ? '金叶会员' : user?.memberLevel === 'jade' ? '玉叶会员' : '普通会员'}
                  </Badge>
                  <span 
                    className="text-xs text-white/70 cursor-pointer"
                    onClick={() => navigate('/member')}
                  >
                    {user?.points} 积分
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              className="relative p-2 bg-white/10 rounded-full backdrop-blur-sm"
              whileTap={{ scale: 0.9 }}
              onClick={handleViewAllNotifications}
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick(action.action)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Notifications */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-ink flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              消息通知
            </h3>
            <button 
              className="text-sm text-willow flex items-center hover:text-willow-dark"
              onClick={handleViewAllNotifications}
            >
              全部 <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {recentNotifications.map((notification, index) => {
              const typeInfo = notificationTypes[notification.type];
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMarkNotificationRead(notification.id)}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm flex items-center gap-3 cursor-pointer border border-willow/10 ${
                    !notification.isRead ? 'border-l-4 border-l-willow' : ''
                  }`}
                >
                  <div className={`w-10 h-10 ${typeInfo.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-xs text-ink/50">
                        {new Date(notification.createTime).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm text-ink truncate mt-1">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-ink/60 truncate">{notification.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Current Tea Pet */}
        {state.currentTeaPet && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink flex items-center gap-2">
                <Leaf size={16} className="text-willow" />
                我的茶宠
              </h3>
              <button 
                className="text-sm text-willow flex items-center hover:text-willow-dark"
                onClick={handleViewAllTeaPets}
              >
                查看全部 <ChevronRight size={16} />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleViewTeaPetDetail}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md cursor-pointer border border-willow/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-rice to-rice-dark shadow-inner">
                  <img
                    src={state.currentTeaPet.image}
                    alt={state.currentTeaPet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-ink">{state.currentTeaPet.name}</h4>
                    <Badge className="bg-willow text-white">Lv.{state.currentTeaPet.level}</Badge>
                  </div>
                  <p className="text-sm text-ink/60 mb-2">{state.currentTeaPet.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-ink/70">
                      润泽度 <span className="text-willow font-medium">{state.currentTeaPet.scores.moisture}</span>
                    </span>
                    <span className="text-ink/70">
                      灵气值 <span className="text-jade font-medium">{state.currentTeaPet.scores.spirit}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleViewAllTeaPets}
            className="bg-gradient-to-br from-willow to-willow-dark rounded-xl p-4 text-white cursor-pointer shadow-lg"
          >
            <div className="text-2xl font-bold">{state.teaPets.length}</div>
            <div className="text-sm text-white/80">我的茶宠</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/cultivation')}
            className="bg-gradient-to-br from-jade to-jade-dark rounded-xl p-4 text-white cursor-pointer shadow-lg"
          >
            <div className="text-2xl font-bold">{state.currentTeaPet?.checkInStreak || 0}</div>
            <div className="text-sm text-white/80">连续打卡</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/battle')}
            className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl p-4 text-white cursor-pointer shadow-lg"
          >
            <div className="text-2xl font-bold">{mockBattleRecords.filter(r => r.result === 'win').length}</div>
            <div className="text-sm text-white/80">斗茶胜利</div>
          </motion.div>
        </section>

        {/* Shop Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate('/shop')}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md cursor-pointer flex items-center justify-between border border-willow/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-willow rounded-xl flex items-center justify-center shadow-md">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-ink">茶宠商城</h4>
              <p className="text-sm text-ink/60">精选茶宠、茶具、茶叶</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-willow" />
        </motion.div>
      </div>
    </div>
  );
}
