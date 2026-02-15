import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, RotateCw, Save, ShoppingCart, Eye, ChevronRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const materials = [
  { id: 'zisha', name: '紫砂', color: '#8B4513', price: 0 },
  { id: 'jade', name: '翡翠', color: '#00A86B', price: 50 },
  { id: 'ceramic', name: '陶瓷', color: '#E8E8E8', price: 20 },
  { id: 'resin', name: '树脂', color: '#D4A574', price: -30 },
];

const accessories = [
  { id: 'none', name: '无', price: 0 },
  { id: 'pendant', name: '挂坠', price: 38 },
  { id: 'base', name: '底座', price: 58 },
  { id: 'both', name: '挂坠+底座', price: 88 },
];

const presets = [
  { id: 'golden-toad', name: '金蟾', image: '/images/tea-pets/golden-toad.png' },
  { id: 'pixiu', name: '貔貅', image: '/images/tea-pets/pixiu.png' },
  { id: 'dragon-turtle', name: '龙龟', image: '/images/tea-pets/dragon-turtle.png' },
  { id: 'mile-fo', name: '弥勒佛', image: '/images/tea-pets/mile-fo.png' },
];

export default function Customize() {
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);
  const [customText, setCustomText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [rotation, setRotation] = useState(0);

  const basePrice = 168;
  const totalPrice = basePrice + selectedMaterial.price + selectedAccessory.price;

  const handleSave = () => {
    toast.success('设计方案已保存！');
  };

  const handleAddToCart = () => {
    toast.success('已添加到购物车！');
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-center h-14 px-4 max-w-lg mx-auto">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Palette size={18} />
            定制设计工坊
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* 3D Preview */}
        <div className="relative bg-gradient-to-br from-rice to-rice-dark p-6">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-willow/10 relative">
            <motion.img
              src={selectedPreset.image}
              alt={selectedPreset.name}
              className="w-full h-full object-cover"
              animate={{ rotate: rotation }}
              transition={{ duration: 0.5 }}
            />
            {customText && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-willow/80 text-white px-4 py-2 rounded-lg text-lg font-bold backdrop-blur-sm">
                {customText}
              </div>
            )}
          </div>
          
          {/* Preview Controls */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRotate}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md"
            >
              <RotateCw size={18} className="text-ink" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPreview(true)}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md"
            >
              <Eye size={18} className="text-ink" />
            </motion.button>
          </div>
        </div>

        {/* Customization Options */}
        <div className="p-4 space-y-6">
          {/* Base Model */}
          <div>
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              选择基础形象
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {presets.map((preset) => (
                <motion.button
                  key={preset.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPreset(preset)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${
                    selectedPreset.id === preset.id ? 'border-willow' : 'border-transparent'
                  }`}
                >
                  <img src={preset.image} alt={preset.name} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              选择材质
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMaterial(material)}
                  className={`p-4 rounded-xl border-2 text-center ${
                    selectedMaterial.id === material.id
                      ? 'border-willow bg-willow/10'
                      : 'border-willow/20'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2 border border-willow/20"
                    style={{ backgroundColor: material.color }}
                  />
                  <div className="text-sm font-medium text-ink">{material.name}</div>
                  <div className="text-xs text-ink/50">
                    {material.price > 0 ? `+¥${material.price}` : material.price < 0 ? `-¥${Math.abs(material.price)}` : '基础'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              选择配饰
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {accessories.map((accessory) => (
                <motion.button
                  key={accessory.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAccessory(accessory)}
                  className={`p-4 rounded-xl border-2 text-center ${
                    selectedAccessory.id === accessory.id
                      ? 'border-willow bg-willow/10'
                      : 'border-willow/20'
                  }`}
                >
                  <div className="text-sm font-medium text-ink">{accessory.name}</div>
                  <div className="text-xs text-ink/50">
                    {accessory.price > 0 ? `+¥${accessory.price}` : '免费'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Text */}
          <div>
            <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
              <Leaf size={16} className="text-willow" />
              定制刻字
            </h3>
            <Input
              placeholder="输入刻字内容（最多6个字）"
              value={customText}
              onChange={(e) => setCustomText(e.target.value.slice(0, 6))}
              className="h-12 border-willow/20"
            />
          </div>

          {/* Price & Actions */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-ink/50">定制总价</div>
                <div className="text-3xl font-bold text-willow">¥{totalPrice}</div>
              </div>
              <div className="text-right text-sm text-ink/50">
                <div>基础 ¥{basePrice}</div>
                {selectedMaterial.price !== 0 && (
                  <div>材质 {selectedMaterial.price > 0 ? '+' : ''}¥{selectedMaterial.price}</div>
                )}
                {selectedAccessory.price !== 0 && (
                  <div>配饰 +¥{selectedAccessory.price}</div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-willow text-willow hover:bg-willow/10"
                onClick={handleSave}
              >
                <Save size={18} className="mr-2" />
                保存方案
              </Button>
              <Button
                className="flex-1 h-12 bg-willow hover:bg-willow-dark"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                加入购物车
              </Button>
            </div>
          </div>

          {/* Saved Designs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-ink flex items-center gap-2">
                <Leaf size={16} className="text-willow" />
                我的设计方案
              </h3>
              <button className="text-sm text-willow flex items-center">
                全部 <ChevronRight size={16} />
              </button>
            </div>
            <div className="text-center py-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-willow/10">
              <Palette size={48} className="text-ink/30 mx-auto mb-3" />
              <p className="text-ink/50">暂无保存的设计方案</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg p-0 bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center py-4 text-ink flex items-center justify-center gap-2">
              <Leaf size={18} className="text-willow" />
              设计预览
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-square bg-gradient-to-br from-rice to-rice-dark p-8">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg border border-willow/10 relative">
              <img
                src={selectedPreset.image}
                alt={selectedPreset.name}
                className="w-full h-full object-cover"
              />
              {customText && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-willow/80 text-white px-4 py-2 rounded-lg text-lg font-bold backdrop-blur-sm">
                  {customText}
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/50">基础形象</span>
                <span className="text-ink">{selectedPreset.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">材质</span>
                <span className="text-ink">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">配饰</span>
                <span className="text-ink">{selectedAccessory.name}</span>
              </div>
              {customText && (
                <div className="flex justify-between">
                  <span className="text-ink/50">刻字</span>
                  <span className="text-ink">{customText}</span>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-willow/10">
              <div className="flex items-center justify-between">
                <span className="text-ink/70">总价</span>
                <span className="text-2xl font-bold text-willow">¥{totalPrice}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
