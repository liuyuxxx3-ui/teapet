import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Plus, Users, Image as ImageIcon, X, Send, Leaf } from 'lucide-react';
import { mockSocialPosts } from '@/data/products';
import type { SocialPost } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function PostCard({ post, index, onLike }: { post: SocialPost; index: number; onLike: (id: string) => void }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    toast.success('评论发布成功！');
    setComment('');
  };

  const handleShare = () => {
    toast.success('分享成功！');
  };

  const handleBookmark = () => {
    toast.success('收藏成功！');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-willow/10"
    >
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-willow text-white">
            {post.author.nickname[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-medium text-ink">{post.author.nickname}</div>
          <div className="text-xs text-ink/50">
            {new Date(post.createTime).toLocaleString()}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-willow">
          关注
        </Button>
      </div>

      {/* Content */}
      <p className="text-ink/70 mb-3 whitespace-pre-wrap">{post.content}</p>

      {/* Images */}
      {post.images.length > 0 && (
        <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((image, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-rice">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-willow bg-willow/10 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-willow/10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center gap-1.5 ${isLiked ? 'text-rose-500' : 'text-ink/50'}`}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm">{likes}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-ink/50"
        >
          <MessageCircle size={18} />
          <span className="text-sm">{post.comments}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="flex items-center gap-1.5 text-ink/50"
        >
          <Share2 size={18} />
          <span className="text-sm">{post.shares}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBookmark}
          className="text-ink/50"
        >
          <Bookmark size={18} />
        </motion.button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-willow/10 mt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="写下你的评论..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleComment} className="bg-willow hover:bg-willow-dark">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Social() {
  const [activeTab, setActiveTab] = useState('recommend');
  const [showPublish, setShowPublish] = useState(false);
  const [publishContent, setPublishContent] = useState('');
  const [publishImages, setPublishImages] = useState<string[]>([]);
  const [posts, setPosts] = useState(mockSocialPosts);

  const handlePublish = () => {
    if (!publishContent.trim() && publishImages.length === 0) {
      toast.error('请填写内容或上传图片');
      return;
    }
    
    const newPost: SocialPost = {
      id: `new_${Date.now()}`,
      author: {
        id: 'user1',
        nickname: '茶友小白',
        avatar: '',
      },
      content: publishContent,
      images: publishImages,
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      createTime: new Date().toISOString(),
    };
    
    setPosts([newPost, ...posts]);
    setPublishContent('');
    setPublishImages([]);
    setShowPublish(false);
    toast.success('发布成功！');
  };

  const handleLike = (_id: string) => {
    // 处理点赞逻辑
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-center h-14 px-4 max-w-lg mx-auto">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Leaf size={18} />
            茶友广场
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-willow/10">
        <div className="flex max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'recommend' 
                ? 'text-willow border-b-2 border-willow' 
                : 'text-ink/50'
            }`}
          >
            推荐
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'following' 
                ? 'text-willow border-b-2 border-willow' 
                : 'text-ink/50'
            }`}
          >
            关注
          </button>
          <button
            onClick={() => setActiveTab('coop')}
            className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'coop' 
                ? 'text-willow border-b-2 border-willow' 
                : 'text-ink/50'
            }`}
          >
            <Users size={14} />
            合养
          </button>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {activeTab === 'recommend' && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} onLike={handleLike} />
            ))}
          </div>
        )}

        {activeTab === 'following' && (
          <div className="flex flex-col items-center justify-center py-20">
            <Users size={48} className="text-ink/30 mb-4" />
            <p className="text-ink/50">关注茶友，查看他们的动态</p>
          </div>
        )}

        {activeTab === 'coop' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-willow/10 flex items-center justify-center mb-4">
              <Users size={40} className="text-willow" />
            </div>
            <h3 className="font-semibold text-ink mb-2">双人合养模式</h3>
            <p className="text-sm text-ink/50 text-center mb-4">
              邀请好友一起合养茶宠，共同积累亲密度，解锁专属皮肤
            </p>
            <Button 
              className="bg-willow hover:bg-willow-dark"
              onClick={() => toast.success('邀请功能开发中')}
            >
              邀请好友
            </Button>
          </div>
        )}
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-willow rounded-full flex items-center justify-center shadow-lg z-40"
        onClick={() => setShowPublish(true)}
      >
        <Plus size={24} className="text-white" />
      </motion.button>

      {/* Publish Dialog */}
      <Dialog open={showPublish} onOpenChange={setShowPublish}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Leaf size={18} className="text-willow" />
              发布动态
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="分享你的茶宠养护心得..."
              value={publishContent}
              onChange={(e) => setPublishContent(e.target.value)}
              className="min-h-[120px]"
            />
            
            {/* Image Preview */}
            {publishImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {publishImages.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-rice relative">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPublishImages(publishImages.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Image Button */}
            <button
              onClick={() => {
                setPublishImages([...publishImages, '/images/tea-pets/golden-toad.png']);
              }}
              className="w-full h-20 border-2 border-dashed border-willow/30 rounded-xl flex flex-col items-center justify-center text-ink/50 hover:border-willow hover:text-willow transition-colors"
            >
              <ImageIcon size={24} className="mb-1" />
              <span className="text-sm">添加图片</span>
            </button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-willow text-willow hover:bg-willow/10"
                onClick={() => setShowPublish(false)}
              >
                取消
              </Button>
              <Button
                className="flex-1 bg-willow hover:bg-willow-dark"
                onClick={handlePublish}
              >
                发布
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
