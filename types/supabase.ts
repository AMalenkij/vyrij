export interface PhotoMainData {
  photo_main_id: number;
  type: 'plane1' | 'plane2' | 'plane3';
  positon_top: number;
  positon_left: number;
  width: number;
  photos: Media[];
}

export interface Concerts {
  id: number;
  is_published: boolean;
  link: string;
  link_to_img: string;
  location: string;
  map_link: string;
  place: string;
  time: string;
  title: string;
}

export interface Media {
  event_id: number
  href: string
  display_order: string
}
export interface MajorEvents {
  event_id: number
  date: string
  title: string
}
export interface Events {
  date: string
  description: string
  event_id: number
}
