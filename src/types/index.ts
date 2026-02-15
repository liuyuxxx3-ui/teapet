// 用户类型
export interface User {
  id: string;
  nickname: string;
  avatar: string;
  memberLevel: MemberLevel;
  points: number;
  growthValue: number;
}

export type MemberLevel = 'normal' | 'silver' | 'gold' | 'jade';

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  phone?: string;
  address?: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

// 茶宠类型
export interface TeaPet {
  id: string;
  name: string;
  type: TeaPetType;
  material: string;
  level: number;
  maxLevel: number;
  experience: number;
  maxExperience: number;
  image: string;
  bindDate: string;
  description?: string;
  customText?: string;
  scores: {
    moisture: number;
    spirit: number;
    intimacy: number;
  };
  checkInStreak: number;
  lastCheckIn?: string;
}

export type TeaPetType = 'golden-toad' | 'pixiu' | 'dragon-turtle' | 'mile-fo' | 'custom';

// 商品类型
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  sales: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isHot?: boolean;
  can3D?: boolean;
}

export type ProductCategory = 'tea-pet' | 'teapot' | 'tea' | 'tool' | 'accessory';

// 社交内容类型
export interface SocialPost {
  id: string;
  author: {
    id: string;
    nickname: string;
    avatar: string;
  };
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createTime: string;
}

// 订单类型
export interface Order {
  id: string;
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  createTime: string;
  payTime?: string;
  shipTime?: string;
  receiveTime?: string;
  address: Address;
  logistics?: Logistics;
}

export interface OrderProduct {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'received' | 'completed' | 'cancelled';

export interface Logistics {
  company: string;
  trackingNo: string;
  traces: LogisticsTrace[];
}

export interface LogisticsTrace {
  time: string;
  content: string;
}

// 徽章类型
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  obtainedAt?: string;
}

// 对战记录类型
export interface BattleRecord {
  id: string;
  opponent: {
    id: string;
    nickname: string;
    avatar: string;
    teaPet: TeaPet;
  };
  result: 'win' | 'lose' | 'draw';
  myScore: number;
  opponentScore: number;
  battleTime: string;
  theme?: string;
}

// 通知类型
export interface Notification {
  id: string;
  type: 'activity' | 'welfare' | 'reminder' | 'system';
  title: string;
  content: string;
  createTime: string;
  isRead: boolean;
}
