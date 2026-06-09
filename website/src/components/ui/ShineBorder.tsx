'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
}

/**
 * ShineBorder — a decorative wrapper that renders an animated
 * gradient border around its children, matching the Ignix UI aesthetic.
 */
export function ShineBorder({
  children,
  className,
  borderRadius = 14,
  borderWidth = 1.5,
  duration = 8,
  color = ['#ff0000', '#ff4444', '#ff8888'],
}: ShineBorderProps) {
  const colorString = Array.isArray(color) ? color.join(', ') : color;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        borderRadius: `${borderRadius}px`,
        padding: `${borderWidth}px`,
        background: `linear-gradient(var(--shine-angle, 0deg), ${colorString})`,
        animation: `shine-spin ${duration}s linear infinite`,
      }}
    >
      <div
        className="relative z-10 h-full w-full"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
          background: 'var(--background, #ffffff)',
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes shine-spin {
          0% { --shine-angle: 0deg; }
          100% { --shine-angle: 360deg; }
        }
        @property --shine-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  );
}

ShineBorder.displayName = 'ShineBorder';
