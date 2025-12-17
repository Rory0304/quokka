'use client';

import { FC, useState } from 'react';

import { cn } from '@/libs/styles/cn';
import Image, { ImageProps } from 'next/image';

export const SmoothImageLoader: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)} // Set state to true on load
      className={cn(
        className,
        `transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`
      )}
    />
  );
};
