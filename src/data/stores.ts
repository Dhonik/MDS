export interface Store {
  id: string;
  slug: string;
  number: string;
  name: string;
  subLocation: string;
  tagline: string;
  category: 'Vegetables' | 'Fruits' | 'Vegetables & Fruits';
  businessTypes: string[];
  description: string;
  fullStory: string;
  specialization: string[];
  address: string;
  phone: string;
  altPhone?: string;
  whatsapp: string;
  mapUrl: string;
  openingHours: string;
  badge: string;
  imagePlaceholder: string;
  iconType: 'leaf' | 'store' | 'apple';
}

export const STORES_DATA: Store[] = [
  {
    id: 'store-01',
    slug: 'thuckalay-market',
    number: 'STORE 01',
    name: 'MDS Vegetable Shop',
    subLocation: 'Thuckalay Market',
    tagline: 'Vegetables • Retail • Wholesale',
    category: 'Vegetables',
    businessTypes: ['Vegetables', 'Retail', 'Wholesale'],
    description: 'Fresh vegetables for everyday household customers and bulk commercial requirements.',
    fullStory: 'Located in the heart of Thuckalay Market, this branch serves as a primary hub for fresh daily greens, root crops, onions, potatoes, and culinary staples, catering to local families as well as area restaurants and shops.',
    specialization: [
      'Daily farm-fresh green vegetables',
      'Bulk onions, potatoes, and culinary essentials',
      'Direct retail counter for neighborhood families',
      'Early morning wholesale dispatch for commercial buyers'
    ],
    address: 'STORE_1_ADDRESS',
    phone: '+91 94889 37666',
    altPhone: '+91 94433 91966',
    whatsapp: '919488937666',
    mapUrl: 'STORE_1_MAP_URL',
    openingHours: '6:30 AM – 10:00 PM',
    badge: 'Flagship Vegetable Market Hub',
    imagePlaceholder: 'REPLACE_WITH_MDS_THUCKALAY_VEG_SHOP_PHOTO',
    iconType: 'leaf',
  },
  {
    id: 'store-02',
    slug: 'nagercoil-market',
    number: 'STORE 02',
    name: 'MDS Vegetable Shop',
    subLocation: 'Nagercoil Market',
    tagline: 'Vegetables • Retail • Wholesale',
    category: 'Vegetables',
    businessTypes: ['Vegetables', 'Retail', 'Wholesale'],
    description: 'Vegetable supply for households, grocery shops and commercial buyers across the region.',
    fullStory: 'Positioned in the prominent Nagercoil Market trading center, this store extends MDS trusted vegetable sourcing to regional grocery retailers, hotels, catering partners, and local shoppers.',
    specialization: [
      'Comprehensive variety of daily cooking vegetables',
      'Wholesale sourcing for hotels and catering services',
      'Fast counter service for daily home cooks',
      'Dependable seasonal produce availability'
    ],
    address: 'STORE_2_ADDRESS',
    phone: '+91 94889 37666',
    altPhone: '+91 94433 91966',
    whatsapp: '919488937666',
    mapUrl: 'STORE_2_MAP_URL',
    openingHours: '7:00 AM – 10:00 PM',
    badge: 'Regional Market Branch',
    imagePlaceholder: 'REPLACE_WITH_MDS_NAGERCOIL_VEG_SHOP_PHOTO',
    iconType: 'store',
  },
  {
    id: 'store-03',
    slug: 'thuckalay-fruits',
    number: 'STORE 03',
    name: 'MDS Fruit Shop',
    subLocation: 'Near Thuckalay Bus Stand',
    tagline: 'Fresh Fruits • Retail • Wholesale',
    category: 'Fruits',
    businessTypes: ['Fresh Fruits', 'Retail', 'Wholesale where applicable'],
    description: 'Fresh fruit selection for everyday customers, special occasions, and business requirements.',
    fullStory: 'Conveniently situated near the bustling Thuckalay Bus Stand, our dedicated fruit outlet brings premium seasonal, local, and imported fruits selected for sweetness, freshness, and quality.',
    specialization: [
      'Freshly sourced seasonal and tropical fruits',
      'Everyday family fruit baskets and packs',
      'Bulk fruit orders for functions, events, and juices',
      'Convenient accessible location near transit'
    ],
    address: 'STORE_3_ADDRESS',
    phone: '+91 94889 37666',
    altPhone: '+91 94433 91966',
    whatsapp: '919488937666',
    mapUrl: 'STORE_3_MAP_URL',
    openingHours: '6:30 AM – 9:30 PM',
    badge: 'Dedicated Fruit Specialist',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_SHOP_PHOTO',
    iconType: 'apple',
  },
];

export const getStoreBySlug = (slug: string): Store | undefined => {
  return STORES_DATA.find((s) => s.slug === slug || s.id === slug);
};
