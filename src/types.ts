/**
 * Type declarations for NEON SCRIPT DATA GALLERY
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  priceCR: number;
  priceETH: number;
  tag: string;
  ver: string;
  rating?: number;
  featured?: boolean;
  isHot?: boolean;
  desc: string;
  technicalSpecs: {
    memorySize: string;
    encryption: string;
    neuralLoad: string;
    compatibility: string;
  };
  details: {
    hashtags: string[];
    linkedNodes: string[];
  };
}

export interface Category {
  id: string;
  name: string;
  tagCode: string;
  description: string;
  image?: string;
  docCount?: string;
  icon: string;
  glowColor: "cyan" | "pink" | "purple";
}

export interface LogEntry {
  timestamp: string;
  text: string;
  type: "info" | "warn" | "error" | "success";
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface NodeState {
  id: string;
  name: string;
  syncPercent: number;
  loadRegion: string;
  status: "idle" | "syncing" | "locked" | "active";
  icon: string;
}

export interface TerminalMetrics {
  cpuLoad: number;
  latencyMs: number;
  encryptionLevel: number;
  uptime: string;
}
