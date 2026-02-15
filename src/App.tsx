import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from '@/context/AppContext';
import BottomNav from '@/components/layout/BottomNav';
import Home from '@/pages/Home';
import Archive from '@/pages/Archive';
import Cultivation from '@/pages/Cultivation';
import Social from '@/pages/Social';
import Profile from '@/pages/Profile';
import Battle from '@/pages/Battle';
import Shop from '@/pages/Shop';
import Member from '@/pages/Member';
import Customize from '@/pages/Customize';
import Orders from '@/pages/Orders';
import Notifications from '@/pages/Notifications';
import { Toaster } from '@/components/ui/sonner';

// 页面切换动画
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// 带动画的页面包装器
function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

// 主导航页面
function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 根据当前路径确定底部导航选中的页面
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/archive') return 'archive';
    if (path === '/cultivation') return 'cultivation';
    if (path === '/social') return 'social';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const handlePageChange = (page: string) => {
    navigate(`/${page}`);
  };

  // 这些页面显示底部导航
  const showBottomNav = ['/', '/home', '/archive', '/cultivation', '/social', '/profile'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F5F0E8] max-w-lg mx-auto relative">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/archive" element={<AnimatedPage><Archive /></AnimatedPage>} />
          <Route path="/cultivation" element={<AnimatedPage><Cultivation /></AnimatedPage>} />
          <Route path="/social" element={<AnimatedPage><Social /></AnimatedPage>} />
          <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
          <Route path="/battle" element={<AnimatedPage><Battle /></AnimatedPage>} />
          <Route path="/shop" element={<AnimatedPage><Shop /></AnimatedPage>} />
          <Route path="/member" element={<AnimatedPage><Member /></AnimatedPage>} />
          <Route path="/customize" element={<AnimatedPage><Customize /></AnimatedPage>} />
          <Route path="/orders" element={<AnimatedPage><Orders /></AnimatedPage>} />
          <Route path="/notifications" element={<AnimatedPage><Notifications /></AnimatedPage>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {showBottomNav && <BottomNav currentPage={getCurrentPage()} onPageChange={handlePageChange} />}
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
