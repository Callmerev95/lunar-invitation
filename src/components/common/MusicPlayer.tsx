"use client";

import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  src?: string;
  autoPlay?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Background Music",
  artist = "Lunar Invitation",
  src = "/music/background-music.mp3",
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize autoplay if needed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !autoPlay || !isReady) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Autoplay failed:", error);
          setIsPlaying(false);
        });
    }
  }, [autoPlay, isReady]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const dur = audio.duration;
    if (isFinite(dur) && dur > 0) {
      setDuration(dur);
      setIsReady(true);
      setHasError(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration)) return;

    setDisplayTime(audio.currentTime);
    
    // Calculate safe progress percentage
    if (audio.duration > 0) {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      if (isFinite(newProgress)) {
        setProgress(newProgress);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration) || audio.duration === 0) return;

    const percentage = parseFloat(e.currentTarget.value);
    if (isFinite(percentage) && percentage >= 0 && percentage <= 100) {
      const newTime = (percentage / 100) * audio.duration;
      if (isFinite(newTime)) {
        audio.currentTime = newTime;
      }
    }
  };

  const handleAudioError = () => {
    console.error("Audio element error");
    setHasError(true);
    setIsPlaying(false);
    setIsReady(false);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || hasError || !isReady) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Play error:", error);
              setIsPlaying(false);
            });
        }
      }
    } catch (error) {
      console.error("Playback control error:", error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const formatTime = (time: number): string => {
    if (!isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-white/95 rounded-3xl shadow-elegant p-4 md:p-6 w-80 md:w-96 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
        crossOrigin="anonymous"
      />

      {/* Song Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#D4AF88] font-playfair font-600 text-lg truncate">
            {title}
          </p>
          {hasError && (
            <span className="text-xs text-red-500 font-inter whitespace-nowrap ml-2">
              Error
            </span>
          )}
        </div>
        <p className="text-[#6B5E5E] font-inter text-sm truncate">{artist}</p>
      </div>

      {/* Progress Bar */}
      {isReady && (
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
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={toggleMute}
          className="text-[#D4AF88] hover:text-[#8B4F6F] transition-colors duration-300 shrink-0 disabled:opacity-50"
          title={isMuted ? "Unmute" : "Mute"}
          disabled={hasError || !isReady}
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

        <button
          onClick={togglePlay}
          className="bg-[#D4AF88] text-[#3A2F2F] rounded-full p-3 hover:bg-[#C4A078] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title={isPlaying ? "Pause" : "Play"}
          disabled={hasError || !isReady}
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
          {hasError && <span className="text-red-500">Error</span>}
          {!hasError && !isReady && <span>Loading...</span>}
          {!hasError && isReady && (
            <span>{isPlaying ? "Playing" : "Paused"}</span>
          )}
        </div>
      </div>
    </div>
  );
};
