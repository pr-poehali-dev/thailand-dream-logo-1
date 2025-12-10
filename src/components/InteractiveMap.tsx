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
  return (
    <div className="relative w-full h-[500px] bg-secondary/30 rounded-xl overflow-hidden border-2 border-border">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
          >
            <rect width="800" height="500" fill="#D3E4FD" opacity="0.3" />
            
            <path
              d="M 150 200 Q 200 150, 250 200 T 350 200 Q 400 220, 450 200 T 550 180 Q 600 160, 650 180"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="3"
              opacity="0.6"
            />
            
            <ellipse cx="300" cy="350" rx="80" ry="40" fill="#0EA5E9" opacity="0.2" />
            <ellipse cx="500" cy="300" rx="60" ry="30" fill="#0EA5E9" opacity="0.2" />

            {properties.map((property, index) => {
              const x = 150 + (index % 3) * 250;
              const y = 180 + Math.floor(index / 3) * 150;
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

      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="MapPin" size={18} className="text-primary" />
          <span className="font-semibold text-sm">Таиланд</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {properties.length} объектов на карте
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
