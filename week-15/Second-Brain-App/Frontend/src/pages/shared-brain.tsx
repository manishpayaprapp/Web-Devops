import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest, type SharedBrainResponse } from "../api";
import { Card } from "../components/UI/Card";

export function SharedBrain() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [brain, setBrain] = useState<SharedBrainResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shareLink) return;
    let active = true;
    void apiRequest<SharedBrainResponse>(`/api/v1/brain/${encodeURIComponent(shareLink)}`, {}, false)
      .then((result) => {
        if (active) setBrain(result);
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : "This shared collection is unavailable.");
      });
    return () => { active = false; };
  }, [shareLink]);

  return (
    <main className="shared-page">
      <header className="shared-header">
        <Link className="brand" to="/"><span className="brand-mark brand-mark-small">B</span><span>brainly<span className="brand-period">.</span></span></Link>
        <span className="shared-badge">SHARED COLLECTION</span>
      </header>
      {error ? (
        <section className="empty-state shared-empty">
          <h1>Collection unavailable</h1>
          <p>{error}</p>
          <Link to="/signup" className="text-link">Create your own brain</Link>
        </section>
      ) : !brain ? (
        <div className="empty-state"><span className="spinner" />Loading shared collection...</div>
      ) : (
        <section className="shared-content">
          <p className="eyebrow">A BRAIN SHARED WITH YOU</p>
          <h1>{brain.username}&apos;s collection</h1>
          <p className="muted">{brain.content.length} saved {brain.content.length === 1 ? "item" : "items"}</p>
          {brain.content.length > 0
            ? <div className="content-grid">{brain.content.map((item) => <Card key={item._id} {...item} />)}</div>
            : <div className="empty-state"><p>This collection is empty for now.</p></div>}
        </section>
      )}
    </main>
  );
}
