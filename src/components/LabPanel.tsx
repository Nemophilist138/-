import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CyberPatch {
  id: string;
  name: string;
  category: string;
  installed: boolean;
  costCR: number;
  persecDoc: number;
  statBoost: string;
  desc: string;
  heatMetric: number;
}

const INITIAL_PATCHES: CyberPatch[] = [
  {
    id: "patch-1",
    name: "突触神经加速器 SYNAPSE_ACC_V2",
    category: "神经增强 (NEURO)",
    installed: true,
    costCR: 4500,
    persecDoc: 12,
    statBoost: "+15% 反射速度 / +10% 缓存读取速度",
    desc: "加速边缘脑叶的生物信息流传输，缩短对网络回流包的数据处理反应延时时间。",
    heatMetric: 8
  },
  {
    id: "patch-2",
    name: "视网膜多重 HUD 改装 MOD_EYE",
    category: "视觉补片 (OCULAR)",
    installed: false,
    costCR: 2800,
    persecDoc: 4,
    statBoost: "+30% 暗光敏感度 / 自动节点特征识别",
    desc: "通过激光微雕注入眼球的多晶体衍射透镜，无需控制仪表即可实时显示无线中转信号流。",
    heatMetric: 3
  },
  {
    id: "patch-3",
    name: "脑脊液超导重构超感带宽超载器",
    category: "生物物理 (PHYSICAL)",
    installed: false,
    costCR: 8900,
    persecDoc: 25,
    statBoost: "+50% 数据解密上限 / 容许高频算力溢出",
    desc: "将脊柱中的生物胶质替换为可编程室温超导凝胶。增加全神经网络链路的物理通量上限。",
    heatMetric: 18
  },
  {
    id: "patch-4",
    name: "肾上腺微纳米注射矩阵 CAP_ENDOCRINE",
    category: "内分泌补足 (GLANDS)",
    installed: false,
    costCR: 3400,
    persecDoc: 8,
    statBoost: "+40% 并发线程承载强韧度 / 缩短心跳突变期",
    desc: "感知用户正处在底层控制端对冲或攻防状态时，瞬时注入微升量级的合成皮质醇、儿茶酚胺液流。",
    heatMetric: 5
  }
];

