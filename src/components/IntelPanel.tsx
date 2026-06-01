import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntelItem {
  id: string;
  code: string;
  source: string;
  title: string;
  summary: string;
  fullText: string;
  type: "leak" | "intercept" | "protocol";
  severity: "LOW" | "MED" | "CRITICAL";
  isDecrypted: boolean;
}

const INITIAL_INTEL: IntelItem[] = [
  {
    id: "intel-1",
    code: "NT-9082.LNK",
    source: "NEURAL_NET_CORE",
    title: "旧金山地下神经网络搭建草案",
    summary: "截获自旧金山分部中继器的秘密文档，关于去中心化书籍资料流中继计划。",
    fullText: ">>> 这是一个完全去中心化的二级缓存链路。该协议将在 2049.08 下旬全面布设完成。通过将敏感的电子书册打包为加密二进制碎片（Circuit Blobs），并分发于分散的网络跑者终端中。任何审查机构都无法通过单一网关彻底拦截数据的交付。去中心化数据库索引已在 node_sf.alpha 隐秘运行中。",
    type: "leak",
    severity: "MED",
    isDecrypted: false
  },
  {
    id: "intel-2",
    code: "WP-022.SYS",
    source: "SYS_SECURITY_LOGS",
    title: "神经网络异常扫描事件记录",
    summary: "有关近期在生物节点附近频繁出现的反向追踪和深度端口扫描活动的记录。",
    fullText: ">>> 警报状态：从 2049.08.20 开始，有高频匿名代理针对所有开启一二级识别锁的移动终端进行被动式 RF 音量分析。强烈建议所有用户在终端启动 '隐形模式 (STEALTH_MODE)'，并将脑机双向硬件屏蔽层 '神经屏蔽 (NEURAL_SHIELD)' 全部维持在常开状态。任何探针的反馈日志都将会自动生成追踪清除代码。",
    type: "protocol",
    severity: "CRITICAL",
    isDecrypted: false
  },
  {
    id: "intel-3",
    code: "BH-7711.BIO",
    source: "BIOTECH_EVO_LAB",
    title: "第三代基因补丁 (G3_EVOLUTION) 实验特征反馈",
    summary: "匿名拦截自合成生物实验室的数据包，显示神经反应增强剂的阶段成果。",
    fullText: ">>> 实验反馈日志：在与神经链接高度契合的突触测试中，注射 G3_EVO 补丁后的思维延展性提高了大约 140%。然而，受试者的脑干热负荷水平会因高负荷数据解析增加 15%。如果配合使用中度冷却剂或在控制终端调节 '解密等级'，可使这种损害几近于零。需要更多的样本来进行突触发射模型修正。",
    type: "leak",
    severity: "MED",
    isDecrypted: false
  },
  {
    id: "intel-4",
    code: "VD-0043.RAW",
    source: "VOID_RUNNERS_COMMS",
    title: "虚空行者自由中继区配置方案",
    summary: "来自于荒野流浪网络团队的网络同步坐标信息。",
    fullText: ">>> 自由节点：当前位于东部荒漠边缘的物理废弃基站已被中改建。由于使用了废旧超短波频段，现已和控制仪表的外部对等通信矩阵成功完成互通握手。我们将该中继节点临时标记为 'VOID_RUNNER_LINK'。任何数据跑者均可通过交付 0.18 ETH 的网络维护费来获得完整的双向读写同步特权。",
    type: "intercept",
    severity: "LOW",
    isDecrypted: false
  }
];

