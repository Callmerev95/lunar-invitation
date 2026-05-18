"use client";

import React, { useState, useRef } from "react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  src?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Romantic Music",
  artist = "Lunar Invitation",
  src = "/music/default.mp3",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      setDisplayTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime =
        (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-white rounded-3xl shadow-elegant p-4 md:p-6 w-80 md:w-96 animate-fade-in">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Song Info */}
      <div className="mb-4">
        <p className="text-[#D4AF88] font-playfair font-600 text-lg truncate">
          {title}
        </p>
        <p className="text-[#6B5E5E] font-inter text-sm truncate">{artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-[#F5F0E8] rounded-full cursor-pointer accent-[#D4AF88]"
        />
        <div className="flex justify-between text-xs text-[#6B5E5E] mt-2 font-inter">
          <span>{formatTime(displayTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggleMute}
          className="text-[#D4AF88] hover:text-[#8B4F6F] transition-colors duration-300"
          title={isMuted ? "Unmute" : "Mute"}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isMuted ? (
              <path d="M2 4.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.17l3.66 3.66a.5.5 0 00.85-.35V1.19a.5.5 0 00-.85-.35L4.17 4.5H2zm15.354-.854l-1.415-1.415L11 7.379V3.5a.5.5 0 00-1 0v8.5a.5.5 0 001 0v-3.879l4.939 4.939l1.415-1.415L11 8.121l5.354-5.975z" />
            ) : (
              <path d="M2 4.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.17l3.66 3.66a.5.5 0 00.85-.35V1.19a.5.5 0 00-.85-.35L4.17 4.5H2zm11.303-4.396a.5.5 0 00-.707.707c1.864 1.864 3.02 4.44 3.02 7.289 0 2.849-1.156 5.425-3.02 7.289a.5.5 0 00.707.707c2.118-2.118 3.44-5.05 3.44-7.996s-1.322-5.878-3.44-7.996zM8.5 3.5v13a.5.5 0 001 0v-13a.5.5 0 00-1 0z" />
            )}
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="bg-[#D4AF88] text-[#3A2F2F] rounded-full p-3 hover:bg-[#C4A078] transition-colors duration-300"
          title={isPlaying ? "Pause" : "Play"}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isPlaying ? (
              <path d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H6zM13 4a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" />
            ) : (
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            )}
          </svg>
        </button>

        <div className="text-[#D4AF88] text-sm font-inter">
          <span>{isPlaying ? "Playing" : "Paused"}</span>
        </div>
      </div>
    </div>
  );
};
