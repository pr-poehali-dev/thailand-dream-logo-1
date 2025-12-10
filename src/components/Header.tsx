import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  favoritesCount: number;
}

export default function Header({ onNavigate, currentPage, favoritesCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'properties', label: 'Аренда', icon: 'Building2' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart', badge: favoritesCount },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://cdn.poehali.dev/projects/21a43861-09b0-48ac-adc8-d4e604c5f2fc/files/e8316236-5ca6-486a-a73d-1645ac2f5784.jpg" 
              alt="Thailand Dream" 
              className="h-14 w-14 object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">Thailand Dream</h1>
              <p className="text-xs text-muted-foreground">Аренда вилл в Таиланде</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.id)}
                className="relative gap-2"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-fade-in">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start gap-2 relative"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}