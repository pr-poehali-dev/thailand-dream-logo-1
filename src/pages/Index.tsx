import { useState } from 'react';
import Header from '@/components/Header';
import PropertyCard, { Property } from '@/components/PropertyCard';
import InteractiveMap from '@/components/InteractiveMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Люкс вилла у океана',
    location: 'Пхукет, Карон',
    price: '₽45,000,000',
    type: 'Вилла',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    lat: 7.8804,
    lng: 98.3923,
    featured: true,
  },
  {
    id: 2,
    title: 'Современная квартира в центре',
    location: 'Бангкок, Сукхумвит',
    price: '₽12,500,000',
    type: 'Квартира',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    lat: 13.7563,
    lng: 100.5018,
    featured: true,
  },
  {
    id: 3,
    title: 'Пентхаус с видом на море',
    location: 'Паттайя, Пратамнак',
    price: '₽28,000,000',
    type: 'Пентхаус',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    lat: 12.9236,
    lng: 100.8825,
  },
  {
    id: 4,
    title: 'Уютный дом в тропиках',
    location: 'Самуи, Чавенг',
    price: '₽18,900,000',
    type: 'Дом',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    lat: 9.5251,
    lng: 100.0506,
  },
  {
    id: 5,
    title: 'Студия рядом с пляжем',
    location: 'Пхукет, Патонг',
    price: '₽5,500,000',
    type: 'Студия',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    lat: 7.8963,
    lng: 98.2992,
  },
  {
    id: 6,
    title: 'Вилла с бассейном',
    location: 'Краби, Ао Нанг',
    price: '₽32,000,000',
    type: 'Вилла',
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    lat: 8.0863,
    lng: 98.9063,
    featured: true,
  },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapProperty, setSelectedMapProperty] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Все' || property.type === selectedType;
    const propertyPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
    const matchesPrice = propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const favoriteProperties = mockProperties.filter(p => favorites.includes(p.id));

  const renderHome = () => (
    <div className="space-y-16">
      <section className="relative min-h-[600px] -mt-6 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-6 animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🌴 Эксклюзивная недвижимость
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Ваша мечта в Таиланде начинается здесь
            </h1>
            <p className="text-xl text-white/90">
              Элитные виллы, апартаменты и дома у океана. Надёжная помощь в покупке недвижимости.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 hover:scale-105 transition-transform"
                onClick={() => setCurrentPage('properties')}
              >
                <Icon name="Search" size={20} />
                Смотреть объекты
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => setCurrentPage('contacts')}
              >
                <Icon name="Phone" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Популярные предложения</h2>
          <p className="text-muted-foreground text-lg">Лучшие объекты этого месяца</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.filter(p => p.featured).map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'Shield',
              title: 'Безопасность сделок',
              description: 'Полное юридическое сопровождение и проверка документов',
            },
            {
              icon: 'Users',
              title: 'Личный менеджер',
              description: 'Индивидуальный подход к каждому клиенту',
            },
            {
              icon: 'TrendingUp',
              title: 'Выгодные инвестиции',
              description: 'Помогаем выбрать объекты с высоким потенциалом роста',
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Каталог недвижимости</h1>
          <p className="text-white/90 text-lg">Найдите идеальный дом в Таиланде</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-6">
          <div className="relative max-w-xl">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или локации..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={20} />
              Фильтры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Тип недвижимости</label>
                <div className="flex flex-wrap gap-2">
                  {['Все', 'Вилла', 'Квартира', 'Пентхаус', 'Дом', 'Студия'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className="transition-all"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Ценовой диапазон: ₽{(priceRange[0] / 1000000).toFixed(1)}M - ₽{(priceRange[1] / 1000000).toFixed(1)}M
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">От (млн ₽)</label>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={priceRange[0] / 1000000}
                      onChange={(e) => setPriceRange([parseFloat(e.target.value) * 1000000, priceRange[1]])}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">До (млн ₽)</label>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={priceRange[1] / 1000000}
                      onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value) * 1000000])}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {(selectedType !== 'Все' || priceRange[0] > 0 || priceRange[1] < 50000000) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedType('Все');
                  setPriceRange([0, 50000000]);
                }}
                className="mt-4 gap-2"
              >
                <Icon name="X" size={16} />
                Сбросить фильтры
              </Button>
            )}
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Расположение объектов</h2>
          <InteractiveMap
            properties={filteredProperties}
            selectedProperty={selectedMapProperty}
            onSelectProperty={setSelectedMapProperty}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Все объекты</h2>
            <Badge variant="secondary">{filteredProperties.length} найдено</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Избранное</h1>
          <p className="text-white/90 text-lg">Ваши сохранённые объекты</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Список избранного пуст</h3>
              <p className="text-muted-foreground mb-6">
                Добавьте объекты в избранное, чтобы не потерять их
              </p>
              <Button onClick={() => setCurrentPage('properties')}>
                Смотреть объекты
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p className="text-white/90 text-lg">Свяжитесь с нами любым удобным способом</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Расскажите, что вас интересует..."
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+66 (0) 12-345-6789</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@thailand-dream.com</p>
                    <p className="text-muted-foreground">sales@thailand-dream.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Офис в Таиланде</h3>
                    <p className="text-muted-foreground">123/45 Sukhumvit Road</p>
                    <p className="text-muted-foreground">Bangkok, Thailand 10110</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Часы работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 09:00 - 18:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 10:00 - 16:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        favoritesCount={favorites.length}
      />
      
      <main className="pb-16">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'properties' && renderProperties()}
        {currentPage === 'favorites' && renderFavorites()}
        {currentPage === 'contacts' && renderContacts()}
      </main>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Thailand Dream</h3>
              <p className="text-white/80">
                Надёжный партнёр в покупке недвижимости в Таиланде
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2">
                {['Главная', 'Недвижимость', 'Избранное', 'Контакты'].map((item, index) => (
                  <button
                    key={index}
                    className="block text-white/80 hover:text-white transition-colors"
                    onClick={() => setCurrentPage(['home', 'properties', 'favorites', 'contacts'][index])}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                {['Facebook', 'Instagram', 'MessageCircle'].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon name={icon as any} size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            © 2024 Thailand Dream. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}