import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Cpu, 
  Atom, 
  BarChart2, 
  Lightbulb, 
  Github,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: LayoutDashboard },
    { path: '/dataset', label: 'Dataset Overview', icon: Database },
    { path: '/classical', label: 'Classical Models', icon: Cpu },
    { path: '/quantum', label: 'Quantum Classifier', icon: Atom },
    { path: '/comparison', label: 'Comparison', icon: BarChart2 },
    { path: '/real-time', label: 'Real-Time Detection', icon: Zap },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed h-full z-30">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Atom className="h-8 w-8 text-primary animate-pulse" />
          <span className="font-bold text-xl tracking-tight">Q-Fraud Detect</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </a>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Q-Fraud Detect</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-30 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-lg"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
          {children}
        </div>
        
        <footer className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© 2024 Quantum Fraud Detection Project. Built with React & FastAPI.</p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
