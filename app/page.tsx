import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
      {/*  */}
      <h1 className="text-5xl font-bold text-brown mb-4">
        Welcome to <span className="text-burnt-sienna">MilestoneJourney</span>
      </h1>
      <p className="text-xl text-brown/90 mb-8 max-w-2xl">
        The personal, motivating accountability app designed to help you (or
        someone you love) achieve big goals.
      </p>
      <div className="flex gap-4">
        {/* This will eventually be handled by NextAuth, but for now, it links to the dashboard */}
        <Link href="/dashboard">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}