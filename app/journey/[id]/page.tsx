// We'll need these for data fetching
// import { db } from '@/lib/db';
// import { notFound } from 'next/navigation';
import type { Journey, Milestone } from '@/lib/types'; // Import your types

// Component Imports
import ProgressBar from '@/components/journey/ProgressBar';
import MilestoneCard from '@/components/journey/MilestoneCard';
import RewardBox from '@/components/journey/RewardBox';

// This prop is passed by Next.js because of the [id] folder
interface JourneyPageProps {
  params: {
    id: string;
  };
}

// --- MOCK DATA (for layout) ---
// We use this to build the page without a database
const mockJourney: Journey = {
  id: 'clerk-auth-123',
  title: "Suhani's Data Analyst Portfolio Sprint",
  goal: 'Land a Data Analyst Job!',
  creatorId: 'dhruv',
  participantId: 'suhani',
  finalRewardImage: '/path/to/passport-image.jpg', // You'll upload this
  finalRewardMessage: "We're going on a trip! You earned this!",
  milestones: [
    {
      id: 'ms_1',
      title: 'Project 1: Sales Dashboard',
      description: 'Build a sales dashboard in Tableau or Power BI.',
      status: 'APPROVED',
      isCompulsory: true,
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      journeyId: 'clerk-auth-123',
      submissions: [],
    },
    {
      id: 'ms_2',
      title: 'Project 2: Python Web Scraper',
      description:
        'Scrape data from a website and clean it using Pandas.',
      status: 'SUBMITTED',
      isCompulsory: true,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // In 2 days
      journeyId: 'clerk-auth-123',
      submissions: [],
    },
    {
      id: 'ms_3',
      title: 'Project 3: SQL Analysis',
      description: 'Perform a deep-dive analysis using SQL.',
      status: 'PENDING',
      isCompulsory: true,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9), // In 9 days
      journeyId: 'clerk-auth-123',
      submissions: [],
    },
    {
      id: 'ms_4',
      title: 'Optional: A/B Test Analysis',
      description: 'Analyze the results of a sample A/B test.',
      status: 'PENDING',
      isCompulsory: false,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16), // In 16 days
      journeyId: 'clerk-auth-123',
      submissions: [],
    },
  ],
};
// --- END MOCK DATA ---

export default async function JourneyPage({ params }: JourneyPageProps) {
  // --- REAL DATA (Later) ---
  // const journey = await db.journey.findUnique({
  //   where: { id: params.id },
  //   include: { milestones: { include: { submissions: true } } },
  // });
  // if (!journey) {
  //   notFound();
  // }
  const journey = mockJourney; // Using mock data for now

  // --- Logic to calculate progress ---
  const compulsoryMilestones = journey.milestones.filter(
    (ms) => ms.isCompulsory,
  );
  const completedMilestones = compulsoryMilestones.filter(
    (ms) => ms.status === 'APPROVED',
  ).length;
  const progress =
    compulsoryMilestones.length > 0
      ? (completedMilestones / compulsoryMilestones.length) * 100
      : 0;

  return (
    <div>
      {/* 1. Header and Goal */}
      <h1 className="text-4xl font-bold text-brown mb-2">{journey.title}</h1>
      <p className="text-xl text-burnt-sienna mb-6">{journey.goal}</p>

      {/* 2. Progress Bar */}
      <ProgressBar progress={progress} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* 3. Milestones Column */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-semibold text-brown mb-4">
            Your Milestones
          </h2>
          <div className="space-y-4">
            {journey.milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                // We would also pass participant info
                // isCreatorView={false}
              />
            ))}
          </div>
        </div>

        {/* 4. Reward Column */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-semibold text-brown mb-4">
            The Big Prize
          </h2>
          <RewardBox
            isUnlocked={progress === 100}
            rewardImage={journey.finalRewardImage || ''}
            rewardMessage={journey.finalRewardMessage || ''}
          />
        </div>
      </div>
    </div>
  );
}