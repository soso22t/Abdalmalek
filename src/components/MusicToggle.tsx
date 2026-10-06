import { useEffect, useRef } from "react";

const musicSrc = "/music/lee.m4a";

interface Props {
  active: boolean;
}

const MusicToggle = ({ active }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;
    audio.loop = true;
    audio.play().catch(() => {});
  }, [active]);

  if (!active) return null;

  return (
    <audio
      ref={audioRef}
      src={musicSrc}
      preload="auto"
    />
  );
};

export default MusicToggle;
