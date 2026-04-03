import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

function useGameSounds() {
  const playCorrect = useCallback(() => {
    const AudioCtx = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, t + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.35);
      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.35);
    });
  }, []);

  const playWrong = useCallback(() => {
    const AudioCtxW = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxW) return;
    const ctx = new AudioCtxW();
    const t = ctx.currentTime;
    [220, 196].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.12, t + i * 0.18 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.18 + 0.4);
      osc.start(t + i * 0.18);
      osc.stop(t + i * 0.18 + 0.4);
    });
  }, []);

  return { playCorrect, playWrong };
}

type Screen = "home" | "rules" | "game" | "question" | "results";

interface Question {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  image: string;
  category: string;
  icon: string;
}

const BASE = "https://cdn.poehali.dev/projects/02c8d8da-a831-4034-bb87-c296f961b13f/files/";
const IMG = {
  q1:  BASE + "764d670e-7616-45a5-a3eb-ff923f1756f1.jpg", // Московский Кремль белокаменный
  q2:  BASE + "9e48b6ef-7293-49bc-8d4b-b19fc1d226f2.jpg", // Успенский собор Владимир
  q3:  BASE + "ccd7a97d-1695-4d23-b22a-9264d8539af6.jpg", // Псково-Печерский монастырь пещеры
  q4:  BASE + "a7b7fb4e-a4ed-4969-9164-b77d3f2f73f7.jpg", // Шлемовидные купола
  q5:  BASE + "2d8e7cc4-d0c1-4189-b4ec-89f63d6f7617.jpg", // Троице-Сергиева лавра
  q6:  BASE + "99932ef6-165e-430f-90fb-bb817e8f63f1.jpg", // Новгородский детинец
  q7:  BASE + "2ffb84f0-2058-4702-95aa-11b18574adcb.jpg", // Итальянские зодчие, кирпич
  q8:  BASE + "439559f9-9145-4113-95c4-2d9628105cba.jpg", // Звонница псковская
  q9:  BASE + "8b20f65a-e860-4150-b7e2-9e34c4c57fa0.jpg", // Кирилло-Белозерский монастырь
  q10: BASE + "a765dd24-4af5-45e5-8dfe-d578ab55dfee.jpg", // Белокаменная резьба
  q11: BASE + "f5d9a763-407b-4d2e-bd43-0fe20e65f738.jpg", // Псковский Кром
  q12: BASE + "2840d3ae-a9d0-4e7f-9be7-9b16768e9c37.jpg", // Монастырь в лесу
  q13: BASE + "4df6db29-f525-4c86-b8b0-8d106d44f0f5.jpg", // Феофан Грек фрески
  q14: BASE + "afd95199-0001-4c51-9b08-e47a2d0350a3.jpg", // Соловецкий монастырь
  q15: BASE + "ba21dea2-7a77-40f2-bee0-8ccf52dca5b7.jpg", // Западноевропейский замок донжон
  q16: BASE + "6ed8c77c-1720-41d8-bbe8-17de52be4078.jpg", // Андроников монастырь
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    statement: "Московский Кремль был впервые возведён из белого камня в 1367 году при Дмитрии Донском",
    isTrue: true,
    explanation: "Верно! В 1367 году при Дмитрии Донском деревянный кремль был заменён белокаменным — за что Москва и получила прозвище «Белокаменная».",
    image: IMG.q1,
    category: "Крепости",
    icon: "Castle",
  },
  {
    id: 2,
    statement: "Успенский собор во Владимире строился исключительно из дерева и никогда не имел каменных стен",
    isTrue: false,
    explanation: "Ошибка! Успенский собор во Владимире — белокаменный. Он был построен в XII веке и являлся образцом владимиро-суздальского каменного зодчества.",
    image: IMG.q2,
    category: "Храмы",
    icon: "Church",
  },
  {
    id: 3,
    statement: "Псково-Печерский монастырь основан в XV веке и расположен в естественных пещерах",
    isTrue: true,
    explanation: "Верно! Псково-Печерский монастырь основан в 1473 году. Его уникальность — пещерная церковь и монашеские кельи, вырытые в холме.",
    image: IMG.q3,
    category: "Монастыри",
    icon: "Building",
  },
  {
    id: 4,
    statement: "В архитектуре Древней Руси XIV-XV веков луковичные купола являлись основным и единственным типом завершения храмов",
    isTrue: false,
    explanation: "Ошибка! Луковичные купола стали распространены позже. В XIV-XV вв. использовались шлемовидные купола, особенно характерные для владимирской школы.",
    image: IMG.q4,
    category: "Храмы",
    icon: "Church",
  },
  {
    id: 5,
    statement: "Троице-Сергиева лавра была основана Сергием Радонежским в XIV веке",
    isTrue: true,
    explanation: "Верно! Сергий Радонежский основал монастырь около 1337 года. Со временем он стал крупнейшим монастырём Руси и духовным центром страны.",
    image: IMG.q5,
    category: "Монастыри",
    icon: "Building",
  },
  {
    id: 6,
    statement: "Новгородский детинец (кремль) был перестроен в камне раньше Московского кремля",
    isTrue: true,
    explanation: "Верно! Каменный Новгородский детинец строился с XI века. Московский же кремль получил белокаменные стены только в 1367 году.",
    image: IMG.q6,
    category: "Крепости",
    icon: "Castle",
  },
  {
    id: 7,
    statement: "Красный кирпич для строительства Московского Кремля был завезён из Италии в готовом виде",
    isTrue: false,
    explanation: "Ошибка! Кирпич изготавливался на месте. Зато итальянские архитекторы — Аристотель Фиораванти и другие — руководили строительством в конце XV века.",
    image: IMG.q7,
    category: "Крепости",
    icon: "Castle",
  },
  {
    id: 8,
    statement: "Звонница как тип колокольни была более характерна для Пскова и Новгорода, чем для Москвы",
    isTrue: true,
    explanation: "Верно! Псковская и новгородская архитектура отличалась стеновыми звонницами. Московская традиция предпочитала башенные колокольни.",
    image: IMG.q8,
    category: "Храмы",
    icon: "Church",
  },
  {
    id: 9,
    statement: "Кирилло-Белозерский монастырь основан в конце XIV века и стал одним из крупнейших на Русском Севере",
    isTrue: true,
    explanation: "Верно! Монастырь основан в 1397 году монахом Кириллом. К XVI веку превратился в крупнейший монастырь Северной Руси с мощными каменными стенами.",
    image: IMG.q9,
    category: "Монастыри",
    icon: "Building",
  },
  {
    id: 10,
    statement: "Белокаменная резьба была отличительной чертой псковского архитектурного стиля XIV-XV веков",
    isTrue: false,
    explanation: "Ошибка! Богатая белокаменная резьба — особенность владимиро-суздальской школы. Псковская архитектура отличалась суровой лаконичностью и почти лишена декора.",
    image: IMG.q10,
    category: "Храмы",
    icon: "Church",
  },
  {
    id: 11,
    statement: "Псковский кремль (Кром) имел двойную систему укреплений: внешние стены Окольного города и внутренний Кром",
    isTrue: true,
    explanation: "Верно! Псковская оборонительная система была многоуровневой: Кром (детинец), Довмонтов город, Средний город и Окольный город.",
    image: IMG.q11,
    category: "Крепости",
    icon: "Castle",
  },
  {
    id: 12,
    statement: "Все православные монастыри Руси XIV-XV веков располагались исключительно в городах",
    isTrue: false,
    explanation: "Ошибка! Напротив, многие монастыри специально основывались вдали от городов — в лесах, на островах, у рек — следуя традиции пустынножительства.",
    image: IMG.q12,
    category: "Монастыри",
    icon: "Building",
  },
  {
    id: 13,
    statement: "Церковь Спаса на Ильине улице в Новгороде расписана Феофаном Греком в XIV веке",
    isTrue: true,
    explanation: "Верно! В 1378 году Феофан Грек расписал церковь Спаса Преображения на Ильине улице. Это единственная полностью сохранившаяся его работа в России.",
    image: IMG.q13,
    category: "Храмы",
    icon: "Church",
  },
  {
    id: 14,
    statement: "Соловецкий монастырь основан в XV веке на островах Белого моря",
    isTrue: true,
    explanation: "Верно! Монастырь основан в 1436 году монахами Зосимой и Савватием на Соловецких островах. Позже был обнесён мощными каменными стенами.",
    image: IMG.q14,
    category: "Монастыри",
    icon: "Building",
  },
  {
    id: 15,
    statement: "В XIV-XV веках на Руси активно строили замки западноевропейского типа с высокими прямоугольными башнями-донжонами",
    isTrue: false,
    explanation: "Ошибка! Русская крепостная архитектура развивалась самостоятельным путём. Детинцы и кремли не имели башен-донжонов, характерных для западноевропейских замков.",
    image: IMG.q15,
    category: "Крепости",
    icon: "Castle",
  },
  {
    id: 16,
    statement: "Андроников монастырь в Москве был основан в XIV веке и назван в честь своего первого игумена",
    isTrue: true,
    explanation: "Верно! Монастырь основан около 1357 года. Первым игуменом стал Андроник — ученик Сергия Радонежского, в честь которого монастырь и получил своё название.",
    image: IMG.q16,
    category: "Монастыри",
    icon: "Building",
  },
];

