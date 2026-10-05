import { useEffect, useState } from "react";
import countdownStar from "@/assets/countdown-star.svg";
import countdownDivider from "@/assets/countdown-divider.svg";
import { useLang } from "@/i18n/LanguageContext";

const TARGET = new Date("2026-11-25T19:30:00+03:00").getTime();

const Countdown = () => {
const { t: translate, lang } = useLang();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
  { v: t.d, l: translate("days") },
  { v: t.h, l: translate("hours") },
  { v: t.m, l: translate("minutes") },
  { v: t.s, l: translate("seconds") },
];

return (
  <div className="relative">

    {/* النجوم */}
    <img
      src={countdownStar}
      alt=""
      className="absolute left-8 -top-10 w-7 opacity-80 select-none pointer-events-none animate-pulse"
      draggable={false}
    />

    <img
      src={countdownStar}
      alt=""
      className="absolute left-20 top-8 w-4 opacity-60 select-none pointer-events-none animate-pulse"
      draggable={false}
      style={{ animationDelay: "0.8s" }}
    />

    <img
      src={countdownStar}
      alt=""
      className="absolute right-10 -top-8 w-6 opacity-80 select-none pointer-events-none animate-pulse"
      draggable={false}
      style={{ animationDelay: "1.5s" }}
    />

    <img
      src={countdownStar}
      alt=""
      className="absolute right-2 top-12 w-4 opacity-50 select-none pointer-events-none animate-pulse"
      draggable={false}
      style={{ animationDelay: "2.2s" }}
    />

    <div dir="ltr" className="flex justify-center gap-3 sm:gap-6">
      {items.map((it) => (
      <div
  key={it.l}
className="flex flex-col items-center justify-center rounded-xl w-[68px] sm:w-[84px] py-5 h-[110px] backdrop-blur-md"
          style={{
  background: "transparent",
  border: "1px solid rgba(249,233,230,0.65)",
boxShadow: "0 0 10px rgba(249,233,230,0.08)",
}}
        >
          <div
  className="font-display text-3xl sm:text-4xl font-amoshref tabular-nums"
style={{ color: "#F9E9E6" }}
>
{lang === "ar"
  ? String(it.v).padStart(2, "0").replace(/\d/g, d => "0123456789"[d])
  : String(it.v).padStart(2, "0")
}
          </div>

          <div
            className="text-xs uppercase tracking-widest mt-1"
style={{ color: "#F9E9E6",
opacity: 0.8, }}
          >
            {it.l}
          </div>
        </div>
      ))}
          </div>

    <img
      src={countdownDivider}
      alt=""
      className="mx-auto mt-8 w-44 opacity-80 select-none pointer-events-none"
      draggable={false}
    />

  </div>
);
};

export default Countdown;
