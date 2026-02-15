import { motion } from 'framer-motion';
import { Bell, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function Header({ title, showBack, onBack, rightAction }: HeaderProps) {
  const { state } = useApp();
  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="flex items-center justify-between h-12 px-4 max-w-lg mx-auto">
        <div className="w-10">
          {showBack && (
            <motion.button
              onClick={onBack}
              className="p-2 -ml-2 text-[#1A1A1A]"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-[#1A1A1A]">{title}</h1>
        <div className="w-10 flex justify-end">
          {rightAction || (
            <motion.button
              className="p-2 -mr-2 text-[#1A1A1A] relative"
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
