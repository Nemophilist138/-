import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book, CartItem } from "./types";
import { BOOKS, CATEGORIES } from "./data";

// Components Imports
import BiometricLanding from "./components/BiometricLanding";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePanel from "./components/HomePanel";
import MatrixPanel from "./components/MatrixPanel";
import BookDetailPanel from "./components/BookDetailPanel";
import TradePanel from "./components/TradePanel";
import TerminalPanel from "./components/TerminalPanel";
import IntelPanel from "./components/IntelPanel";
import LabPanel from "./components/LabPanel";
import StarCursor from "./components/StarCursor";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activePanel, setActivePanel] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Decrypt books selections: Default selection is "数据档案: 神经链接演变史" as first shown on detail screen
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[3]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // System Protocol states
  const [isStealth, setIsStealth] = useState(true);
  const [isShield, setIsShield] = useState(false);
  const [decryptionLevel, setDecryptionLevel] = useState(64);

  // Cart system: pre-populate with mock items from checkbox screen 5 to recreate exactly:
  // Item 1: Neuromancer (0.42 ETH), qty: 1
  // Item 2: Void Runner (0.18 ETH - renamed in cart context as "数据裂痕协议"), qty: 2
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Notification Banners System
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([]);

  // Seed default cart items matching mockup 5 on start
  useEffect(() => {
    const defaultCart: CartItem[] = [
      {
        book: BOOKS[0], // Neuromancer: qty 1, ver 4.02, hardwired
        quantity: 1
      },
      {
        book: BOOKS[2], // Void Runner (as "数据裂痕协议"): qty 2, beta 0.94, simulation
        quantity: 2
      }
    ];
    setCartItems(defaultCart);
  }, []);

  // Show status flashes 
  const triggerNotification = (text: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3200);
  };

  // Add items inside trade trolley list
  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.book.id === book.id);
      if (idx > -1) {
        const update = [...prev];
        update[idx].quantity += 1;
        return update;
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
      triggerNotification("已从购物车移除数据模块。");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Switch panels 
  const handleNavigate = (panelId: string) => {
    setActivePanel(panelId);
  };

  const handleSelectBook = (bookId: string) => {
    const found = BOOKS.find((b) => b.id === bookId);
    if (found) {
      setSelectedBook(found);
    }
  };

  const handleSelectCategoryFilter = (catId: string) => {
    setCategoryFilter(catId);
  };

  const handleClearCategoryFilter = () => {
    setCategoryFilter("");
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    triggerNotification("终端连接终止。生物识别锁已复位。");
  };

  // Render respective panel inside main chassis
  const renderActivePanel = () => {
    switch (activePanel) {
      case "home":
        return (
          <HomePanel
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onSelectCategoryFilter={handleSelectCategoryFilter}
          />
        );
      case "matrix":
        return (
          <MatrixPanel
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            initialCategoryFilter={categoryFilter}
            onClearCategoryFilter={handleClearCategoryFilter}
          />
        );
      case "detail":
        return (
          <BookDetailPanel
            onNavigate={handleNavigate}
            selectedBook={selectedBook}
            onSelectBook={handleSelectBook}
            onAddToCart={handleAddToCart}
            onShowNotification={triggerNotification}
          />
        );
      case "trade":
        return (
          <TradePanel
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onShowNotification={triggerNotification}
          />
        );
      case "terminal":
        return (
          <TerminalPanel
            onShowNotification={triggerNotification}
            isStealth={isStealth}
            onToggleStealth={() => {
              setIsStealth(!isStealth);
              triggerNotification(!isStealth ? "已开启神经隐形流防护 STEALTH_ON" : "神经隐形协议已下线");
            }}
            isShield={isShield}
            onToggleShield={() => {
              setIsShield(!isShield);
              triggerNotification(!isShield ? "脑机接口双向屏蔽层激活 NEURAL_SHIELD_UP" : "脑机接口反向追踪警报恢复");
            }}
            decryptionLevel={decryptionLevel}
            onUpdateDecryption={setDecryptionLevel}
          />
        );
      case "intel":
        return <IntelPanel />;
      case "lab":
        return <LabPanel />;
      default:
        return <HomePanel onNavigate={handleNavigate} onSelectBook={handleSelectBook} onSelectCategoryFilter={handleSelectCategoryFilter} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans select-none overflow-x-hidden antialiased">
      {/* Global interactive star cursor */}
      <StarCursor />

      {/* Global holographic styling scanlines background visual */}
      <div className="fixed inset-0 pointer-events-none scanlines-matrix z-50 opacity-40"></div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* Render Biometric scanner gateway */
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <BiometricLanding onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          /* Main application interface */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Header top bar */}
            <Header
              onOpenMenu={() => setIsSidebarOpen(true)}
              onNavigate={handleNavigate}
              cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            />

            {/* Sidebar drawer navigation component */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              activePanel={activePanel}
            />

            {/* Main scroll dynamic view panel */}
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-28 relative z-10">
              <AnimatePresence mode="wait">{renderActivePanel()}</AnimatePresence>
            </main>

            {/* Bottom HUD Nav docking station matches screens 2-6 bottom bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-45 h-20 bg-surface-container-low/65 backdrop-blur-xl border-t border-primary/15 flex justify-around items-center px-4 pb-safe shadow-[0_-10px_35px_rgba(0,220,230,0.15)] select-none">
              {/* HOME LINK */}
              <button
                onClick={() => handleNavigate("home")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "home"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "home" ? 1 : 0}"` }}>
                  home
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">主页</span>
              </button>

              {/* MATRIX LINK */}
              <button
                onClick={() => handleNavigate("matrix")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "matrix"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "matrix" ? 1 : 0}"` }}>
                  grid_view
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">矩阵</span>
              </button>

              {/* DETAILS BOOK LINK */}
              <button
                onClick={() => handleNavigate("detail")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "detail"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "detail" ? 1 : 0}"` }}>
                  auto_stories
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">书库</span>
              </button>

              {/* CHECKOUT CART LINK */}
              <button
                onClick={() => handleNavigate("trade")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "trade"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "trade" ? 1 : 0}"` }}>
                  shopping_cart
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">交易</span>
              </button>

              {/* INTEL LINK */}
              <button
                onClick={() => handleNavigate("intel")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "intel"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "intel" ? 1 : 0}"` }}>
                  nodes
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">情报</span>
              </button>

              {/* LAB LINK */}
              <button
                onClick={() => handleNavigate("lab")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "lab"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "lab" ? 1 : 0}"` }}>
                  biotech
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">实验室</span>
              </button>

              {/* TERMINAL STATUS LINK */}
              <button
                onClick={() => handleNavigate("terminal")}
                className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-150 ${
                  activePanel === "terminal"
                    ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,243,255,0.7)] border-t-2 border-primary-container scale-95"
                    : "text-on-surface-variant/60 hover:text-secondary-fixed-dim"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `"'FILL' ${activePanel === "terminal" ? 1 : 0}"` }}>
                  account_circle
                </span>
                <span className="font-mono text-[9px] md:text-[10px] mt-1">终端</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SENSORY NOTIFICATIONS TOASTER */}
      <div className="fixed top-20 right-4 z-[100] pointer-events-none space-y-2 max-w-xs md:max-w-sm">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              layout
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="p-3 bg-surface-container/95 border border-[#00f3ff] text-primary-container font-mono text-[11px] rounded shadow-[0_4px_15px_rgba(0,243,255,0.3)] backdrop-blur-md flex items-center gap-2 select-text"
            >
              <span className="material-symbols-outlined text-[15px] animate-pulse">terminal</span>
              <span className="leading-snug">{notif.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
