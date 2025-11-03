'use client'; // This must be a client component to use forms and state

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import MilestoneForm from '@/components/journey/MilestoneForm'; // The component to add milestones
import type { Milestone } from '@/lib/types'; // Import your types

export default function NewJourneyPage() {
  const [milestones, setMilestones] = useState<Partial<Milestone>[]>([]);

  // This function would be passed to the MilestoneForm
  const addMilestone = (milestone: Partial<Milestone>) => {
    setMilestones([...milestones, milestone]);
  };

  // This function would handle the final form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the entire journey (title, goal, milestones)
    // to the database will go here.
    console.log('Submitting new journey...');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-brown mb-6">
        Create a New Journey
      </h1>

      {/* Step 1: Journey Details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral mb-6">
        <h2 className="text-2xl font-semibold text-brown mb-4">
          1. Journey Details
        </h2>
        <div className="space-y-4">
          <Input
            id="title"
            label="Journey Title"
            placeholder="e.g., Suhani's Data Analyst Portfolio"
            required
          />
          <TextArea
            id="goal"
            label="Main Goal"
            placeholder="e.g., Land a Data Analyst job!"
            required
          />
          <Input
            id="rewardImage"
            label="Final Reward Image URL"
            placeholder="https://... (image of a passport, PS5, etc.)"
          />
          <TextArea
            id="rewardMessage"
            label="Final Reward Message"
            placeholder="e.g., We did it! Time to book our trip!"
          />
        </div>
      </div>

      {/* Step 2: Add Milestones */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral mb-6">
        <h2 className="text-2xl font-semibold text-brown mb-4">
          2. Add Milestones
        </h2>
        {/* This is where you add new milestones one by one */}
        <MilestoneForm onAddMilestone={addMilestone} />

        {/* This lists the milestones you've added so far */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-brown mb-2">
            Milestones Added:
          </h3>
          {milestones.length === 0 ? (
            <p className="text-brown/70">No milestones added yet.</p>
          ) : (
            <ul className="list-disc pl-5">
              {milestones.map((ms, index) => (
                <li key={index} className="text-brown">
                  {ms.title} {ms.isCompulsory ? '(Compulsory)' : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Step 3: Create Journey */}
      <Button type="submit" variant="primary" size="lg">
        Create Journey
      </Button>
    </form>
  );
}