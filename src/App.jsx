import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LogOut, CheckCircle2, XCircle, 
  Coffee, MessageCircle, Navigation, 
  Users, BarChart3, Activity, ChevronRight, Clock
} from 'lucide-react';

// --- DATA ---
const USERS = {
  "1000054254": {
    name: "Monjurul",
    nickname: "Monjurul",
    phone: "8801886660063",
    color: "bg-blue-500",
    colorHex: "#3b82f6",
    schedule: [
      { day: "Sunday", start: "08:00", end: "10:50", course: "CSE220L", room: "09B-08L" },
      { day: "Sunday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Monday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Monday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Monday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" },
      { day: "Tuesday", start: "11:00", end: "13:50", course: "CSE251L", room: "FT10-02L" },
      { day: "Tuesday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Wednesday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Wednesday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Wednesday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" }
    ]
  },
  "1000054396": {
    name: "Azmyeen",
    nickname: "azu",
    phone: "8801987365359",
    color: "bg-purple-500",
    colorHex: "#a855f7",
    schedule: [
      { day: "Sunday", start: "08:00", end: "09:20", course: "CSE220", room: "09B-08L" },
      { day: "Sunday", start: "09:30", end: "10:50", course: "CSE220", room: "09B-08L" },
      { day: "Monday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Monday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Wednesday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Wednesday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Thursday", start: "09:30", end: "10:50", course: "STA201", room: "09H-37C" },
      { day: "Thursday", start: "11:00", end: "12:20", course: "CSE320", room: "09A-02C" },
      { day: "Saturday", start: "09:30", end: "10:50", course: "STA201", room: "09H-37C" },
      { day: "Saturday", start: "11:00", end: "12:20", course: "CSE320", room: "09A-02C" }
    ]
  },
  "1000054306": {
    name: "Jarif",
    nickname: "juice pacha",
    phone: "8801852727376",
    color: "bg-emerald-500",
    colorHex: "#10b981",
    schedule: [
      { day: "Sunday", start: "11:00", end: "12:20", course: "CSE220", room: "09B-08L" },
      { day: "Sunday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-08L" },
      { day: "Sunday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Monday", start: "08:00", end: "09:20", course: "CSE220", room: "10A-05C" },
      { day: "Monday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Monday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" },
      { day: "Tuesday", start: "11:00", end: "12:20", course: "CSE251", room: "FT10-01L" },
      { day: "Tuesday", start: "12:30", end: "13:50", course: "CSE251", room: "FT10-01L" },
      { day: "Tuesday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Wednesday", start: "08:00", end: "09:20", course: "CSE220", room: "10A-05C" },
      { day: "Wednesday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Wednesday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" }
    ]
  },
  "1000054024": {
    name: "Darpan",
    nickname: "darpanunu",
    phone: "", 
    color: "bg-amber-500",
    colorHex: "#f59e0b",
    schedule: [
      { day: "Sunday", start: "14:00", end: "15:20", course: "MAT216", room: "12A-07C" },
      { day: "Sunday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Monday", start: "12:30", end: "13:50", course: "CSE221", room: "07D-19C" },
      { day: "Tuesday", start: "14:00", end: "15:20", course: "MAT216", room: "12A-07C" },
      { day: "Tuesday", start: "15:30", end: "16:50", course: "CSE320", room: "09D-18C" },
      { day: "Wednesday", start: "12:30", end: "13:50", course: "CSE221", room: "07D-19C" },
      { day: "Saturday", start: "11:00", end: "13:50", course: "CSE221L", room: "09B-09L" }
    ]
  },
  "1000054022": {
    name: "Khan Abdullah",
    nickname: "Abdullah",
    phone: "", 
    color: "bg-rose-500",
    colorHex: "#f43f5e",
    schedule: [
      { day: "Sunday", start: "08:00", end: "09:20", course: "CSE220", room: "09B-08L" },
      { day: "Sunday", start: "09:30", end: "10:50", course: "CSE220", room: "09B-08L" },
      { day: "Sunday", start: "14:00", end: "15:20", course: "MAT216", room: "12A-07C" },
      { day: "Monday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Monday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Monday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" },
      { day: "Tuesday", start: "11:00", end: "12:20", course: "CSE251", room: "FT10-01L" },
      { day: "Tuesday", start: "12:30", end: "13:50", course: "CSE251", room: "FT10-01L" },
      { day: "Tuesday", start: "14:00", end: "15:20", course: "MAT216", room: "12A-07C" },
      { day: "Wednesday", start: "12:30", end: "13:50", course: "CSE220", room: "09B-12C" },
      { day: "Wednesday", start: "14:00", end: "15:20", course: "PSY101", room: "09E-20T" },
      { day: "Wednesday", start: "15:30", end: "16:50", course: "CSE251", room: "07H-27C" }
    ]
  }
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_START = 8 * 60;
const DAY_END = 17 * 60;

// --- UTILITIES ---
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatTime = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const extractFloor = (room) => {
  if (room.startsWith('FT10')) return 'Floor 10 (FT)';
  const match = room.match(/^(\d+)[A-Z]/);
  return match ? `Floor ${parseInt(match[1], 10)}` : 'N/A';
};

// --- AVATAR COMPONENT ---
const Avatar = ({ user, size = 40 }) => (
  <div
    className={`rounded-full flex items-center justify-center font-black text-white shrink-0 ${user.color}`}
    style={{ width: size, height: size, fontSize: size * 0.35, lineHeight: 1 }}
  >
    {user.nickname.substring(0, 2).toUpperCase()}
  </div>
);

// --- GANTT CHART (Desktop only) ---
const GanttChart = ({ squadData, sharedClasses, isToday, currentMinutes }) => {
  const chartRef = useRef(null);
  const activeMembers = squadData.filter(s => s.classes.length > 0);
  const totalDuration = DAY_END - DAY_START;
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  if (activeMembers.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 font-bold uppercase tracking-widest text-sm">
        No classes scheduled for the squad today.
      </div>
    );
  }

  const nowPercent = isToday && currentMinutes >= DAY_START && currentMinutes <= DAY_END
    ? ((currentMinutes - DAY_START) / totalDuration) * 100
    : null;

  return (
    <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
      <div style={{ minWidth: 700 }}>
        {/* Time header */}
        <div className="flex mb-3">
          <div className="shrink-0" style={{ width: 90 }}></div>
          <div className="flex-1 relative h-4">
            {hours.map(hour => {
              const pct = ((hour * 60 - DAY_START) / totalDuration) * 100;
              return (
                <div key={hour} className="absolute text-xs font-bold text-slate-500 -translate-x-1/2" style={{ left: `${pct}%` }}>
                  {hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'pm' : 'am'}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {activeMembers.map(({ id, user, classes, freeBlocks }) => (
            <div key={id} className="flex items-center gap-0" style={{ height: 44 }}>
              {/* Label */}
              <div className="shrink-0 flex items-center gap-2 overflow-hidden" style={{ width: 90 }}>
                <Avatar user={user} size={28} />
                <span className="text-xs font-bold text-white truncate">{user.nickname}</span>
              </div>

              {/* Track */}
              <div className="flex-1 relative rounded-lg overflow-hidden" style={{ height: 36, background: 'rgba(255,255,255,0.03)' }}>
                {/* Grid lines */}
                {hours.map(hour => {
                  const pct = ((hour * 60 - DAY_START) / totalDuration) * 100;
                  return <div key={hour} className="absolute top-0 bottom-0" style={{ left: `${pct}%`, width: 1, background: 'rgba(255,255,255,0.05)' }} />;
                })}

                {/* Free blocks */}
                {freeBlocks.map((f, i) => {
                  const left = ((f.start - DAY_START) / totalDuration) * 100;
                  const width = ((f.end - f.start) / totalDuration) * 100;
                  return (
                    <div
                      key={`f-${i}`}
                      className="absolute top-0 bottom-0"
                      style={{ left: `${left}%`, width: `${width}%`, background: 'rgba(16,185,129,0.08)' }}
                    />
                  );
                })}

                {/* Class blocks */}
                {classes.map((c, i) => {
                  const startMins = Math.max(timeToMinutes(c.start), DAY_START);
                  const endMins = Math.min(timeToMinutes(c.end), DAY_END);
                  if (endMins <= startMins) return null;
                  const left = ((startMins - DAY_START) / totalDuration) * 100;
                  const width = ((endMins - startMins) / totalDuration) * 100;
                  const isShared = sharedClasses.some(sc => sc.course === c.course && sc.start === c.start);

                  return (
                    <div
                      key={`c-${i}`}
                      className="absolute top-1 bottom-1 rounded-md flex items-center justify-between px-2 cursor-default group/tip"
                      style={{ left: `${left}%`, width: `${width}%`, background: user.colorHex, boxShadow: `0 2px 8px ${user.colorHex}40` }}
                      title={`${c.course} — ${formatTime(startMins)} to ${formatTime(endMins)} — ${c.room}`}
                    >
                      <span className="text-[10px] font-black text-white truncate leading-none">{c.course}</span>
                      {width > 12 && <span className="text-[9px] font-bold text-white/70 truncate leading-none ml-1">{c.room}</span>}
                      {isShared && <Users className="w-2.5 h-2.5 text-white/70 shrink-0 ml-0.5" />}

                      {/* Tooltip */}
                      <div className="hidden group-hover/tip:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black rounded-xl p-3 shadow-2xl whitespace-nowrap z-50 pointer-events-none text-left">
                        <div className="font-black text-sm">{c.course}</div>
                        <div className="text-slate-500 font-semibold text-xs">{formatTime(startMins)} – {formatTime(endMins)}</div>
                        <div className="text-blue-600 font-semibold text-xs mt-0.5">{c.room} · {extractFloor(c.room)}</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 -mt-1" />
                      </div>
                    </div>
                  );
                })}

                {/* Now line */}
                {nowPercent !== null && (
                  <div className="absolute top-0 bottom-0 z-30 pointer-events-none" style={{ left: `${nowPercent}%` }}>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded whitespace-nowrap" style={{ boxShadow: '0 0 8px rgba(244,63,94,0.5)' }}>
                      NOW
                    </div>
                    <div className="w-[2px] h-full bg-rose-500 mx-auto" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MOBILE SCHEDULE LIST ---
const MobileScheduleList = ({ squadData, sharedClasses, isToday, currentMinutes }) => {
  const activeMembers = squadData.filter(s => s.classes.length > 0);

  if (activeMembers.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500 font-bold uppercase tracking-widest text-sm">
        No classes scheduled today.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeMembers.map(({ id, user, classes, status, currentClass, nextClass }) => (
        <div key={id} className="bg-black/30 rounded-2xl p-4">
          {/* User header */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar user={user} size={32} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-white truncate">{user.nickname}</div>
              <div className="text-[11px] text-slate-500 font-medium">{classes.length} classes</div>
            </div>
            {isToday && status === 'in-class' && (
              <span className="text-[10px] font-black text-rose-400 bg-rose-500/15 px-2 py-1 rounded-full uppercase">Busy</span>
            )}
            {isToday && status === 'campus-free' && (
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded-full uppercase">Free</span>
            )}
          </div>

          {/* Class list */}
          <div className="space-y-1.5">
            {classes.map((c, i) => {
              const startMins = timeToMinutes(c.start);
              const endMins = timeToMinutes(c.end);
              const isActive = isToday && currentMinutes >= startMins && currentMinutes <= endMins;
              const isPast = isToday && currentMinutes > endMins;
              const isShared = sharedClasses.some(sc => sc.course === c.course && sc.start === c.start);

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                    isActive ? 'bg-white/10 ring-1 ring-white/20' : isPast ? 'opacity-40' : 'bg-white/[0.03]'
                  }`}
                >
                  <div className="shrink-0 w-1 self-stretch rounded-full" style={{ background: user.colorHex }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{c.course}</span>
                      {isShared && <Users className="w-3 h-3 text-indigo-400" />}
                      {isActive && <span className="text-[9px] font-black text-rose-400 uppercase">Live</span>}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{c.room}</div>
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold shrink-0 text-right">
                    <div>{formatTime(startMins)}</div>
                    <div>{formatTime(endMins)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};


// --- MAIN APP ---
export default function App() {
  const [currentId, setCurrentId] = useState("1000054");
  const [activeUser, setActiveUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (USERS[currentId]) setActiveUser(USERS[currentId]);
    else alert("ID not recognized.");
  };

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
  const selectedDayName = DAYS[selectedDayIndex];
  const isToday = selectedDayName === DAYS[currentDate.getDay()];

  // --- SCHEDULE PARSER ---
  const squadData = useMemo(() => {
    return Object.entries(USERS).map(([id, user]) => {
      const classes = [...user.schedule]
        .filter(c => c.day === selectedDayName)
        .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

      let status = "off-today";
      let freeBlocks = [];
      let currentClass = null;
      let nextClass = null;
      
      if (classes.length > 0) {
        let currentPointer = DAY_START;
        classes.forEach(cls => {
          const startMins = timeToMinutes(cls.start);
          const endMins = timeToMinutes(cls.end);
          if (startMins > currentPointer) {
            freeBlocks.push({ start: currentPointer, end: startMins });
          }
          currentPointer = Math.max(currentPointer, endMins);
        });
        if (currentPointer < DAY_END) {
          freeBlocks.push({ start: currentPointer, end: DAY_END });
        }

        if (isToday) {
          if (currentMinutes < DAY_START) {
            status = "home-morning";
            nextClass = classes[0];
          } else if (currentMinutes > Math.max(DAY_END, timeToMinutes(classes[classes.length-1].end))) {
            status = "home-done";
          } else {
            status = "campus-free"; 
            for (let i = 0; i < classes.length; i++) {
              const start = timeToMinutes(classes[i].start);
              const end = timeToMinutes(classes[i].end);
              if (currentMinutes >= start && currentMinutes <= end) {
                status = "in-class";
                currentClass = classes[i];
                nextClass = classes[i + 1] || null;
                break;
              } else if (currentMinutes < start && !nextClass) {
                nextClass = classes[i];
              }
            }
          }
        } else {
          status = "scheduled";
        }
      }

      return { id, user, classes, freeBlocks, status, currentClass, nextClass };
    });
  }, [selectedDayName, isToday, currentMinutes]);

  // --- HANGOUT CALCULATOR ---
  const hangouts = useMemo(() => {
    const activeSquad = squadData.filter(s => s.classes.length > 0);
    if (activeSquad.length < 2) return [];

    const events = [];
    activeSquad.forEach(member => {
      member.freeBlocks.forEach(block => {
        events.push({ time: block.start, type: 'start', user: member.user });
        events.push({ time: block.end, type: 'end', user: member.user });
      });
    });
    events.sort((a, b) => a.time - b.time);

    let currentFreeUsers = new Map();
    let lastTime = DAY_START;
    const hangoutWindows = [];

    events.forEach(event => {
      if (event.time > lastTime && currentFreeUsers.size >= 2) {
        hangoutWindows.push({
          start: lastTime, end: event.time,
          duration: event.time - lastTime,
          users: Array.from(currentFreeUsers.values())
        });
      }
      if (event.type === 'start') currentFreeUsers.set(event.user.name, event.user);
      else currentFreeUsers.delete(event.user.name);
      lastTime = event.time;
    });

    const merged = [];
    hangoutWindows.forEach(w => {
      const last = merged[merged.length - 1];
      if (last && last.end === w.start && last.users.length === w.users.length && last.users.every((u, i) => u.name === w.users[i].name)) {
        last.end = w.end;
        last.duration = last.end - last.start;
      } else if (w.duration >= 15) {
        merged.push({ ...w });
      }
    });
    return merged;
  }, [squadData]);

  // --- SHARED CLASSES ---
  const sharedClasses = useMemo(() => {
    const classMap = {};
    squadData.forEach(member => {
      member.classes.forEach(c => {
        const key = `${c.start}-${c.course}-${c.room}`;
        if (!classMap[key]) classMap[key] = { course: c.course, start: c.start, end: c.end, room: c.room, users: [] };
        classMap[key].users.push(member.user);
      });
    });
    return Object.values(classMap).filter(c => c.users.length > 1).sort((a,b) => timeToMinutes(a.start) - timeToMinutes(b.start));
  }, [squadData]);

  if (!isClient) return null;

  // =====================
  // LOGIN SCREEN
  // =====================
  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-5">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight">MODERCHUDANIR SIDDE</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Squad Logistics & Combinations</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              value={currentId}
              onChange={(e) => setCurrentId(e.target.value)}
              className="w-full bg-[#111] border border-white/15 rounded-2xl px-5 py-4 text-lg font-mono text-center text-white focus:outline-none focus:border-white/40 transition-colors placeholder-slate-600"
              placeholder="Enter ID..."
            />
            <button type="submit" className="w-full bg-white text-black rounded-2xl px-4 py-4 font-black text-base hover:bg-slate-200 transition-colors active:scale-[0.98]">
              INITIALIZE
            </button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {Object.entries(USERS).map(([id, user]) => (
              <button
                key={id}
                onClick={() => { setCurrentId(id); }}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                <Avatar user={user} size={20} />
                <span className="text-[11px] font-bold text-slate-300">{user.nickname}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =====================
  // MAIN DASHBOARD
  // =====================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 pb-8">
      
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/8" style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar user={activeUser} size={36} />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase truncate leading-none">MODERCHUDANIR SIDDE</h1>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{activeUser.nickname}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-bold font-mono text-white">
                {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <button onClick={() => setActiveUser(null)} className="p-2 text-slate-400 hover:text-rose-400 bg-white/5 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-5 space-y-6">
        
        {/* ── DAY SELECTOR ── */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
          {DAYS.map((day, idx) => {
            const isCurrent = idx === new Date().getDay();
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border ${
                  isSelected 
                    ? 'bg-white text-black border-white' 
                    : 'bg-white/[0.03] text-slate-500 border-white/5 hover:bg-white/8 hover:text-slate-300'
                }`}
              >
                <span className="sm:hidden">{isCurrent ? "Today" : DAY_SHORT[idx]}</span>
                <span className="hidden sm:inline">{isCurrent ? "Today" : day}</span>
              </button>
            );
          })}
        </div>

        {/* ── GANTT CHART (Desktop) / SCHEDULE LIST (Mobile) ── */}
        <section className="bg-[#111] border border-white/8 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" /> Schedule
            </h2>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded" style={{ background: 'rgba(16,185,129,0.15)' }} /> Free</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded" /> Class</span>
            </div>
          </div>

          {/* Timeline (Gantt) */}
          <div className="mb-2">
            <GanttChart squadData={squadData} sharedClasses={sharedClasses} isToday={isToday} currentMinutes={currentMinutes} />
          </div>

          {/* Mobile List */}
          <div className="md:hidden mt-6 pt-6 border-t border-white/5">
            <MobileScheduleList squadData={squadData} sharedClasses={sharedClasses} isToday={isToday} currentMinutes={currentMinutes} />
          </div>
        </section>

        {/* ── HANGOUT WINDOWS ── */}
        <section>
          <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4 px-1">
            <Coffee className="w-4 h-4 text-amber-400" /> Hangout Windows
          </h2>

          {hangouts.length === 0 ? (
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center text-slate-500 font-semibold text-sm">
              No overlapping free time found for this day.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {hangouts.map((h, i) => {
                const isOngoing = isToday && currentMinutes >= h.start && currentMinutes < h.end;
                const isPast = isToday && currentMinutes >= h.end;

                return (
                  <div
                    key={i}
                    className={`bg-[#111] border rounded-2xl p-4 transition-all ${
                      isOngoing ? 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/8'
                    } ${isPast ? 'opacity-40' : ''}`}
                  >
                    {/* Time header */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                      <div>
                        <div className="text-sm font-black text-white flex items-center gap-1.5">
                          {formatTime(h.start)}
                          <ChevronRight className="w-3 h-3 text-slate-600" />
                          {formatTime(h.end)}
                        </div>
                        <div className={`text-[11px] font-bold mt-0.5 ${isOngoing ? 'text-amber-400' : 'text-slate-500'}`}>
                          {isOngoing ? 'HAPPENING NOW' : `${h.duration} min gap`}
                        </div>
                      </div>
                      <div className="bg-white/5 px-2.5 py-1 rounded-lg text-xs font-black text-white flex items-center gap-1">
                        <Users className="w-3 h-3" /> {h.users.length}
                      </div>
                    </div>

                    {/* User list */}
                    <div className="space-y-2">
                      {h.users.map(u => (
                        <div key={u.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar user={u} size={28} />
                            <span className="text-sm font-semibold text-white truncate">
                              {u.nickname}
                              {u.name === activeUser.name && <span className="text-[10px] text-slate-500 ml-1">(You)</span>}
                            </span>
                          </div>
                          {u.name !== activeUser.name && u.phone && !isPast && (
                            <a
                              href={`https://wa.me/${u.phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors shrink-0"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── SHARED CLASSES + ROSTER ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Shared classes */}
          {sharedClasses.length > 0 && (
            <div className="lg:col-span-1 bg-indigo-500/8 border border-indigo-500/15 rounded-2xl p-4">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Shared Classes
              </h3>
              <div className="space-y-2.5">
                {sharedClasses.map((cls, i) => (
                  <div key={i} className="bg-black/40 border border-indigo-500/10 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-black text-white">{cls.course}</span>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{formatTime(timeToMinutes(cls.start))}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mb-2">{cls.room}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cls.users.map(u => (
                        <div key={u.name} className="flex items-center gap-1 bg-white/5 pr-2 rounded-full">
                          <Avatar user={u} size={18} />
                          <span className="text-[10px] font-bold text-slate-400">{u.nickname}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual status cards */}
          <div className={`${sharedClasses.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
            {squadData.map(({ id, user, status, currentClass, nextClass, classes }) => {
              if (classes.length === 0) return null;
              
              return (
                <div key={id} className={`bg-[#111] border rounded-2xl p-4 ${id === currentId ? 'border-white/20' : 'border-white/5'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar user={user} size={40} />
                    <div className="min-w-0">
                      <div className="font-bold text-base text-white truncate">{user.nickname}</div>
                      <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {classes.length} classes today
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {status === 'in-class' && currentClass && (
                      <div className="bg-rose-500/10 border border-rose-500/15 rounded-xl p-3">
                        <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-0.5 flex items-center gap-1"><XCircle className="w-3 h-3"/> Busy Now</div>
                        <div className="font-bold text-white text-sm">{currentClass.course}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{currentClass.room} · {extractFloor(currentClass.room)}</div>
                      </div>
                    )}

                    {status === 'campus-free' && (
                      <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-2.5">
                        <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> On Campus & Free</div>
                      </div>
                    )}

                    {nextClass && (status === 'in-class' || status === 'campus-free' || status === 'home-morning') && (
                      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next</div>
                          <div className="font-bold text-slate-200 text-xs">{nextClass.course}</div>
                        </div>
                        <div className="text-[11px] font-black text-white bg-white/8 px-2 py-1 rounded">{formatTime(timeToMinutes(nextClass.start))}</div>
                      </div>
                    )}

                    {status === 'home-done' && (
                      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        Done for the day
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
