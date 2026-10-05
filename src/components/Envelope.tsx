import { useState } from "react";
import envelopeImg from "@/assets/5484DDFB-D1A4-476A-9EDD-60F4962DAB71.png";
import sealImg from "@/assets/photo-output.png";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [opening, setOpening] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const trigger = () => {
    if (opening) return;

    setOpening(true);
    setPressed(true);

    setTimeout(() => {
      setFadeOut(true);
    }, 180);

    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{
        background: "#F2EEF6",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <img
        src={envelopeImg}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      <img
        src={sealImg}
        onClick={trigger}
        draggable={false}
        className="absolute cursor-pointer transition-all duration-150 select-none"
        style={{
          left: "50%",
          top: "50%",
          width: "140px",
          transform: pressed
            ? "translate(-50%, -50%) scale(0.96)"
            : "translate(-50%, -50%) scale(1)",
        }}
      />

      {!opening && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm font-arabic animate-pulse"
          style={{
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,.5)",
          }}
        >
    
        </div>
      )}
    </div>
  );
};

export default Envelope;
