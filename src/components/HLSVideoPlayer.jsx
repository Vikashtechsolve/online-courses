import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

function isHLS(url) {
  return url && (url.includes(".m3u8") || url.endsWith(".m3u8"));
}

function getProxiedHlsUrl(r2Url) {
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const base = apiBase.replace(/\/$/, "");
  return `${base}/proxy/video?url=${encodeURIComponent(r2Url)}`;
}

export default function HLSVideoPlayer({ src, className = "", ...props }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setError(null);

    if (isHLS(src)) {
      const hlsSrc = getProxiedHlsUrl(src);
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          xhrSetup: (xhr) => {
            xhr.withCredentials = false;
          },
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => setError(null));
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              setError("Cannot load video. Please try again later.");
            } else {
              setError("Video failed to load. Please try again.");
            }
            hls.destroy();
          }
        });

        hls.loadSource(hlsSrc);
        hls.attachMedia(video);
        return () => {
          hls.destroy();
        };
      }
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsSrc;
      }
    } else {
      video.src = src;
    }
  }, [src]);

  if (error) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-slate-800 text-slate-300 p-4 rounded-xl`}>
        <p className="text-sm text-center">{error}</p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      controls
      className={className}
      playsInline
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  );
}
