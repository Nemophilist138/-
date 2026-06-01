import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogEntry } from "../types";
import { INITIAL_LOGS, ACTIVE_NODES, IMAGES } from "../data";

interface TerminalPanelProps {
  onShowNotification: (message: string) => void;
  isStealth: boolean;
  onToggleStealth: () => void;
  isShield: boolean;
  onToggleShield: () => void;
  decryptionLevel: number;
  onUpdateDecryption: (v: number) => void;
}

export default function TerminalPanel({
  onShowNotification,
  isStealth,
  onToggleStealth,
  isShield,
  onToggleShield,
  decryptionLevel,
  onUpdateDecryption
}: TerminalPanelProps) {
  // Live simulated hardware load states
  const [cpu, setCpu] = useState(42.8);
  const [latency, setLatency] = useState(14);
  const [uptimeStr, setUptimeStr] = useState("102:44:11");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Fluctuating hardware stats simulation
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setCpu((prev) => {
        const diff = (Math.random() * 4 - 2).toFixed(1);
        const newVal = parseFloat(prev) + parseFloat(diff);
        return newVal > 80 ? 73.4 : newVal < 10 ? 12.1 : parseFloat(newVal.toFixed(1));
      });
      setLatency((prev) => {
        const diff = Math.floor(Math.random() * 6) - 3;
        const newVal = prev + diff;
        return newVal > 60 ? 32 : newVal < 4 ? 8 : newVal;
      });
    }, 2000);

    // Dynamic ticking clock simulation for active uptime
    const clockTimer = setInterval(() => {
      setUptimeStr((prev) => {
        const parts = prev.split(":").map(Number);
        let [h, m, s] = parts;
        s += 1;
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        const format = (v: number) => v.toString().padStart(2, "0");
        return `${format(h)}:${format(m)}:${format(s)}`;
      });
    }, 1000);

    return () => {
      clearInterval(statsTimer);
      clearInterval(clockTimer);
    };
  }, []);

  // Set up periodic automated cyber log injector! (Makes the console look wonderfully alive and functional)
  useEffect(() => {
    const randomLogEntries = [
      { text: "自动建立与冷存储节点的主中继握手...", type: "info" },
      { text: "神经连接协议第5层完成重组，校验码 [SHA-256: OK]", type: "success" },
      { text: "警告: 检测到异构节点正在匿名嗅探包传输迹象...", type: "warn" },
      { text: "已阻断匿名节点，触发端口阻断指令 (0xEFB0)...", type: "success" },
      { text: "同步中子矩阵分类日志第24卷内容，目录完整", type: "info" },
      { text: "核心神经网络中转过载: 局域信道负载处于临界水平", type: "warn" }
    ];

    const logInjector = setInterval(() => {
      const entry = randomLogEntries[Math.floor(Math.random() * randomLogEntries.length)];
      setLogs((prev) => {
        const now = new Date();
        const timestr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
        const newLog: LogEntry = {
          timestamp: timestr,
          text: entry.text,
          type: entry.type as any
        };
        // Cap logs lists to prevent token bloating
        return [...prev.slice(-35), newLog];
      });
    }, 4500);

    return () => clearInterval(logInjector);
  }, []);

  // auto scroll to bottom on logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Execute terminal hacking core trigger simulation
  const handleExecuteHack = () => {
    onShowNotification("正在向系统内核注入缓存溢出重置二进制块...");
    setTimeout(() => {
      const now = new Date();
      const timestampString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      
      const exploitLogs: LogEntry[] = [
        { timestamp: timestampString, text: ">>> SYSTEM ROOT SHELL TRIGGERED BY DATA_RUNNER_01", type: "success" },
        { timestamp: timestampString, text: ">>> VULNERABILITY EXPLOIT SUCCESSFUL: BUFFER_FLOW_BYPASS", type: "success" },
        { timestamp: timestampString, text: ">>> ACCESS GRANTED: ROOT_LEVEL CREDENTIALS SECURED", type: "success" }
      ];

      setLogs((prev) => [...prev, ...exploitLogs]);
      onShowNotification("对等网络主节点控制权已安全接管！");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface select-none"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_bottom,rgba(0,243,255,0.08),transparent_60%)]"></div>

      {/* Live hardware meters panel */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* CPU Box */}
        <div className="bg-surface-container-low/60 backdrop-blur-md p-4 glitch-border flex flex-col items-center justify-center rounded">
          <span className="font-mono text-[9px] md:text-[10px] text-on-surface-variant uppercase mb-1.5 tracking-widest">
            CPU LOAD
          </span>
          <span className="font-headline text-lg md:text-xl text-primary-container font-extrabold select-all">
            {cpu}%
          </span>
          <div className="w-full h-1 bg-surface-variant mt-2.5 overflow-hidden rounded-xs">
            <div
              className="h-full bg-primary-container shadow-[0_0_8px_#00f3ff] transition-all duration-300"
              style={{ width: `${cpu}%` }}
            ></div>
          </div>
        </div>

        {/* Latency Box */}
        <div className="bg-surface-container-low/60 backdrop-blur-md p-4 glitch-border flex flex-col items-center justify-center rounded">
          <span className="font-mono text-[9px] md:text-[10px] text-on-surface-variant uppercase mb-1.5 tracking-widest">
            LATENCY
          </span>
          <span className="font-headline text-lg md:text-xl text-secondary font-extrabold select-all">
            {latency}MS
          </span>
          <div className="w-full h-1 bg-surface-variant mt-2.5 overflow-hidden rounded-xs">
            <div
              className="h-full bg-secondary shadow-[0_0_8px_#ff00ff] transition-all duration-300"
              style={{ width: `${Math.min(latency * 1.5, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Security Level Box */}
        <div className="bg-surface-container-low/60 backdrop-blur-md p-4 glitch-border flex flex-col items-center justify-center rounded">
          <span className="font-mono text-[9px] md:text-[10px] text-on-surface-variant uppercase mb-1.5 tracking-widest">
            ENCRYPTION
          </span>
          <span className="font-headline text-lg md:text-xl text-primary-container font-extrabold">
            LEVEL {decryptionLevel > 70 ? 9 : decryptionLevel > 40 ? 5 : 2}
          </span>
          <div className="w-full h-1 bg-surface-variant mt-2.5 overflow-hidden rounded-xs">
            <div
              className="h-full bg-primary-container shadow-[0_0_8px_#00f3ff] transition-all duration-300"
              style={{ width: `${decryptionLevel}%` }}
            ></div>
          </div>
        </div>

        {/* Uptime Box */}
        <div className="bg-surface-container-low/60 backdrop-blur-md p-4 glitch-border flex flex-col items-center justify-center rounded">
          <span className="font-mono text-[9px] md:text-[10px] text-on-surface-variant uppercase mb-1.5 tracking-widest">
            UPTIME
          </span>
          <span className="font-headline text-md md:text-lg text-on-surface font-extrabold select-all truncate">
            {uptimeStr}
          </span>
          <div className="w-full h-1 bg-surface-variant mt-2.5 overflow-hidden rounded-xs">
            <div className="h-full bg-on-surface shadow-[0_0_8px_white] w-2/3"></div>
          </div>
        </div>
      </section>

      {/* Active node synchronization list matching mockup 6 */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4 select-none">
          <span className="material-symbols-outlined text-primary-container text-xl animate-pulse">hub</span>
          <h2 className="font-headline text-md md:text-lg text-primary font-bold tracking-tight">
            活跃数据节点 ACTIVE_NODES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACTIVE_NODES.map((node) => (
            <div
              key={node.id}
              className="bg-surface-container-low/40 backdrop-blur-lg border border-primary/20 p-4 flex items-center justify-between rounded hover:border-primary-container/60 transition-colors select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span
                    className={`material-symbols-outlined ${
                      node.id === "node2" ? "text-secondary" : "text-primary-container"
                    } text-3xl`}
                  >
                    {node.icon}
                  </span>
                  {node.status !== "locked" && (
                    <div
                      className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 ${
                        node.id === "node2" ? "bg-secondary" : "bg-primary-container"
                      } rounded-full animate-ping`}
                    ></div>
                  )}
                </div>
                <div>
                  <p className="font-mono text-primary-container text-xs font-bold leading-tight">
                    {node.name}
                  </p>
                  <p className="font-mono text-[9px] text-on-surface-variant mt-0.5">
                    {node.loadRegion}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 text-large group-hover:text-primary transition-colors">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Terminal Logs streaming display feeds box matches mockup 6 */}
        <section className="flex flex-col h-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-large">terminal</span>
              <h2 className="font-headline text-sm md:text-base text-secondary font-bold tracking-tight">
                传输日志 TERMINAL_RECEIVE
              </h2>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant/80 animate-pulse tracking-wide select-none">
              REAL-TIME_LOGS
            </span>
          </div>

          <div
            ref={logContainerRef}
            className="flex-grow bg-surface-container-lowest/80 border border-secondary/20 p-4 font-mono text-[11px] rounded terminal-scroll overflow-y-auto space-y-1.5 h-64 select-text"
          >
            {logs.map((log, idx) => {
              const colorMap = {
                info: "text-[#00dce6]",
                success: "text-[#00ff41]",
                warn: "text-secondary-fixed-dim",
                error: "text-error"
              };
              return (
                <p key={idx} className={`${colorMap[log.type]} leading-relaxed`}>
                  [{log.timestamp}] {log.text}
                </p>
              );
            })}
          </div>
        </section>

        {/* Custom checkboxes, protocol toggles and sliders matches mockup 6 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="material-symbols-outlined text-primary-container text-lg">security</span>
            <h2 className="font-headline text-sm md:text-base text-primary font-bold tracking-tight">
              系统协议 SYSTEM_PROTOCOLS
            </h2>
          </div>

          <div className="space-y-3">
            {/* Toggle switch: STEALTH_MODE */}
            <div className="bg-surface-container-high/40 p-4 rounded-lg flex items-center justify-between border-l-4 border-primary-container">
              <div>
                <p className="font-mono text-primary-container text-sm font-bold">
                  隐形模式 (STEALTH_MODE)
                </p>
                <p className="text-[9px] text-on-surface-variant/70 uppercase tracking-wide mt-0.5">
                  掩盖所有出口流量特征 MASK_NETWORK
                </p>
              </div>
              <button
                onClick={onToggleStealth}
                className="relative inline-flex items-center cursor-pointer p-1"
                aria-label="Toggle stealth navigation protocol"
              >
                <div
                  className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    isStealth ? "bg-primary-container shadow-[0_0_8px_rgba(0,243,255,0.6)]" : "bg-outline-variant"
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-surface rounded-full shadow-md"
                    style={{ x: isStealth ? 24 : 0 }}
                  />
                </div>
              </button>
            </div>

            {/* Toggle switch: NEURAL_SHIELD */}
            <div className="bg-surface-container-high/40 p-4 rounded-lg flex items-center justify-between border-l-4 border-secondary">
              <div>
                <p className="font-mono text-secondary text-sm font-bold">
                  神经屏蔽 (NEURAL_SHIELD)
                </p>
                <p className="text-[9px] text-on-surface-variant/70 uppercase tracking-wide mt-0.5">
                  防止脑机接口逆向追踪 PURGE_LOGS
                </p>
              </div>
              <button
                onClick={onToggleShield}
                className="relative inline-flex items-center cursor-pointer p-1"
                aria-label="Toggle neural shield hardware encryption"
              >
                <div
                  className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    isShield ? "bg-secondary shadow-[0_0_8px_rgba(254,0,254,0.6)]" : "bg-outline-variant"
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-surface rounded-full shadow-md"
                    style={{ x: isShield ? 24 : 0 }}
                  />
                </div>
              </button>
            </div>

            {/* Slider: DECRYPTION_LVL range slider */}
            <div className="bg-surface-container-high/40 p-4 space-y-2 border-l-4 border-on-surface-variant rounded-lg">
              <div className="flex justify-between items-center select-none">
                <p className="font-mono text-on-surface text-sm font-bold">
                  解密等级 (DECRYPTION_LVL)
                </p>
                <span className="font-mono text-primary-container font-extrabold drop-shadow-[0_0_4px_#00f3ff]">
                  {decryptionLevel}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={decryptionLevel}
                onChange={(e) => onUpdateDecryption(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary-container hover:shadow-[0_0_5px_#00f3ff] transition-shadow duration-150"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Terminal Hacking simulation executive banner matches mockup 6 exactly */}
      <section className="mt-8 relative h-44 bg-surface-container-highest overflow-hidden glitch-border group rounded-lg border border-primary-container/20 shadow-xl">
        <div className="absolute inset-0 opacity-15 transition-transform duration-500 group-hover:scale-105 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            src={IMAGES.microchips}
            alt="Silicon Pathways"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 z-10 select-none">
          <h3 className="font-headline text-md md:text-lg text-primary-container font-extrabold mb-1 drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">
            访问根目录 SYSTEM_ROOT_PROMPT
          </h3>
          <p className="font-mono text-[10px] md:text-[11px] text-on-surface-variant/80">
            正在尝试获得管理员权限...
          </p>
        </div>

        <button
          onClick={handleExecuteHack}
          className="absolute bottom-4 right-4 z-10 bg-primary-container text-surface px-5 py-2 font-mono font-bold text-xs md:text-sm hover:skew-x-2 transition-transform shadow-[0_0_15px_#00f3ff] rounded-xs cursor-pointer active:scale-95 text-center"
        >
          执行 EXPL_SYS
        </button>
      </section>
    </motion.div>
  );
}
