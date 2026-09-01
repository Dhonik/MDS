export interface ProductCategory {
  id: string;
  name: string;
  type: 'vegetable' | 'fruit';
  shortDesc: string;
  examples: string;
  imagePlaceholder: string;
  highlight?: string;
}

export const VEGETABLE_CATEGORIES: ProductCategory[] = [
  {
    id: 'leafy',
    name: 'Leafy Vegetables',
    type: 'vegetable',
    shortDesc: 'Crisp, nutrient-rich green leaves harvested fresh daily for home kitchens and culinary preparations.',
    examples: 'Spinach (Palak), Fenugreek (Methi), Coriander, Curry Leaves, Mint, Amaranthus',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_LEAFY_PHOTO',
    highlight: 'Harvested Daily'
  },
  {
    id: 'roots',
    name: 'Root Vegetables',
    type: 'vegetable',
    shortDesc: 'Firm, earthy root produce selected for premium texture, freshness, and extended kitchen shelf life.',
    examples: 'Carrots, Beetroot, Radish (Mooli), Turnip, Tapioca',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_ROOT_PHOTO',
  },
  {
    id: 'onions-potatoes',
    name: 'Onions & Potatoes',
    type: 'vegetable',
    shortDesc: 'Core culinary staples supplied in dependable grades for daily cooking and bulk commercial kitchens.',
    examples: 'Small Sambar Onions (Shallots), Big Red Onions, Premium Grade Potatoes',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_ONION_POTATO_PHOTO',
    highlight: 'Essential Bulk Staple'
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    type: 'vegetable',
    shortDesc: 'Firm, sun-ripened tomatoes balanced in acidity and sweetness for curries, gravies, and salads.',
    examples: 'Country (Nattu) Tomatoes, Hybrid Firm Tomatoes',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_TOMATO_PHOTO',
  },
  {
    id: 'green-veg',
    name: 'Green Vegetables',
    type: 'vegetable',
    shortDesc: 'Tender pods, gourds, and garden greens picked for wholesome freshness and rich natural flavor.',
    examples: 'Beans, Peas, Capsicum (Bell Peppers), Ladies Finger (Okra), Bottle Gourd, Bitter Gourd',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_GREEN_PHOTO',
  },
  {
    id: 'chillies',
    name: 'Chillies & Spices',
    type: 'vegetable',
    shortDesc: 'Pungent, fresh chillies and essential aromatic aromatics sourced for distinct culinary heat.',
    examples: 'Green Chillies (Standard & Spicy varieties), Dry Chillies, Fresh Ginger',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_CHILLI_PHOTO',
  },
  {
    id: 'seasonal-veg',
    name: 'Seasonal Vegetables',
    type: 'vegetable',
    shortDesc: 'Specialty seasonal harvests brought directly to our stalls at the peak of regional availability.',
    examples: 'Drumsticks, Raw Banana (Plantain), Ash Gourd, Pumpkin, Elephant Yam',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_SEASONAL_PHOTO',
    highlight: 'Regional Specials'
  },
  {
    id: 'other-produce',
    name: 'Other Fresh Produce',
    type: 'vegetable',
    shortDesc: 'Daily kitchen essentials, fresh aromatics, and supporting ingredients to complete any recipe.',
    examples: 'Garlic Bulbs, Lemons, Fresh Coconut, Ginger Roots',
    imagePlaceholder: 'REPLACE_WITH_MDS_VEGETABLE_OTHER_PHOTO',
  }
];

export const FRUIT_CATEGORIES: ProductCategory[] = [
  {
    id: 'seasonal-fruits',
    name: 'Seasonal Fruits',
    type: 'fruit',
    shortDesc: 'Peak seasonal harvest fruits handpicked for natural sweetness, aroma, and premium freshness.',
    examples: 'Mangoes (in season), Custard Apples, Guavas, Pomegranates',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_SEASONAL_PHOTO',
    highlight: 'Peak Season Flavors'
  },
  {
    id: 'tropical-fruits',
    name: 'Tropical Fruits',
    type: 'fruit',
    shortDesc: 'Vibrant local and tropical delights renowned for juicy texture and natural nourishment.',
    examples: 'Papaya, Sweet Pineapples, Jackfruit, Watermelon',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_TROPICAL_PHOTO',
  },
  {
    id: 'citrus-fruits',
    name: 'Citrus Fruits',
    type: 'fruit',
    shortDesc: 'Tangy, vitamin-packed citrus selections sourced for refreshing daily juices and direct consumption.',
    examples: 'Sweet Oranges (Mosambi), Kinnow, Lemons, Grapefruit',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_CITRUS_PHOTO',
  },
  {
    id: 'bananas',
    name: 'Bananas & Local Varieties',
    type: 'fruit',
    shortDesc: 'Classic everyday energy staples along with beloved regional South Indian plantain varieties.',
    examples: 'Poovan, Robusta, Red Banana (Sevvazhai), Nendran, Rasthali',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_BANANA_PHOTO',
    highlight: 'South Indian Specialties'
  },
  {
    id: 'apples',
    name: 'Apples & Pears',
    type: 'fruit',
    shortDesc: 'Crisp, wholesome orchard fruits selected for firm crunch, deep color, and dependable sweetness.',
    examples: 'Royal Gala, Washington/Shimla Apples, Green Apples, Green Pears',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_APPLE_PHOTO',
  },
  {
    id: 'melons',
    name: 'Melons & Hydrating Fruits',
    type: 'fruit',
    shortDesc: 'Naturally hydrating, sweet melons ideal for healthy snacking and fresh juice requirements.',
    examples: 'Striped Watermelon, Musk Melon (Cantaloupe), Sun Melons',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_MELON_PHOTO',
  },
  {
    id: 'other-fruits',
    name: 'Other Fresh Fruits',
    type: 'fruit',
    shortDesc: 'Assorted seasonal and table fruits to complete fruit platters, family gifts, and dessert recipes.',
    examples: 'Grapes (Black & Green Seedless), Dates, Sapota (Chiku), Plums',
    imagePlaceholder: 'REPLACE_WITH_MDS_FRUIT_OTHER_PHOTO',
  }
];
