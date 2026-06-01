import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book } from "../types";
import { BOOKS, IMAGES } from "../data";

interface BookDetailPanelProps {
  onNavigate: (panelId: string) => void;
  selectedBook: Book;
  onSelectBook: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
  onShowNotification: (message: string) => void;
}

export default function BookDetailPanel({
  onNavigate,
  selectedBook,
  onSelectBook,
  onAddToCart,
  onShowNotification
}: BookDetailPanelProps) {
  const [installProgress, setInstallProgress] = useState<number | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Animate the neural installation load
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (installProgress !== null && installProgress < 100) {
      interval = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev === null) return null;
          if (prev >= 98) {
            clearInterval(interval);
            onShowNotification(`已成功解密并安装《${selectedBook.title}》到神经连接！`);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [installProgress, selectedBook, onShowNotification]);

  const handleInstallClick = () => {
    if (installProgress !== null) return;
    setInstallProgress(0);
    onShowNotification(`正在建立神经对等信道，准备下载解密包...`);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    onShowNotification(isFavorited ? "已从您的神经收藏夹移除" : "已安全保存到您的加密收藏夹！");
  };

  // Find linked archival books for Grid Cards from database
  const linkedBooks = BOOKS.filter((b) => b.id !== selectedBook.id).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-36 pt-4 text-on-surface"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_bottom,rgba(0,243,255,0.08),transparent_60%)]"></div>

      {/* Hero Header Specifications: Holographic Details */}
      <div className="relative flex flex-col md:flex-row gap-8 items-start">
        {/* Holographic Book Cover frame component */}
        <div className="w-full md:w-1/2 flex justify-center relative group">
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-4 bg-primary-container/10 blur-3xl rounded-full"></div>
          
          {/* Glitch Frame Cover Container */}
          <div className="relative z-10 glitch-border p-2 bg-surface-container-high rounded-lg overflow-hidden hologram-glow w-64 md:w-72 shadow-2xl">
            <img
              className="w-full aspect-[2/3] object-cover rounded shadow-md grayscale-30 hover:grayscale-0 transition-all duration-300"
              src={selectedBook.image}
              alt={selectedBook.title}
              referrerPolicy="no-referrer"
            />
            {/* Stamp / Label block overlay */}
            <div className="absolute inset-x-2 bottom-2 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end p-2 justify-between">
              <span className="font-mono text-[9px] md:text-[10px] text-primary-container border border-primary-container/40 px-1.5 py-0.5 roundedbg-surface/80">
                {selectedBook.ver}
              </span>
              <span className="font-mono text-[9px] text-[#00ff41] flex items-center bg-[#00ff41]/5 border border-[#00ff41]/20 px-1.5 rounded">
                SECURE
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Metadata Spec column */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
          <nav className="flex space-x-2 font-mono text-[10px] text-primary-container/60 select-none uppercase tracking-wide">
            <span>ARCHIVE_ROOT</span>
            <span>/</span>
            <span className="text-primary-container">ARCHIVE_DETAIL</span>
          </nav>

          <h2 className="font-headline text-xl md:text-3xl text-primary font-extrabold leading-tight drop-shadow-[0_0_12px_rgba(227,253,255,0.4)]">
            {selectedBook.title}
          </h2>
          
          <p className="font-mono text-[11px] text-secondary border-l-2 border-secondary-container pl-3 uppercase tracking-wider">
            AUTHOR ID: {selectedBook.author}
          </p>

          {/* Access Fee block indicator matches mockup 4 closely */}
          <div className="bg-surface-container-low border border-outline-variant p-4 flex justify-between items-center rounded-lg select-none">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest">
                Access decryp fee // 解密资费
              </span>
              <span className="font-headline text-xl md:text-2xl text-[#00ff41] font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.4)] block mt-0.5">
                {selectedBook.priceCR.toLocaleString()}.00 CR
              </span>
            </div>
            
            <div className="flex items-center text-[#00ff41] gap-1 bg-[#00ff41]/5 border border-[#00ff41]/20 px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm font-bold animate-pulse">bolt</span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">VALID_CREDIT</span>
            </div>
          </div>

          {/* Core install action triggers */}
          <div className="space-y-2">
            {installProgress === null ? (
              <button
                onClick={handleInstallClick}
                className="group relative w-full bg-primary-container text-on-primary font-headline py-4 px-6 rounded overflow-hidden hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] active:scale-95 transition-all cursor-pointer font-bold flex items-center justify-center gap-2.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                  <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cloud_download
                  </span>
                  解密并安装到神经链接
                </span>
                {/* Ping ring indicator */}
                <div className="absolute inset-0 border border-primary-container animate-ping opacity-15 pointer-events-none"></div>
              </button>
            ) : (
              /* If installation has started: show real load feedback */
              <div className="bg-surface-container border border-primary-container/20 p-4 rounded text-center space-y-2">
                <div className="flex justify-between items-center font-mono text-[11px] text-primary">
                  <span>{installProgress < 100 ? "DOWNLOADING ENCRYPTED MODULE..." : "神经元突触重组成功 // INSTALLED"}</span>
                  <span className="font-bold">{installProgress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded overflow-hidden relative">
                  <div
                    className="h-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] transition-all"
                    style={{ width: `${installProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Purchase cart item additions quick trigger button */}
            <button
              onClick={() => {
                onAddToCart(selectedBook);
                onShowNotification(`已将《${selectedBook.title}》打包，放入交易终端待解密。`);
              }}
              className="w-full border border-primary-container/40 hover:border-primary-container hover:bg-primary-container/5 hover:text-primary p-3 rounded font-mono text-[10px] md:text-xs text-primary-container transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
              添加到打包交易模块 (ADD_TO_CART)
            </button>
          </div>

          {/* Technical Specs parameters listings */}
          <div className="space-y-2.5">
            <h3 className="font-mono text-[10px] text-on-surface-variant flex items-center gap-1.5 select-none uppercase tracking-widest border-b border-outline-variant/10 pb-1">
              <span className="material-symbols-outlined text-sm">settings_input_component</span>
              TECHNICAL SPECS // 模块属性
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-high/40 border-b border-outline-variant/30 flex flex-col">
                <span className="font-mono text-[9px] text-on-surface-variant/40">MEMORY_SIZE</span>
                <span className="font-mono text-sm text-primary font-bold">{selectedBook.technicalSpecs.memorySize}</span>
              </div>
              <div className="p-3 bg-surface-container-high/40 border-b border-outline-variant/30 flex flex-col">
                <span className="font-mono text-[9px] text-on-surface-variant/40">ENCRYPTION</span>
                <span className="font-mono text-sm text-primary font-bold">{selectedBook.technicalSpecs.encryption}</span>
              </div>
              <div className="p-3 bg-surface-container-high/40 border-b border-outline-variant/30 flex flex-col">
                <span className="font-mono text-[9px] text-on-surface-variant/40">NEURAL_LOAD</span>
                <span className="font-mono text-sm text-primary font-bold">{selectedBook.technicalSpecs.neuralLoad}</span>
              </div>
              <div className="p-3 bg-surface-container-high/40 border-b border-outline-variant/30 flex flex-col">
                <span className="font-mono text-[9px] text-on-surface-variant/40">COMPATIBILITY</span>
                <span className="font-mono text-sm text-primary font-bold">{selectedBook.technicalSpecs.compatibility}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description / Data Log section summary */}
      <section className="mt-12 space-y-4">
        <h3 className="font-headline text-lg text-primary flex items-center gap-2 select-none">
          <span className="w-2.5 h-2.5 bg-secondary-container rounded-full shadow-[0_0_8px_#fe00fe]" />
          数据摘要 SYNOPSIS
        </h3>
        <div className="bg-surface-container-highest/20 backdrop-blur-md p-6 rounded-xl border border-outline-variant/40 relative overflow-hidden">
          {/* Decorative Corner Bracket graphic */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary-container/20"></div>
          <p className="font-sans text-xs md:text-sm text-on-surface leading-relaxed tracking-wide">
            {selectedBook.desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 select-none">
            {selectedBook.details.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 border border-outline-variant font-mono text-[9px] text-on-surface-variant hover:border-primary-container hover:text-primary transition-colors cursor-default rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Archives Section Links matches mockup 4 */}
      <section className="mt-12">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-headline text-base md:text-lg text-primary font-bold">
            相关关联档案
          </h3>
          <span className="font-mono text-[10px] text-primary-container/50">
            LINKED_NODES: {linkedBooks.length.toString().padStart(2, "0")}
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {linkedBooks.map((book) => (
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => onSelectBook(book.id)}
              key={book.id}
              className="bg-surface-container p-2 rounded border border-outline-variant hover:border-primary-container transition-all group cursor-pointer"
            >
              <img
                className="w-full aspect-square object-cover mb-2 filter grayscale group-hover:grayscale-0 transition-all rounded"
                src={book.image}
                alt={book.title}
                referrerPolicy="no-referrer"
              />
              <p className="font-mono text-[10px] text-primary truncate">
                {book.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Action Controller Dock matches detail mockup 4 */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-35 w-[90%] md:w-auto bg-surface-container-highest/85 backdrop-blur-xl border border-primary/20 rounded-full px-8 h-14 flex items-center justify-around gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-2 cursor-pointer transition-colors ${isFavorited ? "text-secondary font-bold" : "text-on-surface-variant hover:text-primary"}`}
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: `"'FILL' ${isFavorited ? 1 : 0}"` }}>
            favorite
          </span>
          <span className="hidden md:inline font-mono text-[10px] uppercase">收藏 CLIP</span>
        </button>
        
        <div className="w-px h-6 bg-outline-variant/30" />
        
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            onShowNotification("已成功复制解密通道下载链接到您的突触剪贴板！");
          }}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">share</span>
          <span className="hidden md:inline font-mono text-[10px] uppercase">中继 TRANSFER</span>
        </button>
        
        <div className="w-px h-6 bg-outline-variant/30" />
        
        <button
          onClick={() => onShowNotification("正在接入脑电评论协议层，该分部匿名留言板已开启加密同步。")}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">forum</span>
          <span className="hidden md:inline font-mono text-[10px] uppercase">脑论 DISCUSSION</span>
        </button>
      </div>
    </motion.div>
  );
}
