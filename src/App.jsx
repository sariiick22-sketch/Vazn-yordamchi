import { useState } from "react";

const MEALS = {
  nonushta: { label: "Nonushta", icon: "🌅", time: "08:00", recipes: [
    { name: "Yulaf botqasi", cal: 280, ing: ["1 kosa yulaf", "250ml sut", "1 banan", "asal"], steps: ["Yulafni sut bilan 5-7 daqiqa qaynat", "Bananani kес", "Ustiga asal quy"] },
    { name: "Tuxum va sabzavot", cal: 220, ing: ["2 tuxum", "qalampir", "pomidor", "tuz"], steps: ["Sabzavotni qovur", "Tuxum qos va aralashtir", "2-3 daqiqa pishir"] },
    { name: "Tvorog va meva", cal: 190, ing: ["150g tvorog", "1 olma", "bal", "darcin"], steps: ["Mevani kes", "Tvorog ustiga qoy", "Bal sepib ber"] }
  ]},
  tushlik: { label: "Tushlik", icon: "☀️", time: "13:00", recipes: [
    { name: "Tovuq salat", cal: 350, ing: ["150g tovuq", "pomidor", "bodring", "zeytun moyi"], steps: ["Tovuqni pishir", "Sabzavot kes", "Aralashtir va moy quy"] },
    { name: "Grechka", cal: 310, ing: ["100g grechka", "sabzi", "piyoz", "zeytun moyi"], steps: ["Grechkani pishir", "Sabzavot qovur", "Aralashtir"] },
    { name: "Baliq shorba", cal: 290, ing: ["200g baliq", "kartoshka", "sabzi", "tuz"], steps: ["Sabzavot qaynат", "Baliq qos", "15 daqiqa pishir"] }
  ]},
  kechki: { label: "Kechki", icon: "🌙", time: "19:00", recipes: [
    { name: "Tovuq va brokoli", cal: 270, ing: ["150g tovuq", "200g brokoli", "sarimsoq", "limon"], steps: ["Brokolini bug'da pishir", "Tovuqni qovur", "Limon siq"] },
    { name: "Tvorog salat", cal: 180, ing: ["150g tvorog", "bodring", "ko'k piyoz", "tuz"], steps: ["Bodring kes", "Tvorog bilan aralashtir", "Tuz qos"] },
    { name: "Sabzavot", cal: 220, ing: ["karam", "sabzi", "2 tuxum", "soya sousi"], steps: ["Sabzavot qovur", "Tuxum qos", "Soya sousi quy"] }
  ]}
};

const WORKOUTS = [
  { icon: "🏃", name: "Yugurish", dur: "30 min", cal: 250, desc: "5 min isish, 20 min yugurish, 5 min sovutish" },
  { icon: "💪", name: "Kuch mashq", dur: "40 min", cal: 200, desc: "Squat x30, Push-up x30, Crunch x45, Lunge x30" },
  { icon: "🧘", name: "Yoga", dur: "25 min", cal: 120, desc: "Planka 30sek, cat-cow, downward dog - 3 marta" },
  { icon: "🚴", name: "Cardio", dur: "35 min", cal: 280, desc: "10 min sekin, 20 min tez, 5 min dam" },
  { icon: "😴", name: "Dam olish", dur: "15 min", cal: 60, desc: "Yengil cho'zilish va nafas mashqlari" }
];

export default function App() {
  const [tab, setTab] = useState("taom");
  const [meal, setMeal] = useState("nonushta");
  const [recipe, setRecipe] = useState(null);
  const today = WORKOUTS[new Date().getDay() % WORKOUTS.length];

  const s = {
    root: { minHeight: "100vh", background: "#0f1117", color: "#f3f4f6", fontFamily: "sans-serif", fontSize: 14 },
    header: { background: "linear-gradient(135deg,#14532d,#166534)", padding: "14px 16px" },
    title: { fontSize: 20, fontWeight: 900, color: "#fff" },
    sub: { fontSize: 12, color: "#bbf7d0" },
    nav: { display: "flex", background: "#1a1f2e", borderBottom: "1px solid #ffffff15" },
    navBtn: (a) => ({ flex: 1, padding: "10px 4px", background: "none", border: "none", borderBottom: a ? "2px solid #4ade80" : "2px solid transparent", color: a ? "#4ade80" : "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 700 }),
    main: { padding: 14, maxWidth: 600, margin: "0 auto" },
    mealRow: { display: "flex", gap: 8, marginBottom: 14 },
    mealBtn: (a) => ({ flex: 1, padding: "8px 4px", background: a ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)", border: a ? "1px solid #4ade8066" : "1px solid #ffffff15", borderRadius: 10, color: a ? "#fff" : "#9ca3af", cursor: "pointer", fontSize: 12, textAlign: "center" }),
    card: { background: "rgba(255,255,255,0.05)", border: "1px solid #ffffff15", borderRadius: 14, padding: 14, marginBottom: 10, cursor: "pointer" },
    cardTitle: { fontWeight: 800, fontSize: 16, marginBottom: 6 },
    badge: (c) => ({ display: "inline-block", background: c + "22", color: c, border: "1px solid " + c + "44", borderRadius: 99, padding: "2px 8px", fontSize: 11, fontWeight: 600, marginRight: 6 }),
    backBtn: { background: "none", border: "1px solid #ffffff25", color: "#9ca3af", borderRadius: 99, padding: "5px 14px", cursor: "pointer", marginBottom: 12, fontSize: 12 },
    detail: { background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16 },
    sTitle: { fontWeight: 800, color: "#4ade80", marginTop: 14, marginBottom: 8 },
    ing: { padding: "6px 0", borderBottom: "1px solid #ffffff10" },
    step: { display: "flex", gap: 10, marginBottom: 10 },
    stepN: { width: 24, height: 24, minWidth: 24, borderRadius: "50%", background: "#4ade80", color: "#000", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
    todayCard: { background: "linear-gradient(135deg,#14532d,#1e3a5f)", borderRadius: 16, padding: 18, textAlign: "center", marginBottom: 16, border: "1px solid rgba(74,222,128,0.2)" },
    wRow: (a) => ({ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: a ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)", border: a ? "1px solid rgba(74,222,128,0.3)" : "1px solid #ffffff10", borderRadius: 12, marginBottom: 8 }),
  };

  return (
    <div style={s.root}>
      <header style={s.header}>
        <div style={s.title}>🥗 VAZN YORDAMCHI</div>
        <div style={s.sub}>Sog'lom hayot, baquvvat tana</div>
      </header>

      <nav style={s.nav}>
        {[["taom","🍽️","Taomlar
