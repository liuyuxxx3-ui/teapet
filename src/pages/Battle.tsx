import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, User, Zap, Shield, Sparkles, Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockBattleRecords } from '@/data/teaPets';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

// 模拟对手数据
const mockOpponents = [
  { id: 'opp1', nickname: '茶道高手', avatar: '', teaPetName: '紫金蟾', level: 6, power: 3200 },
  { id: 'opp2', nickname: '品茗雅士', avatar: '', teaPetName: '玉貔貅', level: 4, power: 2800 },
  { id: 'opp3', nickname: '茶韵悠长', avatar: '', teaPetName: '青龙龟', level: 8, power: 4100 },
];

// 模拟排行榜数据
const mockRankings = {
  friends: [
    { rank: 1, nickname: '茶道王者', avatar: '', power: 5800 },
    { rank: 2, nickname: '品茗大师', avatar: '', power: 5200 },
    { rank: 3, nickname: '茶韵仙人', avatar: '', power: 4800 },
    { rank: 4, nickname: '我', avatar: '', power: 3500, isMe: true },
    { rank: 5, nickname: '茶友小白', avatar: '', power: 3200 },
  ],
  region: [
    { rank: 1, nickname: '江南茶圣', avatar: '', power: 8200 },
    { rank: 2, nickname: '紫砂宗师', avatar: '', power: 7600 },
    { rank: 3, nickname: '茶道传人', avatar: '', power: 7100 },
    { rank: 42, nickname: '我', avatar: '', power: 3500, isMe: true },
  ],
};

// 徽章数据
const mockBadgesList = [
  { id: '1', name: '初识茶道', description: '首次绑定茶宠', icon: '🍵', rarity: 'common', obtained: true },
  { id: '2', name: '坚持养护', description: '连续打卡7天', icon: '📅', rarity: 'common', obtained: true },
  { id: '3', name: '紫砂专场', description: '紫砂主题擂台赛参与者', icon: '🏆', rarity: 'rare', obtained: true },
  { id: '4', name: '斗茶新手', description: '首次斗茶PK胜利', icon: '⚔️', rarity: 'common', obtained: true },
  { id: '5', name: '资深茶友', description: '茶宠等级达到5级', icon: '⭐', rarity: 'rare', obtained: true },
  { id: '6', name: '百战百胜', description: '斗茶胜利100次', icon: '👑', rarity: 'epic', obtained: false },
  { id: '7', name: '茶界传奇', description: '战力值达到10000', icon: '💎', rarity: 'legendary', obtained: false },
];

