"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";
import { useNarrativeStore } from "@/lib/stores/narrativeStore";

// Historical events with enhanced narrative data
interface HistoricalScene {
  id: string;
  year: number;
  era: string;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  location: string;
  narrator: string;
  narration: { en: string; ar: string };
  scene:
    | "desert"
    | "cave"
    | "mosque"
    | "night"
    | "dawn"
    | "battle"
    | "journey"
    | "city";
  mood: "peaceful" | "dramatic" | "hopeful" | "solemn" | "triumphant";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  mapRoute?: { from: string; to: string };
}

const historicalScenes: HistoricalScene[] = [
  {
    id: "birth",
    year: 570,
    era: "Pre-Islam",
    title: { en: "The Year of the Elephant", ar: "عام الفيل" },
    subtitle: { en: "Birth of the Final Prophet", ar: "ولادة خاتم الأنبياء" },
    description: {
      en: "In the blessed city of Makkah, under the protection of the Sacred House, a child was born who would change the world forever. His father had passed before his birth, and he was named Muhammad - 'The Praised One.'",
      ar: "في مكة المباركة، تحت حماية البيت الحرام، ولد طفل سيغير العالم إلى الأبد. توفي والده قبل ولادته، وسُمي محمداً - المحمود.",
    },
    location: "Makkah",
    narrator: "Khadijah",
    narration: {
      en: "The stars shone brighter that night, as if the heavens themselves celebrated. Little did the world know that the final messenger had arrived...",
      ar: "تألقت النجوم في تلك الليلة كأن السماوات نفسها تحتفل. لم يكن العالم يعلم أن خاتم المرسلين قد جاء...",
    },
    scene: "night",
    mood: "peaceful",
    colors: {
      primary: "from-indigo-950",
      secondary: "via-purple-900",
      accent: "to-slate-900",
    },
  },
  {
    id: "revelation",
    year: 610,
    era: "Revelation",
    title: { en: "The First Light", ar: "النور الأول" },
    subtitle: { en: "Iqra - Read!", ar: "اقرأ!" },
    description: {
      en: "In the solitude of Cave Hira, during the sacred month of Ramadan, Angel Jibreel descended with the first words of the Quran. 'Read!' he commanded, and with those words, prophecy returned to mankind.",
      ar: "في عزلة غار حراء، في شهر رمضان المبارك، نزل الملك جبريل بأولى آيات القرآن. 'اقرأ!' أمره، وبتلك الكلمات عادت النبوة للبشرية.",
    },
    location: "Cave Hira, Mount Noor",
    narrator: "Abu Bakr",
    narration: {
      en: "When he returned from the mountain, trembling with awe, Khadijah wrapped him in her cloak and spoke words of comfort. She knew in her heart - her husband was chosen by Allah.",
      ar: "حين عاد من الجبل، يرتجف من الرهبة، لفته خديجة بردائها وقالت كلمات مطمئنة. علمت في قلبها - زوجها اختاره الله.",
    },
    scene: "cave",
    mood: "dramatic",
    colors: {
      primary: "from-amber-900",
      secondary: "via-orange-800",
      accent: "to-stone-900",
    },
  },
  {
    id: "persecution",
    year: 615,
    era: "Persecution",
    title: { en: "The First Migration", ar: "الهجرة الأولى" },
    subtitle: { en: "Seeking Refuge in Abyssinia", ar: "اللجوء إلى الحبشة" },
    description: {
      en: "As persecution intensified, the Prophet sent his followers to seek refuge with the just Christian king of Abyssinia. This was the first Hijrah in Islam, a testament to the believers' courage.",
      ar: "مع تصاعد الاضطهاد، أرسل النبي ﷺ أتباعه للجوء إلى الملك المسيحي العادل في الحبشة. كانت هذه أول هجرة في الإسلام، شاهدة على شجاعة المؤمنين.",
    },
    location: "Makkah to Abyssinia",
    narrator: "Bilal",
    narration: {
      en: "I remember those days... Dragged through the burning streets, a boulder crushing my chest, yet all I could say was 'Ahad, Ahad' - One God, One God. Freedom would come, but not yet.",
      ar: "أتذكر تلك الأيام... مجروراً عبر الشوارع الملتهبة، صخرة تسحق صدري، ومع ذلك كل ما أستطيع قوله 'أحد، أحد'. الحرية ستأتي، لكن ليس بعد.",
    },
    scene: "desert",
    mood: "dramatic",
    colors: {
      primary: "from-orange-900",
      secondary: "via-red-800",
      accent: "to-amber-950",
    },
    mapRoute: { from: "Makkah", to: "Abyssinia" },
  },
  {
    id: "isra",
    year: 619,
    era: "Miracles",
    title: { en: "The Night Journey", ar: "الإسراء والمعراج" },
    subtitle: { en: "From Makkah to the Heavens", ar: "من مكة إلى السماوات" },
    description: {
      en: "On a single miraculous night, the Prophet was taken from Makkah to Jerusalem, then ascended through the seven heavens. He met the prophets of old and received the gift of five daily prayers.",
      ar: "في ليلة معجزة واحدة، أُسري بالنبي ﷺ من مكة إلى القدس، ثم عرج عبر السماوات السبع. التقى بالأنبياء السابقين وتلقى هدية الصلوات الخمس.",
    },
    location: "Makkah to Jerusalem to The Heavens",
    narrator: "Salman",
    narration: {
      en: "Beyond the stars, beyond the furthest galaxies, to a place where no creation had ever reached. There, in the Divine Presence, the prayers were ordained - a direct connection between servant and Creator.",
      ar: "ما وراء النجوم، ما وراء أبعد المجرات، إلى مكان لم يصله خلق من قبل. هناك، في الحضرة الإلهية، فُرضت الصلوات - اتصال مباشر بين العبد والخالق.",
    },
    scene: "night",
    mood: "solemn",
    colors: {
      primary: "from-violet-950",
      secondary: "via-indigo-900",
      accent: "to-blue-950",
    },
  },
  {
    id: "hijrah",
    year: 622,
    era: "Hijrah",
    title: { en: "The Great Migration", ar: "الهجرة الكبرى" },
    subtitle: { en: "A New Beginning", ar: "بداية جديدة" },
    description: {
      en: "Under the cover of night, with assassins at his door, the Prophet and Abu Bakr embarked on the 450km journey to Madinah. This Hijrah would mark Year One of the Islamic calendar.",
      ar: "تحت جنح الليل، مع القتلة على بابه، انطلق النبي ﷺ وأبو بكر في رحلة 450 كم إلى المدينة. هذه الهجرة ستكون السنة الأولى في التقويم الإسلامي.",
    },
    location: "Makkah to Madinah",
    narrator: "Abu Bakr",
    narration: {
      en: "In the cave of Thawr, with the enemy's footsteps above us, I trembled. But he said, 'Grieve not, Allah is with us.' A spider spun its web, a dove built her nest - and the enemies turned away.",
      ar: "في غار ثور، مع خطوات العدو فوقنا، ارتجفت. لكنه قال: 'لا تحزن، إن الله معنا.' نسج العنكبوت شبكته، بنت الحمامة عشها - وانصرف الأعداء.",
    },
    scene: "journey",
    mood: "hopeful",
    colors: {
      primary: "from-emerald-900",
      secondary: "via-teal-800",
      accent: "to-cyan-950",
    },
    mapRoute: { from: "Makkah", to: "Madinah" },
  },
  {
    id: "badr",
    year: 624,
    era: "Madinah Period",
    title: { en: "The Day of Criterion", ar: "يوم الفرقان" },
    subtitle: { en: "Victory at Badr", ar: "النصر في بدر" },
    description: {
      en: "313 believers faced an army of 1,000. The Prophet prayed through the night, and Allah sent angels to fight alongside the Muslims. This victory proved that truth would triumph.",
      ar: "313 مؤمناً واجهوا جيشاً من 1000. صلى النبي ﷺ طوال الليل، وأرسل الله ملائكة للقتال مع المسلمين. هذا النصر أثبت أن الحق سينتصر.",
    },
    location: "Wells of Badr",
    narrator: "Bilal",
    narration: {
      en: "The sands trembled that day. I watched men who had once tortured me now flee before the army of truth. Allah had fulfilled His promise - the oppressed would one day be free.",
      ar: "ارتجفت الرمال في ذلك اليوم. شاهدت رجالاً عذبوني ذات يوم يفرون الآن أمام جيش الحق. وفى الله بوعده - المظلومون سيتحررون يوماً.",
    },
    scene: "battle",
    mood: "triumphant",
    colors: {
      primary: "from-red-900",
      secondary: "via-orange-800",
      accent: "to-amber-900",
    },
  },
  {
    id: "trench",
    year: 627,
    era: "Madinah Period",
    title: { en: "The Siege of Madinah", ar: "حصار المدينة" },
    subtitle: { en: "Battle of the Trench", ar: "غزوة الخندق" },
    description: {
      en: "10,000 warriors surrounded Madinah. On Salman al-Farisi's advice, the Muslims dug a trench - a strategy unknown to the Arabs. Faith and innovation together saved the city.",
      ar: "10,000 محارب حاصروا المدينة. بنصيحة سلمان الفارسي، حفر المسلمون خندقاً - استراتيجية لم يعرفها العرب. الإيمان والابتكار معاً أنقذا المدينة.",
    },
    location: "Madinah",
    narrator: "Salman",
    narration: {
      en: "They thought it strange - a Persian suggesting defense tactics! But the Prophet embraced every good idea, from any source. That is the beauty of Islam - wisdom belongs to all.",
      ar: "اعتقدوا أنه غريب - فارسي يقترح تكتيكات دفاعية! لكن النبي ﷺ رحب بكل فكرة جيدة، من أي مصدر. هذا جمال الإسلام - الحكمة للجميع.",
    },
    scene: "battle",
    mood: "dramatic",
    colors: {
      primary: "from-slate-800",
      secondary: "via-stone-700",
      accent: "to-zinc-900",
    },
  },
  {
    id: "conquest",
    year: 630,
    era: "Victory",
    title: { en: "The Peaceful Conquest", ar: "الفتح السلمي" },
    subtitle: { en: "Return to Makkah", ar: "العودة إلى مكة" },
    description: {
      en: "Eight years after being driven out, the Prophet returned with 10,000 believers. Not a single drop of blood was shed. He entered the Ka'bah, removed 360 idols, and declared: 'Truth has come, and falsehood has vanished.'",
      ar: "بعد ثماني سنوات من الطرد، عاد النبي ﷺ مع 10,000 مؤمن. لم تُسفك قطرة دم واحدة. دخل الكعبة، أزال 360 صنماً، وأعلن: 'جاء الحق وزهق الباطل.'",
    },
    location: "Makkah",
    narrator: "Khadijah",
    narration: {
      en: "If only I had lived to see it... The house we once fled now welcomes us home. The Prophet's mercy that day taught humanity the meaning of true victory - not revenge, but forgiveness.",
      ar: "لو عشت لأرى ذلك... البيت الذي هربنا منه يوماً يرحب بنا الآن. رحمة النبي في ذلك اليوم علمت البشرية معنى النصر الحقيقي - ليس الانتقام، بل المغفرة.",
    },
    scene: "mosque",
    mood: "triumphant",
    colors: {
      primary: "from-emerald-800",
      secondary: "via-green-700",
      accent: "to-teal-900",
    },
  },
  {
    id: "farewell",
    year: 632,
    era: "Completion",
    title: { en: "The Final Sermon", ar: "خطبة الوداع" },
    subtitle: { en: "Farewell Pilgrimage", ar: "حجة الوداع" },
    description: {
      en: "Over 100,000 pilgrims gathered at Arafat. The Prophet delivered his final sermon, proclaiming the equality of all humans. Then the verse descended: 'Today I have perfected your religion.'",
      ar: "اجتمع أكثر من 100,000 حاج في عرفات. ألقى النبي ﷺ خطبته الأخيرة، معلناً مساواة جميع البشر. ثم نزلت الآية: 'اليوم أكملت لكم دينكم.'",
    },
    location: "Mount Arafat",
    narrator: "Bilal",
    narration: {
      en: "When he said 'Have I conveyed the message?' and we cried 'Yes!', tears streamed down my face. I knew then... our beloved Prophet's time with us was coming to an end.",
      ar: "حين قال 'هل بلغت؟' وصرخنا 'نعم!'، انهمرت الدموع من عيني. علمت حينها... أن وقت نبينا الحبيب معنا يقترب من نهايته.",
    },
    scene: "dawn",
    mood: "solemn",
    colors: {
      primary: "from-amber-800",
      secondary: "via-yellow-700",
      accent: "to-orange-900",
    },
  },
  {
    id: "legacy",
    year: 632,
    era: "Completion",
    title: { en: "The Eternal Legacy", ar: "الإرث الخالد" },
    subtitle: { en: "A Light That Never Fades", ar: "نور لا ينطفئ" },
    description: {
      en: "The Prophet passed away in Madinah, his head resting on Aisha's lap. But his message lives on - carried by billions across centuries, a light guiding humanity until the Day of Judgment.",
      ar: "توفي النبي ﷺ في المدينة، رأسه في حجر عائشة. لكن رسالته باقية - يحملها المليارات عبر القرون، نور يهدي البشرية إلى يوم القيامة.",
    },
    location: "Madinah",
    narrator: "Abu Bakr",
    narration: {
      en: "When I announced his passing, people wept. But I said: 'Whoever worshipped Muhammad, know that Muhammad has died. But whoever worships Allah, know that Allah is Ever-Living and never dies.'",
      ar: "حين أعلنت وفاته، بكى الناس. لكنني قلت: 'من كان يعبد محمداً، فإن محمداً قد مات. ومن كان يعبد الله، فإن الله حي لا يموت.'",
    },
    scene: "mosque",
    mood: "peaceful",
    colors: {
      primary: "from-slate-900",
      secondary: "via-slate-800",
      accent: "to-slate-950",
    },
  },
  {
    id: "hudaybiyyah",
    year: 628,
    era: "Madinah Period",
    title: { en: "The Treaty of Hudaybiyyah", ar: "صلح الحديبية" },
    subtitle: { en: "Victory Through Peace", ar: "النصر بالسلام" },
    description: {
      en: "When the Muslims marched to perform Umrah, they were stopped at Hudaybiyyah. Though some companions were disappointed by the treaty terms, Allah called it 'a manifest victory' - peace would allow Islam to spread more than any battle.",
      ar: "حين سار المسلمون لأداء العمرة، أوقفوا في الحديبية. رغم إحباط بعض الصحابة من شروط الصلح، سماه الله 'فتحاً مبيناً' - فالسلام سيسمح للإسلام بالانتشار أكثر من أي معركة.",
    },
    location: "Hudaybiyyah",
    narrator: "Salman",
    narration: {
      en: "The Prophet's wisdom was beyond our understanding. What seemed like defeat was divine strategy. In two years of peace, more people embraced Islam than in all the years of conflict combined.",
      ar: "كانت حكمة النبي ﷺ فوق إدراكنا. ما بدا هزيمة كان استراتيجية إلهية. في عامين من السلام، اعتنق الإسلام أكثر مما في كل سنوات الصراع مجتمعة.",
    },
    scene: "desert",
    mood: "hopeful",
    colors: {
      primary: "from-cyan-900",
      secondary: "via-teal-800",
      accent: "to-emerald-950",
    },
  },
  {
    id: "khaybar",
    year: 628,
    era: "Madinah Period",
    title: { en: "The Conquest of Khaybar", ar: "فتح خيبر" },
    subtitle: { en: "The Lion's Victory", ar: "نصر الأسد" },
    description: {
      en: "The fortress of Khaybar seemed impregnable. The Prophet declared: 'Tomorrow I shall give the banner to a man whom Allah and His Messenger love.' That man was Ali, who conquered the fortress with legendary valor.",
      ar: "بدت قلعة خيبر منيعة. أعلن النبي ﷺ: 'لأعطين الراية غداً رجلاً يحبه الله ورسوله.' كان ذلك الرجل علياً، الذي فتح القلعة بشجاعة أسطورية.",
    },
    location: "Khaybar",
    narrator: "Bilal",
    narration: {
      en: "Ali, despite his eye ailment, was blessed by the Prophet's prayer and charged forth like a lion. The massive fortress gate became his shield that day. Victory belongs to those with true faith.",
      ar: "علي، رغم مرض عينيه، بارك النبي ﷺ دعاءه وانطلق كالأسد. بوابة القلعة الضخمة أصبحت درعه في ذلك اليوم. النصر لمن يملك الإيمان الحقيقي.",
    },
    scene: "battle",
    mood: "triumphant",
    colors: {
      primary: "from-rose-900",
      secondary: "via-red-800",
      accent: "to-orange-950",
    },
  },
  {
    id: "uhud",
    year: 625,
    era: "Madinah Period",
    title: { en: "The Test of Uhud", ar: "اختبار أحد" },
    subtitle: { en: "Lessons in Adversity", ar: "دروس في الشدة" },
    description: {
      en: "Victory seemed certain until the archers left their posts. The tide turned, and 70 companions fell as martyrs, including Hamza, the Prophet's beloved uncle. Yet from tragedy came wisdom - obedience to the Prophet is never optional.",
      ar: "بدا النصر مؤكداً حتى ترك الرماة مواقعهم. انقلبت الموازين، وسقط 70 صحابياً شهداء، بينهم حمزة عم النبي ﷺ الحبيب. لكن من المأساة جاءت الحكمة - طاعة النبي ليست اختيارية أبداً.",
    },
    location: "Mount Uhud",
    narrator: "Abu Bakr",
    narration: {
      en: "The Prophet was wounded, his blessed face bleeding. False rumors of his death spread panic. But he stood firm, rallying us: 'I am here, servants of Allah!' In defeat, we found our greatest lessons.",
      ar: "جُرح النبي ﷺ، وجهه المبارك ينزف. انتشرت شائعات كاذبة عن وفاته. لكنه ثبت، يجمعنا: 'أنا هنا، يا عباد الله!' في الهزيمة، وجدنا أعظم دروسنا.",
    },
    scene: "battle",
    mood: "dramatic",
    colors: {
      primary: "from-stone-800",
      secondary: "via-neutral-700",
      accent: "to-zinc-900",
    },
  },
  {
    id: "first_converts",
    year: 610,
    era: "Revelation",
    title: { en: "The First Believers", ar: "المؤمنون الأوائل" },
    subtitle: { en: "Seeds of a Global Faith", ar: "بذور إيمان عالمي" },
    description: {
      en: "Khadijah was the first to believe, followed by young Ali, the freed slave Zayd, and the noble Abu Bakr. These four souls were the foundation upon which a civilization would be built - a woman, a child, a former slave, and a merchant.",
      ar: "كانت خديجة أول من آمن، تلاها علي الصغير، والعبد المحرر زيد، والنبيل أبو بكر. هذه الأرواح الأربع كانت الأساس الذي بُني عليه حضارة - امرأة، طفل، عبد سابق، وتاجر.",
    },
    location: "Makkah",
    narrator: "Khadijah",
    narration: {
      en: "When Muhammad returned from the cave, trembling, I held him close. 'Allah would never disgrace you,' I told him. I believed not because I saw miracles, but because I knew the purity of his heart.",
      ar: "حين عاد محمد من الغار مرتجفاً، ضممته إلي. 'والله لا يخزيك الله أبداً،' قلت له. آمنت ليس لأنني رأيت معجزات، بل لأنني عرفت طهارة قلبه.",
    },
    scene: "night",
    mood: "peaceful",
    colors: {
      primary: "from-purple-950",
      secondary: "via-violet-900",
      accent: "to-indigo-950",
    },
  },
  {
    id: "boycott",
    year: 616,
    era: "Persecution",
    title: { en: "The Years of Suffering", ar: "سنوات المعاناة" },
    subtitle: { en: "The Boycott of Banu Hashim", ar: "حصار بني هاشم" },
    description: {
      en: "For three agonizing years, the Muslims and the Prophet's clan were confined to a valley, banned from trade, food, and marriage. Children cried from hunger, yet not a single soul abandoned the faith.",
      ar: "لثلاث سنوات مؤلمة، حُصر المسلمون وقبيلة النبي ﷺ في شعب، ممنوعين من التجارة والطعام والزواج. بكى الأطفال من الجوع، ومع ذلك لم تتخل روح واحدة عن الإيمان.",
    },
    location: "Shi'b Abi Talib, Makkah",
    narrator: "Bilal",
    narration: {
      en: "We ate leaves and leather. The sound of crying children echoed through the valley. But look at us now - those who starved in that valley, their descendants fill the earth with the call to prayer.",
      ar: "أكلنا أوراق الشجر والجلود. صدى بكاء الأطفال يتردد في الشعب. لكن انظروا إلينا الآن - من جاعوا في ذلك الشعب، أحفادهم يملأون الأرض بالأذان.",
    },
    scene: "desert",
    mood: "dramatic",
    colors: {
      primary: "from-amber-950",
      secondary: "via-yellow-900",
      accent: "to-orange-950",
    },
  },
  {
    id: "year_of_sorrow",
    year: 619,
    era: "Persecution",
    title: { en: "The Year of Sorrow", ar: "عام الحزن" },
    subtitle: { en: "Loss and Resilience", ar: "الفقدان والصمود" },
    description: {
      en: "Within weeks, the Prophet lost both his beloved wife Khadijah and his protective uncle Abu Talib. Alone and grieving, he traveled to Ta'if seeking support, only to be stoned until his blessed feet bled. Yet he prayed for their guidance.",
      ar: "في أسابيع، فقد النبي ﷺ زوجته الحبيبة خديجة وعمه الحامي أبا طالب. وحيداً حزيناً، سافر إلى الطائف طالباً الدعم، ليُرجم حتى نزفت قدماه المباركتان. ومع ذلك دعا لهدايتهم.",
    },
    location: "Ta'if",
    narrator: "Abu Bakr",
    narration: {
      en: "When the angel offered to crush Ta'if between two mountains, the Prophet refused: 'Perhaps from their children will come those who worship Allah alone.' His mercy knew no bounds, even in his darkest hour.",
      ar: "حين عرض الملك سحق الطائف بين جبلين، رفض النبي ﷺ: 'لعل من أصلابهم من يعبد الله وحده.' رحمته لا حدود لها، حتى في أحلك ساعاته.",
    },
    scene: "desert",
    mood: "solemn",
    colors: {
      primary: "from-slate-950",
      secondary: "via-gray-900",
      accent: "to-stone-950",
    },
  },
];

