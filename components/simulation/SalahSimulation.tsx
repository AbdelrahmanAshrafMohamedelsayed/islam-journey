"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Info,
  Home,
  Play,
  Trophy,
  Volume2,
} from "lucide-react";

interface SalahPosition {
  id: string;
  name: { en: string; ar: string };
  arabicName: string;
  description: { en: string; ar: string };
  recitation: {
    arabic: string;
    transliteration: string;
    meaning: { en: string; ar: string };
  };
  times?: number;
  positionImage: string; // emoji representation
  tip?: { en: string; ar: string };
  isOptional?: boolean;
}

// Two rak'ah prayer (like Fajr)
const salahPositions: SalahPosition[] = [
  {
    id: "standing-takbir",
    name: { en: "Standing - Opening Takbir", ar: "القيام - تكبيرة الإحرام" },
    arabicName: "تكبيرة الإحرام",
    description: {
      en: 'Stand facing the Qiblah. Raise your hands to ear level (or shoulders) and say "Allahu Akbar" to begin the prayer.',
      ar: 'قف مستقبلاً القبلة. ارفع يديك إلى مستوى الأذنين (أو الكتفين) وقل "الله أكبر" لبدء الصلاة.',
    },
    recitation: {
      arabic: "اللهُ أَكْبَر",
      transliteration: "Allahu Akbar",
      meaning: { en: "Allah is the Greatest", ar: "الله أكبر" },
    },
    positionImage: "🧍",
    tip: {
      en: "After this takbir, place your right hand over your left on your chest. Keep your eyes looking at the place of prostration.",
      ar: "بعد هذه التكبيرة، ضع يدك اليمنى فوق اليسرى على صدرك. أبقِ عينيك على موضع السجود.",
    },
  },
  {
    id: "standing-fatiha",
    name: { en: "Standing - Recite Al-Fatiha", ar: "القيام - قراءة الفاتحة" },
    arabicName: "قراءة الفاتحة",
    description: {
      en: "Recite Surah Al-Fatiha. This is mandatory in every rak'ah. Take your time and recite with presence of heart.",
      ar: "اقرأ سورة الفاتحة. هذا واجب في كل ركعة. خذ وقتك واقرأ بحضور القلب.",
    },
    recitation: {
      arabic:
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      transliteration:
        "Bismillahir Rahmanir Raheem. Alhamdu lillahi Rabbil 'aalameen. Ar-Rahmanir Raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal mustaqeem. Siratal-latheena an'amta 'alayhim ghayril maghdoobi 'alayhim walad-daalleen.",
      meaning: {
        en: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is for Allah, Lord of all worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us on the Straight Path. The path of those who have received Your grace, not of those who have brought down wrath upon themselves, nor of those who have gone astray.",
        ar: "بسم الله الرحمن الرحيم. الحمد لله رب العالمين. الرحمن الرحيم. مالك يوم الدين. إياك نعبد وإياك نستعين. اهدنا الصراط المستقيم. صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين.",
      },
    },
    positionImage: "🧍",
    tip: {
      en: 'Say "Ameen" (O Allah, accept) after completing Al-Fatiha.',
      ar: 'قل "آمين" بعد إتمام الفاتحة.',
    },
  },
  {
    id: "standing-surah",
    name: { en: "Standing - Additional Surah", ar: "القيام - سورة إضافية" },
    arabicName: "قراءة سورة",
    description: {
      en: "After Al-Fatiha, recite any other surah or verses. Here's Surah Al-Ikhlas, a short powerful surah.",
      ar: "بعد الفاتحة، اقرأ أي سورة أو آيات أخرى. هذه سورة الإخلاص، سورة قصيرة قوية.",
    },
    recitation: {
      arabic:
        "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      transliteration:
        "Qul huwa Allahu ahad. Allahus-samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad.",
      meaning: {
        en: "Say: He is Allah, the One. Allah, the Eternal. He begets not, nor is He begotten. And there is none comparable to Him.",
        ar: "قل هو الله أحد. الله الصمد. لم يلد ولم يولد. ولم يكن له كفواً أحد.",
      },
    },
    positionImage: "🧍",
    isOptional: false, // Only in first 2 rakaat
  },
  {
    id: "ruku",
    name: { en: "Bowing (Ruku)", ar: "الركوع" },
    arabicName: "الركوع",
    description: {
      en: 'Say "Allahu Akbar" and bow. Your back should be straight and parallel to the ground. Place hands on knees.',
      ar: 'قل "الله أكبر" وانحنِ. يجب أن يكون ظهرك مستقيماً وموازياً للأرض. ضع يديك على ركبتيك.',
    },
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيم",
      transliteration: "Subhana Rabbiyal 'Atheem",
      meaning: {
        en: "Glory be to my Lord, the Most Great",
        ar: "سبحان ربي العظيم",
      },
    },
    times: 3,
    positionImage: "🙇",
    tip: {
      en: "Keep your head in line with your back, don't raise it up or let it hang down.",
      ar: "أبقِ رأسك على مستوى ظهرك، لا ترفعه أو تدعه يتدلى.",
    },
  },
  {
    id: "rising-ruku",
    name: { en: "Rising from Ruku", ar: "الرفع من الركوع" },
    arabicName: "القيام من الركوع",
    description: {
      en: 'Rise from bowing while saying "Sami\' Allahu liman hamidah", then stand straight saying "Rabbana lakal hamd".',
      ar: 'ارفع من الركوع قائلاً "سمع الله لمن حمده"، ثم قف مستقيماً قائلاً "ربنا لك الحمد".',
    },
    recitation: {
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْد",
      transliteration: "Sami' Allahu liman hamidah. Rabbana wa lakal hamd.",
      meaning: {
        en: "Allah hears those who praise Him. Our Lord, to You belongs all praise.",
        ar: "سمع الله لمن حمده. ربنا ولك الحمد.",
      },
    },
    positionImage: "🧍",
  },
  {
    id: "sujud-1",
    name: { en: "First Prostration (Sujud)", ar: "السجدة الأولى" },
    arabicName: "السجود",
    description: {
      en: 'Say "Allahu Akbar" and prostrate. Seven parts touch the ground: forehead & nose, both palms, both knees, toes of both feet.',
      ar: 'قل "الله أكبر" واسجد. سبعة أعضاء تلمس الأرض: الجبهة والأنف، الكفين، الركبتين، أصابع القدمين.',
    },
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la",
      meaning: {
        en: "Glory be to my Lord, the Most High",
        ar: "سبحان ربي الأعلى",
      },
    },
    times: 3,
    positionImage: "🙏",
    tip: {
      en: "This is when you're closest to Allah! Make personal du'a (supplication) here after the prescribed words.",
      ar: "هذا عندما تكون أقرب إلى الله! ادعُ هنا بعد الأذكار المحددة.",
    },
  },
  {
    id: "sitting-between",
    name: { en: "Sitting Between Sujud", ar: "الجلسة بين السجدتين" },
    arabicName: "الجلوس بين السجدتين",
    description: {
      en: 'Rise from sujud saying "Allahu Akbar" and sit briefly. You may say "Rabbighfirli" (My Lord, forgive me).',
      ar: 'ارفع من السجود قائلاً "الله أكبر" واجلس لحظة. يمكنك قول "رب اغفر لي".',
    },
    recitation: {
      arabic: "رَبِّ اغْفِرْ لِي",
      transliteration: "Rabbighfirli",
      meaning: { en: "My Lord, forgive me", ar: "رب اغفر لي" },
    },
    positionImage: "🧎",
  },
  {
    id: "sujud-2",
    name: { en: "Second Prostration", ar: "السجدة الثانية" },
    arabicName: "السجود الثاني",
    description: {
      en: 'Say "Allahu Akbar" and go into the second prostration, same as the first.',
      ar: 'قل "الله أكبر" واذهب إلى السجدة الثانية، مثل الأولى.',
    },
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la",
      meaning: {
        en: "Glory be to my Lord, the Most High",
        ar: "سبحان ربي الأعلى",
      },
    },
    times: 3,
    positionImage: "🙏",
  },
  {
    id: "second-rakah-note",
    name: { en: "--- Second Rak'ah ---", ar: "--- الركعة الثانية ---" },
    arabicName: "الركعة الثانية",
    description: {
      en: 'Rise for the second rak\'ah saying "Allahu Akbar". Repeat: Stand → Al-Fatiha → Surah → Ruku → Sujud → Sujud.',
      ar: 'قم للركعة الثانية قائلاً "الله أكبر". كرر: قيام ← الفاتحة ← سورة ← ركوع ← سجود ← سجود.',
    },
    recitation: {
      arabic: "اللهُ أَكْبَر",
      transliteration: "Allahu Akbar",
      meaning: { en: "Allah is the Greatest", ar: "الله أكبر" },
    },
    positionImage: "🧍",
    tip: {
      en: "After the second sujud of the second rak'ah, remain seated for Tashahhud.",
      ar: "بعد السجدة الثانية من الركعة الثانية، ابقَ جالساً للتشهد.",
    },
  },
  {
    id: "tashahhud",
    name: { en: "Tashahhud (Sitting Testimony)", ar: "التشهد" },
    arabicName: "التشهد",
    description: {
      en: "Sit with your left foot under you and right foot upright. Raise your index finger when saying the shahada.",
      ar: "اجلس مع قدمك اليسرى تحتك وقدمك اليمنى منتصبة. ارفع إصبعك السبابة عند قول الشهادة.",
    },
    recitation: {
      arabic:
        "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ۝ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ۝ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ۝ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      transliteration:
        "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-saliheen. Ashhadu an la ilaha illallah wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
      meaning: {
        en: "All greetings, prayers and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.",
        ar: "التحيات لله والصلوات والطيبات. السلام عليك أيها النبي ورحمة الله وبركاته. السلام علينا وعلى عباد الله الصالحين. أشهد أن لا إله إلا الله وأشهد أن محمداً عبده ورسوله.",
      },
    },
    positionImage: "🧎",
    tip: {
      en: 'Point your index finger during "Ashhadu an la ilaha illallah" - this is part of the Sunnah.',
      ar: 'أشر بسبابتك عند "أشهد أن لا إله إلا الله" - هذا من السنة.',
    },
  },
  {
    id: "salawat",
    name: { en: "Salawat (Blessings on Prophet)", ar: "الصلاة على النبي" },
    arabicName: "الصلوات الإبراهيمية",
    description: {
      en: "Continue sitting and send blessings upon the Prophet Muhammad ﷺ and Prophet Ibrahim.",
      ar: "استمر بالجلوس وصلِّ على النبي محمد ﷺ والنبي إبراهيم.",
    },
    recitation: {
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli 'ala Muhammad wa 'ala aali Muhammad kama sallayta 'ala Ibrahim wa 'ala aali Ibrahim innaka Hamidun Majeed. Allahumma barik 'ala Muhammad wa 'ala aali Muhammad kama barakta 'ala Ibrahim wa 'ala aali Ibrahim innaka Hamidun Majeed.",
      meaning: {
        en: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.",
        ar: "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد. اللهم بارك على محمد وعلى آل محمد كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد.",
      },
    },
    positionImage: "🧎",
  },
  {
    id: "tasleem",
    name: { en: "Tasleem (Ending the Prayer)", ar: "التسليم" },
    arabicName: "التسليم",
    description: {
      en: "End the prayer by turning your head to the right, saying the salam, then turning left and repeating.",
      ar: "اختم الصلاة بتحويل رأسك إلى اليمين، قائلاً السلام، ثم إلى اليسار وكررها.",
    },
    recitation: {
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "As-salamu 'alaykum wa rahmatullah",
      meaning: {
        en: "Peace and mercy of Allah be upon you",
        ar: "السلام عليكم ورحمة الله",
      },
    },
    times: 2,
    positionImage: "😊",
    tip: {
      en: "Turn right first, then left. This marks the end of your prayer. You may now make personal du'a!",
      ar: "التفت يميناً أولاً، ثم يساراً. هذا يُنهي صلاتك. يمكنك الآن الدعاء!",
    },
  },
];

