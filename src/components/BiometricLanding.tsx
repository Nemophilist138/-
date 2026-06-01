import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data";

interface BiometricLandingProps {
  onUnlock: () => void;
}

export default function BiometricLanding({ onUnlock }: BiometricLandingProps) {
  const [percent, setPercent] = useState(64);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("等待生物特征同步...");
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Fast responsive unlock scanning process
  const handleStartScan = () => {
    if (isUnlocked || isScanning) return;
    setIsScanning(true);
    setScanStatus("正在扫描视网膜 & 指纹...");
    
    let current = 64;
    const interval = setInterval(() => {
      current += 9;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPercent(100);
        setScanStatus("同步成功 // 授权通过");
        setIsUnlocked(true);
        
        // Seamless transition to the main dashboard
        setTimeout(() => {
          onUnlock();
        }, 180);
      } else {
        setPercent(current);
      }
    }, 30);
  };

  return (
    <div className="relative min-h-screen text-on-surface bg-surface font-sans select-none overflow-hidden flex flex-col items-center justify-between p-6">
      {/* Global Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanline z-50"></div>

      {/* Cinematic Cyber City Background Video */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,107,113,0.18),transparent_75%)]"></div>
        <video
          className="w-full h-full object-cover opacity-20 grayscale contrast-150 mix-blend-overlay scale-105"
          src={IMAGES.splashBg}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Top Terminal Info Headers */}
      <div className="relative z-10 w-full flex justify-between items-start font-mono text-[10px] md:text-xs text-primary/60 tracking-widest uppercase">
        <div className="space-y-1">
          <p className="flicker">
            AUTH_LEVEL: <span className="text-primary-container font-bold">GEEK</span>
          </p>
          <p>LOCATION: [HIDDEN]</p>
          <p>UI_REV: 04.22.X</p>
        </div>
        <div className="text-right space-y-1">
          <p>
            PROXY: <span className="text-secondary font-bold">ACTIVE</span>
          </p>
          <p>ENCRYPTION: 256-BIT_X</p>
          <p>UPLINK: STABLE</p>
        </div>
      </div>

      {/* Center Title & Loading Progression */}
      <div className="relative z-10 flex flex-col items-center gap-6 my-auto">
        <div className="relative group p-2">
          {/* Glitch decorative line elements */}
          <div className="absolute -inset-4 border border-primary/20 opacity-30 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -inset-1 border-l-2 border-primary-container glitch-border animate-pulse"></div>
          <h1 className="font-headline text-3xl md:text-5xl text-primary-container font-extrabold tracking-tighter drop-shadow-[0_0_15px_rgba(0,243,255,0.75)] px-6 py-2 bg-surface/45 backdrop-blur-md rounded">
            数据书廊
          </h1>
        </div>

        {/* Loading progress slider panel */}
        <div className="w-64 md:w-80 space-y-3 mt-4">
          <div className="flex justify-between font-mono text-[11px] md:text-xs text-primary/80">
            <span className="animate-pulse tracking-wide">
              {isScanning ? "DECRYPTING DATA FLOW" : "WAITING FOR SYNC FEED"}
            </span>
            <span className="font-bold">{percent}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest relative overflow-hidden border border-outline-variant/30 rounded">
            {/* Progress Fill Indicator */}
            <div
              className="absolute top-0 left-0 h-full bg-primary-container shadow-[0_0_10px_#00f3ff] transition-all duration-150"
              style={{ width: `${percent}%` }}
            ></div>
            {/* Moving glitch highlight shimmer */}
            <div className="absolute top-0 h-full w-12 bg-white/30 skew-x-12 animate-[move_2s_infinite] -left-[20px]"></div>
          </div>
        </div>
      </div>

      {/* Interactive Biometric Fingerprint Trigger Module */}
      <div className="relative z-10 flex flex-col items-center gap-4 mb-12">
        <motion.button
          onClick={handleStartScan}
          whileHover={{ scale: isUnlocked ? 1 : 1.05 }}
          whileTap={{ scale: isUnlocked ? 1 : 0.95 }}
          className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 ${
            isScanning
              ? "border-primary-container shadow-[0_0_20px_rgba(0,243,255,0.4)]"
              : "border-primary/20 hover:border-primary-container/60 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
          } flex items-center justify-center bg-surface-container-low/40 backdrop-blur-md overflow-hidden cursor-pointer transition-colors`}
        >
          {/* Moving Laser line sweep */}
          {isScanning && percent < 100 && (
            <div className="absolute w-full h-0.5 bg-primary-container shadow-[0_0_8px_#00f3ff] laser-line z-20"></div>
          )}

          {/* Biometric circle grid dot alignment background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,243,255,1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

          {/* Fingerprint icon with active pulse states */}
          <span
            className={`material-symbols-outlined text-primary-container font-light ${
              isScanning ? "text-6xl md:text-7xl opacity-100 animate-pulse" : "text-5xl md:text-6xl opacity-80"
            }`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            fingerprint
          </span>
        </motion.button>

        <p className="font-mono text-[10px] md:text-[11px] text-on-surface-variant/80 tracking-[0.25em] uppercase flicker mt-2">
          {scanStatus}
        </p>
        
        {!isScanning && (
          <p className="text-[10px] text-primary/40 font-mono tracking-widest uppercase">
            点击指纹区域建立连接
          </p>
        )}
      </div>

      {/* Decorative Outer Screen corner bracket lines */}
      <div className="fixed top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary-container/40 z-40"></div>
      <div className="fixed top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary-container/40 z-40"></div>
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-primary-container/40 z-40"></div>
      <div className="fixed bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-primary-container/40 z-40"></div>

      {/* System Node Info Overlays (Lower margins) */}
      <div className="absolute bottom-4 left-6 font-mono text-[9px] md:text-[10px] text-primary/30 uppercase vertical-text">
        SST_ID: DB-9901 // SECURE NODE
      </div>
      <div className="absolute bottom-4 right-6 font-mono text-[9px] md:text-[10px] text-primary/30 uppercase tracking-widest">
        EST_REMAINING: 00:04:12
      </div>

      <style>{`
        @keyframes move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
