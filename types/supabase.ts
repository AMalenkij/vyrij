export interface PhotoMainData {
  photo_main_id: number;
  type: 'plane1' | 'plane2' | 'plane3';
  positon_top: number;
  positon_left: number;
  width: number;
  photos: Photos[];
}

export interface Photos {
  href: string;
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

export interface MajorEvents {
  minor_event: {
    title: string;
    date: string;
    photos: {
      href: string;
    }[];
  } | null;
}

export interface MinorEvents {
  description: string;
  date: string;
  photos: {
    href: string;
  }[];
  photos_event: {
    photo_number: '1' | '2' | '3' | '4' | '5' | '6';
  }[];
}
