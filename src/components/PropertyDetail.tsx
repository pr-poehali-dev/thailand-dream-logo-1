import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import type { Property } from './PropertyCard';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface PropertyDetailProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClose: () => void;
  reviews: Review[];
  onAddReview: (review: { name: string; rating: number; comment: string }) => void;
}

export default function PropertyDetail({
  property,
  isFavorite,
  onToggleFavorite,
  onClose,
  reviews,
  onAddReview,
}: PropertyDetailProps) {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.comment) {
      onAddReview(reviewForm);
      setReviewForm({ name: '', rating: 5, comment: '' });
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-80 object-cover rounded-t-xl"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 rounded-full"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 left-4 rounded-full"
            onClick={() => onToggleFavorite(property.id)}
          >
            <Icon
              name="Heart"
              size={20}
              className={isFavorite ? 'fill-destructive text-destructive' : ''}
            />
          </Button>
          {property.featured && (
            <Badge className="absolute bottom-4 left-4 bg-accent">
              <Icon name="Star" size={14} className="mr-1" />
              Популярное
            </Badge>
          )}
        </div>

        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-3xl font-bold">{property.title}</h2>
              <Badge variant="secondary">{property.type}</Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Icon name="MapPin" size={18} />
              {property.location}
            </p>
          </div>

          <div className="flex items-center gap-6 pb-6 border-b">
            <div className="flex items-center gap-2 text-lg">
              <Icon name="Bed" size={22} className="text-primary" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-muted-foreground text-sm">спален</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Icon name="Bath" size={22} className="text-primary" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-muted-foreground text-sm">ванных</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Icon name="Maximize" size={22} className="text-primary" />
              <span className="font-semibold">{property.area}</span>
              <span className="text-muted-foreground text-sm">м²</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Посуточная аренда</p>
                <p className="text-3xl font-bold text-primary">{property.pricePerDay}</p>
                <p className="text-xs text-muted-foreground mt-1">за сутки</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Долгосрочная аренда</p>
                <p className="text-3xl font-bold text-primary">{property.pricePerMonth}</p>
                <p className="text-xs text-muted-foreground mt-1">за месяц</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Button size="lg" className="w-full gap-2">
              <Icon name="Calendar" size={20} />
              Забронировать виллу
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Отзывы</h3>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-semibold">{avgRating}</span>
                  <span className="text-muted-foreground">({reviews.length})</span>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Оставить отзыв</h4>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input
                      placeholder="Иван"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Icon
                            name="Star"
                            size={28}
                            className={
                              star <= reviewForm.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-muted-foreground'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Комментарий</label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Расскажите о вашем впечатлении..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Icon name="Send" size={18} />
                    Отправить отзыв
                  </Button>
                </form>
              </CardContent>
            </Card>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-muted-foreground'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="MessageCircle" size={40} className="text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Пока нет отзывов. Будьте первым!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}