export default function IntelPanel() {
  const [intelList, setIntelList] = useState<IntelItem[]>(INITIAL_INTEL);
  const [selectedIntel, setSelectedIntel] = useState<IntelItem | null>(null);
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [decryptProgress, setDecryptProgress] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleDecrypt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (decryptingId) return;

    setDecryptingId(id);
    setDecryptProgress(0);

    const interval = setInterval(() => {
      setDecryptProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIntelList((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, isDecrypted: true } : item
            )
          );
          // Auto update currently viewed too
          setSelectedIntel((curr) =>
            curr && curr.id === id ? { ...curr, isDecrypted: true } : curr
          );
          setDecryptingId(null);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleSelect = (item: IntelItem) => {
    setSelectedIntel(item);
  };

  const filteredList = intelList.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_bottom,rgba(0,243,255,0.06),transparent_60%)]"></div>

      {/* Header and Filter */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 select-none border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-2xl animate-pulse">nodes</span>
            <h2 className="font-headline text-lg md:text-xl text-primary font-bold tracking-tight">
              情报解密终端 INTEL_DECRYPT
            </h2>
          </div>
          <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant/70 uppercase">
            Intercepted Cryptographic Packets & Raw Transmissions
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex gap-1 bg-surface-container-low p-1 border border-outline-variant/30 rounded">
          {["all", "leak", "intercept", "protocol"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                activeFilter === tab
                  ? "bg-primary-container text-on-primary font-bold shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                  : "text-on-surface-variant/80 hover:text-primary-container"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Master Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Intel list feed */}
        <div className="col-span-1 lg:col-span-5 space-y-3">
          <span className="font-mono text-[10px] text-primary-container/40 uppercase tracking-widest block mb-1 pl-1">
            网络侦记列表 (FLOW_CAP_PACKETS)
          </span>
          <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredList.map((item) => {
              const severityColor =
                item.severity === "CRITICAL"
                  ? "text-error border-error/50 bg-error/10"
                  : item.severity === "MED"
                  ? "text-secondary border-secondary/50 bg-secondary/10"
                  : "text-primary border-primary/40 bg-primary/5";

              const isSelected = selectedIntel?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`border p-4 rounded bg-surface-container-low/50 hover:bg-surface-container-high/60 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.15)]"
                      : "border-outline-variant/20"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2 select-none">
                    <span className="font-mono text-[10px] text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/35 px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">
                      {item.code}
                    </span>
                    <span className={`font-mono text-[9px] border px-1.5 py-0.5 rounded ${severityColor}`}>
                      {item.severity}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-on-surface mb-1 leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3">
                    <span className="font-mono text-[9px] text-on-surface-variant/60">
                      来源: {item.source}
                    </span>

                    {item.isDecrypted ? (
                      <span className="font-mono text-[9px] text-[#00ff41] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[11px]">lock_open</span>
                        已解密
                      </span>
                    ) : (
                      <button
                        onClick={(e) => handleDecrypt(item.id, e)}
                        disabled={decryptingId !== null}
                        className={`font-mono text-[9.5px] px-2.5 py-1 rounded bg-secondary-container text-on-secondary font-extrabold flex items-center gap-1 cursor-pointer transition-transform duration-100 hover:skew-x-2 active:scale-95 disabled:opacity-50 disabled:cursor-wait`}
                      >
                        <span className="material-symbols-outlined text-[12px]">vpn_key</span>
                        解密 DECRYPT
                      </button>
                    )}
                  </div>

                  {decryptingId === item.id && (
                    <div className="mt-2.5 bg-surface-variant overflow-hidden rounded-xs h-1">
                      <div
                        className="h-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff] transition-all"
                        style={{ width: `${decryptProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredList.length === 0 && (
              <div className="p-8 border border-dashed border-outline-variant/30 text-center rounded font-mono text-xs text-on-surface-variant">
                无可用网络包
              </div>
            )}
          </div>
        </div>

        {/* Right: Intel text details panel */}
        <div className="col-span-1 lg:col-span-7">
          <span className="font-mono text-[10px] text-secondary/40 uppercase tracking-widest block mb-1 pl-1 select-none">
            数据流反编译监视器 (DECOMPILER_MONITOR)
          </span>

          {selectedIntel ? (
            <div className="border border-outline-variant/30 rounded bg-surface-container/60 backdrop-blur-md p-6 relative overflow-hidden h-[520px] flex flex-col justify-between">
              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#00f3ff]/30 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#00f3ff]/30 pointer-events-none"></div>

              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/30 pb-4 mb-4 select-none">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#00ff41] border border-[#00ff41]/30 bg-[#00ff41]/5 px-2 py-0.5 rounded font-bold">
                      {selectedIntel.code}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant/70">
                      NODE_ID: {selectedIntel.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-on-surface-variant/80">
                      类型: <span className="text-primary-container font-bold">{selectedIntel.type.toUpperCase()}</span>
                    </span>
                  </div>
                </div>

                <h3 className="font-headline font-bold text-md md:text-lg text-primary mb-3">
                  {selectedIntel.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {selectedIntel.summary}
                </p>

                <hr className="border-outline-variant/10 my-4" />

                <div className="mt-4">
                  <span className="font-mono text-[10px] text-primary-container/60 block uppercase mb-2 select-none">
                    原始数据流反编译:
                  </span>

                  <AnimatePresence mode="wait">
                    {selectedIntel.isDecrypted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-surface-container-lowest border border-[#00ff41]/20 p-4 font-mono text-xs text-[#00ff41] leading-relaxed rounded h-56 overflow-y-auto select-text shadow-inner"
                      >
                        {selectedIntel.fullText}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-surface-container-lowest border border-error/20 p-4 font-mono text-[11px] text-error/70 flex flex-col items-center justify-center gap-3 rounded h-56 select-none"
                      >
                        <span className="material-symbols-outlined text-3xl animate-pulse">lock</span>
                        <div className="text-center">
                          <p className="font-bold">该数据包目前处于加密高度混淆状态</p>
                          <p className="text-[10px] text-on-surface-variant/60 mt-1">
                            请点击左下角 DECRYPT 或下方快捷解密完成二进制序列重组。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Fast interactive decrypt control at bottom */}
              {!selectedIntel.isDecrypted && (
                <div className="border-t border-outline-variant/20 pt-4 mt-4 flex items-center justify-between select-none">
                  <span className="font-mono text-[10px] text-on-surface-variant/60">
                    所需算力配额 0.05 TFLOPs
                  </span>
                  <button
                    onClick={(e) => handleDecrypt(selectedIntel.id, e)}
                    disabled={decryptingId !== null}
                    className="px-6 py-2 bg-primary-container text-on-primary font-bold text-xs hover:skew-x-2 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.4)] glitch-hover cursor-pointer active:scale-95 disabled:opacity-50 rounded"
                  >
                    {decryptingId === selectedIntel.id ? "正在混淆解密..." : "快速强制解密 EXPLOIT_SYS"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-outline-variant/20 rounded-lg h-[520px] flex flex-col items-center justify-center text-on-surface-variant/60 font-mono text-xs select-none p-6 text-center">
              <span className="material-symbols-outlined text-4xl mb-3 animate-bounce">monitor_heart</span>
              <p>等待选择数据包中继源...</p>
              <p className="text-[10px] text-on-surface-variant/40 mt-1">
                点击左侧列表中的任意一项以反编译其传输负载。
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
