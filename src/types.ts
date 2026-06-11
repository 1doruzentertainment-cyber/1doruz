export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  genres: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    soundcloud?: string;
  };
  bookingEmail: string;
  featured: boolean;
}

export interface Release {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseDate: string;
  coverArtUrl: string;
  type: 'Single' | 'EP' | 'Album';
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
    beatport?: string;
    bandcamp?: string;
    tidal?: string;
  };
  featured: boolean;
}

export interface LabelEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  ticketLink: string;
  imageUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface DemoSubmission {
  id: string;
  artistName: string;
  email: string;
  demoUrl: string;
  bio: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
}
