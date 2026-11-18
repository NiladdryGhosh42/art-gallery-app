"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  FolderHeart,
  Plus,
  Trash2,
  Settings,
  Menu,
  X,
  Lock,
  Sun,
} from "lucide-react";

interface StudioShellProps {
  children: React.ReactNode;
  studioName?: string;
  curatorName?: string;
  initialTheme?: string;
  counts?: {
    gallery: number;
    collections: number;
    trash: number;
  };
}

export function StudioShell({
  children,
  studioName = "ফুলচিত্র",
  curatorName = "স্টুডিও আর্কাইভ",
  initialTheme = "paper",
  counts = { gallery: 0, collections: 0, trash: 0 },
}: StudioShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const saved = localStorage.getItem("phulchitra_theme") || initialTheme;
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, [initialTheme]);

  const applyTheme = (nextTheme: string) => {
    setTheme(nextTheme);
    localStorage.setItem("phulchitra_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const cycleTheme = () => {
    const order = ["paper", "light", "dark"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    applyTheme(next);
  };

  const handleLock = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    {
      href: "/",
      label: "গ্যালারি",
      sub: "Gallery",
      icon: LayoutGrid,
      badge: counts.gallery,
      active: pathname === "/" || pathname.startsWith("/artwork/"),
    },
    {
      href: "/collections",
      label: "সংকলন",
      sub: "Collections",
      icon: FolderHeart,
      badge: counts.collections,
      active: pathname.startsWith("/collections"),
    },
    {
      href: "/upload",
      label: "আপলোড স্টুডিও",
      sub: "Upload",
      icon: Plus,
      active: pathname === "/upload",
    },
    {
      href: "/trash",
      label: "ট্র্যাশ",
      sub: "Trash",
      icon: Trash2,
      badge: counts.trash,
      active: pathname === "/trash",
    },
    {
      href: "/settings",
      label: "সেটিংস",
      sub: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-surface/95 backdrop-blur-sm border-b border-subtle sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-serif text-xl font-bold">
            ফ
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight block leading-none">
              {studioName}
            </span>
            <span className="text-[10px] font-mono text-muted uppercase">Phulchitra</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={cycleTheme}
            title="থিম পরিবর্তন"
            className="p-2 rounded-lg border border-subtle text-muted hover:text-ink"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            className="p-2 rounded-lg border border-subtle text-ink"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Desktop & Drawer Sidebar */}
      <aside
        className={`${
          mobileOpen ? "fixed inset-y-0 left-0 flex shadow-2xl" : "hidden md:flex"
        } flex-col w-72 shrink-0 bg-surface border-r border-subtle min-h-screen sticky top-0 h-screen justify-between p-5 z-40`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-subtle">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">
                ফ
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <h1 className="font-serif text-2xl font-bold tracking-tight truncate">
                    {studioName}
                  </h1>
                  <span className="text-[11px] font-mono text-muted">Phulchitra</span>
                </div>
                <p className="text-xs text-muted truncate">কিউরেটর: {curatorName}</p>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-5 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    item.active
                      ? "bg-elevated text-accent"
                      : "text-muted hover:bg-elevated/50 hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>
                      {item.label} <span className="text-xs opacity-75">({item.sub})</span>
                    </span>
                  </span>
                  {typeof item.badge === "number" && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-elevated text-muted">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-subtle space-y-3">
          <div>
            <span className="block text-[11px] font-medium text-muted mb-1.5">
              স্টুডিও থিম (Studio Theme)
            </span>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-elevated border border-subtle">
              {[
                { id: "paper", label: "কাগজ" },
                { id: "light", label: "গ্যালারি" },
                { id: "dark", label: "নিশি" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTheme(t.id)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition ${
                    theme === t.id
                      ? "bg-surface text-ink shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-elevated/70 border border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium">সেশন সক্রিয়</span>
            </div>
            <button
              onClick={handleLock}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-accent transition"
            >
              <Lock className="w-3 h-3" /> লক
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface/95 backdrop-blur-sm border-t border-subtle grid grid-cols-5 py-1.5 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 text-[11px] font-medium ${
                item.active ? "text-accent" : "text-muted"
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
