
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInCard: React.FC<FadeInCardProps> = ({ 
  children, 
  className,
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut", delay }}
    className={cn("rounded-2xl shadow-lg bg-neutral-900 p-6", className)}
  >
    {children}
  </motion.div>
);

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SlideInFromRightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SlideInFromRight: React.FC<SlideInFromRightProps> = ({ 
  children, 
  className,
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({ 
  children, 
  className,
  scale = 1.02 
}) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({ 
  children, 
  className,
  staggerDelay = 0.1 
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {children.map((child, index) => (
      <motion.div
        key={index}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);

export const AnimatedPresence = AnimatePresence;
