'use client';

import { useState } from 'react';
import type { Milestone } from '@/lib/types';
import Button from '@/components/ui/Button';
import SubmissionForm from './SubmissionForm'; // We'll import the form

interface MilestoneCardProps {
  milestone: Milestone;
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get styles based on status
  const getStatusInfo = () => {
    switch (milestone.status) {
      case 'APPROVED':
        return {
          text: 'Approved',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        };
      case 'SUBMITTED':
        return {
          text: 'Pending Review',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        };
      case 'PENDING':
      default:
        return {
          text: 'Pending',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleFormSubmit = (formData: { [key: string]: string }) => {
    console.log('Submitting for milestone:', milestone.id, formData);
    // ---
    // Here you would call a server action or API route
    // to save the submission data to your database.
    // ---
    setIsSubmitting(false); // Close the form
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral">
      <div className="flex justify-between items-start mb-2">
        {/* Left Side: Title and Description */}
        <div>
          <h3 className="text-2xl font-semibold text-brown">
            {milestone.title}
          </h3>
          <p className="text-brown/90 mt-1">{milestone.description}</p>
        </div>

        {/* Right Side: Status */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
        >
          {statusInfo.text}
        </span>
      </div>

      {/* Footer: Due Date and Actions */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-sandy-neutral/50">
        <div>
          <span className="text-sm text-burnt-sienna font-medium">
            Due: {new Date(milestone.dueDate).toLocaleDateString()}
          </span>
          {milestone.isCompulsory && (
            <span className="ml-2 text-sm font-bold text-brown">(Compulsory)</span>
          )}
        </div>

        {/* Show Submit button only if PENDING and not already submitting */}
        {milestone.status === 'PENDING' && !isSubmitting && (
          <Button onClick={() => setIsSubmitting(true)} size="sm">
            Submit Work
          </Button>
        )}
      </div>

      {/* --- Submission Form --- */}
      {/* This section appears when 'isSubmitting' is true */}
      {isSubmitting && (
        <div className="mt-4 pt-4 border-t border-sandy-neutral">
          <SubmissionForm
            onSubmit={handleFormSubmit}
            onCancel={() => setIsSubmitting(false)}
          />
        </div>
      )}
    </div>
  );
}