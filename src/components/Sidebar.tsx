import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (panelId: string) => void;
  activePanel: string;
}

export default function Sidebar({ isOpen, onClose, onLogout, onNavigate, activePanel }: SidebarProps) {
  const menuItems = [
    { id: "home", label: "主页概览", icon: "home", description: "SYSTEM_HOME" },
    { id: "matrix", label: "分类矩阵", icon: "grid_view", description: "GENRE_MATRIX" },
    { id: "detail", label: "数据档案", icon: "auto_stories", description: "ARCHIVE_DETAIL" },
    { id: "trade", label: "交易终端", icon: "shopping_cart", description: "TRANSACTION_HUB" },
    { id: "intel", label: "解密中心", icon: "nodes", description: "INTEL_DECRYPT" },
    { id: "lab", label: "脑机实验", icon: "biotech", description: "NEURAL_LAB" },
    { id: "terminal", label: "控制仪表", icon: "terminal", description: "CONSOLE_SYSTEM" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Translucent overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[80] cursor-pointer"
          />

          {/* Core slide out container */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 z-[90] h-full w-80 bg-surface-dim/95 border-r border-primary-container/20 shadow-[10px_0_40px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 select-none"
          >
            <div className="flex flex-col space-y-6">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-6 mt-4">
                <div className="w-12 h-12 rounded-full bg-primary-container/15 flex items-center justify-center text-primary-container border border-primary-container/40 relative">
                  <span className="material-symbols-outlined text-large font-bold">person</span>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary-container rounded-full animate-ping"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary-container rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg text-primary-container drop-shadow-[0_0_5px_#00f3ff]">
                    数据跑者_01
                  </h4>
                  <p className="font-mono text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                    等级: <span className="text-secondary font-bold">极客 (GEEK)</span>
                  </p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="font-mono text-[9px] text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    已同步
                  </span>
                </div>
              </div>

              {/* Console Navigation Linkage */}
              <nav className="flex flex-col space-y-1.5">
                <span className="font-mono text-[10px] text-primary-container/40 uppercase tracking-widest pl-2 mb-2">
                  系统功能菜单
                </span>
                {menuItems.map((item) => {
                  const isActive = activePanel === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded transition-all cursor-pointer text-left ${
                        isActive
                          ? "bg-primary-container/15 text-primary-container border-l-4 border-primary-container shadow-[0_0_15px_rgba(0,243,255,0.15)]"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container border-l-4 border-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <div className="flex-1">
                        <span className="font-sans font-medium text-sm block">{item.label}</span>
                        <span className="font-mono text-[9px] text-on-surface-variant/40 block">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              <hr className="border-outline-variant/20 my-2" />

              {/* Utility Shortcut Actions */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-primary-container/40 uppercase tracking-widest pl-2 block mb-2">
                  系统连接
                </span>
                <div className="p-3 bg-surface-container-lowest border border-outline-variant/20 rounded flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">神经网络连接</span>
                  <span className="text-primary-container font-mono">STEALTH_ACTIVE</span>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-outline-variant/20 rounded flex items-center justify-between text-xs mt-1">
                  <span className="text-on-surface-variant">解密协议等级</span>
                  <span className="text-secondary font-mono">LEVEL 9</span>
                </div>
              </div>
            </div>

            {/* Logout Terminal Foot Action */}
            <div className="border-t border-outline-variant/20 pt-4 mb-4">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-3 tracking-wider text-error hover:bg-error-container/10 transition-colors rounded-lg font-mono text-sm cursor-pointer uppercase"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>锁屏登出 TERMINATE</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
