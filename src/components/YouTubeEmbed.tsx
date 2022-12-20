import * as React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { ExtractProps } from '@/types/helper';

type YouTubeEmbedProps = { className?: string } & ExtractProps<
  typeof LiteYouTubeEmbed
>;

export default function YouTubeEmbed({
  className,
  ...rest
}: YouTubeEmbedProps) {
  return (
    <figure className={className}>
      <LiteYouTubeEmbed
        {...rest}
        poster='hqdefault'
        noCookie={true}
        announce='Watch'
      />
    </figure>
  );
}
