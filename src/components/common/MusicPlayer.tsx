"use client";

import React, { useState, useRef } from "react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  src?: string;
}

/**
 * MusicPlayer Component
 * Elegant, minimal music player with HTML5 Audio API
 * Features: Play/Pause, Mute, Progress bar, Time display
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Background Music",
  artist = "Lunar Invitation",
  src = "/music/background-music.mp3",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle audio metadata loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const dur = audio.duration;
    console.log("[MusicPlayer] Metadata loaded. Duration:", dur);

    if (isFinite(dur) && dur > 0) {
      setDuration(dur);
      setIsLoading(false);
    }
  };

  // Handle audio time update
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isFinite(audio.currentTime)) {
      setCurrentTime(audio.currentTime);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration) || duration === 0) return;

    const percentage = parseFloat(e.currentTarget.value);
    const newTime = (percentage / 100) * duration;

    if (isFinite(newTime)) {
      audio.currentTime = newTime;
    }
  };

  // Handle audio ended
  const handleAudioEnded = () => {
    console.log("[MusicPlayer] Track ended");
    setIsPlaying(false);
  };

  // Handle audio errors
  const handleAudioError = () => {
    const audio = audioRef.current;
    console.error("[MusicPlayer] Error loading audio:", {
      path: src,
      code: audio?.error?.code,
      message: audio?.error?.message,
    });
    setHasError(true);
    setIsLoading(false);
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || isLoading || hasError) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => {
        console.error("[MusicPlayer] Play error:", err);
      });
      setIsPlaying(true);
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Format time (MM:SS)
  const formatTime = (time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercent = isFinite(duration) && duration > 0 
    ? (currentTime / duration) * 100 
    : 0;

  // Determine if player is ready
  const isReady = !isLoading && !hasError && isFinite(duration) && duration > 0;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-white/95 rounded-3xl shadow-elegant p-4 md:p-6 w-80 md:w-96 backdrop-blur-sm">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        crossOrigin="anonymous"
      />

      {/* Error State */}
      {hasError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-xs font-inter font-semibold">
            ⚠️ Cannot load audio
          </p>
          <p className="text-red-600 text-xs font-inter mt-1 truncate break-all">
            {src}
          </p>
        </div>
      )}

      {/* Song Info */}
      <div className="mb-4">
        <h3 className="text-[#D4AF88] font-playfair font-600 text-lg truncate">
          {title}
        </h3>
        <p className="text-[#6B5E5E] font-inter text-sm truncate">{artist}</p>
      </div>

      {/* Progress Bar - Show when ready or loading */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent}
          onChange={handleProgressChange}
          disabled={!isReady}
          className="w-full h-1 bg-[#F5F0E8] rounded-full cursor-pointer accent-[#D4AF88] hover:accent-[#C4A078] disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-[#6B5E5E] mt-2 font-inter">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        {/* Mute Button */}
        <button
          onClick={handleToggleMute}
          disabled={!isReady}
          className="text-[#D4AF88] hover:text-[#8B4F6F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed p-1"
          title={isMuted ? "Unmute" : "Mute"}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isMuted ? (
              <path d="M16.6915026,12.4744748 L21.0151496,16.7981218 C21.4470227,17.2299945 21.4470227,17.9166347 21.0151496,18.3485074 C20.5832765,18.7803801 19.8966407,18.7803801 19.4647676,18.3485074 L15.1411206,14.0248604 L10.8174736,18.3485074 C10.3856005,18.7803801 9.69896472,18.7803801 9.26708162,18.3485074 C8.83519851,17.9166347 8.83519851,17.2299945 9.26708162,16.7981218 L13.5907286,12.4744748 L9.26708162,8.15082776 C8.83519851,7.71894465 8.83519851,7.03230889 9.26708162,6.60042578 C9.69896472,6.16854267 10.3856005,6.16854267 10.8174736,6.60042578 L15.1411206,10.9240728 L19.4647676,6.60042578 C19.8966407,6.16854267 20.5832765,6.16854267 21.0151496,6.60042578 C21.4470227,7.03230889 21.4470227,7.71894465 21.0151496,8.15082776 L16.6915026,12.4744748 Z M10.8174736,3.0260271 C11.2493467,2.59414399 11.9359825,2.59414399 12.3678556,3.0260271 L12.4744748,3.1328319 C12.8945111,3.55379781 12.8945111,4.19374291 12.4744748,4.61370882 L12.3678556,4.72051362 C11.9359825,5.15239673 11.2493467,5.15239673 10.8174736,4.72051362 L10.7108544,4.61370882 C10.2908181,4.19374291 10.2908181,3.55379781 10.7108544,3.1328319 L10.8174736,3.0260271 Z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            )}
          </svg>
        </button>

        {/* Play Button */}
        <button
          onClick={handlePlayPause}
          disabled={!isReady}
          className="bg-[#D4AF88] text-[#3A2F2F] rounded-full p-3 hover:bg-[#C4A078] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title={isPlaying ? "Pause" : "Play"}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>

        {/* Status Text */}
        <div className="text-[#D4AF88] text-xs font-inter whitespace-nowrap shrink-0">
          {hasError ? (
            <span className="text-red-500 font-semibold">Error</span>
          ) : isLoading ? (
            <span className="text-gray-500">Loading...</span>
          ) : (
            <span>{isPlaying ? "Playing" : "Ready"}</span>
          )}
        </div>
      </div>
    </div>
  );
};
