"use client";

import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  src?: string;
}

/**
 * MusicPlayer Component - Elegant Background Music Player
 *
 * Best Practices Applied:
 * ✓ Proper CORS configuration for static assets
 * ✓ Robust event listener setup with useEffect cleanup
 * ✓ Safe state management with proper initialization
 * ✓ Comprehensive error handling with logging
 * ✓ Accessible audio controls
 * ✓ Next.js static file serving best practices
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = "Background Music",
  artist = "Lunar Invitation",
  src = "/music/background-music.mp3",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize audio element with proper setup and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log("[MusicPlayer] Initializing with src:", src);

    // ✓ Event handler: When audio can start playing
    const handleCanPlay = () => {
      console.log("[MusicPlayer] Audio can play (canplay event)");
      setIsLoading(false);
    };

    // ✓ Event handler: When metadata is loaded
    const handleLoadedMetadata = () => {
      const dur = audio.duration;
      console.log("[MusicPlayer] Metadata loaded. Duration:", dur, "seconds");

      if (isFinite(dur) && dur > 0) {
        setDuration(dur);
        setIsLoading(false);
      }
    };

    // ✓ Event handler: Track progress update
    const handleTimeUpdate = () => {
      if (isFinite(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    // ✓ Event handler: Track ended
    const handleEnded = () => {
      console.log("[MusicPlayer] Track ended");
      setIsPlaying(false);
    };

    // ✓ Event handler: Audio error
    const handleError = () => {
      const errorCode = audio.error?.code;
      const errorMessage = audio.error?.message || "Unknown error";
      console.error("[MusicPlayer] Audio error details:", {
        errorCode,
        errorCodeMeaning:
          {
            1: "MEDIA_ERR_ABORTED",
            2: "MEDIA_ERR_NETWORK",
            3: "MEDIA_ERR_DECODE",
            4: "MEDIA_ERR_SRC_NOT_SUPPORTED",
          }[errorCode as number] || "Unknown",
        errorMessage,
        src,
        networkState: audio.networkState,
        readyState: audio.readyState,
      });
      setHasError(true);
      setIsLoading(false);
    };

    // Attach event listeners
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // ✓ Trigger load: Critical for static assets
    audio.load();

    // Cleanup: Remove event listeners on unmount
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [src]);

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration) || duration === 0) return;

    const percentage = parseFloat(e.currentTarget.value);
    const newTime = (percentage / 100) * duration;

    if (isFinite(newTime)) {
      audio.currentTime = newTime;
      console.log("[MusicPlayer] Seek to:", newTime, "seconds");
    }
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || isLoading || hasError) {
      console.log("[MusicPlayer] Cannot play - isLoading:", isLoading, "hasError:", hasError);
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("[MusicPlayer] Paused");
    } else {
      // ✓ Use play() promise for better error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[MusicPlayer] Playback started successfully");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("[MusicPlayer] Playback failed:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
    console.log("[MusicPlayer] Mute:", !isMuted);
  };

  // Format time (MM:SS)
  const formatTime = (time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercent =
    isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0;

  // Determine if player is ready for interaction
  const isReady = !isLoading && !hasError && isFinite(duration) && duration > 0;

  return (
    <>
      {/* Audio element (kept once) */}
      <audio ref={audioRef} src={src} crossOrigin="anonymous" preload="metadata" />

      {/* Mobile: minimal floating circular button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          title={isPlaying ? "Pause" : "Play"}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md transition-transform duration-150 focus:outline-none ${isPlaying ? "bg-[#D4AF88] scale-100" : "bg-white/95"
            }`}
        >
          <svg className={`w-6 h-6 ${isPlaying ? "text-[#3A2F2F]" : "text-[#D4AF88]"}`} fill="currentColor" viewBox="0 0 24 24">
            {isPlaying ? <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
        {/* small mute toggle below mobile button */}
        <button
          onClick={handleToggleMute}
          disabled={!isReady}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute" : "Mute"}
          className="mt-2 w-10 h-8 rounded-xl bg-white/90 flex items-center justify-center text-[#D4AF88] text-sm shadow-sm disabled:opacity-50"
        >
          {isMuted ? "Un" : "Mute"}
        </button>
      </div>

      {/* Desktop: compact horizontal bar */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-white/90 rounded-full shadow-elegant px-3 py-2 w-64">
        {/* Compact song info */}
        <div className="shrink-0">
          <button
            onClick={handlePlayPause}
            disabled={!isReady}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            title={isPlaying ? "Pause" : "Play"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isPlaying ? "bg-[#D4AF88] text-[#3A2F2F]" : "bg-white text-[#D4AF88] border border-[#F0EAE0]"
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              {isPlaying ? <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="text-xs text-[#3A2F2F] font-inter font-medium truncate">{title}</div>
          <div className="text-[10px] text-[#6B5E5E] truncate">{artist}</div>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={progressPercent}
              onChange={handleProgressChange}
              disabled={!isReady}
              className="w-full h-1 bg-[#F5F0E8] rounded-full cursor-pointer accent-[#D4AF88]"
              aria-label="Audio progress"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            disabled={!isReady}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
            className="text-[#D4AF88] hover:text-[#8B4F6F] p-1 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              {isMuted ? (
                <path d="M16.6915026,12.4744748 L21.0151496,16.7981218 C21.4470227,17.2299945 21.4470227,17.9166347 21.0151496,18.3485074 C20.5832765,18.7803801 19.8966407,18.7803801 19.4647676,18.3485074 L15.1411206,14.0248604 L10.8174736,18.3485074 C10.3856005,18.7803801 9.69896472,18.7803801 9.26708162,18.3485074 C8.83519851,17.9166347 8.83519851,17.2299945 9.26708162,16.7981218 L13.5907286,12.4744748 L9.26708162,8.15082776 C8.83519851,7.71894465 8.83519851,7.03230889 9.26708162,6.60042578 C9.69896472,6.16854267 10.3856005,6.16854267 10.8174736,6.60042578 L15.1411206,10.9240728 L19.4647676,6.60042578 C19.8966407,6.16854267 20.5832765,6.16854267 21.0151496,6.60042578 C21.4470227,7.03230889 21.4470227,7.71894465 21.0151496,8.15082776 L16.6915026,12.4744748 Z M10.8174736,3.0260271 C11.2493467,2.59414399 11.9359825,2.59414399 12.3678556,3.0260271 L12.4744748,3.1328319 C12.8945111,3.55379781 12.8945111,4.19374291 12.4744748,4.61370882 L12.3678556,4.72051362 C11.9359825,5.15239673 11.2493467,5.15239673 10.8174736,4.72051362 L10.7108544,4.61370882 C10.2908181,4.19374291 10.2908181,3.55379781 10.7108544,3.1328319 L10.8174736,3.0260271 Z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              )}
            </svg>
          </button>

          <div className="text-xs text-[#6B5E5E] font-inter w-12 text-right">
            {isLoading ? "..." : formatTime(currentTime)}
          </div>
        </div>
      </div>
    </>
  );
};
