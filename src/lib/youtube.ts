export function getYouTubeId(url: string) {
  const splitUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return splitUrl[2] !== undefined
    ? splitUrl[2].split(/[^0-9a-z_-]/i)[0]
    : splitUrl[0];
}
