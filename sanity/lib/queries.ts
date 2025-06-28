import { defineQuery } from "next-sanity";

export const futureEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()] {
    _id,
    title,
    date,
    "location": location->{
      place,
      address,
      city
    }
  }`);

export const pastEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date < now()] {
    _id,
    title,
    date,
    "location": location->{
      place,
      address,
      city
    }
  }`);

export const futureEventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()])`,
);

export const pastEventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date < now()])`,
);

export const galleryPhotosQuery = defineQuery(`
  *[_type == "media" && references(*[_type == "tag" && name == "gallery"]._id)] {
    _id,
    "imageUrl": mediaFile.asset->url
  }
`);

export const majorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "major"]._id)] | order(date asc) {
    _id,
    title,
    date,
     "media": media[]->{
       imageFile
     }
  }
`);

export const minorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "minor"]._id)] | order(date asc) {
    _id,
    title,
    date,
    description,
    "media": media[]->{
      _id,
      imageFile
    }
  }
`);
