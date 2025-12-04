'use client';

import { useState, useRef, TouchEvent } from 'react';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';

interface Props {
    children: React.ReactNode;
    onPin: () => void;
    isPinned: boolean;
}

export default function SwipeableCard({ children, onPin, isPinned }: Props) {
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const threshold = 80;

    const handleTouchStart = (e: TouchEvent) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!startX.current) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX.current;

        // Allow movement in both directions, apply resistance
        setOffsetX(diff * 0.7);
        setIsDragging(true);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        // Trigger if crossed threshold in EITHER direction
        if (Math.abs(offsetX) > threshold) {
            onPin();
        }
        setOffsetX(0);
        startX.current = 0;
    };

    // Calculate opacity (0 to 1) based on absolute distance
    const indicatorOpacity = Math.min(Math.abs(offsetX) / threshold, 1);

    // Determine direction for background color/icon position
    const isRight = offsetX > 0;

    return (
        <div className="relative select-none touch-pan-y overflow-hidden rounded-2xl">
            {/* BACKGROUND ACTION LAYER */}
            <div
                className={clsx(
                    "absolute inset-0 flex items-center bg-blue-600 transition-opacity duration-200",
                    isRight ? "justify-start pl-6" : "justify-end pr-6"
                )}
                style={{ opacity: indicatorOpacity }}
            >
                <div className="flex items-center gap-2 text-white font-bold animate-pulse">
                    <MapPin className="w-6 h-6 fill-current" />
                    <span className="text-xs uppercase tracking-wider">Set Reference</span>
                </div>
            </div>

            {/* FOREGROUND CARD */}
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={clsx(
                    "relative transform transition-transform will-change-transform bg-white",
                    !isDragging && "duration-300 ease-out"
                )}
                style={{ transform: `translateX(${offsetX}px)` }}
            >
                {children}
            </div>
        </div>
    );
}