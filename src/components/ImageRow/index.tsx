import React, { isValidElement, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';

interface ImageProps {
  alt?: string;
  [key: string]: unknown;
}

interface ImageRowProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export default function ImageRow({ children, className = '', ...rest }: ImageRowProps) {
  const [fullScreenImage, setFullScreenImage] = useState<ReactElement | null>(null);

  const baseClasses = 'flex justify-center gap-4 flex-wrap';
  const combinedClasses = `${baseClasses}${className ? ` ${className}` : ''}`;

  return (
    <>
      <div className={combinedClasses} {...rest}>
        {React.Children.map(children, (child) => {
          if (!isValidElement<ImageProps>(child)) return null;

          const altText = child.props.alt;

          return (
            <figure
              className="flex flex-1 flex-col items-center min-w-[200px] m-0 cursor-pointer"
              onClick={() => setFullScreenImage(child as ReactElement)}
            >
              {child}
              {altText && (
                <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  {altText}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {fullScreenImage && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold cursor-pointer border-none z-10"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
          <div
            className="max-w-full max-h-full flex items-center justify-center [&>img]:max-h-[90vh] [&>img]:w-auto [&>img]:object-contain [&>img]:m-0"
            onClick={(e) => e.stopPropagation()}
          >
            {fullScreenImage}
          </div>
        </div>
      )}
    </>
  );
}
