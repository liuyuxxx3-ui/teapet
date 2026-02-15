import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Camera, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

interface CheckInButtonProps {
  teaPetId: string;
  hasCheckedIn: boolean;
}

export default function CheckInButton({ teaPetId, hasCheckedIn }: CheckInButtonProps) {
  const { dispatch } = useApp();
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckIn = async () => {
    if (hasCheckedIn || isCheckingIn) return;
    
    setIsCheckingIn(true);
    
    // 模拟打卡过程
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    dispatch({ type: 'CHECK_IN', payload: teaPetId });
    setIsCheckingIn(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={!hasCheckedIn ? { scale: 1.02 } : {}}
        whileTap={!hasCheckedIn ? { scale: 0.98 } : {}}
      >
        <Button
          onClick={handleCheckIn}
          disabled={hasCheckedIn || isCheckingIn}
          className={`w-full h-14 text-lg font-semibold rounded-xl transition-all ${
            hasCheckedIn
              ? 'bg-jade hover:bg-jade cursor-default'
              : 'bg-gradient-to-r from-willow to-willow-dark hover:from-willow-dark hover:to-ink'
          }`}
        >
          {isCheckingIn ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          ) : hasCheckedIn ? (
            <>
              <Check size={24} className="mr-2" />
              今日已打卡
            </>
          ) : (
            <>
              <Camera size={24} className="mr-2" />
              今日打卡养护
            </>
          )}
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-jade text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg flex items-center gap-2"
          >
            <Leaf size={14} />
            打卡成功！+50积分
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