export default function Battle() {
  const { state } = useApp();
  const teaPet = state.currentTeaPet;
  const [showBattleDialog, setShowBattleDialog] = useState(false);
  const [showMatching, setShowMatching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [battleResult, setBattleResult] = useState<'win' | 'lose'>('win');
  const [selectedOpponent, setSelectedOpponent] = useState<typeof mockOpponents[0] | null>(null);
  const [activeRankTab, setActiveRankTab] = useState<'friends' | 'region'>('friends');

  // 计算战力值
  const calculatePower = () => {
    if (!teaPet) return 0;
    return Math.floor(
      teaPet.scores.moisture * 10 +
      teaPet.scores.spirit * 15 +
      teaPet.scores.intimacy * 8 +
      teaPet.level * 100
    );
  };

  const myPower = calculatePower();

  const handleRandomMatch = () => {
    setShowBattleDialog(false);
    setShowMatching(true);
    
    // 模拟匹配过程
    setTimeout(() => {
      const randomOpponent = mockOpponents[Math.floor(Math.random() * mockOpponents.length)];
      setSelectedOpponent(randomOpponent);
      setShowMatching(false);
      setShowResult(true);
      setBattleResult(myPower > randomOpponent.power ? 'win' : 'lose');
    }, 2000);
  };

  const handleFriendMatch = () => {
    toast.success('邀请好友功能开发中，请先使用随机匹配');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gradient-to-br from-gray-400 to-gray-500';
      case 'rare': return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'epic': return 'bg-gradient-to-br from-purple-400 to-purple-600';
      case 'legendary': return 'bg-gradient-to-br from-amber-400 to-orange-500';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header - 战斗场景背景 */}
      <header className="relative h-72 overflow-hidden">
        {/* 战斗场景背景图 */}
        <div className="absolute inset-0">
          <img 
            src="/images/backgrounds/battle-bg.png" 
            alt="斗茶场景" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        </div>
        
        {/* 战力值展示 */}
        <div className="relative z-10 px-4 pt-12">
          <h1 className="text-2xl font-bold text-white text-center mb-4 drop-shadow-lg">斗茶竞技</h1>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/70 text-sm mb-1">我的战力值</div>
                <div className="text-4xl font-bold text-white drop-shadow-lg">{myPower}</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-glow-pulse">
                <Zap size={32} className="text-white" />
              </div>
            </div>
            {teaPet && (
              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <span>出战茶宠: {teaPet.name}</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full">Lv.{teaPet.level}</span>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6 -mt-8 relative z-20">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowBattleDialog(true)}
            className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Swords size={32} className="mb-3 relative z-10" />
            <div className="font-bold text-lg relative z-10">快速匹配</div>
            <div className="text-sm text-white/70 relative z-10">随机匹配对手</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFriendMatch}
            className="bg-gradient-to-br from-willow to-willow-dark rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <User size={32} className="mb-3 relative z-10" />
            <div className="font-bold text-lg relative z-10">好友对战</div>
            <div className="text-sm text-white/70 relative z-10">邀请好友PK</div>
          </motion.button>
        </div>

        {/* Rankings */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-willow/10">
          <div className="border-b border-willow/10">
            <div className="flex">
              <button
                onClick={() => setActiveRankTab('friends')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeRankTab === 'friends' 
                    ? 'text-willow border-b-2 border-willow' 
                    : 'text-ink/50'
                }`}
              >
                好友榜
              </button>
              <button
                onClick={() => setActiveRankTab('region')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeRankTab === 'region' 
                    ? 'text-willow border-b-2 border-willow' 
                    : 'text-ink/50'
                }`}
              >
                地区榜
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-willow/10">
            {mockRankings[activeRankTab].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 ${item.isMe ? 'bg-willow/5' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  item.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                  item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                  item.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                  'bg-rice text-ink'
                }`}>
                  {item.rank}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={item.isMe ? 'bg-willow text-white' : 'bg-willow-light text-ink'}>
                    {item.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className={`font-medium ${item.isMe ? 'text-willow' : 'text-ink'}`}>
                    {item.nickname}
                  </div>
                </div>
                <div className="font-bold text-willow">{item.power}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ink flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              我的徽章
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {mockBadgesList.filter(b => b.obtained).map((badge) => (
              <div key={badge.id} className="flex flex-col items-center">
                <div className={`w-14 h-14 ${getRarityColor(badge.rarity)} rounded-2xl flex items-center justify-center text-2xl mb-1 shadow-md`}>
                  {badge.icon}
                </div>
                <span className="text-xs text-ink/70 text-center truncate w-full">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Battle History */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
            <Flame size={18} className="text-rose-500" />
            对战记录
          </h3>
          <div className="space-y-3">
            {mockBattleRecords.slice(0, 3).map((record) => (
              <div key={record.id} className="flex items-center gap-3 p-3 bg-rice rounded-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  record.result === 'win' ? 'bg-gradient-to-br from-jade to-jade-dark' : 'bg-gradient-to-br from-rose-400 to-rose-600'
                }`}>
                  {record.result === 'win' ? <Trophy size={20} className="text-white" /> : <Shield size={20} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-ink">{record.opponent.nickname}</div>
                  <div className="text-xs text-ink/50">
                    {new Date(record.battleTime).toLocaleDateString()}
                  </div>
                </div>
                <div className={`font-bold ${record.result === 'win' ? 'text-jade' : 'text-rose-500'}`}>
                  {record.result === 'win' ? '胜利' : '失败'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Battle Dialog */}
      <Dialog open={showBattleDialog} onOpenChange={setShowBattleDialog}>
        <DialogContent className="max-w-sm bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-ink">选择对战方式</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button
              onClick={handleRandomMatch}
              className="w-full h-14 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
            >
              <Swords size={20} className="mr-2" />
              随机匹配
            </Button>
            <Button
              onClick={handleFriendMatch}
              variant="outline"
              className="w-full h-14 border-willow text-willow hover:bg-willow/10"
            >
              <User size={20} className="mr-2" />
              邀请好友
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Matching Dialog */}
      <Dialog open={showMatching} onOpenChange={setShowMatching}>
        <DialogContent className="max-w-sm bg-white/95 backdrop-blur-sm">
          <div className="py-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-willow border-t-transparent rounded-full mx-auto mb-4"
            />
            <div className="text-lg font-bold text-ink mb-2">正在匹配对手...</div>
            <div className="text-sm text-ink/50">寻找实力相当的茶友</div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-sm bg-white/95 backdrop-blur-sm">
          <AnimatePresence>
            {selectedOpponent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      battleResult === 'win' ? 'bg-gradient-to-br from-jade to-jade-dark' : 'bg-gradient-to-br from-rose-400 to-rose-600'
                    }`}
                  >
                    {battleResult === 'win' ? (
                      <Trophy size={40} className="text-white" />
                    ) : (
                      <Shield size={40} className="text-white" />
                    )}
                  </motion.div>
                  <div className={`text-2xl font-bold ${battleResult === 'win' ? 'text-jade' : 'text-rose-500'}`}>
                    {battleResult === 'win' ? '胜利！' : '失败'}
                  </div>
                </div>

                {/* Battle Stats */}
                <div className="bg-rice rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-sm text-ink/50 mb-1">我</div>
                      <div className="font-bold text-willow text-xl">{myPower}</div>
                    </div>
                    <div className="text-ink/30 font-bold text-2xl">VS</div>
                    <div className="text-center">
                      <div className="text-sm text-ink/50 mb-1">{selectedOpponent.nickname}</div>
                      <div className="font-bold text-willow text-xl">{selectedOpponent.power}</div>
                    </div>
                  </div>
                </div>

                {battleResult === 'win' && (
                  <div className="text-center text-jade mb-4">
                    <div className="font-bold">+100 积分</div>
                    <div className="text-sm">+50 灵气值</div>
                  </div>
                )}

                <Button
                  onClick={() => setShowResult(false)}
                  className="w-full bg-willow hover:bg-willow-dark"
                >
                  确定
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
