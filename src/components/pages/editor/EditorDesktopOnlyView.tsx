'use client';

import { FC, useRef } from 'react';

import { Button } from '@/components/blocks/button/Button';
import { RouteConfig } from '@/data/constants/route';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const EditorDesktopOnlyView: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {});

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={defaultVariants}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="mb-8 text-lg font-medium text-foreground">
          에디터 기능은 PC에서만 지원됩니다.
        </h1>
        <Button asChild variant="outline">
          <Link href={RouteConfig.home}>홈으로</Link>
        </Button>
      </div>
    </motion.div>
  );
};
