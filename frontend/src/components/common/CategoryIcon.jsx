import React from 'react';

const iconMap = {
  // Navigation icons
  dashboard: '📊',
  expenses: '💰',
  transactions: '💳',
  goals: '🎯',
  logout: '🚪',
  
  // Category icons
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  entertainment: '🎬',
  bills: '📝',
  health: '💊',
  education: '📚',
  travel: '✈️',
  other: '📦',
  
  // Default icon
  default: '📌'
};

export const CategoryIcon = ({ category, size = 'medium' }) => {
  const icon = iconMap[category?.toLowerCase()] || iconMap.default;
  
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <span className={`category-icon ${sizeClasses[size]}`} role="img" aria-label={category}>
      {icon}
    </span>
  );
}; 