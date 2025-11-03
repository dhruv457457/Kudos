import Image from 'next/image';

interface RewardBoxProps {
  isUnlocked: boolean;
  rewardImage: string; // URL for the prize
  rewardMessage: string;
}

export default function RewardBox({
  isUnlocked,
  rewardImage,
  rewardMessage,
}: RewardBoxProps) {
  return (
    <div className="bg-sandy-neutral/60 p-6 rounded-lg text-center shadow-inner sticky top-8">
      <h2 className="text-3xl font-bold text-brown mb-4">
        {isUnlocked ? 'Congratulations!' : 'Final Reward'}
      </h2>

      {isUnlocked ? (
        // --- UNLOCKED STATE ---
        <div>
          <Image
            src={rewardImage || '/public/icon-gift-unlocked.svg'} // Use a default
            alt="Reward"
            width={200}
            height={200}
            className="mx-auto rounded-lg mb-4 object-cover w-full h-48"
          />
          <p className="text-lg text-brown font-semibold">{rewardMessage}</p>
        </div>
      ) : (
        // --- LOCKED STATE ---
        <div>
          <div className="flex items-center justify-center h-48">
            <Image
              src={'/icon-gift-locked.svg'} // Path from your /public folder
              alt="Locked Gift"
              width={100}
              height={100}
              className="opacity-50"
            />
          </div>
          <p className="text-lg text-brown/70">
            Complete all compulsory milestones to unlock your final prize!
          </p>
        </div>
      )}
    </div>
  );
}