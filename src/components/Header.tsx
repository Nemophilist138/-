import React from "react";

interface HeaderProps {
  onOpenMenu: () => void;
  onNavigate: (panelId: string) => void;
  cartCount: number;
}

export default function Header({ onOpenMenu, onNavigate, cartCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-surface/75 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-4 md:px-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none">
      {/* Left section: menu hamburger & pulsing brand title */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenMenu}
          className="text-primary-container p-1 rounded hover:text-primary transition-all duration-100 cursor-pointer active:skew-x-2"
          aria-label="Open system menu"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>
            menu
          </span>
        </button>
        
        <h1
          onClick={() => onNavigate("home")}
          className="font-headline text-lg md:text-xl text-primary-container font-extrabold tracking-tighter drop-shadow-[0_0_8px_#00f3ff] animate-pulse cursor-pointer selection:bg-transparent"
        >
          数据书廊
        </h1>
      </div>

      {/* Right navigation items */}
      <div className="flex items-center gap-4">
        {/* Search button trigger */}
        <button
          onClick={() => onNavigate("matrix")}
          className="text-on-surface-variant hover:text-primary hover:glow-sm transition-all p-1 cursor-pointer"
          aria-label="Filter database matrix"
        >
          <span className="material-symbols-outlined text-xl">search</span>
        </button>

        {/* Global Cart badge indicator if items exist */}
        <button
          onClick={() => onNavigate("trade")}
          className="relative text-on-surface-variant hover:text-primary hover:glow-sm transition-all p-1 cursor-pointer"
          aria-label="Trade terminal basket"
        >
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-secondary-container text-on-secondary text-[8px] font-mono font-bold flex items-center justify-center px-1 rounded-full border border-surface shadow-[0_0_8px_#fe00fe]">
              {cartCount}
            </span>
          )}
        </button>

        {/* System node link status icon */}
        <button
          onClick={() => onNavigate("terminal")}
          className="relative text-on-surface-variant hover:text-primary hover:glow-sm transition-all p-1 cursor-pointer"
          aria-label="Operational control console"
        >
          <span className="material-symbols-outlined text-xl">hub</span>
          <span className="absolute bottom-1 right-1 w-2 h-2 bg-[#00ff41] rounded-full shadow-[0_0_5px_#00ff41]"></span>
        </button>
      </div>
    </header>
  );
}
