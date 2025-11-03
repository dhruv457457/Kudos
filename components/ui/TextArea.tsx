'use client';

import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string; // id is required
}

export default function TextArea({
  label,
  id,
  className = '',
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-semibold text-brown mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full px-3 py-2 bg-white border border-sandy-neutral rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-burnt-sienna focus:border-burnt-sienna 
                    ${className}`}
        rows={4} // Default row count
        {...props}
      />
    </div>
  );
}