// Scene background component with parallax effect
const SceneBackground = ({
  scene,
  colors,
}: {
  scene: HistoricalScene["scene"];
  colors: HistoricalScene["colors"];
  mood?: HistoricalScene["mood"];
}) => {
  const getSceneElements = () => {
    switch (scene) {
      case "desert":
        return (
          <>
            <div className="absolute top-16 right-16 w-24 h-24 rounded-full bg-linear-to-br from-amber-300 to-orange-500 blur-sm opacity-80" />
            <svg
              className="absolute bottom-0 left-0 right-0 h-1/2"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(217, 119, 6, 0.3)"
                d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L0,320Z"
              />
              <path
                fill="rgba(180, 83, 9, 0.4)"
                d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,213.3C672,235,768,245,864,229.3C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
              />
            </svg>
          </>
        );

      case "cave":
        return (
          <>
            <div className="absolute top-1/4 right-1/4 w-48 h-64 bg-linear-to-b from-amber-400/30 to-transparent blur-2xl rounded-full transform -rotate-12" />
            <motion.div
              className="absolute top-1/4 right-1/3 w-32 h-96 bg-linear-to-b from-amber-300/40 to-transparent"
              style={{ transform: "rotate(-15deg)" }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        );

      case "mosque":
        return (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-2/3">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMax slice"
              >
                <ellipse
                  cx="400"
                  cy="200"
                  rx="120"
                  ry="100"
                  fill="rgba(0,0,0,0.3)"
                />
                <rect
                  x="150"
                  y="100"
                  width="20"
                  height="300"
                  fill="rgba(0,0,0,0.3)"
                />
                <rect
                  x="630"
                  y="100"
                  width="20"
                  height="300"
                  fill="rgba(0,0,0,0.3)"
                />
                <polygon
                  points="160,100 145,130 175,130"
                  fill="rgba(0,0,0,0.3)"
                />
                <polygon
                  points="640,100 625,130 655,130"
                  fill="rgba(0,0,0,0.3)"
                />
                <rect
                  x="200"
                  y="250"
                  width="400"
                  height="150"
                  fill="rgba(0,0,0,0.3)"
                />
              </svg>
            </div>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-4 bg-amber-400/60 rounded-full blur-sm"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${50 + Math.sin(i) * 10}%`,
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </>
        );

      case "night":
        return (
          <>
            <motion.div
              className="absolute top-12 right-20 w-20 h-20"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-yellow-100 to-amber-200 rounded-full shadow-lg shadow-amber-200/30" />
            </motion.div>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        );

      case "dawn":
        return (
          <>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-linear-to-t from-amber-400/30 via-orange-300/20 to-transparent" />
            <motion.div
              className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-linear-to-t from-amber-400 to-yellow-300"
              animate={{ y: [20, 0, 20] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </>
        );

      case "battle":
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-red-900/30 to-transparent" />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-amber-800/20 blur-2xl"
                style={{
                  width: 100 + Math.random() * 100,
                  height: 60,
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 30}%`,
                }}
                animate={{ x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        );

      case "journey":
        return (
          <>
            <svg
              className="absolute bottom-0 left-0 right-0 h-2/3"
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
            >
              <path
                d="M0,350 Q200,300 400,320 Q600,340 800,300"
                fill="none"
                stroke="rgba(217, 119, 6, 0.4)"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
            <motion.div
              className="absolute w-3 h-3 bg-amber-400/60 rounded-full"
              initial={{ left: "0%", bottom: "40%" }}
              animate={{
                left: ["0%", "50%", "100%"],
                bottom: ["40%", "35%", "38%"],
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <svg
              className="absolute bottom-0 left-0 right-0 h-1/3"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,200 100,100 200,150 300,80 400,130 500,60 600,120 700,90 800,140 800,200"
                fill="rgba(30, 41, 59, 0.4)"
              />
            </svg>
          </>
        );

      case "city":
        return (
          <>
            <svg
              className="absolute bottom-0 left-0 right-0 h-1/2"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
            >
              <rect
                x="50"
                y="150"
                width="60"
                height="150"
                fill="rgba(0,0,0,0.3)"
              />
              <rect
                x="130"
                y="100"
                width="80"
                height="200"
                fill="rgba(0,0,0,0.3)"
              />
              <rect
                x="300"
                y="80"
                width="100"
                height="220"
                fill="rgba(0,0,0,0.3)"
              />
              <ellipse
                cx="350"
                cy="80"
                rx="40"
                ry="30"
                fill="rgba(0,0,0,0.3)"
              />
              <rect
                x="620"
                y="100"
                width="60"
                height="200"
                fill="rgba(0,0,0,0.3)"
              />
            </svg>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute inset-0 bg-linear-to-b ${colors.primary} ${colors.secondary} ${colors.accent} overflow-hidden`}
    >
      {getSceneElements()}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
};

// Animated migration map
const MigrationMap = ({ from, to }: { from: string; to: string }) => {
  return (
    <motion.div
      className="absolute bottom-8 left-8 w-48 h-32 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-xs text-amber-400/80 mb-2 font-semibold">
        Migration Route
      </div>
      <svg className="w-full h-20" viewBox="0 0 180 70">
        <motion.path
          d="M20,50 Q90,20 160,45"
          fill="none"
          stroke="rgba(251, 191, 36, 0.6)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.circle
          r="4"
          fill="#fbbf24"
          initial={{ cx: 20, cy: 50 }}
          animate={{ cx: 160, cy: 45 }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        <circle
          cx="20"
          cy="50"
          r="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <text x="20" y="65" textAnchor="middle" fill="white" fontSize="8">
          {from}
        </text>
        <circle cx="160" cy="45" r="6" fill="#10b981" />
        <text x="160" y="60" textAnchor="middle" fill="white" fontSize="8">
          {to}
        </text>
      </svg>
    </motion.div>
  );
};

// Narrator avatar
const NarratorAvatar = ({
  narrator,
  isActive,
}: {
  narrator: string;
  isActive: boolean;
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {narrator.charAt(0)}
      </motion.div>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Volume2 className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Typewriter text effect
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default function HistoryPage() {
  const { language: lang } = useSettingsStore();
  const [currentScene, setCurrentScene] = useState(0);
  const [isNarrating, setIsNarrating] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const scene = historicalScenes[currentScene];
  const progress = ((currentScene + 1) / historicalScenes.length) * 100;

  const goToNext = useCallback(() => {
    if (currentScene < historicalScenes.length - 1) {
      setCurrentScene((prev) => prev + 1);
      setIsNarrating(true);
      setShowFullDescription(false);
    }
  }, [currentScene]);

  const goToPrev = useCallback(() => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
      setIsNarrating(true);
      setShowFullDescription(false);
    }
  }, [currentScene]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 100) goToPrev();
    else if (info.offset.x < -100) goToNext();
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        if (currentScene < historicalScenes.length - 1) goToNext();
        else setIsAutoPlaying(false);
      }, 10000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentScene, goToNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goToNext();
      else if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <SceneBackground
              scene={scene.scene}
              colors={scene.colors}
              mood={scene.mood}
            />

            <div className="absolute inset-0 flex flex-col">
              {/* Header */}
              <div className="relative z-50 flex items-center justify-between p-4 bg-linear-to-b from-black/50 to-transparent">
                <Link href="/journey">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    className="text-white/90 hover:text-white hover:bg-white/10"
                  >
                    {lang === "en" ? "Exit" : "خروج"}
                  </Button>
                </Link>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsNarrating(!isNarrating)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isNarrating ? (
                      <Volume2 className="w-4 h-4 text-white" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col justify-end pb-32 px-4 md:px-8">
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-bold">
                      {scene.year} CE
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <MapPin className="w-3 h-3 text-white/70" />
                    <span className="text-white/80 text-sm">
                      {scene.location}
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {scene.title[lang]}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-amber-300/90 mb-6 drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {scene.subtitle[lang]}
                </motion.p>

                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p
                    className={`text-white/90 text-base md:text-lg leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}
                  >
                    {scene.description[lang]}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-amber-400 text-sm mt-2 hover:text-amber-300 transition-colors"
                  >
                    {showFullDescription
                      ? lang === "en"
                        ? "Show less"
                        : "أقل"
                      : lang === "en"
                        ? "Read more"
                        : "اقرأ المزيد"}
                  </button>
                </motion.div>

                {isNarrating && (
                  <motion.div
                    className="mt-6 max-w-xl bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-start gap-4">
                      <NarratorAvatar
                        narrator={scene.narrator}
                        isActive={isNarrating}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-emerald-400 font-semibold mb-1">
                          {scene.narrator}{" "}
                          {lang === "en" ? "narrates:" : "يروي:"}
                        </div>
                        <p className="text-white/80 text-sm italic leading-relaxed">
                          <TypewriterText
                            key={scene.id}
                            text={`"${scene.narration[lang]}"`}
                          />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="absolute bottom-0 left-0 right-0 z-50 bg-linear-to-t from-black/80 via-black/50 to-transparent pt-16 pb-6 px-4">
                <div className="max-w-md mx-auto mb-4">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-amber-400 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/50">
                    <span>
                      {currentScene + 1} / {historicalScenes.length}
                    </span>
                    <span>{scene.era}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={goToPrev}
                    disabled={currentScene === 0}
                    leftIcon={<ChevronLeft className="w-5 h-5" />}
                    className="text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    {lang === "en" ? "Previous" : "السابق"}
                  </Button>

                  <div className="flex gap-1">
                    {historicalScenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentScene(idx);
                          setIsNarrating(true);
                          setShowFullDescription(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentScene ? "bg-amber-400 w-6" : idx < currentScene ? "bg-emerald-500/60" : "bg-white/30"}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={goToNext}
                    disabled={currentScene === historicalScenes.length - 1}
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                    className="text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    {lang === "en" ? "Next" : "التالي"}
                  </Button>
                </div>

                <motion.p
                  className="text-center text-white/40 text-xs mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  {lang === "en"
                    ? "Swipe or use arrow keys to navigate"
                    : "اسحب أو استخدم مفاتيح الأسهم للتنقل"}
                </motion.p>
              </div>

              {scene.mapRoute && (
                <MigrationMap
                  from={scene.mapRoute.from}
                  to={scene.mapRoute.to}
                />
              )}

              <motion.div
                className="absolute top-24 right-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Sparkles className="w-6 h-6 text-amber-400/50" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Era quick navigation */}
      <div className="absolute top-20 right-4 z-50 hidden md:block">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10">
          {["Pre-Islam", "Revelation", "Hijrah", "Victory", "Completion"].map(
            (era) => {
              const eraScene = historicalScenes.findIndex((s) => s.era === era);
              const isActive = scene.era === era;
              return (
                <button
                  key={era}
                  onClick={() => {
                    if (eraScene >= 0) {
                      setCurrentScene(eraScene);
                      setIsNarrating(true);
                      setShowFullDescription(false);
                    }
                  }}
                  className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? "bg-amber-500/30 text-amber-300" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                >
                  {era}
                </button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
