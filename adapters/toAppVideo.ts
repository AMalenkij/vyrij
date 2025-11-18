type RawVideoItem = {
  video: {
    id: string;
    alt: string;
    url: string | null;
  };
};

export type AppVideo = {
  video: {
    id: string;
    alt: string;
    url: string;
  };
};
export default function toAppVideo(sanityVideos: RawVideoItem[]): AppVideo[] {
  return sanityVideos.reduce<AppVideo[]>((acc, item) => {
    const video = item.video;

    if (video?.url && video.id && video.alt) {
      acc.push({
        video: {
          id: video.id,
          alt: video.alt,
          url: video.url,
        },
      });
    }
    return acc;
  }, []);
}
