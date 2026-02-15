import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Gift, Calendar, AlertCircle, Check, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const notificationTypes = {
  activity: { label: '活动', icon: Calendar, color: 'bg-willow' },
  welfare: { label: '福利', icon: Gift, color: 'bg-amber-500' },
  reminder: { label: '提醒', icon: Bell, color: 'bg-jade' },
  system: { label: '系统', icon: AlertCircle, color: 'bg-ink' },
};

export default function Notifications() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const notifications = state.notifications;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const typeUnreadCount = (type: string) => notifications.filter((n) => n.type === type && !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach((n) => {
      if (!n.isRead) {
        dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id });
      }
    });
    toast.success('已全部标记为已读');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Leaf size={18} />
            消息通知 {unreadCount > 0 && <span className="text-amber-300">({unreadCount})</span>}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check size={16} className="mr-1" />
              全部已读
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-willow/10">
        <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors relative ${
              activeTab === 'all'
                ? 'bg-willow text-white'
                : 'bg-rice text-ink/70'
            }`}
          >
            全部
            {unreadCount > 0 && activeTab !== 'all' && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {Object.entries(notificationTypes).map(([type, config]) => {
            const Icon = config.icon;
            const count = typeUnreadCount(type);
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors relative flex items-center gap-1 ${
                  activeTab === type
                    ? 'bg-willow text-white'
                    : 'bg-rice text-ink/70'
                }`}
              >
                <Icon size={14} />
                {config.label}
                {count > 0 && activeTab !== type && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification List */}
      <div className="p-4 max-w-lg mx-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell size={64} className="text-ink/30 mb-4" />
            <p className="text-ink/50">暂无消息</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const typeInfo = notificationTypes[notification.type];
              const Icon = typeInfo.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm flex items-start gap-3 border ${
                    !notification.isRead ? 'border-l-4 border-l-willow border-willow/10' : 'border-willow/10'
                  }`}
                >
                  <div className={`w-10 h-10 ${typeInfo.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-xs text-ink/50">
                        {new Date(notification.createTime).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm text-ink mb-1">{notification.title}</h4>
                    <p className="text-sm text-ink/60">{notification.content}</p>
                  </div>
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-willow"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check size={14} className="mr-1" />
                      已读
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
