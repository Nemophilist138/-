import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book, Category } from "../types";
import { BOOKS, CATEGORIES, IMAGES } from "../data";

interface MatrixPanelProps {
  onNavigate: (panelId: string) => void;
  onSelectBook: (bookId: string) => void;
  initialCategoryFilter: string;
  onClearCategoryFilter: () => void;
}

export default function MatrixPanel({
  onNavigate,
  onSelectBook,
  initialCategoryFilter,
  onClearCategoryFilter
}: MatrixPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialCategoryFilter || null
  );

  // Sync state if initial filter changes
  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategoryId(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  // Handle drill down category view
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
  };

  const handleClearCategory = () => {
    setSelectedCategoryId(null);
    onClearCategoryFilter();
    setSearchQuery("");
  };

  // Filter books based on search search query and selected category
  const filteredBooks = BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategoryId) {
      return book.category === selectedCategoryId && matchesSearch;
    }
    return matchesSearch;
  });

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_bottom,rgba(0,243,255,0.08),transparent_60%)]"></div>

      {/* MATRIX INDEX: Category Dashboard & Global Search */}
      <AnimatePresence mode="wait">
        {!selectedCategoryId ? (
          <motion.div
            key="index-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header Section */}
            <section className="mb-4">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="font-headline text-2xl text-primary-container font-extrabold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                    分类矩阵
                  </h2>
                  <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant/60 mt-1">
                    CLASSIFICATION_MATRIX // NO_RESTRICTIONS_APPLIED
                  </p>
                </div>
                <div className="hidden md:block">
                  <span className="font-mono text-[10px] text-primary-container border border-primary-container/30 px-3 py-1 bg-surface-container/60 rounded">
                    ID: RUNNER_01
                  </span>
                </div>
              </div>

              {/* Terminal Search Bar Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-primary-container/50">terminal</span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border-b-2 border-primary-container/30 focus:border-primary-container text-primary-container font-mono text-sm py-4 pl-12 pr-16 outline-none transition-all placeholder:text-on-surface-variant/30 rounded-t"
                  placeholder="输入关键字搜索书库..."
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] md:text-[10px] text-primary-container/40">
                  _READY
                </div>
              </div>
            </section>

            {/* Matrix Bento Grid Layout */}
            {searchQuery === "" ? (
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1. Cyberpunk Main widget */}
                <div
                  onClick={() => handleSelectCategory("cyberpunk")}
                  className="col-span-2 row-span-2 relative group overflow-hidden bg-surface-container-high border border-primary-container/20 rounded-lg h-72 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.15)]"
                >
                  <img
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100"
                    src={IMAGES.neonCity}
                    alt="Cyberpunk"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[9px] text-secondary px-1.5 py-0.5 border border-secondary/50 rounded-sm bg-surface/80">
                        CORE_TYPE
                      </span>
                      <span className="font-mono text-[9px] text-primary-container">ARCHIVE_01</span>
                    </div>
                    <h3 className="font-headline text-lg md:text-xl text-primary-container font-bold group-hover:cyan-glow">
                      赛博朋克
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                      探索高科技与低生活的交织，在霓虹阴影下寻找真相。
                    </p>
                  </div>
                </div>

                {/* 2. Dystopia Small Category widget */}
                <div
                  onClick={() => handleSelectCategory("dystopia")}
                  className="relative group bg-surface-container-low border border-outline-variant/30 p-4 rounded-lg hover:border-secondary/50 hover:bg-surface-container transition-all overflow-hidden cursor-pointer h-[136px] flex flex-col justify-end"
                >
                  <div className="absolute -right-2 -top-2 opacity-[0.04] group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[100px]">cloud_off</span>
                  </div>
                  <h3 className="font-headline text-md md:text-lg text-secondary-fixed-dim font-bold group-hover:pink-glow">
                    反乌托邦
                  </h3>
                  <p className="font-mono text-[9px] text-on-surface-variant/60 mt-0.5">
                    DYSTOPIAN_REPORTS
                  </p>
                  <div className="mt-4 flex justify-between items-center text-[10px] text-primary-container/40">
                    <span>512 卷轴</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </div>
                </div>

                {/* 3. Neuroengineering Category widget */}
                <div
                  onClick={() => handleSelectCategory("biohacking")}
                  className="relative group bg-surface-container-low border border-outline-variant/30 p-4 rounded-lg hover:border-primary-container/50 hover:bg-surface-container transition-all overflow-hidden cursor-pointer h-[136px] flex flex-col justify-end"
                >
                  <div className="absolute -right-2 -top-2 opacity-[0.04] group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[100px]">biotech</span>
                  </div>
                  <h3 className="font-headline text-md md:text-lg text-primary-container font-bold group-hover:cyan-glow">
                    神经工程 & 黑客
                  </h3>
                  <p className="font-mono text-[9px] text-on-surface-variant/60 mt-0.5">
                    BIO_LINK_TECH
                  </p>
                  <div className="mt-4 flex justify-between items-center text-[10px] text-primary-container/40">
                    <span>1,204 文档</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </div>
                </div>

                {/* 4. Virtual Reality category full cover banner widget */}
                <div
                  onClick={() => handleSelectCategory("vr")}
                  className="col-span-2 relative group overflow-hidden bg-surface-container-high border border-primary-container/20 rounded-lg h-[136px] cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-opacity duration-500 scale-105 group-hover:scale-100"
                    src={IMAGES.microchips}
                    alt="VR"
                  />
                  <div className="absolute inset-0 bg-surface-container-lowest/60 backdrop-blur-[1.5px] group-hover:backdrop-blur-none transition-all"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="font-headline text-md md:text-lg text-primary font-bold group-hover:cyan-glow">
                      虚拟现实 & 芯片
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[8px] font-mono border border-primary/30 px-1.5 py-0.5 text-primary/70 rounded-xs uppercase tracking-wider">
                        METAVERSE
                      </span>
                      <span className="text-[8px] font-mono border border-primary/30 px-1.5 py-0.5 text-primary/70 rounded-xs uppercase tracking-wider">
                        SIMULATION
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cyberpunk protocol quick links */}
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 flex flex-col justify-center items-center text-center rounded-lg hover:bg-surface-container-low transition-colors select-none">
                  <span className="material-symbols-outlined text-primary-container mb-1 animate-pulse">security</span>
                  <span className="font-mono text-[10px] text-on-surface">加密协议 SECURE</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 flex flex-col justify-center items-center text-center rounded-lg hover:bg-surface-container-low transition-colors select-none">
                  <span className="material-symbols-outlined text-primary-container mb-1">smart_toy</span>
                  <span className="font-mono text-[10px] text-on-surface font-light">AI 反叛 CONTROL</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 flex flex-col justify-center items-center text-center rounded-lg hover:bg-surface-container-low transition-colors select-none">
                  <span className="material-symbols-outlined text-primary-container mb-1">hub</span>
                  <span className="font-mono text-[10px] text-on-surface">网络空间 LINK</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 flex flex-col justify-center items-center text-center rounded-lg hover:bg-surface-container-low transition-colors select-none">
                  <span className="material-symbols-outlined text-primary-container mb-1">memory</span>
                  <span className="font-mono text-[10px] text-on-surface">记忆走私 DUMP</span>
                </div>
              </section>
            ) : (
              /* If searching: reveal flat items matching the search query */
              <section className="space-y-4">
                <span className="font-mono text-[10px] text-primary/40 uppercase block mb-2">
                  搜索结果 (已检索到 {filteredBooks.length} 个条目)
                </span>
                
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      onSelectBook(book.id);
                      onNavigate("detail");
                    }}
                    className="p-4 bg-surface-container-low/60 border border-outline-variant/30 hover:border-primary-container/40 rounded flex gap-4 cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-20 bg-surface border border-outline-variant/30 rounded overflow-hidden flex-shrink-0">
                      <img src={book.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary group-hover:underline">{book.title}</h4>
                      <p className="text-[10px] font-mono text-secondary mt-0.5">{book.author} // {book.tag}</p>
                      <p className="text-[11px] text-on-surface-variant/70 mt-1 line-clamp-2 leading-relaxed">
                        {book.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Bottom status line */}
            <div className="mt-8 border-t border-primary/10 pt-4 flex flex-wrap gap-4 opacity-40 text-[9px] font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary-container animate-pulse rounded-full"></div>
                <span>UPLINK: ACTIVE</span>
              </div>
              <div>
                <span>ENCRYPTION: 256-BIT NEURAL</span>
              </div>
              <div className="ml-auto">
                <span>© 2077 DATA_GALLERY</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* DRILL-DOWN: Specific Selected Category Detail View (e.g. Bio-hacking shown in screenshot 7) */
          <motion.div
            key="category-detail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Nav path tracker & Back trigger button */}
            <span
              onClick={handleClearCategory}
              className="font-mono text-xs text-primary hover:underline cursor-pointer flex items-center gap-1 mt-2"
            >
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              返回分类矩阵
            </span>

            {/* Custom Styled Hero detail card based on Category selection */}
            <section className="relative overflow-hidden rounded-lg border border-primary-container/20 bg-surface-container-low/40 p-4 md:p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-block px-2.5 py-0.5 border border-secondary text-secondary font-mono text-[9px] md:text-[10px] tracking-widest bg-secondary/10 uppercase">
                    CATEG_{activeCategory?.tagCode} [ENCRYPTED]
                  </div>
                  <h2 className="font-headline text-xl md:text-3xl text-primary leading-tight font-extrabold">
                    {activeCategory?.name}：<br />
                    <span className="text-secondary drop-shadow-[0_0_8px_rgba(254,0,254,0.6)]">
                      {activeCategory?.id === "biohacking" ? "进化的下一阶段" : "霓虹阴影下的数字世界"}
                    </span>
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {activeCategory?.description}
                  </p>
                  <button
                    onClick={() => {
                      // Anchor first book of cat
                      const firstBook = filteredBooks[0];
                      if (firstBook) {
                        onSelectBook(firstBook.id);
                        onNavigate("detail");
                      }
                    }}
                    className="bg-primary-container text-on-primary font-mono text-xs px-5 py-2.5 transition-all duration-200 active:scale-95 flex items-center gap-2 font-bold cursor-pointer hover:shadow-[0_0_12px_#00f3ff]"
                  >
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    访问受限档案
                  </button>
                </div>
                <div className="relative h-48 md:h-[300px] overflow-hidden rounded">
                  <img
                    src={activeCategory?.image}
                    className="w-full h-full object-cover scale-105 filter saturate-75 brightness-75 hover:saturate-100 p-1"
                    alt={activeCategory?.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </div>
              </div>
            </section>

            {/* Quick specifications counts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border border-outline-variant/20 bg-surface-container/30 rounded flex flex-col justify-center">
                <span className="text-on-surface-variant font-mono text-[10px] select-none block mb-0.5">活跃节点</span>
                <span className="text-primary-container font-headline text-lg font-bold">1,024</span>
              </div>
              <div className="p-3 border border-outline-variant/20 bg-surface-container/30 rounded flex flex-col justify-center">
                <span className="text-on-surface-variant font-mono text-[10px] select-none block mb-0.5">更新频率</span>
                <span className="text-secondary font-headline text-sm font-bold">REAL-TIME</span>
              </div>
              <div className="p-3 border border-outline-variant/20 bg-surface-container/30 rounded flex flex-col justify-center">
                <span className="text-on-surface-variant font-mono text-[10px] select-none block mb-0.5">威胁等级</span>
                <span className="text-error font-headline text-sm font-bold">CRITICAL</span>
              </div>
              <div className="p-3 border border-outline-variant/20 bg-surface-container/30 rounded flex flex-col justify-center">
                <span className="text-on-surface-variant font-mono text-[10px] select-none block mb-0.5">授权协议</span>
                <span className="text-primary-container font-headline text-sm font-bold">OPEN-GENE</span>
              </div>
            </div>

            {/* List of Books matching this subcategory detail portal */}
            <section className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-headline text-base md:text-lg text-on-background font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">dns</span>
                  核心档案集
                </h3>
                <div className="flex-grow h-px bg-primary-container/20"></div>
              </div>

              {/* Grid listings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredBooks.length === 0 ? (
                  <p className="text-xs text-on-surface-variant pl-2">无该类别受限档案。</p>
                ) : (
                  filteredBooks.map((book) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={book.id}
                      onClick={() => {
                        onSelectBook(book.id);
                        onNavigate("detail");
                      }}
                      className="border border-outline-variant/30 bg-surface-container/40 p-4 flex flex-col justify-between group rounded cursor-pointer"
                    >
                      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded border border-outline-variant/20">
                        <img
                          src={book.image}
                          className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                          alt=""
                        />
                        <div className="absolute top-2 right-2 p-1.5 bg-background/85 rounded-xs border border-primary/25">
                          <span className="material-symbols-outlined text-primary-container text-xs">download</span>
                        </div>
                      </div>
                      <h4 className="font-headline text-sm text-primary-container font-bold mb-1 truncate drop-shadow-[0_0_5px_rgba(0,10,255,0.2)]">
                        {book.title}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant/80 line-clamp-3 leading-relaxed mb-4">
                        {book.desc}
                      </p>
                      
                      <div className="h-px bg-outline-variant/20 w-full mb-3" />
                      
                      <div className="flex justify-between items-center text-[10px] font-mono select-none">
                        <span className="flex items-center gap-1 text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                          STABLE_PATCH
                        </span>
                        <span className="text-primary-container">{book.ver}</span>
                      </div>
                    </motion.div>
                  ))
                )}

                {/* Additional simulated grid layout items to match screen 7 manifesto log list */}
                {selectedCategoryId === "biohacking" && (
                  <>
                    {/* Simulated manifesto element card */}
                    <div className="border border-outline-variant/30 bg-surface-container/30 p-4 rounded flex flex-col group relative">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-secondary"></div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="material-symbols-outlined text-secondary">description</span>
                        <span className="font-mono text-xs text-on-surface-variant">2.4 MB</span>
                      </div>
                      <h4 className="font-headline text-sm text-primary font-bold mb-1">生物链接宣言 (MANIFESTO)</h4>
                      <p className="font-sans text-xs text-on-surface-variant/70 italic leading-relaxed mb-4">
                        “身体只是承载信息的容器，而信息渴望自由。”
                      </p>
                      <button className="mt-auto border border-primary-container/40 text-primary-container hover:bg-primary-container hover:text-on-primary font-mono text-[10px] py-1 transition-all cursor-pointer rounded-xs uppercase font-bold text-center">
                        READ_MANIFESTO.LOG
                      </button>
                    </div>

                    {/* Simulated list row elements */}
                    <div className="col-span-1 md:col-span-3 border border-outline-variant/30 bg-surface-container/30 p-4 rounded flex items-center justify-between gap-4 group hover:border-secondary transition-colors cursor-pointer select-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary-container/10 border border-primary-container/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary-container">biotech</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs md:text-sm text-on-background">人工腺体编程接口 PROTO</h4>
                          <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-tighter mt-0.5">
                            Sub-System: Endocrine_Control // Access: L3
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-xs text-secondary font-bold">ACTIVE</span>
                        <span className="font-mono text-[9px] text-on-surface-variant/60 block mt-0.5">0.12ms LATENCY</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
