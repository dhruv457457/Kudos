import Button from '@/components/ui/Button';
import type { Submission } from '@/lib/types';
// import { db } from '@/lib/db';
// import { notFound } from 'next/navigation';

interface ReviewPageProps {
  params: {
    id: string; // The journey ID
  };
}

// --- MOCK DATA ---
const mockSubmissions: (Submission & {
  milestoneTitle: string;
  participantName: string;
})[] = [
  {
    id: 'sub_1',
    milestoneId: 'ms_2',
    milestoneTitle: 'Project 2: Python Web Scraper',
    participantName: 'Suhani',
    projectLink: 'https://github.com/suhani/web-scraper',
    description:
      'Here is my project! I was able to scrape the data and clean it. The hardest part was handling the dynamic JavaScript on the page.',
    snapshotUrl: '/path/to/screenshot.jpg',
    videoLink: 'https://www.loom.com/share/12345abcde',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];
// --- END MOCK DATA ---

export default async function ReviewPage({ params }: ReviewPageProps) {
  // --- REAL DATA (Later) ---
  // const submissions = await db.submission.findMany({
  //   ...
  // });

  const submissions = mockSubmissions;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-brown mb-6">
        Review Submissions
      </h1>

      {submissions.length === 0 ? (
        <div className="p-12 bg-sandy-neutral/50 rounded-lg text-center border-2 border-dashed border-sandy-neutral">
          <h3 className="text-2xl font-semibold text-brown">
            Nothing to review!
          </h3>
          <p className="text-brown/80 mt-2">
            All caught up. Good job, team!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white p-6 rounded-lg shadow-md border border-sandy-neutral"
            >
              <h2 className="text-2xl font-semibold text-brown mb-2">
                {sub.milestoneTitle}
              </h2>
              <p className="text-md text-brown/90 mb-4">
                Submitted by{' '}
                <span className="font-semibold">{sub.participantName}</span> on{' '}
                {sub.submittedAt.toLocaleDateString()}
              </p>

              <div className="space-y-4">
                {/* This is the data Suhani submitted */}
                <div>
                  <h4 className="font-semibold text-brown">
                    Participant's Description:
                  </h4>
                  <p className="text-brown/90">{sub.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-brown">Project Link:</h4>
                  <a
                    // --- FIX IS HERE ---
                    href={sub.projectLink ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burnt-sienna hover:underline"
                  >
                    {sub.projectLink}
                  </a>
                </div>

                <div>
                  <h4 className="font-semibold text-brown">Video Walkthrough:</h4>
                  <a
                    // --- FIX IS HERE ---
                    href={sub.videoLink ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burnt-sienna hover:underline"
                  >
                    {sub.videoLink}
                  </a>
                </div>

                {/* We'd add the snapshot image here */}
              </div>

              {/* Your Action Buttons */}
              <div className="flex gap-4 mt-6 border-t border-sandy-neutral pt-4">
                <Button variant="primary">
                  Approve
                </Button>
                <Button variant="secondary">
                  Request Revisions
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}