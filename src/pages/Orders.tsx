import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ShoppingBag, Leaf } from 'lucide-react';
import { mockOrders } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const orderTabs = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待付款' },
  { id: 'paid', label: '待发货' },
  { id: 'shipped', label: '待收货' },
  { id: 'completed', label: '已完成' },
];

const statusMap = {
  pending: { label: '待付款', color: 'bg-amber-500', icon: Clock },
  paid: { label: '待发货', color: 'bg-blue-500', icon: Package },
  shipped: { label: '待收货', color: 'bg-purple-500', icon: Truck },
  received: { label: '已收货', color: 'bg-jade', icon: CheckCircle },
  completed: { label: '已完成', color: 'bg-jade', icon: CheckCircle },
  cancelled: { label: '已取消', color: 'bg-gray-500', icon: Clock },
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const handlePay = (_orderId: string) => {
    toast.success('支付成功！');
  };

  const handleConfirmReceive = (_orderId: string) => {
    toast.success('确认收货成功！');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-willow to-willow-dark text-white">
        <div className="flex items-center justify-center h-14 px-4 max-w-lg mx-auto">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Leaf size={18} />
            我的订单
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-willow/10">
        <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide max-w-lg mx-auto">
          {orderTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-willow text-white'
                  : 'bg-rice text-ink/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="p-4 max-w-lg mx-auto">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="text-ink/30 mb-4" />
            <p className="text-ink/50 mb-4">暂无订单</p>
            <Button className="bg-willow hover:bg-willow-dark">去逛逛</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const status = statusMap[order.status];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-willow/10"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-ink/50">{order.id}</span>
                      <span className="text-xs text-ink/40">
                        {new Date(order.createTime).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge className={`${status.color} text-white`}>
                      <StatusIcon size={12} className="mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Products */}
                  <div className="space-y-3 mb-4">
                    {order.products.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover bg-rice"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-ink text-sm line-clamp-1">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-ink/50">x{item.quantity}</div>
                        </div>
                        <div className="font-bold text-willow">¥{item.price}</div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-willow/10">
                    <div>
                      <span className="text-sm text-ink/50">共{order.products.reduce((sum, p) => sum + p.quantity, 0)}件</span>
                      <span className="ml-3 text-ink">
                        合计: <span className="text-lg font-bold text-willow">¥{order.totalAmount}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-willow text-willow hover:bg-willow/10"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetail(true);
                        }}
                      >
                        查看详情
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          className="bg-willow hover:bg-willow-dark"
                          onClick={() => handlePay(order.id)}
                        >
                          立即支付
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          size="sm"
                          className="bg-jade hover:bg-jade-dark"
                          onClick={() => handleConfirmReceive(order.id)}
                        >
                          确认收货
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Leaf size={18} className="text-willow" />
                  订单详情
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Status */}
                <div className="bg-rice rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const StatusIcon = statusMap[selectedOrder.status].icon;
                      return (
                        <div className={`w-12 h-12 ${statusMap[selectedOrder.status].color} rounded-full flex items-center justify-center`}>
                          <StatusIcon size={24} className="text-white" />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="font-bold text-ink">{statusMap[selectedOrder.status].label}</div>
                      <div className="text-sm text-ink/50">订单号: {selectedOrder.id}</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="border border-willow/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-willow/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package size={18} className="text-willow" />
                    </div>
                    <div>
                      <div className="font-medium text-ink">
                        {selectedOrder.address.name} {selectedOrder.address.phone}
                      </div>
                      <div className="text-sm text-ink/50">
                        {selectedOrder.address.province} {selectedOrder.address.city} {selectedOrder.address.district}
                      </div>
                      <div className="text-sm text-ink/50">{selectedOrder.address.detail}</div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="border border-willow/20 rounded-xl p-4">
                  <div className="space-y-3">
                    {selectedOrder.products.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover bg-rice"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-ink">{item.product.name}</div>
                          <div className="text-sm text-ink/50">x{item.quantity}</div>
                        </div>
                        <div className="font-bold text-willow">¥{item.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-willow/10 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-ink/50">商品总价</span>
                      <span>¥{selectedOrder.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink/50">运费</span>
                      <span>¥0</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>实付款</span>
                      <span className="text-willow">¥{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border border-willow/20 rounded-xl p-4">
                  <h4 className="font-medium text-ink mb-3">订单状态</h4>
                  <div className="space-y-3">
                    {selectedOrder.createTime && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-willow rounded-full" />
                        <div className="flex-1">
                          <div className="text-sm text-ink">订单创建</div>
                          <div className="text-xs text-ink/50">
                            {new Date(selectedOrder.createTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedOrder.payTime && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-willow rounded-full" />
                        <div className="flex-1">
                          <div className="text-sm text-ink">支付成功</div>
                          <div className="text-xs text-ink/50">
                            {new Date(selectedOrder.payTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedOrder.shipTime && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-willow rounded-full" />
                        <div className="flex-1">
                          <div className="text-sm text-ink">已发货</div>
                          <div className="text-xs text-ink/50">
                            {new Date(selectedOrder.shipTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
