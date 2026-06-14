import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, MapPin, Calendar, LogOut, CheckCircle2, XCircle, 
  Moon, Coffee, MessageCircle, Home, Navigation, 
  Users, Zap, ShieldAlert, BarChart3, Activity
} from 'lucide-react';

// --- DATA ---
const USERS = {
  "1000054254": {
    name: "Monjurul",
    nickname: "Monjurul",
    phone: "8801886660063",
    color: "bg-blue-500",
    border: "border-blue-500",
    text: "text-blue-400",
    bgLight: "bg-blue-500/10",
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
    border: "border-purple-500",
    text: "text-purple-400",
    bgLight: "bg-purple-500/10",
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
    border: "border-emerald-500",
    text: "text-emerald-400",
    bgLight: "bg-emerald-500/10",
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
    border: "border-amber-500",
    text: "text-amber-400",
    bgLight: "bg-amber-500/10",
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
    border: "border-rose-500",
    text: "text-rose-400",
    bgLight: "bg-rose-500/10",
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
const DAY_START = 8 * 60; // 08:00 AM
const DAY_END = 17 * 60;  // 05:00 PM

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

  // --- 1. MASTER SCHEDULE PARSER ---
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

  // --- 2. EXACT HANGOUT CALCULATOR (SWEEPLINE ALGORITHM) ---
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
          start: lastTime,
          end: event.time,
          duration: event.time - lastTime,
          users: Array.from(currentFreeUsers.values())
        });
      }

      if (event.type === 'start') {
        currentFreeUsers.set(event.user.name, event.user);
      } else {
        currentFreeUsers.delete(event.user.name);
      }
      
      lastTime = event.time;
    });

    const mergedWindows = [];
    hangoutWindows.forEach(window => {
      const last = mergedWindows[mergedWindows.length - 1];
      if (last && last.end === window.start && last.users.length === window.users.length && last.users.every((u, i) => u.name === window.users[i].name)) {
        last.end = window.end;
        last.duration = last.end - last.start;
      } else {
        if (window.duration >= 15) {
          mergedWindows.push({ ...window });
        }
      }
    });

    return mergedWindows;
  }, [squadData]);

  // --- 3. SHARED CLASSES ENGINE ---
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

  // --- RENDER HELPERS ---
  const Avatar = ({ user, size="w-10 h-10" }) => (
    <div className={`${size} rounded-full flex items-center justify-center font-black text-white shadow-lg ${user.color} ring-2 ring-[#0a0a0a]`}>
      {user.nickname.substring(0, 2).toUpperCase()}
    </div>
  );

  if (!isClient) return null;

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-[#111] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 uppercase break-words leading-tight">MADERCHUDANIR CAID</h1>
            <p className="text-slate-400 font-medium">Squad Logistics & Combinations</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              value={currentId}
              onChange={(e) => setCurrentId(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-xl px-5 py-4 text-xl font-mono text-center focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Enter ID..."
            />
            <button type="submit" className="w-full bg-white text-black rounded-xl px-4 py-4 font-black text-lg hover:bg-slate-200 transition-all">
              INITIALIZE
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans pb-24 selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar user={activeUser} />
            <div className="max-w-[150px] sm:max-w-full">
              <h1 className="text-sm sm:text-xl font-black tracking-tight leading-none text-white uppercase truncate">MADERCHUDANIR CAID</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                {activeUser.nickname}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold font-mono text-white items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button onClick={() => setActiveUser(null)} className="p-2 text-slate-400 hover:text-rose-400 bg-white/5 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6 mt-4">
        
        {/* DAY SELECTOR */}
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none' }}>
          {DAYS.map((day, idx) => (
            <button
              key={day}
              onClick={() => setSelectedDayIndex(idx)}
              className={`shrink-0 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 border ${
                selectedDayIndex === idx 
                  ? 'bg-white text-black border-white scale-[1.02]' 
                  : 'bg-[#151515] text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {idx === new Date().getDay() ? "Today" : day}
            </button>
          ))}
        </div>

        {/* 1. MASTER GANTT CHART (The Visualizer) */}
        <section className="bg-[#111] border border-white/10 rounded-[2rem] p-5 shadow-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Grand Chart Layout
            </h2>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-white/10 rounded" /> Free Time</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded" /> Class</span>
            </div>
          </div>

          <div className="relative w-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="min-w-[800px] relative pb-4">
              
              {/* Header Time Ticks (8 AM to 5 PM) */}
              <div className="flex border-b border-white/10 mb-4 ml-[100px]">
                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
                  <div key={hour} className="flex-1 text-xs font-bold text-slate-500 relative h-6">
                    <span className="absolute -left-4 top-0 bg-[#111] px-1 z-10">
                      {hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'pm' : 'am'}
                    </span>
                    <div className="absolute left-0 top-6 bottom-[-300px] w-px bg-white/5" />
                  </div>
                ))}
              </div>

              {/* Rows per user */}
              <div className="space-y-4">
                {squadData.filter(s => s.classes.length > 0).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-bold uppercase tracking-widest">No classes scheduled for the squad today.</div>
                ) : (
                  squadData.filter(s => s.classes.length > 0).map(({ id, user, classes, freeBlocks }) => (
                    <div key={id} className="relative h-16 flex items-center group">
                      {/* User Name Label */}
                      <div className="w-[100px] shrink-0 flex items-center gap-2 pr-4 z-10 bg-[#111] h-full">
                        <Avatar user={user} size="w-8 h-8" />
                        <span className="text-xs font-black text-white truncate">{user.nickname}</span>
                      </div>
                      
                      {/* Timeline Track */}
                      <div className="flex-1 relative h-12 bg-black/40 rounded-xl overflow-hidden ring-1 ring-white/10">
                        
                        {/* Render Free Blocks */}
                        {freeBlocks.map((f, i) => {
                          const totalDuration = DAY_END - DAY_START; // 540 mins
                          const left = ((f.start - DAY_START) / totalDuration) * 100;
                          const width = ((f.end - f.start) / totalDuration) * 100;
                          return (
                            <div 
                              key={`free-${i}`} 
                              className="absolute top-0 bottom-0 bg-emerald-500/10 border-x border-emerald-500/20 flex items-center justify-center"
                              style={{ left: `${left}%`, width: `${width}%` }}
                            >
                              {/* Only show "Free" text if block is wide enough */}
                              {width > 8 && <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">Free</span>}
                            </div>
                          );
                        })}

                        {/* Render Class Blocks */}
                        {classes.map((c, i) => {
                          const totalDuration = DAY_END - DAY_START;
                          const startMins = Math.max(timeToMinutes(c.start), DAY_START);
                          const endMins = Math.min(timeToMinutes(c.end), DAY_END);
                          if (endMins <= startMins) return null;

                          const left = ((startMins - DAY_START) / totalDuration) * 100;
                          const width = ((endMins - startMins) / totalDuration) * 100;
                          
                          // Check if it's a shared class for highlight
                          const isShared = sharedClasses.some(sc => sc.course === c.course && sc.start === c.start);

                          return (
                            <div 
                              key={`class-${i}`}
                              className={`absolute top-0 bottom-0 ${user.color} rounded-lg flex flex-col justify-center px-2 shadow-lg border border-white/20 transition-all hover:scale-105 cursor-pointer overflow-hidden z-20`}
                              style={{ left: `${left}%`, width: `${width}%` }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-black text-white truncate">{c.course}</span>
                                {isShared && <Users className="w-3 h-3 text-white/80 shrink-0" />}
                              </div>
                              <span className="text-[9px] font-bold text-white/80 truncate">{c.room}</span>
                              
                              {/* Hover Details */}
                              <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black p-3 rounded-xl whitespace-nowrap z-50 shadow-2xl">
                                <div className="font-black text-sm">{c.course}</div>
                                <div className="text-slate-600 font-bold">{formatTime(timeToMinutes(c.start))} - {formatTime(timeToMinutes(c.end))}</div>
                                <div className="text-blue-600 font-bold mt-1">{c.room} ({extractFloor(c.room)})</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Live Time Indicator */}
              {isToday && currentMinutes >= DAY_START && currentMinutes <= DAY_END && (
                <div 
                  className="absolute top-0 bottom-0 w-[2px] bg-rose-500 z-30 pointer-events-none"
                  style={{ left: `calc(100px + ${((currentMinutes - DAY_START) / (DAY_END - DAY_START)) * 100}%)` }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                    Now
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. EXACT HANGOUT MATRIX */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-500" /> Exact Match Hangouts
            </h2>
          </div>

          {hangouts.length === 0 ? (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 text-center text-slate-500 font-bold uppercase tracking-widest">
              No overlapping free time found today.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hangouts.map((h, i) => {
                const isOngoing = isToday && currentMinutes >= h.start && currentMinutes < h.end;
                const isPast = isToday && currentMinutes >= h.end;

                return (
                  <div key={i} className={`bg-[#111] border ${isOngoing ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'border-white/10'} rounded-3xl p-5 flex flex-col justify-between ${isPast ? 'opacity-50 grayscale' : ''}`}>
                    
                    <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                      <div>
                        <div className="text-sm font-black text-white flex items-center gap-2">
                          {formatTime(h.start)} <Navigation className="w-3 h-3 text-slate-500 rotate-90" /> {formatTime(h.end)}
                        </div>
                        <div className={`text-xs font-bold mt-1 ${isOngoing ? 'text-amber-500' : 'text-slate-400'}`}>
                          {isOngoing ? 'HAPPENING NOW' : `${h.duration} MINUTE GAP`}
                        </div>
                      </div>
                      <div className="bg-white/5 px-3 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {h.users.length}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available Squad</div>
                      {h.users.map(u => (
                        <div key={u.name} className="flex items-center justify-between bg-black/50 p-2 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Avatar user={u} size="w-8 h-8" />
                            <span className="text-sm font-bold text-white">{u.nickname} {u.name === activeUser.name && <span className="text-[10px] text-slate-500 ml-1">(You)</span>}</span>
                          </div>
                          {u.name !== activeUser.name && u.phone && !isPast && (
                            <a href={`https://wa.me/${u.phone}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                              <MessageCircle className="w-4 h-4" />
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

        {/* 3. DETAILED LIVE ROSTER & SHARED CLASSES */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Shared Classes Panel */}
          {sharedClasses.length > 0 && (
            <div className="lg:col-span-1 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-5">
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" /> Shared Classes Today
              </h3>
              <div className="space-y-3">
                {sharedClasses.map((cls, i) => (
                  <div key={i} className="bg-black/40 border border-indigo-500/20 rounded-2xl p-4">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-black text-white">{cls.course}</span>
                      <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-1 rounded text-xs">{formatTime(timeToMinutes(cls.start))}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-400 mb-3">{cls.room}</div>
                    <div className="flex gap-2">
                      {cls.users.map(u => (
                        <div key={u.name} className="flex items-center gap-1.5 bg-white/5 pr-2 rounded-full">
                          <Avatar user={u} size="w-6 h-6" />
                          <span className="text-[10px] font-bold text-slate-300">{u.nickname}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Roster Cards */}
          <div className={`${sharedClasses.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {squadData.map(({ id, user, status, currentClass, nextClass, classes }) => {
              if (classes.length === 0) return null; // Only show people with classes today
              
              return (
                <div key={id} className={`bg-[#111] border ${id === currentId ? 'border-white/30' : 'border-white/5'} rounded-3xl p-5 flex flex-col justify-between`}>
                  <div className="flex items-center gap-4 mb-5">
                    <Avatar user={user} size="w-12 h-12" />
                    <div>
                      <div className="font-black text-lg text-white">{user.nickname}</div>
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {classes.length} classes today
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {status === 'in-class' && currentClass && (
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                        <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1 flex items-center gap-1"><XCircle className="w-3 h-3"/> Busy Now</div>
                        <div className="font-bold text-white text-sm">{currentClass.course}</div>
                        <div className="text-xs text-rose-200/70 mt-1">{currentClass.room} ({extractFloor(currentClass.room)})</div>
                      </div>
                    )}

                    {status === 'campus-free' && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                         <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> On Campus & Free</div>
                      </div>
                    )}

                    {nextClass && (status === 'in-class' || status === 'campus-free' || status === 'home-morning') && (
                      <div className="bg-black/50 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Next Class</div>
                          <div className="font-bold text-slate-200 text-xs">{nextClass.course}</div>
                        </div>
                        <div className="text-xs font-black text-white bg-white/10 px-2 py-1 rounded">
                          {formatTime(timeToMinutes(nextClass.start))}
                        </div>
                      </div>
                    )}

                    {status === 'home-done' && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
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
