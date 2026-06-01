import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Book, Category } from "../types";
import { BOOKS, CATEGORIES, IMAGES } from "../data";

interface HomePanelProps {
  onNavigate: (panelId: string) => void;
  onSelectBook: (bookId: string) => void;
  onSelectCategoryFilter: (categoryId: string) => void;
}

export default function HomePanel({ onNavigate, onSelectBook, onSelectCategoryFilter }: HomePanelProps) {
  // Grab the featured/hot files from dataset
  const hotBooks = BOOKS.filter((b) => b.isHot || b.id === "void-runner");
  const N = hotBooks.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for pointer-based 3D tilt
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Monitor screen width to keep coordinates responsive
  useEffect(() => {
    const checkScale = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScale();
    window.addEventListener("resize", checkScale);
    return () => window.removeEventListener("resize", checkScale);
  }, []);

  // Compute the shortest loop offset (diff) on a circle of length N
  const getLoopDiff = (i: number, active: number, total: number) => {
    let diff = i - active;
    while (diff < -total / 2) diff += total;
    while (diff > total / 2) diff -= total;
    return diff;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
    setRotateX(0);
    setRotateY(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % N);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Centered percentage offsets between -0.5 and 0.5
    const xc = (x / width) - 0.5;
    const yc = 0.5 - (y / height); // Inverted to feel natural when tilting

    // Calculate dynamic rotation range up to ±15 degrees (amplitude multiplier = 30)
    setRotateX(yc * 30);
    setRotateY(xc * 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface"
    >
      {/* Immersive cinematic background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(0,243,255,0.12),transparent_60%)]"></div>

      {/* Hero Section Banner */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex items-center justify-center overflow-hidden rounded-xl border border-primary-container/10 shadow-2xl">
        {/* Banner video with dark gradient layout */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
          src="https://ik.imagekit.io/zblbg2ite/5%E6%9C%8825%E6%97%A5(1).mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        
        {/* Core title labels */}
        <div className="relative z-10 text-center px-4 max-w-xl">
          <div className="inline-block px-2.5 py-0.5 border border-secondary-container mb-4 rounded-sm bg-secondary-container/5 bg-surface/50 backdrop-blur-sm">
            <span className="font-mono text-[9px] md:text-[10px] text-secondary-container uppercase tracking-widest pink-glow font-bold">
              Encrypted Access // 授权访问
            </span>
          </div>
          <h2 className="font-headline text-2xl md:text-4xl text-primary font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(0,243,255,0.6)] mb-2 uppercase italic">
            NEON SCRIPT
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed mb-6">
            解锁深层数据，在信息的荒漠中寻找真实的共鸣。
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                // Select "数据档案: 神经链接演变史" details page as starting point 
                onSelectBook("neural-history");
                onNavigate("detail");
              }}
              className="px-6 py-2 bg-primary-container text-on-primary font-bold text-xs md:text-sm tracking-tight hover:skew-x-2 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.4)] glitch-hover cursor-pointer"
            >
              开始阅读
            </button>
            <button
              onClick={() => onNavigate("matrix")}
              className="px-6 py-2 border border-primary-container text-primary-container font-bold text-xs md:text-sm tracking-tight hover:bg-primary-container/10 transition-all rounded-sm cursor-pointer"
            >
              浏览书库
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Hot / Trending list (Highly Optimized 3D Spring Carousel) */}
      <section className="mt-12 select-none">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-headline text-lg md:text-xl text-primary-container font-extrabold tracking-tight">
              热点数据
            </h3>
            <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant/50 uppercase tracking-widest mt-0.5">
              Trending Transmissions (3D SECURE COVERFLOW)
            </p>
          </div>
          <button
            onClick={() => onNavigate("matrix")}
            className="font-mono text-[10px] text-primary hover:underline cursor-pointer flex items-center gap-1 uppercase"
          >
            查看全部 VIEW_ALL &gt;&gt;
          </button>
        </div>

        {/* 3D Physical Spring Carousel Container */}
        <div 
          className="relative w-full h-[440px] md:h-[580px] flex items-center justify-center overflow-hidden my-4"
          style={{ perspective: "1500px" }}
        >
          {/* Overlay Tech Grid Backing */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40"></div>

          {/* Carousel Cards Stage */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {hotBooks.map((book, i) => {
              const diff = getLoopDiff(i, activeIndex, N);
              const isVisible = Math.abs(diff) <= 1;

              // Left Flank (-1), Active (0), Right Flank (1) offsets
              const xOffsetMultiplier = isMobile ? 130 : 250;
              const xPos = diff * xOffsetMultiplier;

              // Focused Scale & Depth properties
              const scale = diff === 0 ? 1.05 : 0.85;
              const opacity = diff === 0 ? 1 : 0.4;
              const translateZ = diff === 0 ? 50 : -100;
              const zIndex = diff === 0 ? 30 : 10;

              return (
                <motion.div
                  key={book.id}
                  layout
                  onClick={() => {
                    if (diff === 0) {
                      onSelectBook(book.id);
                      onNavigate("detail");
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  onMouseMove={diff === 0 ? handleMouseMove : undefined}
                  onMouseLeave={diff === 0 ? handleMouseLeave : undefined}
                  className={`absolute w-[260px] h-[360px] md:w-[380px] md:h-[520px] cursor-pointer rounded-2xl overflow-hidden border bg-surface-container/90 backdrop-blur-md shadow-2xl transition-all duration-300 origin-center ${
                    diff === 0 
                      ? "border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.25)]" 
                      : "border-primary-container/15 hover:border-primary-container/40"
                  }`}
                  style={{
                    x: xPos,
                    zIndex: zIndex,
                    visibility: isVisible ? "visible" : "hidden",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    scale: scale,
                    opacity: isVisible ? opacity : 0,
                    z: translateZ,
                    rotateX: diff === 0 ? rotateX : 0,
                    rotateY: diff === 0 ? rotateY : 0,
                    rotateZ: diff * -1.5, // Subtle offset rotation to side wings
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 900,
                    damping: 50,
                    mass: 0.3
                  }}
                >
                  {/* Digital Grid overlay on central focused card */}
                  {diff === 0 && (
                    <div className="absolute inset-0 pointer-events-none border border-cyan-400/20 z-20 m-1 rounded-2xl"></div>
                  )}

                  {/* Card Main Image */}
                  <div className="relative w-full h-[65%] overflow-hidden bg-black/40">
                    <img
                      alt={book.title}
                      className="w-full h-full object-cover transition-all duration-500 filter saturate-75 group-hover:saturate-110 grayscale-30"
                      src={book.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                    
                    {/* Status badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-[#00ff41] bg-black/65 px-2 py-0.5 rounded border border-[#00ff41]/30">
                        {book.ver}
                      </span>
                      {book.isHot && (
                        <span className="px-2 py-0.5 bg-secondary-container text-[8px] md:text-[9px] text-on-secondary font-bold uppercase rounded-sm border border-secondary-container/30 animate-pulse">
                          HOT_SECURE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Metadata Section */}
                  <div className="p-4 md:p-6 flex flex-col justify-between h-[35%]">
                    <div>
                      <span className="font-mono text-[8px] md:text-[9px] text-[#00f3ff]/70 block tracking-wider uppercase">
                        TAG // {book.tag.toUpperCase()}
                      </span>
                      <h4 className="font-headline font-extrabold text-sm md:text-lg text-primary mt-1 line-clamp-1 truncate tracking-tight">
                        {book.title}
                      </h4>
                      <p className="text-[10px] md:text-xs text-on-surface-variant/70 font-mono mt-0.5">
                        编解码器: {book.author}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-outline-variant/15 pt-2 mt-2 select-none">
                      <span className="font-mono text-[10px] md:text-xs text-[#00ff41] font-bold">
                        {book.priceCR.toFixed(1)} CR
                      </span>
                      <span className="font-mono text-[9px] text-on-surface-variant/50">
                        RATING: {book.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Nav Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-6 z-40">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-primary-container/20 hover:border-primary-container/60 bg-surface-container-low/80 flex items-center justify-center text-primary-container hover:text-[#00f3ff] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_12px_rgba(0,243,255,0.4)]"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <span className="font-mono text-xs text-on-surface-variant/60 tracking-widest">
              {(activeIndex + 1).toString().padStart(2, "0")} / {N.toString().padStart(2, "0")}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-primary-container/20 hover:border-primary-container/60 bg-surface-container-low/80 flex items-center justify-center text-primary-container hover:text-[#00f3ff] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_12px_rgba(0,243,255,0.4)]"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Genre Bento Grid matrix categories */}
      <section className="mt-12">
        <h3 className="font-headline text-lg md:text-xl text-secondary-fixed-dim font-extrabold tracking-tight mb-6">
          矩阵分类
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Cyberpunk grid widget */}
          <div
            onClick={() => {
              onSelectCategoryFilter("cyberpunk");
              onNavigate("matrix");
            }}
            className="col-span-2 bg-surface-container border border-primary/10 p-4 relative overflow-hidden rounded group hover:border-primary-container/40 transition-all cursor-pointer h-28 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <span className="font-headline text-base md:text-lg text-primary-container font-extrabold relative z-10">
                赛博朋克
              </span>
              <p className="font-mono text-[9px] text-on-surface-variant relative z-10 mt-0.5">
                HARDWIRED_REALITY
              </p>
            </div>
            <span className="material-symbols-outlined absolute bottom-2 right-2 text-primary/15 text-5xl font-light transform group-hover:scale-110 transition-transform">
              memory
            </span>
          </div>

          {/* Dystopia grid widget */}
          <div
            onClick={() => {
              onSelectCategoryFilter("dystopia");
              onNavigate("matrix");
            }}
            className="bg-surface-container border border-secondary-container/10 p-4 relative overflow-hidden rounded group hover:border-secondary-container/40 transition-all cursor-pointer h-28 flex flex-col justify-between md:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <span className="font-headline text-base text-secondary relative z-10 font-bold">
                反乌托邦
              </span>
              <p className="font-mono text-[9px] text-on-surface-variant relative z-10 mt-0.5">
                CONTROL_COLLAPSE
              </p>
            </div>
            <span className="material-symbols-outlined absolute bottom-2 right-2 text-secondary/15 text-5xl font-light transform group-hover:scale-110 transition-transform">
              cloud_off
            </span>
          </div>

          {/* Biohacking grid widget */}
          <div
            onClick={() => {
              onSelectCategoryFilter("biohacking");
              onNavigate("matrix");
            }}
            className="bg-surface-container border border-primary/10 p-4 relative overflow-hidden rounded group hover:border-primary-container/40 transition-all cursor-pointer h-28 flex flex-col justify-between md:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <span className="font-headline text-base text-primary-container relative z-10 font-bold">
                生物黑客
              </span>
              <p className="font-mono text-[9px] text-on-surface-variant relative z-10 mt-0.5">
                EVOLUTION_PATCH
              </p>
            </div>
            <span className="material-symbols-outlined absolute bottom-2 right-2 text-primary/15 text-5xl font-light transform group-hover:scale-110 transition-transform">
              biotech
            </span>
          </div>
        </div>
      </section>

      {/* Section 4: Futuristic News Feed logs catalog */}
      <section className="mt-12">
        <div className="border-l-2 border-primary-container pl-4 mb-6">
          <h3 className="font-headline text-lg md:text-xl text-primary font-bold">
            终端简讯
          </h3>
          <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant/50">
            SYSTEM_UPDATE_LOG_01
          </p>
        </div>

        <div className="space-y-4">
          {/* Bulletin item 1 */}
          <article className="p-4 bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/20 rounded flex gap-4 hover:bg-surface-container-low transition-colors select-none">
            <div className="w-12 h-12 flex-shrink-0 bg-surface-variant border border-primary-container/30 flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-primary-container text-2xl">rss_feed</span>
            </div>
            <div>
              <time className="font-mono text-[8px] md:text-[9px] text-secondary font-bold block uppercase tracking-wide">
                TIMESTAMP: 2049.08.24
              </time>
              <h4 className="font-sans font-bold text-xs md:text-sm text-on-surface mt-1 leading-snug">
                新数据节点已建立：旧金山地下分部现已上线。
              </h4>
              <p className="text-[11px] md:text-xs text-on-surface-variant/80 mt-1 line-clamp-2 leading-relaxed">
                获取最新的加密文档与阅读模块，完全去中心化的中继传输通道，阅读体验已于神经信道全面铺开。
              </p>
            </div>
          </article>

          {/* Bulletin item 2 */}
          <article className="p-4 bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/20 rounded flex gap-4 hover:bg-surface-container-low transition-colors select-none">
            <div className="w-12 h-12 flex-shrink-0 bg-surface-variant border border-secondary-container/30 flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-secondary text-2xl">security</span>
            </div>
            <div>
              <time className="font-mono text-[8px] md:text-[9px] text-secondary font-bold block uppercase tracking-wide">
                TIMESTAMP: 2049.08.22
              </time>
              <h4 className="font-sans font-bold text-xs md:text-sm text-on-surface mt-1 leading-snug">
                安全预警：检测到多起针对个人书架的扫描活动。
              </h4>
              <p className="text-[11px] md:text-xs text-on-surface-variant/80 mt-1 line-clamp-2 leading-relaxed">
                请确保您的局域脑机网络同步连接已启用三级加密掩护，并在终端控制台中打开 STEALTH_MODE，防止个人数字财产数据泄露。
              </p>
            </div>
          </article>
        </div>
      </section>
    </motion.div>
  );
}
