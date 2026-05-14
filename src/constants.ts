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
  description?: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  genre: string;
}

export interface Video {
  id: number;
  artist: string;
  title: string;
  image: string;
  url: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "STATE OF GRACE", price: 5000, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", category: "Music", description: "The debut studio album from MARY. A journey through the frequency of tomorrow." },
  { id: 2, name: "WICKED", price: 5000, image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop", category: "Music", description: "High energy, minimal constraints. Experience the raw sound of WICKED." },
  { id: 3, name: "ENERGY", price: 5000, image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 4, name: "NO LOVE", price: 5000, image: "https://images.unsplash.com/photo-1621360841012-3f9e67365e85?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 5, name: "VOICES", price: 5000, image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop", category: "Music" },
  { id: 6, name: "DIGITAL FRIEND", price: 5000, image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop", category: "Music" },
  
  { id: 10, name: "DENIM BALACLAVA", price: 15000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 11, name: "MONOGRAM POLO", price: 12000, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 12, name: "AFFECTED SHIRT", price: 10000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 13, name: "DORUZ VARSITY", price: 85000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop", category: "Merch" },
  { id: 14, name: "CLASSIC TEE BLACK", price: 25000, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop", category: "Merch" },
];

export const ARTISTS: Artist[] = [
  {
    id: 'mary',
    name: 'MARY',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'The new wave of alternative hip-hop. Experience the raw energy of the debut album "State of Grace". Mary is redefining the frequency of sound with a blend of ethereal vocals and heavy-hitting bass.',
    genre: 'Alternative Hip-Hop'
  },
  {
    id: 'riderizzy',
    name: 'RIDERIZZY',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    bio: 'Street poetry encapsulated in sound. Riderizzy brings the grit and the soul of the urban landscape to the global stage.',
    genre: 'Hip-Hop / Rap'
  },
  {
    id: 'bright',
    name: 'BRIGHT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Luminous melodies and ethereal vibes. Bright is the voice of the visionaries.',
    genre: 'Alternative / Indie'
  },
  {
    id: 'tega',
    name: 'TEGA',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
    bio: 'Soulful resonance from the heart. Tega blends traditional afrobeats with modern soul textures.',
    genre: 'Afro-Soul'
  },
  {
    id: 'echo',
    name: 'ECHO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Dark textures and ethereal vocals. Echo is the voice of the night.',
    genre: 'R&B / Soul'
  }
];

export const VIDEOS: Video[] = [
  { id: 1, artist: 'MARY', title: 'STATE OF GRACE', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: 2, artist: 'RIDERIZZY', title: 'LONDON TOUR', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { id: 3, artist: 'BRIGHT', title: 'LUMINOUS', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 4, artist: 'TEGA', title: 'HEARTBEAT', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
];


