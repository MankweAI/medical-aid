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
    const threshold = 100; // Pixel distance to trigger pin

    // Touch Handlers
    const handleTouchStart = (e: TouchEvent) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
        // if (!isDragging) return; // Optional check
        if (!startX.current) return;

        const currentX = e.touches[0].clientX;
        const diff = currentX - startX.current;

        // Only allow swiping right (positive X)
        if (diff > 0) {
            // Add resistance (logarithmic feeling)
            setOffsetX(diff * 0.7);
            setIsDragging(true);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (offsetX > threshold) {
            onPin(); // Trigger Action
        }
        setOffsetX(0); // Snap back
        startX.current = 0;
    };

    // Calculate opacity for the "Pin" indicator
    const indicatorOpacity = Math.min(offsetX / threshold, 1);

    return (
        <div className="relative select-none touch-pan-y">
            {/* BACKGROUND ACTION LAYER */}
            <div
                className="absolute inset-0 flex items-center justify-start pl-6 rounded-2xl bg-blue-600 transition-opacity duration-200"
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
                    "relative transform transition-transform will-change-transform bg-white rounded-2xl",
                    !isDragging && "duration-300 ease-out"
                )}
                style={{ transform: `translateX(${offsetX}px)` }}
            >
                {children}
            </div>
        </div>
    );
}