interface SalahSimulationProps {
  chapterId: string;
}

export function SalahSimulation({ chapterId }: SalahSimulationProps) {
  const { language } = useSettingsStore();
  const { addXP } = useProgressStore();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [repetitionCount, setRepetitionCount] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);

  const lang = language as "en" | "ar";

  const position = salahPositions[currentPosition];
  const progress = ((currentPosition + 1) / salahPositions.length) * 100;

  const handleStart = useCallback(() => {
    setStarted(true);
    setCurrentPosition(0);
    setCompleted(false);
    setRepetitionCount(0);
  }, []);

  const handleNext = useCallback(() => {
    const times = position.times || 1;

    if (repetitionCount + 1 < times) {
      setRepetitionCount((prev) => prev + 1);
    } else {
      // Move to next position
      if (currentPosition < salahPositions.length - 1) {
        setCurrentPosition((prev) => prev + 1);
        setRepetitionCount(0);
        setShowTip(false);
      } else {
        // Prayer complete!
        setCompleted(true);
        addXP(100);
      }
    }
  }, [position.times, repetitionCount, currentPosition, addXP]);

  const handleRestart = useCallback(() => {
    setStarted(false);
    setCompleted(false);
    setCurrentPosition(0);
    setRepetitionCount(0);
    setShowTip(false);
  }, []);

  // Welcome screen
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card variant="elevated" padding="lg" className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              🙏
            </motion.div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Learn to Pray" : "تعلم الصلاة"}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {lang === "en"
                ? "This simulation will guide you through a 2 rak'ah prayer (like Fajr) step by step with all the recitations."
                : "هذه المحاكاة سترشدك خلال صلاة ركعتين (مثل الفجر) خطوة بخطوة مع جميع الأذكار."}
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                <strong>{lang === "en" ? "Time:" : "الوقت:"}</strong> ~10{" "}
                {lang === "en" ? "minutes" : "دقائق"}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                <strong>{lang === "en" ? "Positions:" : "الأوضاع:"}</strong>{" "}
                {salahPositions.length}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              leftIcon={<Play className="w-5 h-5" />}
              fullWidth
            >
              {lang === "en" ? "Start Learning" : "ابدأ التعلم"}
            </Button>

            <Link href={`/journey/${chapterId}`} className="mt-4 inline-block">
              <Button
                variant="ghost"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back to Chapter" : "العودة للفصل"}
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Completion screen
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card variant="elevated" padding="lg" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Prayer Complete!" : "اكتملت الصلاة!"}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {lang === "en"
                ? "Masha'Allah! You've learned the basics of a 2 rak'ah prayer. Practice makes perfect!"
                : "ما شاء الله! لقد تعلمت أساسيات صلاة الركعتين. الممارسة تصنع الكمال!"}
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 mb-6">
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                {lang === "en"
                  ? "💡 Tip: For 3 or 4 rak'ah prayers, you add more rak'ahs but only recite Al-Fatiha (without an additional surah) after the second rak'ah."
                  : "💡 نصيحة: لصلاة 3 أو 4 ركعات، تضيف المزيد من الركعات ولكن تقرأ الفاتحة فقط (بدون سورة إضافية) بعد الركعة الثانية."}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-6">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">
                +100 XP {lang === "en" ? "earned!" : "مكتسبة!"}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRestart}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="flex-1"
              >
                {lang === "en" ? "Practice Again" : "تدرب مرة أخرى"}
              </Button>
              <Link href={`/journey/${chapterId}`} className="flex-1">
                <Button
                  variant="primary"
                  leftIcon={<Home className="w-4 h-4" />}
                  fullWidth
                >
                  {lang === "en" ? "Continue" : "متابعة"}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main simulation view
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {lang === "en" ? "Restart" : "إعادة"}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {currentPosition + 1}/{salahPositions.length}
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPosition}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Position name */}
            <div className="text-center mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {position.name[lang]}
              </h1>
              <p className="text-emerald-600 dark:text-emerald-400 font-arabic text-lg">
                {position.arabicName}
              </p>
              {position.isOptional && (
                <span className="inline-block mt-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full">
                  {lang === "en" ? "First 2 rak'ah only" : "أول ركعتين فقط"}
                </span>
              )}
            </div>

            {/* Position illustration */}
            <div className="flex justify-center mb-4">
              <motion.div
                className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-6xl">{position.positionImage}</span>

                {/* Counter badge */}
                {position.times && position.times > 1 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {repetitionCount + 1}/{position.times}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Description */}
            <Card className="mb-4">
              <p className="text-slate-700 dark:text-slate-300 text-sm text-center">
                {position.description[lang]}
              </p>
            </Card>

            {/* Recitation */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {lang === "en" ? "Recitation" : "الذكر"}
                </span>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                >
                  <Volume2 className="w-4 h-4" />
                  {showTranslation
                    ? lang === "en"
                      ? "Hide meaning"
                      : "إخفاء المعنى"
                    : lang === "en"
                      ? "Show meaning"
                      : "إظهار المعنى"}
                </button>
              </div>

              {/* Arabic */}
              <p className="text-xl md:text-2xl font-arabic text-emerald-800 dark:text-emerald-200 text-right leading-loose mb-3">
                {position.recitation.arabic}
              </p>

              {/* Transliteration */}
              <p className="text-sm text-emerald-700 dark:text-emerald-300 italic mb-2">
                {position.recitation.transliteration}
              </p>

              {/* Translation */}
              <AnimatePresence>
                {showTranslation && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-emerald-600 dark:text-emerald-400 border-t border-emerald-200 dark:border-emerald-800 pt-2 mt-2"
                  >
                    {position.recitation.meaning[lang]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Tip button */}
            {position.tip && (
              <div className="mb-4">
                <button
                  onClick={() => setShowTip(!showTip)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  <Info className="w-4 h-4" />
                  {lang === "en" ? "Show tip" : "أظهر نصيحة"}
                </button>

                <AnimatePresence>
                  {showTip && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          💡 {position.tip[lang]}
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="min-w-[200px]"
              >
                {position.times && repetitionCount < position.times - 1
                  ? lang === "en"
                    ? `Repeat (${repetitionCount + 1}/${position.times})`
                    : `كرر (${repetitionCount + 1}/${position.times})`
                  : currentPosition < salahPositions.length - 1
                    ? lang === "en"
                      ? "Next Position"
                      : "الوضع التالي"
                    : lang === "en"
                      ? "Complete"
                      : "إنهاء"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
