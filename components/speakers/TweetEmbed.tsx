"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TweetEmbed({ tweetUrl }: { tweetUrl: string }) {
  useEffect(() => {
    window.twttr?.widgets.load();
  }, [tweetUrl]);

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => window.twttr?.widgets.load()}
      />
      <div className="flex justify-center [&_.twitter-tweet]:mx-auto">
        <blockquote className="twitter-tweet" data-theme="dark" data-media-max-width="560">
          <a href={tweetUrl} />
        </blockquote>
      </div>
    </>
  );
}
