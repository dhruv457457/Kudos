'use client';

import React from 'react';

// Define the props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  // Base styles
  let baseStyle =
    'inline-flex items-center justify-center rounded-md font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant styles
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle =
        'bg-burnt-sienna text-white hover:bg-burnt-sienna/90 focus:ring-burnt-sienna';
      break;
    case 'secondary':
      variantStyle =
        'bg-sandy-neutral text-brown hover:bg-sandy-neutral/80 focus:ring-sandy-neutral';
      break;
    case 'danger':
      variantStyle =
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
  }

  // Size styles
  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyle = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyle = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}