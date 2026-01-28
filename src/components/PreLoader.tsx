import { useEffect, useState } from 'react';

const PreLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
            }}
          >
            <path
              d="M 40 160 L 40 80 L 100 40 L 160 80 L 160 160 Z"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress * 4)}
              className="transition-all duration-300"
            />
            <path
              d="M 60 160 L 60 100 L 100 70 L 140 100 L 140 160"
              fill="none"
              stroke="#50C878"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset={300 - (progress * 3)}
              className="transition-all duration-300"
            />
            <line
              x1="40"
              y1="80"
              x2="160"
              y2="80"
              stroke="#0F52BA"
              strokeWidth="2"
              strokeDasharray="120"
              strokeDashoffset={120 - (progress * 1.2)}
              className="transition-all duration-300"
            />
            <line
              x1="60"
              y1="100"
              x2="140"
              y2="100"
              stroke="#0F52BA"
              strokeWidth="2"
              strokeDasharray="80"
              strokeDashoffset={80 - (progress * 0.8)}
              className="transition-all duration-300"
            />
            <line
              x1="60"
              y1="130"
              x2="140"
              y2="130"
              stroke="#0F52BA"
              strokeWidth="2"
              strokeDasharray="80"
              strokeDashoffset={80 - (progress * 0.8)}
              className="transition-all duration-300"
            />
          </svg>
        </div>

        <div
          className="text-2xl font-serif text-[#FFD700] mb-4 transition-opacity duration-500"
          style={{ opacity: progress > 50 ? 1 : 0 }}
        >
          Universal Affordable Housing
        </div>

        <div
          className="text-sm text-gray-400 transition-opacity duration-500"
          style={{ opacity: progress > 70 ? 1 : 0 }}
        >
          Building Dreams, Defining Futures
        </div>

        <div className="w-64 h-1 mx-auto mt-8 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFD700] via-[#50C878] to-[#0F52BA] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
