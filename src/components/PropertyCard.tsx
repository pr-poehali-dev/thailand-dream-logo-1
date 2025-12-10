import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  lat: number;
  lng: number;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PropertyCard({ property, isFavorite, onToggleFavorite }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-accent">
            <Icon name="Star" size={14} className="mr-1" />
            Популярное
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full"
          onClick={() => onToggleFavorite(property.id)}
        >
          <Icon 
            name={isFavorite ? 'Heart' : 'Heart'} 
            size={18}
            className={isFavorite ? 'fill-destructive text-destructive' : ''}
          />
        </Button>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              {property.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Bed" size={16} />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Bath" size={16} />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Maximize" size={16} />
            {property.area} м²
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground">{property.type}</p>
            <p className="text-xl font-bold text-primary">{property.price}</p>
          </div>
          <Button size="sm" className="gap-2">
            Подробнее
            <Icon name="ArrowRight" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
