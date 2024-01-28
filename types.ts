import Stripe from 'stripe'

export interface PhotosMainProps {
  photo_main_id: number;
  positon_left: number;
  positon_top: number;
  type: 'plane1' | 'plane2' | 'plane3';
  width: number;
  photos: { href: string };
}

export interface ConcertCardProps {
  timestamptz: {
    date: string;
    month: string;
    year: string;
    time: string;
  };
  title: string;
  location: string;
  link: string;
  place: string;
}

export interface MajorEvent {
  MinorEvent: []
}

export interface MinorEvent {
  event: string;
  index: number;
  photos: Photos[];
  photos_event: PhotosEvent[];
  event_id: string
  created_at: string
  title: string;
  description: string;
  date: string;
  limit?: number | undefined
  startFromIndex?: number | undefined
  id: number
}

export interface PhotosEvent {
  event_id: string
  photo_id: number
  photo_number: '1' | '2' | '3' | '4' | '5' | '6'
}

export interface Photos {
  photo_id: string
  created_at: string;
  href: string;
}

export interface EventPhotos {
  id: string;
  event: string;
  photo: string;
}

export interface Concerts {
  id: string;
  title: string;
  time: string;
  location: string;
  map_link: string;
  link: string;
  is_published: boolean;
  link_to_img: string;
  place: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
