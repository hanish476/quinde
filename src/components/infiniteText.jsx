// InfiniteScrollingTextBackground.jsx
import React from 'react';

const InfiniteScrollingTextBackground = () => {
  // Fixed phrases for all lines
  const fixedPhrases = ["Quindecennial", "15 YEARS CELEBRATING"];
  
  const numLines = 14;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none flex flex-col justify-around py-2">
      {[...Array(numLines)].map((_, i) => {
        const isLeftToRight = i % 2 === 0;
        const animationClass = isLeftToRight ? 'animate-marquee-left' : 'animate-marquee-right';
        const justifyClass = isLeftToRight ? 'justify-start' : 'justify-end';

        // Repeat the two phrases many times to ensure seamless infinite scroll
        const repeatedPhrases = [...Array(30)].map((_, j) => (
          <span
            key={j}
            className="text-[length:clamp(14px,1.8vw,20px)] text-brrown/10 font-bold uppercase tracking-widest mx-4 whitespace-nowrap"
          >
            {fixedPhrases[j % fixedPhrases.length]}
          </span>
        ));

        return (
          <div
            key={i}
            className="w-full h-[calc(100%/14)] overflow-hidden relative flex items-center"
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 flex ${justifyClass} ${animationClass} whitespace-nowrap`}
            >
              {repeatedPhrases}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteScrollingTextBackground;