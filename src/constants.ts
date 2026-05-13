/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'Music' | 'Merch' | 'Accessories';
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  genre: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "STATE OF GRACE", price: 5000, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", category: "Music" },
  { id: 2, name: "WICKED", price: 5000, image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 3, name: "ENERGY", price: 5000, image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 4, name: "NO LOVE", price: 5000, image: "https://images.unsplash.com/photo-1621360841012-3f9e67365e85?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 5, name: "VOICES", price: 5000, image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 6, name: "DIGITAL FRIEND", price: 5000, image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop", category: "Music" },
  
  { id: 10, name: "DENIM BALACLAVA", price: 15000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 11, name: "MONOGRAM POLO", price: 12000, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 12, name: "AFFECTED SHIRT", price: 10000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", category: "Merch" },
];

export const ARTISTS: Artist[] = [
  {
    id: 'flo',
    name: 'FLO',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'The definition of rhythm and soul.',
    genre: 'R&B / Pop'
  },
  {
    id: 'kenzo',
    name: 'KENZO',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    bio: 'Street poetry encapsulated in sound.',
    genre: 'Hip-Hop'
  },
  {
    id: 'bright',
    name: 'BRIGHT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Luminous melodies and ethereal vibes.',
    genre: 'Alternative'
  },
  {
    id: 'max',
    name: 'MAX',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    bio: 'Maximum energy, minimal constraints.',
    genre: 'Rap'
  },
  {
    id: 'tega',
    name: 'TEGA',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
    bio: 'Soulful resonance from the heart.',
    genre: 'Afro-Soul'
  },
  {
    id: 'echo',
    name: 'ECHO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Dark textures and ethereal vocals. Echo is the voice of the night.',
    genre: 'R&B / Soul'
  },
  {
    id: 'mary',
    name: 'MARY',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000&auto=format&fit=crop',
    bio: 'The new wave of alternative hip-hop. Experience the raw energy of the debut album "State of Grace".',
    genre: 'Alternative Hip-Hop'
  },
  {
    id: 'kiel',
    name: 'KIEL',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=800&auto=format&fit=crop',
    bio: 'Synthesized emotions in a digital world.',
    genre: 'Electronic'
  },
  {
    id: 'eni',
    name: 'ENI',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    bio: 'Vibrant energy and pop-infused rhythms.',
    genre: 'Pop / Afrobeats'
  }
];
