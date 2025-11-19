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
      const videoUrl = video.url.replace(
        "youtube.com",
        "youtube-nocookie.com",
      );
      acc.push({
        video: {
          id: video.id,
          alt: video.alt,
          url: videoUrl,
        },
      });
    }
    return acc;
  }, []);
}
