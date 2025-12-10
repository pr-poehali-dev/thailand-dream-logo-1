import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Property } from './PropertyCard';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: number | null;
  onSelectProperty: (id: number | null) => void;
}

export default function InteractiveMap({ properties, selectedProperty, onSelectProperty }: InteractiveMapProps) {
  const locationMap: {[key: string]: {x: number, y: number}} = {
    'Пхукет': { x: 200, y: 350 },
    'Бангкок': { x: 500, y: 150 },
    'Паттайя': { x: 550, y: 220 },
    'Самуи': { x: 400, y: 380 },
    'Краби': { x: 250, y: 300 },
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border-2 border-border shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0EA5E9" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#grid)" />
            
            <path
              d="M 100 400 Q 150 200, 250 300 T 400 350 Q 500 380, 600 300 T 700 250"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray="5,5"
            />
            
            <ellipse cx="200" cy="350" rx="60" ry="40" fill="#0EA5E9" opacity="0.15" />
            <ellipse cx="500" cy="150" rx="70" ry="50" fill="#0EA5E9" opacity="0.15" />
            <ellipse cx="400" cy="380" rx="50" ry="35" fill="#33C3F0" opacity="0.15" />

            {properties.map((property, index) => {
              const cityKey = Object.keys(locationMap).find(city => 
                property.location.includes(city)
              ) || 'Пхукет';
              const basePos = locationMap[cityKey];
              const offset = index * 15;
              const x = basePos.x + (offset % 50);
              const y = basePos.y + Math.floor(offset / 50) * 15;
              const isSelected = selectedProperty === property.id;

              return (
                <g key={property.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 16 : 12}
                    fill={isSelected ? '#0EA5E9' : '#33C3F0'}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => onSelectProperty(property.id)}
                    style={{
                      filter: isSelected ? 'drop-shadow(0 4px 12px rgba(14,165,233,0.5))' : 'none',
                    }}
                  />
                  
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 24 : 18}
                    fill="none"
                    stroke={isSelected ? '#0EA5E9' : '#33C3F0'}
                    strokeWidth="2"
                    opacity="0.3"
                    className="animate-pulse"
                  />

                  {isSelected && (
                    <>
                      <rect
                        x={x - 80}
                        y={y - 100}
                        width="160"
                        height="70"
                        rx="8"
                        fill="white"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                        className="animate-scale-in"
                      />
                      <text
                        x={x}
                        y={y - 75}
                        textAnchor="middle"
                        className="text-xs font-semibold"
                        fill="#1A1F2C"
                      >
                        {property.title.length > 20 ? property.title.substring(0, 20) + '...' : property.title}
                      </text>
                      <text
                        x={x}
                        y={y - 55}
                        textAnchor="middle"
                        className="text-xs"
                        fill="#666"
                      >
                        {property.location}
                      </text>
                      <text
                        x={x}
                        y={y - 35}
                        textAnchor="middle"
                        className="text-sm font-bold"
                        fill="#0EA5E9"
                      >
                        {property.price}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={20} className="text-primary" />
          <span className="font-bold">Карта локаций</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Пхукет • Краби • Самуи</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-muted-foreground">Бангкок • Паттайя</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs mt-3">
          {properties.length} объектов
        </Badge>
      </div>

      {selectedProperty && (
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onSelectProperty(null)}
          >
            <Icon name="X" size={16} className="mr-1" />
            Закрыть
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="Info" size={14} />
        Нажмите на точку для деталей
      </div>
    </div>
  );
}