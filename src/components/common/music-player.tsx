"use client";

import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  src?: string;
  autoPlay?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Our Song",
  artist = "Lunar Invitation",
  src = "/music/background-music.mp3",
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true); // Start muted for better UX
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (autoPlay && isMuted) {
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Autoplay failed:", error);
        setHasError(true);
      }
    };

    // Delay autoplay slightly to allow audio to be ready
    setTimeout(playAudio, 500);

    return () => {
      if (audio) audio.pause();
    };
  }, [autoPlay, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback error:", error);
      setHasError(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);

    // If unmuting and not playing, start playing
    if (!newMuted && !isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.currentTarget.value);
    audio.volume = newVolume;
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
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-white/95 rounded-3xl shadow-elegant p-4 md:p-6 w-80 md:w-96 animate-fade-in backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          console.error("Audio error occurred");
          setHasError(true);
        }}
        crossOrigin="anonymous"
      />

      {/* Song Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#D4AF88] font-playfair font-600 text-lg truncate">
            {title}
          </p>
          {hasError && (
            <span className="text-xs text-red-500 font-inter">Error</span>
          )}
        </div>
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
          className="w-full h-1 bg-[#F5F0E8] rounded-full cursor-pointer accent-[#D4AF88] hover:accent-[#C4A078]"
        />
        <div className="flex justify-between text-xs text-[#6B5E5E] mt-2 font-inter">
          <span>{formatTime(displayTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4 px-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue={0.5}
          onChange={handleVolumeChange}
          className="w-full h-0.5 bg-[#F5F0E8] rounded-full cursor-pointer accent-[#D4AF88]"
          title="Volume control"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={toggleMute}
          className="text-[#D4AF88] hover:text-[#8B4F6F] transition-colors duration-300 shrink-0"
          title={isMuted ? "Unmute" : "Mute"}
          disabled={hasError}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isMuted ? (
              <path d="M12 4L6 8H2v8h4l6 4v-4l6 4V4l-6 4zm7-2l-2-2m0 8l2-2m-2 0l-2 2m2-2l2 2" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            )}
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="bg-[#D4AF88] text-[#3A2F2F] rounded-full p-3 hover:bg-[#C4A078] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title={isPlaying ? "Pause" : "Play"}
          disabled={hasError}
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

        <div className="text-[#D4AF88] text-xs font-inter whitespace-nowrap shrink-0">
          <span>{isPlaying ? "Playing" : isMuted ? "Muted" : "Ready"}</span>
        </div>
      </div>
    </div>
  );
};
