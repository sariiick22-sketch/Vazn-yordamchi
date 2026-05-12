import { useState, useEffect, useRef } from "react";

const MEALS = {
  nonushta: {
    label: "Nonushta", icon: "🌅", time: "08:00",
    recipes: [
      { name: "Yulaf bo'tqasi", cal: 280, protein: 10, fat: 6, carb: 45, time: "10 min",
        ingredients: ["1 kosa yulaf", "250ml sut (yoki suv)", "1 banan", "1 osh. q. asal", "mushtdek yong'oq"],
        steps: ["Yulafni sut bilan qozing va o'rtacha olovda 5-7 daqiqa qaynatib aralashtiring.", "Bananani yupqa doira qilib kesmang.", "Bo'tqani kosaga solib, ustiga banan va asal qo'ying, yong'oq sepib bering."] },
      { name: "Tuxum bilan sabzavot", cal: 220, protein: 14, fat: 12, carb: 8, time: "15 min",
        ingredients: ["2 ta tuxum", "1/2 bolgar qalampiri", "1/2 pomidor", "1 kichik piyoz", "tuz, zira"],
        steps: ["Sabzavotlarni mayda to'g'rang va yog'siz tiganda 3 daqiqa qovuring.", "Tuxumlarni chaling va sabzavot ustiga to'kib, aralashtiring.", "Tuz va zira solib, 2-3 daqiqa qovuring."] },
      { name: "Tvorog va meva", cal: 190, protein: 18, fat: 3, carb: 22, time: "5 min",
        ingredients: ["150g past yog'li tvorog", "1 olma yoki shaftoli", "1 q.q. bal", "darcin"],
        steps: ["Mevani mayda to'g'rang.", "Tvorogni kosaga solib, ustiga meva qo'ying.", "Bal va darcin sepib, tayyor."] },
    ]
  },
  tushlik: {
    label: "Tushlik", icon: "☀️", time: "13:00",
    recipes: [
      { name: "Tovuq va sabzavot salati", cal: 350, protein: 32, fat: 10, carb: 28, time: "25 min",
        ingredients: ["150g tovuq ko'kragi", "2 pomidor", "1 bodring", "zeytun moyi", "limon"],
        steps: ["Tovuqni tuz va zira bilan 15 daqiqa damlab, tavada pishiring.", "Sabzavotlarni mayda to'g'rang.", "Tovuqni bo'laklang va salat bilan aralashtiring, zeytun moyi va limon siqing."] },
      { name: "Grechka va sabzavot", cal: 310, protein: 12, fat: 7, carb: 48, time: "20 min",
        ingredients: ["100g grechka", "1 kichik sabzi", "1/2 piyoz", "1 osh. q. zeytun moyi", "tuz"],
        steps: ["Grechkani yuvib, 2 kosa suv bilan 15 daqiqa pishiring.", "Sabzi va piyozni to'g'rang, yog'da 5 daqiqa qovuring.", "Grechkani sabzavot bilan aralashtiring."] },
      { name: "Baliq shorba", cal: 290, protein: 28, fat: 8, carb: 20, time: "30 min",
        ingredients: ["200g oq baliq", "1 kartoshka", "1 sabzi", "1/2 piyoz", "tuz, dafna bargi"],
        steps: ["Kartoshka va sabzini to'g'rang, 1.5L suv bilan 10 daqiqa qaynating.", "Baliqni bo'laklang va sabzavotga qo'shing.", "10-15 daqiqa qaynating, tuz solib bering."] },
    ]
  },
  kechki: {
    label: "Kechki ovqat", icon: "🌙", time: "19:00",
    recipes: [
      { name: "Qaynatma tovuq va brokoli", cal: 270, protein: 36, fat: 8, carb: 12, time: "20 min",
        ingredients: ["150g tovuq ko'kragi", "200g brokoli", "2 dis sarimsoq", "zeytun moyi", "limon"],
        steps: ["Brokolini bug'da 5-7 daqiqa yumshating.", "Tovuqni zeytun moyi va sarimsoq bilan qovuring.", "Limon siqib, birgalikda bering."] },
      { name: "Tvorog va bodring salati", cal: 180, protein: 20, fat: 4, carb: 10, time: "10 min",
        ingredients: ["150g tvorog", "2 bodring", "ko'k piyoz", "tuz", "zeytun moyi"],
        steps: ["Bodring va ko'k piyozni mayda to'g'rang.", "Tvorog va sabzavotni aralashtiring.", "Zeytun moyi va tuz qo'shib bering."] },
      { name: "Sabzavot stir-fray", cal: 220, protein: 8, fat: 9, carb: 28, time: "15 min",
        ingredients: ["1 kosa qorishiq sabzavot", "2 ta tuxum", "soya sousi", "sarimsoq", "zeytun moyi"],
        steps: ["Tiganni qizdiring, zeytun moyi soling.", "Sarimsoqni qovurib, sabzavotlarni 5-7 daqiqa qovuring.", "Tuxum qo'shib, soya sousi bilan aralashtiring."] },
    ]
  }const WORKOUTS = [
  { icon: "🏃", name: "Ertalabki yugurish", dur: "30 min", cal: 250, desc: "Sekin sur'atda 5 min isish, 20 min yugurish, 5 min sovutish." },
  { icon: "💪", name: "Kuch mashqlari", dur: "40 min", cal: 200, desc: "10 ta squat x3, 10 ta push-up x3, 15 ta crunch x3, 10 ta lunge x3." },
  { icon: "🧘", name: "Yoga va cho'zilish", dur: "25 min", cal: 120, desc: "Planka 30 sek, cat-cow, downward dog — har birini 3 marta." },
  { icon: "🚴", name: "Velosiped/Cardio", dur: "35 min", cal: 280, desc: "10 min sekin, 20 min tez sur'at, 5 min dam. Yoki jumping jacks x50 x3." },
  { icon: "🏋️", name: "Dam olish kuni", dur: "15 min", cal: 60, desc: "Yengil cho'zilish va nafas mashqlari." },
];

const REMINDER_TIMES = [
  { id: "nonushta", label: "Nonushta", time: "08:00", icon: "🌅" },
  { id: "tushlik", label: "Tushlik", time: "13:00", icon: "☀️" },
  { id: "kechki", label: "Kechki", time: "19:00", icon: "🌙" },
  { id: "mashq", label: "Mashq", time: "07:00", icon: "💪" },
  { id: "suv", label: "Suv ichish", time: "10:00", icon: "💧" },
];

function Progress({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden", height: 7 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 99, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
      {children}
    </span>
  );
}

const TABS = [
  { id: "retsept", icon: "🍽️", label: "Retseptlar" },
  { id: "mashq", icon: "🏋️", label: "Mashqlar" },
  { id: "eslatma", icon: "⏰", label: "Eslatmalar" },
  { id: "chat", icon: "💬", label: "AI Coach" },
];

export default function VaznYordamchi() {
  const [tab, setTab] = useState("retsept");
  const [activeMeal, setActiveMeal] = useState("nonushta");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [reminders, setReminders] = useState({ nonushta: true, tushlik: true, kechki: true, mashq: true, suv: false });
  const [chatMsgs, setChatMsgs] = useState([{ role: "ai", text: "Salom! 👋 Men sening vazn yo'qotish coach'ingman. Qanday yordam kerak?" }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatBottom = useRef(null);
  const [todayWorkout] = useState(WORKOUTS[new Date().getDay() % WORKOUTS.length]);

  useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, chatLoading]);

  async function sendChat() {
    const txt = chatInput.trim();
    if (!txt || chatLoading) return;
    setChatInput("");
    setChatMsgs(prev => [...prev, { role: "user", text: txt }]);
    const newH = [...chatHistory, { role: "user", content: txt }];
    setChatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Sen vazn yo'qotish bo'yicha mutaxassis dietolog va fitness trenerisan. O'zbek tilida qisqa va aniq javob ber.",
          messages: newH,
        }),
      });
      const data = await res.json();
      const aiText = data.content?.find(b => b.type === "text")?.text || "Xato yuz berdi.";
      setChatMsgs(prev => [...prev, { role: "ai", text: aiText }]);
      setChatHistory([...newH, { role: "assistant", content: aiText }]);
    } catch {
      setChatMsgs(prev => [...prev, { role: "ai", text: "Ulanishda xato. Qayta urinib ko'ring." }]);
    } finally { setChatLoading(false); }
  }

  const meal = MEALS[activeMeal];
  const S = {
    root: { minHeight: "100vh", background: "#0f1117", color: "#f3f4f6", fontFamily: "'Nunito', sans-serif" },
    header: { background: "linear-gradient(135deg, #14532d, #166534)", padding: "16px 20px" },
    headerInner: { maxWidth: 600, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
    headerTitle: { fontSize: 22, fontWeight: 900, color: "#fff" },
    headerSub: { fontSize: 13, color: "#bbf7d0", marginTop: 2 },
    streakBadge: { background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: "#fff" },
    nav: { display: "flex", background: "#1a1f2e", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, zIndex: 10 },
    tabBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px", background: "none", border: "none", color: "#6b7280", cursor: "pointer", borderBottom: "2px solid transparent" },
    tabActive: { color: "#4ade80", borderBottom: "2px solid #4ade80", background: "rgba(74,222,128,0.07)" },
    main: { maxWidth: 600, margin: "0 auto", padding: "18px 14px 80px" },
    mealTabs: { display: "flex", gap: 8, marginBottom: 16 },
    mealBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, cursor: "pointer", color: "#9ca3af", fontSize: 13 },
    mealActive: { background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", color: "#fff" },
    recipeCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: 16, cursor: "pointer", marginBottom: 12 },
    recipeCardTitle: { fontSize: 17, fontWeight: 800, marginBottom: 4 },
    backBtn: { background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#9ca3af", borderRadius: 99, padding: "6px 16px", cursor: "pointer", marginBottom: 14, fontSize: 13 },
    recipeDetail: { background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 20 },
    macroGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 },
    macroCard: { background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 10px" },
    sectionTitle: { fontWeight: 800, fontSize: 15, marginBottom: 10, color: "#4ade80", marginTop: 18 },
    ingItem: { padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 14 },
    stepItem: { display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 },
    stepNum: { width: 26, height: 26, minWidth: 26, borderRadius: "50%", background: "#4ade80", color: "#000", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 },
    todayCard: { background: "linear-gradient(135deg, #14532d, #1e3a5f)", borderRadius: 20, padding: 22, marginBottom: 20, textAlign: "center", border: "1px solid rgba(74,222,128,0.25)" },
    ctaBtn: { marginTop: 16, background: "#4ade80", color: "#000", border: "none", borderRadius: 99, padding: "10px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
    workoutRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 14, marginBottom: 8, border: "1px solid rgba(255,255,255,0.07)" },
    workoutActive: { background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)" },
    eslatmaInfo: { background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#fdba74", marginBottom: 16 },
    reminderRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 14, marginBottom: 8 },
    toggle: { width: 48, height: 26, borderRadius: 99, cursor: "pointer", position: "relative", transition: "background 0.25s ease", flexShrink: 0 },
    toggleDot: { position: "absolute", top: 3, width: 20, height: 20, background: "#fff", borderRadius: "50%", transition: "transform 0.25s ease" },
    chatBox: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12, height: "calc(100vh - 260px)" },
    msgRow: { display: "flex", gap: 8, alignItems: "flex-end" },
    aiAvatar: { width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#166534,#4ade80)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
    bubble: { maxWidth: "78%", padding: "11px 15px", borderRadius: 16, lineHeight: 1.6, fontSize: 14 },
    aiBubble: { background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#e2fce9" },
    userBubble: { background: "rgba(29,78,216,0.6)", border: "1px solid rgba(96,165,250,0.3)", color: "#dbeafe" },
    chatInput: { display: "flex", gap: 8, alignItems: "flex-end", paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)" },
    textarea: { flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "11px 14px", color: "#f3f4f6", fontSize: 14, resize: "none", fontFamily: "'Nunito', sans-serif" },
    sendBtn: { width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#166534,#4ade80)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 },
  };

  return (
    <div style={S.root}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <header style={S.header}>
        <div style={S.headerInner}>
          <div><div style={S.headerTitle}>🥗 VAZN YORDAMCHI</div><div style={S.headerSub}>Sog'lom hayot, baquvvat tana</div></div>
          <div style={S.streakBadge}>🔥 Bugun faol!</div>
        </div>
      </header>
      <nav style={S.nav}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ ...S.tabBtn, ...(tab === t.id ? S.tabActive : {}) }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{t.label}</span>
          </button>
        ))}
      </nav>
      <main style={S.main}>
        {tab === "retsept" && (
          <div>
            {activeRecipe ? (
              <div>
                <button onClick={() => setActiveRecipe(null)} style={S.backBtn}>← Orqaga</button>
                <div style={S.recipeDetail}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{activeRecipe.name}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0 16px" }}>
                    <Badge color="#4ade80">⏱ {activeRecipe.time}</Badge>
                    <Badge color="#fb923c">{activeRecipe.cal} kcal</Badge>
                    <Badge color="#60a5fa">💪 {activeRecipe.protein}g oqsil</Badge>
                  </div>
                  <div style={S.macroGrid}>
                    {[["Oqsil", activeRecipe.protein, 50, "#4ade80"], ["Yog'", activeRecipe.fat, 30, "#fb923c"], ["Ugleod", activeRecipe.carb, 60, "#60a5fa"]].map(([l, v, m, c]) => (
                      <div key={l} style={S.macroCard}>
                        <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>{l}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}g</div>
                        <Progress value={v} max={m} color={c} />
                      </div>
                    ))}
                  </div>
                  <div style={S.sectionTitle}>🧺 Kerakli mahsulotlar</div>
                  {activeRecipe.ingredients.map((ing, i) => <div key={i} style={S.ingItem}><span style={{ color: "#4ade80", marginRight: 8 }}>✓</span>{ing}</div>)}
                  <div style={S.sectionTitle}>👨‍🍳 Tayyorlash</div>
                  {activeRecipe.steps.map((step, i) => (
                    <div key={i} style={S.stepItem}>
                      <div style={S.stepNum}>{i + 1}</div>
                      <div style={{ lineHeight: 1.6, fontSize: 14.5 }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={S.mealTabs}>
                  {Object.entries(MEALS).map(([key, m]) => (
                    <button key={key} onClick={() => setActiveMeal(key)} style={{ ...S.mealBtn, ...(activeMeal === key ? S.mealActive : {}) }}>
                      <span>{m.icon}</span><span style={{ fontSize: 12 }}>{m.label}</span><span style={{ fontSize: 11 }}>{m.time}</span>
                    </button>
                  ))}
                </div>
                {meal.recipes.map((r, i) => (
                  <div key={i} style={S.recipeCard} onClick={() => setActiveRecipe(r)}>
                    <div style={S.recipeCardTitle}>{r.name}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "8px 0 12px" }}>
                      <Badge color="#fb923c">{r.cal} kcal</Badge>
                      <Badge color="#4ade80">{r.protein}g oqsil</Badge>
                      <Badge color="#a78bfa">⏱ {r.time}</Badge>
                    </div>
                    <Progress value={r.cal} max={500} color="#4ade80" />
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, textAlign: "right" }}>Retseptni ko'rish →</div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        {tab === "mashq" && (
          <div>
            <div style={S.todayCard}>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 6 }}>Bugungi mashq</div>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{todayWorkout.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#4ade80" }}>{todayWorkout.name}</div>
              <div style={{ display: "flex", gap: 10, margin: "10px 0", justifyContent: "center" }}>
                <Badge color="#fb923c">⏱ {todayWorkout.dur}</Badge>
                <Badge color="#60a5fa">🔥 {todayWorkout.cal} kcal</Badge>
              </div>
              <div style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.6 }}>{todayWorkout.desc}</div>
              <button style={S.ctaBtn}>✅ Bajarildi deb belgilash</button>
            </div>
            <div style={S.sectionTitle}>📅 Haftalik reja</div>
            {WORKOUTS.map((w, i) => (
              <div key={i} style={{ ...S.workoutRow, ...(i === new Date().getDay() % WORKOUTS.length ? S.workoutActive : {}) }}>
                <span style={{ fontSize: 22 }}>{w.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{w.dur} · {w.cal} kcal</div>
                </div>
                {i === new Date().getDay() % WORKOUTS.length && <Badge color="#4ade80">Bugun</Badge>}
              </div>
            ))}
          </div>
        )}
        {tab === "eslatma" && (
          <div>
            <div style={S.eslatmaInfo}>💡 Eslatmalarni yoqing — sog'lom odatlar avtomatik shakllanadi!</div>
            {REMINDER_TIMES.map(r => (
              <div key={r.id} style={S.reminderRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: "#9ca3af" }}>Har kuni soat {r.time}</div>
                  </div>
                </div>
                <div onClick={() => setReminders(prev => ({ ...prev, [r.id]: !prev[r.id] }))} style={{ ...S.toggle, background: reminders[r.id] ? "#4ade80" : "rgba(255,255,255,0.1)" }}>
                  <div style={{ ...S.toggleDot, transform: reminders[r.id] ? "translateX(22px)" : "translateX(2px)" }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={S.chatBox}>
              {chatMsgs.map((m, i) => (
                <div key={i} style={{ ...S.msgRow, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "ai" && <div style={S.aiAvatar}>🥗</div>}
                  <div style={{ ...S.bubble, ...(m.role === "user" ? S.userBubble : S.aiBubble) }}>
                    {m.text.split("\n").map((ln, j) => <span key={j}>{ln}{j < m.text.split("\n").length - 1 && <br />}</span>)}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ ...S.msgRow, justifyContent: "flex-start" }}>
                  <div style={S.aiAvatar}>🥗</div>
                  <div style={{ ...S.bubble, ...S.aiBubble }}>⌛ Javob tayyorlanmoqda...</div>
                </div>
              )}
              <div ref={chatBottom} />
            </div>
            <div style={S.chatInput}>
              <textarea style={S.textarea} value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                placeholder="Savol bering: kaloriya, mashq, ovqat..." rows={1} disabled={chatLoading} />
              <button style={S.sendBtn} onClick={sendChat} disabled={!chatInput.trim() || chatLoading}>➤</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
    }
};
