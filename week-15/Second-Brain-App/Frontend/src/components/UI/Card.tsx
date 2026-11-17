import { useEffect, useRef } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { NotionIcon } from "../../icons/NotionIcon";
import { RoadmapIcon } from "../../icons/RoadmapIcon";
import type { ContentType } from "../../api";

interface CardProps {
  title: string;
  link: string;
  type: ContentType;
  folderName?: string;
  onDelete?: () => void;
}

interface TwitterWidgets {
  widgets: { load: (element?: HTMLElement) => void };
}

declare global {
  interface Window {
    twttr?: TwitterWidgets;
  }
}

let twitterWidgetsPromise: Promise<TwitterWidgets> | null = null;

function loadTwitterWidgets(): Promise<TwitterWidgets> {
  if (window.twttr) return Promise.resolve(window.twttr);
  if (twitterWidgetsPromise) return twitterWidgetsPromise;

  twitterWidgetsPromise = new Promise<TwitterWidgets>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>("#twitter-widgets");
    if (!script) {
      script = document.createElement("script");
      script.id = "twitter-widgets";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => {
      if (window.twttr) resolve(window.twttr);
      else reject(new Error("Twitter widgets did not initialize."));
    }, { once: true });
    script.addEventListener("error", () => reject(new Error("Twitter widgets could not be loaded.")), { once: true });
  }).catch((error: unknown) => {
    twitterWidgetsPromise = null;
    throw error;
  });
  return twitterWidgetsPromise;
}

function getTweetUrl(link: string): string | null {
  try {
    const url = new URL(link);
    const hostname = url.hostname.toLowerCase();
    const statusMatch = url.pathname.match(/^\/([^/]+)\/status\/(\d+)/);
    if (!["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(hostname) || !statusMatch) return null;
    return `https://twitter.com/${statusMatch[1]}/status/${statusMatch[2]}`;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(link: string): string | null {
  try {
    const url = new URL(link);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const videoId = hostname === "youtu.be"
      ? url.pathname.split("/")[1]
      : ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(hostname)
        ? url.searchParams.get("v") ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1]
        : null;
    return videoId && /^[\w-]{11}$/.test(videoId) ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

const typeMarkText: Record<ContentType, string> = {
  youtube: "YT",
  twitter: "X",
  notion: "N",
  roadmap: "RM",
};

export function Card({ title, link, type, folderName, onDelete }: CardProps) {
  const tweetContainer = useRef<HTMLDivElement>(null);
  const tweetUrl = type === "twitter" ? getTweetUrl(link) : null;
  const youtubeEmbedUrl = type === "youtube" ? getYouTubeEmbedUrl(link) : null;

  useEffect(() => {
    const container = tweetContainer.current;
    if (!container || !tweetUrl) return;
    let mounted = true;
    void loadTwitterWidgets()
      .then((widgets) => {
        if (mounted) widgets.widgets.load(container);
      })
      .catch((error: unknown) => {
        console.error("Twitter preview could not be loaded.", error);
      });
    return () => { mounted = false; };
  }, [tweetUrl]);

  return (
    <article className="content-card">
      <header className="content-card-header">
        <div className="content-card-heading">
          <span className={`content-type-mark ${type}`}>{typeMarkText[type]}</span>
          <h2 title={title}>{title}</h2>
          {folderName && <span className="folder-badge">{folderName}</span>}
        </div>
        <div className="card-actions">
          <a className="icon-button" href={link} target="_blank" rel="noreferrer" aria-label="Open saved link">
            <ShareIcon size="sm" />
          </a>
          {onDelete && (
            <button className="icon-button delete-action" onClick={onDelete} aria-label={`Delete ${title}`}>
              <TrashIcon />
            </button>
          )}
        </div>
      </header>
      <div className="content-preview">
        {type === "youtube" && youtubeEmbedUrl && (
          <iframe
            className="youtube-frame"
            src={youtubeEmbedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {type === "youtube" && !youtubeEmbedUrl && <p className="preview-unavailable">Video preview unavailable. <a href={link} target="_blank" rel="noreferrer">Open video</a></p>}
        {type === "twitter" && (
          <div ref={tweetContainer} className="tweet-preview">
            {tweetUrl
              ? <blockquote className="twitter-tweet"><a href={tweetUrl}>View post on X</a></blockquote>
              : <p className="preview-unavailable">Post preview unavailable. <a href={link} target="_blank" rel="noreferrer">Open post</a></p>}
          </div>
        )}
        {type === "notion" && (
          <div className="notion-preview link-preview">
            <div className="link-preview-icon">
              <NotionIcon />
            </div>
            <div className="link-preview-body">
              <p className="link-preview-label">Notion Document</p>
              <a className="link-preview-action" href={link} target="_blank" rel="noreferrer">Open in Notion &rarr;</a>
            </div>
          </div>
        )}
        {type === "roadmap" && (
          <div className="roadmap-preview link-preview">
            <div className="link-preview-icon">
              <RoadmapIcon />
            </div>
            <div className="link-preview-body">
              <p className="link-preview-label">Developer Roadmap</p>
              <a className="link-preview-action" href={link} target="_blank" rel="noreferrer">View on roadmap.sh &rarr;</a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
