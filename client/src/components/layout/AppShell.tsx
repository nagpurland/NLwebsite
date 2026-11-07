import { Link, useLocation } from "wouter";
import { useAdminUser } from "@/components/layout/AdminGate";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Newspaper,
  Megaphone,
  Search,
  Bell,
  Menu,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "CRM & Leads", icon: Users, href: "/admin/leads" },
  { label: "Scraper Engine", icon: Database, href: "/admin/scraping" },
  { label: "Web Intelligence", icon: Newspaper, href: "/admin/intel" },
  { label: "Campaigns", icon: Megaphone, href: "/admin/campaigns" },
  { label: "Behavioral Analytics", icon: TrendingUp, href: "/admin/analytics" },
  { label: "Data Refresh", icon: Database, href: "/admin/data-refresh" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: user } = useAdminUser();
  const username = user?.username ?? "Admin";

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout").catch(() => undefined);
    localStorage.removeItem("admin_token");
    queryClient.clear();
    setLocation("/");
  };

  const SidebarContent = () => (
    <div className="site flex h-full flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-sm">
      <div className="flex h-20 items-center px-8 border-b border-sidebar-border">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-xl mr-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display font-semibold text-xl text-primary">
              Nagpur<span className="text-accent-strong">Land</span>
            </span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50">Market Intelligence</p>
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center justify-between group rounded-xl px-4 py-3 text-sm font-semibold transition-all cursor-pointer mb-1",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                    {item.label}
                  </div>
                  {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                </div>
              </Link>
            );
          })}
          
          <div className="mt-10 px-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50">Public Links</p>
            <div className="space-y-1">
              <Link href="/4-step-system">
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-sidebar-accent transition-all cursor-pointer">
                  <ExternalLink className="h-4 w-4 opacity-50" />
                  4-Step System
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="site flex h-screen overflow-hidden bg-background">
      <aside className="hidden w-72 md:block shrink-0">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden relative">
        <header className="flex h-20 items-center justify-between border-b bg-card/80 backdrop-blur-md px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="relative w-80 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input 
                placeholder="Search properties, leads..." 
                className="pl-10 h-11 bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all rounded-xl" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative h-11 w-11 rounded-xl border-border/50 hover:bg-muted transition-all">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent ring-4 ring-background" />
            </Button>
            <div className="h-8 w-px bg-border/50 mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-11 px-2 rounded-xl hover:bg-muted transition-all gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold leading-none">{username}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Admin</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 rounded-xl shadow-2xl border-border/50" align="end" forceMount>
                <div className="p-2">
                  <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:text-destructive rounded-lg py-2 font-bold">
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
