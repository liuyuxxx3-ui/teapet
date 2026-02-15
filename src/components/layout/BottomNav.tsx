import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Archive, Sprout, Users, User } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: '首页', icon: Home, path: '/home' },
  { id: 'archive', label: '档案', icon: Archive, path: '/archive' },
  { id: 'cultivation', label: '养成', icon: Sprout, path: '/cultivation' },
  { id: 'social', label: '社交', icon: Users, path: '/social' },
  { id: 'profile', label: '我的', icon: User, path: '/profile' },
];

export default function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navigate = useNavigate();

  const handleClick = (item: typeof navItems[0]) => {
    onPageChange(item.id);
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-willow/10 pb-safe z-50">
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center justify-center w-16 h-full relative ${
                isActive ? 'text-willow' : 'text-ink/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-8 h-1 bg-willow rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="mb-1"
              />
              <span className="text-[11px] font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