export default function LabPanel() {
  const [patches, setPatches] = useState<CyberPatch[]>(INITIAL_PATCHES);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"implants" | "vitals">("implants");
  
  // Vitals stats
  const [bodyTemp, setBodyTemp] = useState(36.8);
  const [syncRatio, setSyncRatio] = useState(94.2);
  const [medQuota, setMedQuota] = useState(420);

  const handleInstall = (id: string) => {
    if (installingId) return;
    setInstallingId(id);
    setInstallProgress(0);

    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPatches((currList) =>
            currList.map((p) => (p.id === id ? { ...p, installed: true } : p))
          );
          setInstallingId(null);
          // Boost vitals on install
          const found = patches.find((p) => p.id === id);
          if (found) {
            setBodyTemp((temp) => parseFloat((temp + found.heatMetric * 0.1).toFixed(1)));
            setSyncRatio((ratio) => Math.min(100, parseFloat((ratio + 1.2).toFixed(1))));
          }
          return 100;
        }
        return prev + 8;
      });
    }, 100);
  };

  const handleUninstall = (id: string) => {
    setPatches((currList) =>
      currList.map((p) => (p.id === id ? { ...p, installed: false } : p))
    );
    const found = patches.find((p) => p.id === id);
    if (found) {
      setBodyTemp((t) => Math.max(36.5, parseFloat((t - found.heatMetric * 0.1).toFixed(1))));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(254,0,254,0.06),transparent_60%)]"></div>

      {/* Title */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 select-none border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl animate-spin" style={{ animationDuration: "10s" }}>biotech</span>
            <h2 className="font-headline text-lg md:text-xl text-primary font-bold tracking-tight">
              脑机合成实验室 NEURAL_LAB
            </h2>
          </div>
          <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant/70 uppercase">
            Biochemical Adjustments & Synaptic Mod Matrix
          </p>
        </div>

        {/* Action Toggle Tab */}
        <div className="flex gap-1 bg-surface-container-low p-1 border border-outline-variant/30 rounded">
          <button
            onClick={() => setActiveTab("implants")}
            className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
              activeTab === "implants"
                ? "bg-secondary-container text-on-secondary font-bold shadow-[0_0_10px_rgba(254,0,254,0.3)]"
                : "text-on-surface-variant/80 hover:text-secondary"
            }`}
          >
            增强载荷 REPLICASE
          </button>
          <button
            onClick={() => setActiveTab("vitals")}
            className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
              activeTab === "vitals"
                ? "bg-secondary-container text-on-secondary font-bold shadow-[0_0_10px_rgba(254,0,254,0.3)]"
                : "text-on-surface-variant/80 hover:text-secondary"
            }`}
          >
            体征指征 VITALS
          </button>
        </div>
      </section>

      {/* Dynamic Tab Body */}
      {activeTab === "implants" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Cyber patch selection map */}
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-secondary/40 uppercase tracking-widest block mb-1 pl-1 select-none">
              生物补片目录 (BIOMOD_INDEX)
            </span>

            {patches.map((patch) => (
              <div
                key={patch.id}
                className={`bg-surface-container-low/40 backdrop-blur-md border rounded p-4 relative ${
                  patch.installed
                    ? "border-secondary/40 shadow-[0_0_15px_rgba(254,0,254,0.08)] bg-secondary/5"
                    : "border-outline-variant/10"
                }`}
              >
                <div className="flex justify-between items-start mb-2 select-none">
                  <div>
                    <span className="font-mono text-[9px] text-on-surface-variant/60 block tracking-wider font-extrabold uppercase">
                      {patch.category}
                    </span>
                    <h3 className="font-sans font-bold text-sm text-on-surface mt-0.5 leading-tight">
                      {patch.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-secondary font-extrabold">
                    {patch.costCR} CR
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed mb-3 pr-2 select-all">
                  {patch.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/10 pt-3 select-none">
                  <span className="font-mono text-[10px] text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/25 px-1.5 py-0.5 rounded">
                    物理属性: {patch.statBoost}
                  </span>

                  {patch.installed ? (
                    <button
                      onClick={() => handleUninstall(patch.id)}
                      className="font-mono text-[9.5px] px-2.5 py-1 rounded border border-error/40 text-error hover:bg-error/10 transition-colors uppercase cursor-pointer"
                    >
                      拆缷 DEPLOY_OUT
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInstall(patch.id)}
                      disabled={installingId !== null}
                      className="font-mono text-[10px] px-3.5 py-1 rounded bg-secondary-container text-on-secondary font-bold hover:skew-x-2 transition-transform shadow-[0_0_12px_rgba(254,0,254,0.3)] cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                    >
                      注射载入 PATCH_IN
                    </button>
                  )}
                </div>

                {installingId === patch.id && (
                  <div className="mt-3 bg-surface-variant overflow-hidden rounded-xs h-1">
                    <div
                      className="h-full bg-secondary shadow-[0_0_8px_#fe00fe] transition-all"
                      style={{ width: `${installProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Core synthetic overview and visual simulation status */}
          <div className="space-y-6">
            <span className="font-mono text-[10px] text-[#00ff41]/40 uppercase tracking-widest block mb-1 pl-1 select-none">
              神经系统负载与反应模型 (NEURO_BIOMETRIC_MODEL)
            </span>

            <div className="bg-surface-container/60 backdrop-blur-md rounded border border-outline-variant/20 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-secondary/20 pointer-events-none"></div>

              {/* Bio interactive stats */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/10">
                  <span className="font-mono text-[9px] text-on-surface-variant block uppercase tracking-wide">核心体温</span>
                  <span className={`font-headline text-md md:text-lg font-bold block mt-1 ${bodyTemp > 38 ? "text-error" : bodyTemp > 37.3 ? "text-secondary" : "text-primary-container"}`}>
                    {bodyTemp}°C
                  </span>
                </div>
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/10">
                  <span className="font-mono text-[9px] text-on-surface-variant block uppercase tracking-wide">脑电同步</span>
                  <span className="font-headline text-md md:text-lg text-[#00ff41] font-bold block mt-1 animate-pulse">
                    {syncRatio}%
                  </span>
                </div>
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/10">
                  <span className="font-mono text-[9px] text-on-surface-variant block uppercase tracking-wide">多巴胺池</span>
                  <span className="font-headline text-md md:text-lg text-secondary font-bold block mt-1">
                    {medQuota} PG
                  </span>
                </div>
              </div>

              {/* Interactive Synapse Visual Stimulator */}
              <div className="border border-outline-variant/25 rounded p-5 bg-surface-container-lowest relative flex flex-col justify-center items-center select-none">
                <div className="absolute top-2 left-3 font-mono text-[10px] text-primary-container">
                  [REPLICATOR_ENGINE_ACTIVE]
                </div>

                <div className="w-24 h-24 rounded-full border-4 border-dashed border-secondary/30 flex items-center justify-center relative mt-4 mb-4 animate-spin" style={{ animationDuration: "16s" }}>
                  <div className="w-16 h-16 rounded-full bg-secondary/5 border-2 border-primary-container/40 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-textColor text-secondary text-2xl">lens_blur</span>
                  </div>
                </div>

                <p className="font-mono text-[10px] text-on-surface-variant text-center max-w-xs mt-2 leading-relaxed">
                  通过对基因突触进行快速射流校正，已挂载增强：{" "}
                  <span className="text-secondary font-bold select-all">
                    {patches.filter((p) => p.installed).length}{" "}
                  </span>
                  / {patches.length} 个
                </p>

                <div className="w-full h-1 bg-surface-variant mt-4 rounded-xs overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-500 shadow-[0_0_8px_#fe00fe]"
                    style={{ width: `${(patches.filter((p) => p.installed).length / patches.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vitals detailed visualization tracking */
        <div className="border border-outline-variant/30 bg-surface-container/60 backdrop-blur-md rounded-lg p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4 mb-6 select-none">
            <div>
              <h3 className="font-headline font-bold text-sm text-primary">体征特征诊断系统 ECG_DIAGNOSTICS</h3>
              <p className="font-mono text-[10.5px] text-on-surface-variant/70 mt-0.5">实时监视脑机突触物理放电指标、生物抗拒比</p>
            </div>
            <div className="font-mono text-xs text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/30 px-2 py-0.5 rounded">
              RUNNING_STABLE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            {/* Waveform representation */}
            <div className="bg-surface-container-lowest/80 border border-secondary/20 rounded p-4 h-48 flex flex-col justify-between">
              <span className="font-mono text-[9px] text-secondary">[BRAIN_WAVE_HARMONIC]</span>
              
              <div className="flex-grow flex items-end justify-around px-2 pb-2 h-24">
                {[40, 60, 25, 80, 50, 95, 30, 70, 45, 88, 35, 60, 20, 85, 45, 99, 50, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 md:w-2 bg-[#00f3ff] shadow-[0_0_6px_#00f3ff]"
                    initial={{ height: 10 }}
                    animate={{ height: [`${h}%`, `${Math.max(10, h - 25)}%`, `${h}%`] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2 + (i % 3) * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant/60">
                <span>FREQ: 14.8 HZ (THETA-ACTIVE)</span>
                <span>SYNC CAP: 8.42 GigaSyn</span>
              </div>
            </div>

            {/* Neuro fluid injection rate */}
            <div className="bg-surface-container-lowest/80 border border-primary/20 rounded p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-primary-container block uppercase">
                  神经液主动灌流配额 (NEURAL_DIALYSIS_FLOW)
                </span>
                
                <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                  在高频算力或者赛博安全自卫攻防战时，通过自动微粒阀泵调节微升多巴胺、去甲肾上腺素的注入频率以确保同步系数不跌破安全水位（&gt;85%）。
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span>液气灌流速度</span>
                  <span className="text-secondary font-bold">12.5 uL/min</span>
                </div>
                <div className="w-full h-1 bg-surface-variant rounded-xs overflow-hidden">
                  <div className="h-full bg-primary-container shadow-[0_0_6px_#00f3ff] w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