const OrnamentSvg = () => (
  <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10 H45 M75 10 H120" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.6"/>
    <circle cx="60" cy="10" r="4" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.6" fill="none"/>
    <circle cx="60" cy="10" r="1.5" fill="#C9A227" fillOpacity="0.6"/>
    <path d="M48 10 L52 6 L56 10 L52 14 Z" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.5" fill="none"/>
    <path d="M64 10 L68 6 L72 10 L68 14 Z" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.5" fill="none"/>
  </svg>
);

const CornerOrnament = ({ rotate = 0 }: { rotate?: number }) => (
  <svg
    width="36" height="36" viewBox="0 0 36 36" fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M2 2 L14 2 L2 14 Z" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
    <path d="M2 2 L8 2 M2 2 L2 8" stroke="#C9A227" strokeWidth="1.2" strokeOpacity="0.5"/>
    <circle cx="2" cy="2" r="1.5" fill="#C9A227" fillOpacity="0.4"/>
  </svg>
);

const CATEGORY_COLORS: Record<string, string> = {
  "Крепости": "#8B6914",
  "Храмы": "#6B1A1A",
  "Монастыри": "#1A4A3A",
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [picked, setPicked] = useState<"true" | "false" | null>(null);

  const { playCorrect, playWrong } = useGameSounds();
  const score = Object.values(answers).filter(Boolean).length;
  const totalAnswered = Object.keys(answers).length;

  const handleTileClick = (q: Question) => {
    if (answers[q.id] !== undefined) return;
    setCurrentQuestion(q);
    setPicked(null);
    setScreen("question");
  };

  const handleAnswer = (answer: "true" | "false") => {
    if (picked !== null || !currentQuestion) return;
    setPicked(answer);
    const correct = (answer === "true") === currentQuestion.isTrue;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: correct }));
    if (correct) playCorrect(); else playWrong();
  };

  const handleNext = () => {
    if (totalAnswered + 1 >= QUESTIONS.length && Object.keys(answers).length >= QUESTIONS.length - 1) {
      setScreen("results");
      return;
    }
    setScreen("game");
    setCurrentQuestion(null);
    setPicked(null);
  };

  const handleRestart = () => {
    setAnswers({});
    setPicked(null);
    setCurrentQuestion(null);
    setScreen("home");
  };

  const getResultTitle = () => {
    if (score >= 14) return "Летописец";
    if (score >= 10) return "Зодчий";
    if (score >= 6) return "Странник";
    return "Новик";
  };

  const getResultDesc = () => {
    if (score >= 14) return "Ты — хранитель древней мудрости. Знания твои подобны монастырским архивам.";
    if (score >= 10) return "Ты постиг искусство зодчества. Пред тобой откроются врата любого кремля.";
    if (score >= 6) return "Ты на пути познания. Продолжай странствие по землям Древней Руси.";
    return "Юный новик, тебе ещё многому предстоит научиться у старых мастеров.";
  };

  if (screen === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-yellow-700/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-yellow-700/30 to-transparent" />
        </div>

        <div className="w-full max-w-2xl parchment-card rounded-sm p-8 md:p-12 relative animate-fadeInUp">
          <div className="absolute top-3 left-3"><CornerOrnament rotate={0} /></div>
          <div className="absolute top-3 right-3"><CornerOrnament rotate={90} /></div>
          <div className="absolute bottom-3 left-3"><CornerOrnament rotate={270} /></div>
          <div className="absolute bottom-3 right-3"><CornerOrnament rotate={180} /></div>

          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.35em] uppercase mb-4 animate-fadeInUp delay-100" style={{ color: '#C9A227', opacity: 0 }}>
              Викторина · XIV–XV века
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-2 animate-fadeInUp delay-200"
              style={{ color: '#E8C547', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.05em', opacity: 0 }}
            >
              Архитектура Руси
            </h1>
            <p
              className="text-base mb-2 animate-fadeInUp delay-300"
              style={{ color: '#9A7A3A', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.15em', opacity: 0 }}
            >
              XIV — XV вв.
            </p>
            <h2
              className="text-xl md:text-2xl animate-fadeInUp delay-400"
              style={{ color: '#D4B870', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', opacity: 0 }}
            >
              Правда или Ложь
            </h2>
          </div>

          <div className="flex justify-center mb-8 animate-fadeInUp delay-300" style={{ opacity: 0 }}>
            <OrnamentSvg />
          </div>

          <div className="rounded-sm overflow-hidden mb-8 animate-fadeInUp delay-400" style={{ opacity: 0, border: '1px solid rgba(201,162,39,0.2)' }}>
            <img
              src={KREMLIN_IMG}
              alt="Древнерусская архитектура"
              className="w-full h-48 object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.8)' }}
            />
          </div>

          <p
            className="text-center mb-8 leading-relaxed animate-fadeInUp delay-500"
            style={{ color: '#C4A86A', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', opacity: 0 }}
          >
            Проверь свои знания о храмах, монастырях и крепостях Руси.
            16 утверждений — отдели истину от вымысла.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fadeInUp delay-600" style={{ opacity: 0 }}>
            <button
              onClick={() => setScreen("game")}
              className="btn-start px-10 py-4 text-lg rounded-sm font-semibold"
            >
              Начать Игру
            </button>
            <button
              onClick={() => setScreen("rules")}
              className="px-8 py-4 rounded-sm text-base transition-all"
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,162,39,0.25)',
                color: '#C9A227',
                fontFamily: "'Cormorant SC', serif",
                letterSpacing: '0.1em',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,162,39,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,162,39,0.25)')}
            >
              Правила
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "rules") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl parchment-card rounded-sm p-8 relative animate-expandIn">
          <div className="absolute top-3 left-3"><CornerOrnament rotate={0} /></div>
          <div className="absolute top-3 right-3"><CornerOrnament rotate={90} /></div>
          <div className="absolute bottom-3 left-3"><CornerOrnament rotate={270} /></div>
          <div className="absolute bottom-3 right-3"><CornerOrnament rotate={180} /></div>

          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#E8C547', letterSpacing: '0.06em' }}>
            Правила Игры
          </h2>
          <div className="flex justify-center mb-6"><OrnamentSvg /></div>

          <div className="space-y-4 mb-8">
            {[
              { n: "I", text: "Перед тобой 16 квадратов — в каждом скрыто утверждение об архитектуре Древней Руси." },
              { n: "II", text: "Нажми на квадрат, прочти утверждение и посмотри изображение." },
              { n: "III", text: "Выбери ответ: «Правда» — если утверждение верно, «Ложь» — если нет." },
              { n: "IV", text: "После ответа появится объяснение. Верный ответ подсвечивается зелёным, ошибочный — красным." },
              { n: "V", text: "В конце получишь звание по числу верных ответов: от Новика до Летописца." },
            ].map(item => (
              <div key={item.n} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm text-sm font-bold"
                  style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)', color: '#C9A227', fontFamily: "'Cormorant SC', serif" }}
                >
                  {item.n}
                </span>
                <p style={{ color: '#D4C08A', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', lineHeight: '1.6' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => setScreen("game")} className="btn-start px-8 py-3 rounded-sm text-base">
              Начать Игру
            </button>
            <button
              onClick={() => setScreen("home")}
              className="px-6 py-3 rounded-sm text-sm transition-all"
              style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.2)', color: '#9A7A3A', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.08em' }}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div className="min-h-screen px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-1" style={{ color: '#E8C547', letterSpacing: '0.06em' }}>
              Поле Истины
            </h2>
            <p className="text-sm" style={{ color: '#8A6A2A' }}>
              Отвечено: {totalAnswered} / {QUESTIONS.length} · Верно: {score}
            </p>
          </div>

          <div className="flex justify-center mb-4 animate-fadeIn delay-100" style={{ opacity: 0 }}>
            <OrnamentSvg />
          </div>

          <div className="grid grid-cols-4 gap-3 mb-8 animate-fadeInUp delay-200" style={{ opacity: 0 }}>
            {QUESTIONS.map((q, i) => {
              const wasAnswered = answers[q.id] !== undefined;
              const wasCorrect = answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => handleTileClick(q)}
                  disabled={wasAnswered}
                  className={`game-tile rounded-sm aspect-square flex flex-col items-center justify-center gap-1 ${
                    wasAnswered ? (wasCorrect ? "answered-correct answered" : "answered-wrong answered") : ""
                  }`}
                >
                  <span
                    className="text-xl"
                    style={{ color: wasAnswered ? (wasCorrect ? '#70C070' : '#C07070') : '#C9A227', opacity: wasAnswered ? 1 : 0.7 }}
                  >
                    {wasAnswered ? (wasCorrect ? "✓" : "✗") : i + 1}
                  </span>
                  <span className="text-xs text-center leading-tight px-1 hidden sm:block"
                    style={{ color: wasAnswered ? (wasCorrect ? '#70C070' : '#A06060') : '#7A5A2A', fontFamily: "'Cormorant SC', serif", fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                    {q.category}
                  </span>
                </button>
              );
            })}
          </div>

          {totalAnswered === QUESTIONS.length && (
            <div className="text-center animate-fadeInUp">
              <button onClick={() => setScreen("results")} className="btn-start px-10 py-4 text-lg rounded-sm">
                Узнать Результат
              </button>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              onClick={handleRestart}
              className="text-xs transition-all"
              style={{ color: '#6A4A1A', letterSpacing: '0.1em', fontFamily: "'Cormorant SC', serif" }}
            >
              ← Вернуться к началу
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "question" && currentQuestion) {
    const isCorrect = picked !== null && ((picked === "true") === currentQuestion.isTrue);
    const isWrong = picked !== null && ((picked === "true") !== currentQuestion.isTrue);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <div className="parchment-card rounded-sm p-6 md:p-8 relative animate-expandIn">
            <div className="absolute top-3 left-3"><CornerOrnament rotate={0} /></div>
            <div className="absolute top-3 right-3"><CornerOrnament rotate={90} /></div>
            <div className="absolute bottom-3 left-3"><CornerOrnament rotate={270} /></div>
            <div className="absolute bottom-3 right-3"><CornerOrnament rotate={180} /></div>

            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2 py-0.5 text-xs rounded-sm"
                style={{
                  background: CATEGORY_COLORS[currentQuestion.category] + '33',
                  border: `1px solid ${CATEGORY_COLORS[currentQuestion.category]}55`,
                  color: '#C9A227',
                  fontFamily: "'Cormorant SC', serif",
                  letterSpacing: '0.1em',
                }}
              >
                {currentQuestion.category}
              </span>
              <span className="text-xs ml-auto" style={{ color: '#6A4A1A' }}>
                {currentQuestion.id} / {QUESTIONS.length}
              </span>
            </div>

            <p
              className="text-lg md:text-xl leading-relaxed mb-5 text-center"
              style={{ color: '#E8D8A0', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
            >
              «{currentQuestion.statement}»
            </p>

            <div className="rounded-sm overflow-hidden mb-5" style={{ border: '1px solid rgba(201,162,39,0.2)' }}>
              <img
                src={currentQuestion.image}
                alt={currentQuestion.category}
                className="w-full h-40 object-cover"
                style={{ filter: 'brightness(0.7) saturate(0.75)' }}
              />
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleAnswer("true")}
                disabled={picked !== null}
                className={`btn-truth flex-1 rounded-sm ${
                  picked === "true" ? (isCorrect ? "picked-correct" : "picked-wrong") : ""
                }`}
              >
                Правда
              </button>
              <button
                onClick={() => handleAnswer("false")}
                disabled={picked !== null}
                className={`btn-lie flex-1 rounded-sm ${
                  picked === "false" ? (isCorrect ? "picked-correct" : "picked-wrong") : ""
                }`}
              >
                Ложь
              </button>
            </div>

            {picked !== null && (
              <div
                className="rounded-sm p-4 mb-4 animate-fadeInUp"
                style={{
                  background: isCorrect ? 'rgba(45, 106, 45, 0.2)' : 'rgba(106, 30, 30, 0.25)',
                  border: `1px solid ${isCorrect ? 'rgba(80,160,80,0.4)' : 'rgba(160,60,60,0.4)'}`,
                }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: isCorrect ? '#80C880' : '#C88080', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.08em' }}>
                  {isCorrect ? "✦ Верно!" : "✦ Ошибка!"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#C4A86A', fontFamily: "'Cormorant Garamond', serif" }}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {picked !== null && (
              <button
                onClick={handleNext}
                className="btn-start w-full py-3 rounded-sm text-base animate-fadeIn"
              >
                {totalAnswered >= QUESTIONS.length ? "Узнать Результат" : "Следующий Вопрос →"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg parchment-card rounded-sm p-8 md:p-10 relative animate-expandIn text-center">
          <div className="absolute top-3 left-3"><CornerOrnament rotate={0} /></div>
          <div className="absolute top-3 right-3"><CornerOrnament rotate={90} /></div>
          <div className="absolute bottom-3 left-3"><CornerOrnament rotate={270} /></div>
          <div className="absolute bottom-3 right-3"><CornerOrnament rotate={180} /></div>

          <p className="text-xs tracking-[0.3em] uppercase mb-2 animate-fadeInUp delay-100" style={{ color: '#8A6A2A', opacity: 0 }}>
            Итоги странствия
          </p>

          <h2 className="text-4xl font-bold mb-1 animate-fadeInUp delay-200" style={{ color: '#E8C547', letterSpacing: '0.06em', opacity: 0 }}>
            {getResultTitle()}
          </h2>

          <div className="flex justify-center mb-6 animate-fadeIn delay-200" style={{ opacity: 0 }}>
            <OrnamentSvg />
          </div>

          <div
            className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center animate-fadeInUp delay-300 animate-goldPulse"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(139,105,20,0.08) 100%)', border: '2px solid rgba(201,162,39,0.5)', opacity: 0 }}
          >
            <div>
              <p className="text-3xl font-bold" style={{ color: '#E8C547', fontFamily: "'Cormorant SC', serif" }}>{score}</p>
              <p className="text-xs" style={{ color: '#8A6A2A', fontFamily: "'Cormorant SC', serif" }}>из {QUESTIONS.length}</p>
            </div>
          </div>

          <p className="mb-2 animate-fadeInUp delay-400" style={{ color: '#C4A86A', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', opacity: 0 }}>
            {getResultDesc()}
          </p>

          <div className="my-6 animate-fadeInUp delay-400" style={{ opacity: 0 }}>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,162,39,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #8B6914, #C9A227, #E8C547)' }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: '#6A4A1A' }}>{pct}% верных ответов</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 animate-fadeInUp delay-500" style={{ opacity: 0 }}>
            {(["Крепости", "Храмы", "Монастыри"] as const).map(cat => {
              const catQs = QUESTIONS.filter(q => q.category === cat);
              const catScore = catQs.filter(q => answers[q.id]).length;
              return (
                <div key={cat} className="rounded-sm p-2" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(201,162,39,0.15)' }}>
                  <p className="text-xs mb-0.5" style={{ color: '#8A6A2A', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.05em' }}>{cat}</p>
                  <p className="text-lg font-bold" style={{ color: '#C9A227', fontFamily: "'Cormorant SC', serif" }}>{catScore}/{catQs.length}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center animate-fadeInUp delay-600" style={{ opacity: 0 }}>
            <button onClick={handleRestart} className="btn-start px-8 py-3 rounded-sm text-base">
              Сыграть Снова
            </button>
            <button
              onClick={() => { setAnswers({}); setScreen("game"); }}
              className="px-6 py-3 rounded-sm text-sm transition-all"
              style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.2)', color: '#9A7A3A', fontFamily: "'Cormorant SC', serif", letterSpacing: '0.08em' }}
            >
              К Полю
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}