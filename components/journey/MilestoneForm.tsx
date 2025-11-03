'use client';

import { useState } from 'react';
import type { Milestone } from '@/lib/types';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

interface MilestoneFormProps {
  onAddMilestone: (milestone: Partial<Milestone>) => void;
}

export default function MilestoneForm({ onAddMilestone }: MilestoneFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompulsory, setIsCompulsory] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert('Please fill out all milestone fields.');
      return;
    }

    onAddMilestone({
      // We don't have an 'id' yet, the database will create it
      title,
      description,
      dueDate: new Date(dueDate),
      isCompulsory,
      status: 'PENDING', // Default status
    });

    // Reset the form
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsCompulsory(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-md border border-dashed border-sandy-neutral">
      <Input
        id="milestoneTitle"
        label="Milestone Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project 1: Sales Dashboard"
      />
      <TextArea
        id="milestoneDesc"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Build a dashboard in Tableau..."
      />
      <Input
        id="milestoneDueDate"
        label="Due Date"
        type="date" // Use date picker
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <input
          id="isCompulsory"
          type="checkbox"
          checked={isCompulsory}
          onChange={(e) => setIsCompulsory(e.target.checked)}
          className="h-4 w-4 rounded text-burnt-sienna focus:ring-burnt-sienna"
        />
        <label htmlFor="isCompulsory" className="text-sm font-medium text-brown">
          This milestone is compulsory
        </label>
      </div>

      <Button type="submit" variant="secondary">
        Add This Milestone
      </Button>
    </form>
  );
}