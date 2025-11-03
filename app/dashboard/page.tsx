import Link from 'next/link';
import Button from '@/components/ui/Button';
// We will uncomment these as we build the backend
// import { db } from '@/lib/db';
// import { getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  // --- REAL DATA (Later) ---
  // const session = await getServerSession(authOptions);
  // const journeys = await db.journey.findMany({
  //   where: { creatorId: session?.user?.id },
  // });

  // --- MOCK DATA (For Now) ---
  const journeys: any[] = []; // Start with an empty array

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-brown">My Journeys</h1>
        <Link href="/journey/new">
          <Button variant="primary">Create New Journey</Button>
        </Link>
      </div>

      {journeys.length === 0 ? (
        <div className="p-12 bg-sandy-neutral/50 rounded-lg text-center border-2 border-dashed border-sandy-neutral">
          <h3 className="text-2xl font-semibold text-brown">
            You haven't created any journeys yet.
          </h3>
          <p className="text-brown/80 mt-2 mb-4">
            A new journey is just one click away.
          </p>
          <Link href="/journey/new">
            <Button variant="primary">Create Your First Journey</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* We will map over real journeys here.
            Example:
            {journeys.map(journey => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
          */}
        </div>
      )}
    </div>
  );
}