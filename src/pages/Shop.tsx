import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, X, Star, Trash2, Leaf } from 'lucide-react';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

const categories = [
  { id: 'all', label: '全部' },
  { id: 'tea-pet', label: '茶宠' },
  { id: 'teapot', label: '茶具' },
  { id: 'tea', label: '茶叶' },
  { id: 'tool', label: '工具' },
  { id: 'accessory', label: '配件' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`已添加 ${product.name} 到购物车`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('购物车为空');
      return;
    }
    toast.success('订单提交成功！');
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <Input
                placeholder="搜索茶宠、茶具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/50"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCart(true)}
              className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ShoppingCart size={20} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-willow'
                  : 'bg-white/20 text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Product Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedProduct(product);
                setShowProductDetail(true);
              }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md cursor-pointer border border-willow/10"
            >
              <div className="aspect-square bg-rice relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isHot && (
                  <Badge className="absolute top-2 left-2 bg-rose-500">热卖</Badge>
                )}
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-jade">新品</Badge>
                )}
                {product.can3D && (
                  <Badge className="absolute top-2 right-2 bg-purple-500">3D</Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-ink text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-ink/50">{product.rating}</span>
                  <span className="text-xs text-ink/50">已售{product.sales}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-lg font-bold text-willow">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-ink/40 line-through ml-1">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-8 h-8 bg-willow rounded-full flex items-center justify-center"
                  >
                    <Plus size={18} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={showProductDetail} onOpenChange={setShowProductDetail}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 bg-white/95 backdrop-blur-sm">
          {selectedProduct && (
            <>
              <div className="aspect-square bg-rice">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-ink">{selectedProduct.name}</h2>
                  {selectedProduct.can3D && (
                    <Badge className="bg-purple-500">支持3D预览</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-ink/70">{selectedProduct.rating}</span>
                  <span className="text-ink/50">({selectedProduct.reviews}条评价)</span>
                  <span className="text-ink/50">已售{selectedProduct.sales}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-willow">¥{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-ink/40 line-through">
                      ¥{selectedProduct.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-ink/70 mb-6">{selectedProduct.description}</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 border-willow text-willow hover:bg-willow/10"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setShowProductDetail(false);
                    }}
                  >
                    加入购物车
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-willow hover:bg-willow-dark"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setShowProductDetail(false);
                      setShowCart(true);
                    }}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Leaf size={18} className="text-willow" />
                购物车 ({cartCount})
              </span>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-sm text-rose-500 flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  清空
                </button>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="text-ink/30 mx-auto mb-4" />
                <p className="text-ink/50">购物车是空的</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-3 bg-rice rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-ink text-sm">{item.product.name}</h4>
                      <div className="text-willow font-bold">¥{item.product.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-rose-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-willow/10 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-ink/70">合计</span>
                    <span className="text-2xl font-bold text-willow">¥{cartTotal}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full h-12 bg-willow hover:bg-willow-dark"
                  >
                    结算
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
