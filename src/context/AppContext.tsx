import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User, TeaPet, Notification } from '@/types';
import { mockTeaPets } from '@/data/teaPets';
import { mockNotifications } from '@/data/products';

interface AppState {
  user: User | null;
  teaPets: TeaPet[];
  currentTeaPet: TeaPet | null;
  notifications: Notification[];
  isLoading: boolean;
  cart: { productId: string; quantity: number }[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TEA_PETS'; payload: TeaPet[] }
  | { type: 'SET_CURRENT_TEA_PET'; payload: TeaPet | null }
  | { type: 'UPDATE_TEA_PET'; payload: TeaPet }
  | { type: 'ADD_TEA_PET'; payload: TeaPet }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CHECK_IN'; payload: string }
  | { type: 'UPDATE_SCORES'; payload: { id: string; scores: { moisture?: number; spirit?: number; intimacy?: number } } }
  | { type: 'ADD_TO_CART'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_USER_POINTS'; payload: number }
  | { type: 'UPDATE_USER_GROWTH'; payload: number };

const initialState: AppState = {
  user: {
    id: 'user1',
    nickname: '茶友小白',
    avatar: '',
    memberLevel: 'silver',
    points: 2580,
    growthValue: 3500,
  },
  teaPets: mockTeaPets,
  currentTeaPet: mockTeaPets[0],
  notifications: mockNotifications,
  isLoading: false,
  cart: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TEA_PETS':
      return { ...state, teaPets: action.payload };
    case 'SET_CURRENT_TEA_PET':
      return { ...state, currentTeaPet: action.payload };
    case 'UPDATE_TEA_PET':
      return {
        ...state,
        teaPets: state.teaPets.map((tp) =>
          tp.id === action.payload.id ? action.payload : tp
        ),
        currentTeaPet:
          state.currentTeaPet?.id === action.payload.id
            ? action.payload
            : state.currentTeaPet,
      };
    case 'ADD_TEA_PET':
      return {
        ...state,
        teaPets: [...state.teaPets, action.payload],
      };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'CHECK_IN':
      const teaPet = state.teaPets.find((tp) => tp.id === action.payload);
      if (!teaPet) return state;
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = teaPet.lastCheckIn === yesterday;
      const updatedTeaPet: TeaPet = {
        ...teaPet,
        lastCheckIn: today,
        checkInStreak: isConsecutive ? teaPet.checkInStreak + 1 : 1,
        scores: {
          ...teaPet.scores,
          moisture: Math.min(100, teaPet.scores.moisture + 5),
          spirit: Math.min(100, teaPet.scores.spirit + 3),
        },
        experience: teaPet.experience + 100,
      };
      if (updatedTeaPet.experience >= updatedTeaPet.maxExperience && updatedTeaPet.level < updatedTeaPet.maxLevel) {
        updatedTeaPet.level += 1;
        updatedTeaPet.experience = 0;
        updatedTeaPet.maxExperience = updatedTeaPet.level * 1000;
      }
      return {
        ...state,
        teaPets: state.teaPets.map((tp) =>
          tp.id === action.payload ? updatedTeaPet : tp
        ),
        currentTeaPet:
          state.currentTeaPet?.id === action.payload
            ? updatedTeaPet
            : state.currentTeaPet,
        user: state.user
          ? { ...state.user, points: state.user.points + 50 }
          : null,
      };
    case 'UPDATE_SCORES':
      const tp = state.teaPets.find((t) => t.id === action.payload.id);
      if (!tp) return state;
      const updatedTp: TeaPet = {
        ...tp,
        scores: {
          moisture: action.payload.scores.moisture ?? tp.scores.moisture,
          spirit: action.payload.scores.spirit ?? tp.scores.spirit,
          intimacy: action.payload.scores.intimacy ?? tp.scores.intimacy,
        },
      };
      return {
        ...state,
        teaPets: state.teaPets.map((t) =>
          t.id === action.payload.id ? updatedTp : t
        ),
        currentTeaPet:
          state.currentTeaPet?.id === action.payload.id
            ? updatedTp
            : state.currentTeaPet,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'UPDATE_USER_POINTS':
      return {
        ...state,
        user: state.user ? { ...state.user, points: state.user.points + action.payload } : null,
      };
    case 'UPDATE_USER_GROWTH':
      return {
        ...state,
        user: state.user ? { ...state.user, growthValue: state.user.growthValue + action.payload } : null,
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
