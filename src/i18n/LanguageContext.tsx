import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Lang = "ar" | "en";
type Dict = Record<string, string>;

const ar: Dict = {
  // Invitation
  tap_open: "اضغط لفتح الدعوة",
  invite_to: "في ليلةٍ اختارها الله لتكون أجمل الليالي",
  invite_join: "نجتمع على لحظات الفرح والسرور",
  invite_day: "اختارت من العمر موعدََا",
  invite_with_love: " ",
  and: "&",
  invite_attend: "اتشرف بدعوتكم لحضور حفل زفاف ابنتي",
  bride_name: "ليـــان",
  groom_name: "ليـــان",
  invite_god_willing: "وذلك بمشيئة الله",
  date_line: "25 . 11 . 2026",
  date_line_hijri: "15 . 06 . 1448 هـ",

  // Countdown
  countdown_date: "حتى نلتقي في يومنا السعيد",
  countdown_title: "العد التنازلي",
  days: "أيام",
  hours: "ساعات",
  minutes: "دقائق",
  seconds: "ثواني",

  // Section Headers & Details
  big_word: "التفاصيل",
  small_word: "كل ما تحتاجون معرفته عن يومنا السعيد",
  location_button: "الموقع",
  event_location: "القاعة الكبرى",
  event_date: "الأربعاء 25 نوفمبر 2026",
  arrival_time: "8:00 مساءً",
  personal_invitation: "الدعوة شخصية",

  // Timeline / Program (مفاتيح موحدة للخط الزمني والمشروع)
  reception: "استقبال الضيوف",
  zaffa: "الزفة",
  dinner: "العشاء",

  // Restrictions
  no_cameras: "يمنع التصوير",
  no_kids: "ادارة القاعة تمنع اصطحاب الاطفال",

  // RSVP
  rsvp_title: "يشرفنا حضوركم",
  rsvp_sub: "نتشرف بحضوركم",
  rsvp_deadline: "نرجو الرد قبل الموعد المحدد",
  name_label: "الاسم الكريم",
  name_placeholder: "اكتب اسمك هنا",
  confirm: "تأكيد الحضور",
  decline: "الاعتذار",
  send: "إرسال",
  sending: "جارٍ الإرسال...",
  welcome: "أهلاً وسهلاً",
  thanks_attending: "شكراً لتأكيد حضورك",
  thanks_declined: "نقدّر اعتذارك",

  // QR & Footer
  qr_title: "باركود الدخول الخاص بك",
  save_qr: "حفظ الباركود",
  section2_title: "Abdulmalik | Layan",
  section2_subtitle: "25 . 11 . 2026",
  tiktok: "غيمة",
};

const en: Dict = {
  // Invitation
  tap_open: "Tap to Open Invitation",
  invite_to: "On a night chosen by Allah to be the most beautiful of nights",
  invite_join: "We gather for moments of joy and happiness",
  invite_day: "She chose a date from the days of her life",
  invite_with_love: "  ",
  and: "&",
  invite_attend: "I am honored to invite you to my daughter's wedding",
  bride_name: "Layan",
  groom_name: "Layan",
  invite_god_willing: "By the will of Allah",
  date_line: "25 . 11 . 2026",
  date_line_hijri: "15 . 06 . 1448 AH",

  // Countdown
  countdown_date: "Until we meet on our joyful day",
  countdown_title: "Countdown",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",

  // Section Headers & Details
  big_word: "Details",
  small_word: "Everything you need to know about our joyful day",
  location_button: "Location",
  event_location: "Grand Hall",
  event_date: "Wednesday, November 25, 2026",
  arrival_time: "8:00 PM",
  personal_invitation: "Personal Invitation",

  // Timeline / Program
  reception: "Guest Reception",
  zaffa: "Zaffa",
  dinner: "Dinner",

  // Restrictions
  no_cameras: "Photography is not permitted",
  no_kids: "The venue management does not allow children",

  // RSVP
  rsvp_title: "We Are Honored by Your Presence",
  rsvp_sub: "We would be honored to have you with us",
  rsvp_deadline: "Please respond before the specified date",
  name_label: "Name",
  name_placeholder: "Enter your name here",
  confirm: "Confirm Attendance",
  decline: "Decline",
  send: "Send",
  sending: "Sending...",
  welcome: "Welcome",
  thanks_attending: "Thank you for confirming your attendance",
  thanks_declined: "We appreciate your response",

  // QR & Footer
  qr_title: "Your Personal Entry QR Code",
  save_qr: "Save QR Code",
  section2_title: "Abdulmalik | Layan",
  section2_subtitle: "25 . 11 . 2026",
  tiktok: "غيمة",
};

const dicts = { ar, en };

interface LangCtx {
  lang: Lang;
  t: (k: keyof typeof ar) => string;
  toggle: () => void;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<LangCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("lang") : null;

    return saved === "en" || saved === "ar" ? saved : "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (k: keyof typeof ar) => dicts[lang][k] ?? k;

  const toggle = () =>
    setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <Ctx.Provider value={{ lang, t, toggle, dir }}>
      {children}
    </Ctx.Provider>
  );
};

export const useLang = () => {
  const c = useContext(Ctx);

  if (!c) {
    throw new Error("useLang must be inside LanguageProvider");
  }

  return c;
};
