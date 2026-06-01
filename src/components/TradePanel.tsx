import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface TradePanelProps {
  onNavigate: (panelId: string) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onClearCart: () => void;
  onShowNotification: (message: string) => void;
}

export default function TradePanel({
  onNavigate,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onShowNotification
}: TradePanelProps) {
  const [gasFee, setGasFee] = useState(0.02);
  const [discountRate, setDiscountRate] = useState(0.05); // Simulated decrypt discount ETH
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Math calculator based on cart selections
  const calculateTotals = () => {
    let subtotalETH = 0;
    cartItems.forEach((item) => {
      subtotalETH += item.book.priceETH * item.quantity;
    });

    const isCartEmpty = cartItems.length === 0;
    const currentDiscount = isCartEmpty ? 0 : discountRate;
    const currentGas = isCartEmpty ? 0 : gasFee;
    
    const totalETH = subtotalETH + currentGas - currentDiscount;
    const safeTotal = totalETH < 0 ? 0 : totalETH;

    // Convert fixed USD conversion (e.g. 1 ETH = ~2456.60 USD)
    const totalUSD = safeTotal * 2456.60;

    return {
      subtotal: parseFloat(subtotalETH.toFixed(2)),
      gas: currentGas,
      discount: currentDiscount,
      total: parseFloat(safeTotal.toFixed(2)),
      usd: parseFloat(totalUSD.toFixed(2))
    };
  };

  const { subtotal, gas, discount, total, usd } = calculateTotals();

  const handleConfirmTransaction = () => {
    if (cartItems.length === 0) {
      onShowNotification("交易缓冲区为空，请添加数据模块到交易队列。");
      return;
    }
    
    setIsProcessing(true);
    onShowNotification("广播加密打包交易到以太坊去中心化节点...");
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onShowNotification("交易打包广播成功！您的神经网络正在获取解密秘钥...");
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setIsCompleted(false);
    onClearCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-24 pt-4 text-on-surface select-none"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_bottom,rgba(0,243,255,0.08),transparent_60%)]"></div>

      {/* Section Title displays matching mockup 5 */}
      <div className="flex items-end justify-between mb-8 border-b border-primary-container/20 pb-2">
        <div>
          <h2 className="font-headline text-lg md:text-xl text-primary-container font-extrabold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]">
            交易终端
          </h2>
          <p className="font-mono text-[9px] md:text-[10px] text-outline-variant">
            STATUS: ENCRYPTED_SESSION_09
          </p>
        </div>
        <div className="font-mono text-[9px] text-[#00ff41] animate-pulse uppercase pr-1 tracking-wider">
          连接就绪
        </div>
      </div>

      {/* Cart Content items listings wrapper */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <div className="p-8 border border-outline-variant/30 bg-surface-container-low/40 backdrop-blur-md rounded-lg text-center space-y-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block">shopping_cart_off</span>
            <p className="text-on-surface-variant text-xs md:text-sm font-mono uppercase tracking-wide">
              交易缓存队列空
            </p>
            <p className="text-on-surface-variant/60 text-[11px] max-w-xs mx-auto leading-relaxed">
              请前往『主页』或『分类矩阵』，挑选需要安装解密的未来档案、神经系统协议放入队列。
            </p>
            <button
              onClick={() => onNavigate("matrix")}
              className="px-6 py-2 border border-primary-container text-primary-container text-xs font-mono font-bold hover:bg-primary-container/10 transition-colors uppercase rounded cursor-pointer"
            >
              浏览分类矩阵
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.book.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/10 to-secondary-container/10 blur opacity-30 group-hover:opacity-100 transition duration-300 rounded"></div>
              
              {/* Product Row Cards */}
              <div className="relative flex gap-4 p-4 bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/30 rounded industrial-edge overflow-hidden">
                <div className="w-20 h-28 flex-shrink-0 relative overflow-hidden border border-outline-variant/50 rounded">
                  <img
                    alt={item.book.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    src={item.book.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay"></div>
                </div>

                {/* Subtitle properties */}
                <div className="flex-grow flex flex-col justify-between select-none">
                  <div>
                    <h3 className="font-sans font-bold text-sm md:text-base text-primary leading-tight">
                      {item.book.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="px-2 py-0.5 border border-primary-container/30 text-[8px] font-mono text-primary-container uppercase rounded-xs">
                        {item.book.tag}
                      </span>
                      <span className="px-2 py-0.5 border border-outline-variant text-[8px] font-mono text-on-surface-variant uppercase rounded-xs">
                        {item.book.ver}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-mono text-base text-secondary font-bold select-all">
                      {item.book.priceETH} ETH
                    </span>
                    
                    {/* Stepper dynamic counters */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1 active:scale-90"
                      >
                        <span className="material-symbols-outlined text-large">remove_circle</span>
                      </button>
                      
                      <span className="font-mono text-sm text-primary font-bold w-4 text-center">
                        {item.quantity.toString().padStart(2, "0")}
                      </span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1 active:scale-90"
                      >
                        <span className="material-symbols-outlined text-large">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <>
          {/* Detailed Receipt layout */}
          <div className="mt-8 relative p-4 bg-surface-container-high/40 border-l-4 border-primary-container backdrop-blur-lg rounded-r">
            <div className="absolute top-2 right-2 font-mono text-[9px] text-primary-container/30 uppercase tracking-widest select-all">
              Receipt-ID: #8829-X
            </div>
            <div className="space-y-2 font-mono text-xs mt-3">
              <div className="flex justify-between text-on-surface-variant">
                <span>模块小计 SUB_TOTAL</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>网络带宽费 (Gas)</span>
                <span>{gas.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>数据解密折扣 OFF_DISC</span>
                <span className="text-secondary">- {discount.toFixed(2)} ETH</span>
              </div>
              
              <div className="h-px bg-outline-variant/30 my-3"></div>
              
              <div className="flex justify-between items-center pt-1">
                <span className="text-primary-container text-sm md:text-base font-bold">
                  总结算金额 NET_TOTAL
                </span>
                <div className="text-right">
                  <div className="text-primary-container text-xl md:text-2xl font-bold drop-shadow-[0_0_8px_#00f3ff] inline-block font-mono">
                    {total.toFixed(2)} ETH
                  </div>
                  <div className="text-[9px] text-outline-variant uppercase tracking-tighter mt-1 Block select-all">
                    Approx. ${usd.toLocaleString()} USD
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Decrypt Order action trigger */}
          <div className="mt-6">
            <button
              onClick={handleConfirmTransaction}
              disabled={isProcessing}
              className={`w-full h-14 bg-primary-container text-on-primary font-headline uppercase rounded ${
                isProcessing ? "opacity-60 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] active:scale-95 cursor-pointer"
              } relative overflow-hidden transition-all duration-75 font-bold flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              <div className="relative flex items-center justify-center gap-2 text-sm md:text-base">
                <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  security
                </span>
                <span>{isProcessing ? "加密打包广播中..." : "确认加密交易"}</span>
              </div>
            </button>
            <p className="text-center mt-3 font-mono text-[9px] text-outline-variant uppercase tracking-tighter leading-snug">
              Warning: Neural-link confirmed transactions are irreversible
            </p>
          </div>
        </>
      )}

      {/* SUCCESS POPUP MODAL DIALOG */}
      <AnimatePresence>
        {isCompleted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={handleCloseSuccess}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-surface rounded-lg p-6 border-2 border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.4)] md:max-w-md"
            >
              {/* Corner decorative Bracket lights */}
              <div className="absolute top-2 right-2 text-[#00ff41]/40 font-mono text-[9px] tracking-wide select-none uppercase">
                NODE_OK
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#00ff41]/10 rounded-full flex items-center justify-center text-[#00ff41] mx-auto border-2 border-[#00ff41] animate-bounce mb-2">
                  <span className="material-symbols-outlined text-3xl font-bold">lock_open</span>
                </div>
                
                <h3 className="font-headline text-lg text-[#00ff41] font-extrabold green-glow uppercase tracking-wider">
                  交易同步成功
                </h3>
                
                <hr className="border-[#00ff41]/20" />

                <div className="p-3 bg-surface-container-lowest/80 text-left rounded space-y-2 border border-[#00ff41]/25 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">对等网络节点</span>
                    <span className="text-primary-container">RUNNER_01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">解密结算凭证</span>
                    <span className="text-[#00ff41]">{total.toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">协议验证等级</span>
                    <span className="text-secondary">LEVEL 9_PASS</span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  去中心化网络已被授权。所有图书均已打包中。您现在可以点击下方按钮关闭本交易通道，或者到《书库》详情页开始直接对脑机写入。
                </p>

                <button
                  onClick={handleCloseSuccess}
                  className="w-full h-12 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-surface font-mono font-bold text-xs uppercase transition-all duration-150 rounded cursor-pointer mt-2"
                >
                  关闭本解密信道
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
