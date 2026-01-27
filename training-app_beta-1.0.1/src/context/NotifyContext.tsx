// src/context/NotifyContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notify from '@/components/Notify';

type NotifyType = 'success' | 'error' | 'info';

interface NotifyContextType {
  showNotify: (message: string, type?: NotifyType) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export function NotifyProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotifyType>('info');

  const showNotify = (msg: string, notifyType: NotifyType = 'info') => {
    setMessage(msg);
    setType(notifyType);
    setIsVisible(true);
  };

  const closeNotify = () => {
    setIsVisible(false);
  };

  return (
    <NotifyContext.Provider value={{ showNotify }}>
      {children}
      <Notify 
        message={message} 
        type={type} 
        isVisible={isVisible} 
        onClose={closeNotify} 
      />
    </NotifyContext.Provider>
  );
}

// Hook personalizado para usar la notificación fácilmente
export function useNotify() {
  const context = useContext(NotifyContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotifyProvider');
  }
  return context;
}