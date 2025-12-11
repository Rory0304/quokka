import React from 'react';

type LoadingIndicatorProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bgColor?: string;
  color?: string;
};

export const LoadingIndicator = ({
  size = 'md',
  bgColor = '#99a1af',
  color = '#6a7282',
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
    xl: 'w-14 h-14 border-4 ',
  };

  return (
    <div className="flex justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full animate-spin`}
        style={{
          borderColor: bgColor,
          borderTopColor: color,
        }}
      />
    </div>
  );
};
