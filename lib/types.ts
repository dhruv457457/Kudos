// Import Prisma types to 'extend' them if needed, or just define our own app-level types.
// For this, we'll define clean, app-level types.

// This represents the user data we get from NextAuth
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// This represents a single submission from the participant
export interface Submission {
  id: string;
  projectLink?: string | null; // Optional link
  description?: string | null; // Participant's notes
  snapshotUrl?: string | null; // Optional image URL
  videoLink?: string | null;   // Optional video URL
  submittedAt: Date;
  milestoneId: string;
}

// This represents one task within a Journey
export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED'; // Status of the milestone
  isCompulsory: boolean;
  dueDate: Date;
  journeyId: string;
  submissions: Submission[]; // A milestone can have one or more submissions
}

// This is the main object, the entire "Journey"
export interface Journey {
  id: string;
  title: string;
  goal: string;
  creatorId: string; // The ID of the person who created it (Dhruv)
  participantId: string; // The ID of the person doing it (Suhani)
  finalRewardImage?: string | null;
  finalRewardMessage?: string | null;
  milestones: Milestone[]; // A journey has a list of milestones
}