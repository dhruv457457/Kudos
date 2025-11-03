'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; // id is required to link label and input
}

export default function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-semibold text-brown mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 bg-white border border-sandy-neutral rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-burnt-sienna focus:border-burnt-sienna 
                    ${className}`}
        {...props}
      />
    </div>
  );
}