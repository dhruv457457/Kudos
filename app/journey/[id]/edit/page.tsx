'use client'; // This must be a client component to use forms and state

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook to get 'id'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import MilestoneForm from '@/components/journey/MilestoneForm';
import type { Journey, Milestone } from '@/lib/types';

// Mock data for the existing journey
const mockExistingJourney: Journey = {
  id: 'clerk-auth-123',
  title: "Suhani's Data Analyst Portfolio Sprint",
  goal: 'Land a Data Analyst Job!',
  creatorId: 'dhruv',
  participantId: 'suhani',
  finalRewardImage: '/path/to/passport-image.jpg',
  finalRewardMessage: "We're going on a trip! You earned this!",
  milestones: [
    {
      id: 'ms_1',
      title: 'Project 1: Sales Dashboard',
      description: 'Build a sales dashboard in Tableau or Power BI.',
      status: 'APPROVED',
      isCompulsory: true,
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      journeyId: 'clerk-auth-123',
      submissions: [],
    },
  ],
};

export default function EditJourneyPage() {
  const params = useParams(); // Gets { id: '...' }
  const [journey, setJourney] = useState<Partial<Journey>>({});
  const [milestones, setMilestones] = useState<Partial<Milestone>[]>([]);

  // --- Fetch existing data ---
  useEffect(() => {
    // In a real app, you would fetch this data from your API/database
    // based on params.id
    setJourney(mockExistingJourney);
    setMilestones(mockExistingJourney.milestones);
  }, [params.id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to UPDATE the journey in the database
    console.log('Updating journey...', { ...journey, milestones });
  };

  const addMilestone = (milestone: Partial<Milestone>) => {
    setMilestones([...milestones, milestone]);
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-brown mb-6">
        Edit Journey
      </h1>

      {/* 1. Journey Details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral mb-6">
        <h2 className="text-2xl font-semibold text-brown mb-4">
          1. Journey Details
        </h2>
        <div className="space-y-4">
          <Input
            id="title"
            label="Journey Title"
            value={journey.title || ''}
            onChange={(e) => setJourney({ ...journey, title: e.target.value })}
            required
          />
          <TextArea
            id="goal"
            label="Main Goal"
            value={journey.goal || ''}
            onChange={(e) => setJourney({ ...journey, goal: e.target.value })}
            required
          />
          <Input
            id="rewardImage"
            label="Final Reward Image URL"
            value={journey.finalRewardImage || ''}
            onChange={(e) =>
              setJourney({ ...journey, finalRewardImage: e.target.value })
            }
          />
          <TextArea
            id="rewardMessage"
            label="Final Reward Message"
            value={journey.finalRewardMessage || ''}
            onChange={(e) =>
              setJourney({ ...journey, finalRewardMessage: e.target.value })
            }
          />
        </div>
      </div>

      {/* 2. Add Milestones */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral mb-6">
        <h2 className="text-2xl font-semibold text-brown mb-4">
          2. Edit Milestones
        </h2>
        <MilestoneForm onAddMilestone={addMilestone} />
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-brown mb-2">
            Current Milestones:
          </h3>
          <ul className="list-disc pl-5">
            {milestones.map((ms, index) => (
              <li key={index} className="text-brown">
                {ms.title} {ms.isCompulsory ? '(Compulsory)' : ''}
                {/* We would add a "Remove" button here */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg">
        Update Journey
      </Button>
    </form>
  );
}