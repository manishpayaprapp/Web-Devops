import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, type BrainContent, type BrainFolder, type ContentResponse, type FoldersResponse } from "../api";
import { CreateContentModal } from "../components/CreateModel";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { Sidebar } from "../components/UI/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

type Filter = "all" | "youtube" | "twitter" | "notion" | "roadmap";

export function Dashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState<BrainContent[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [folders, setFolders] = useState<BrainFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleLoadError = useCallback((requestError: unknown) => {
    const message = requestError instanceof Error ? requestError.message : "Could not load your content.";
    setError(message);
    const lowerMessage = message.toLowerCase();
    if (
      lowerMessage.includes("logged in") ||
      lowerMessage.includes("session") ||
      lowerMessage.includes("token") ||
      lowerMessage.includes("unauthorized") ||
      lowerMessage.includes("401")
    ) {
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  const refresh = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const result = await apiRequest<ContentResponse>("/api/v1/content");
      setContents(result.content);
    } catch (requestError) {
      handleLoadError(requestError);
    } finally {
      setLoading(false);
    }
  }, [handleLoadError]);

  const fetchFolders = useCallback(async () => {
    try {
      const result = await apiRequest<FoldersResponse>("/api/v1/folders");
      setFolders(result.folders);
    } catch {
      // Folders are optional; silently ignore errors
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null" || !token.trim()) {
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
      return;
    }

    let active = true;
    apiRequest<ContentResponse>("/api/v1/content")
      .then((result) => {
        if (active) setContents(result.content);
      })
      .catch((requestError: unknown) => {
        if (active) handleLoadError(requestError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    fetchFolders();

    return () => { active = false; };
  }, [handleLoadError, navigate, fetchFolders]);

  const visibleContents = useMemo(() => {
    let filtered = contents;
    if (selectedFolder) {
      filtered = filtered.filter((content) => content.folderId === selectedFolder);
    } else if (filter !== "all") {
      filtered = filtered.filter((content) => content.type === filter);
    }
    return filtered;
  }, [contents, filter, selectedFolder]);

  async function shareBrain() {
    setError("");
    setNotice("");
    try {
      const result = await apiRequest<{ hash: string }>("/api/v1/brain/share", {
        method: "POST",
        body: JSON.stringify({ share: true }),
      });
      const shareUrl = `${window.location.origin}/share/${result.hash}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        setNotice("Share link copied to your clipboard.");
      } catch {
        setNotice(shareUrl);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not create a share link.");
    }
  }

  async function deleteContent(contentId: string) {
    setError("");
    try {
      await apiRequest("/api/v1/content", {
        method: "DELETE",
        body: JSON.stringify({ contentId }),
      });
      setContents((current) => current.filter((item) => item._id !== contentId));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not delete this item.");
    }
  }

  async function createFolder() {
    const name = prompt("Folder name:");
    if (!name || !name.trim()) return;
    setError("");
    try {
      await apiRequest("/api/v1/folders", {
        method: "POST",
        body: JSON.stringify({ name: name.trim() }),
      });
      await fetchFolders();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not create folder.");
    }
  }

  async function deleteFolder(folderId: string) {
    if (!window.confirm("Are you sure you want to delete this folder? Saved items will be kept in your brain.")) {
      return;
    }
    setError("");
    try {
      await apiRequest(`/api/v1/folders/${folderId}`, {
        method: "DELETE",
      });
      if (selectedFolder === folderId) {
        setSelectedFolder(null);
      }
      await fetchFolders();
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not delete folder.");
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  }

  function getHeadingText(): string {
    if (selectedFolder) {
      const folder = folders.find((f) => f._id === selectedFolder);
      return folder ? folder.name : "Folder";
    }
    switch (filter) {
      case "youtube": return "YouTube videos";
      case "twitter": return "Saved posts";
      case "notion": return "Notion pages";
      case "roadmap": return "Roadmap.sh links";
      default: return "Your collection";
    }
  }

  const folderNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const folder of folders) {
      map[folder._id] = folder.name;
    }
    return map;
  }, [folders]);

  return (
    <div className="app-shell">
      <Sidebar
        selected={filter}
        onSelect={setFilter}
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onCreateFolder={createFolder}
        onDeleteFolder={(id) => void deleteFolder(id)}
      />
      <main className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">YOUR SECOND BRAIN</p>
            <h1>{getHeadingText()}</h1>
            <p className="muted">A calm place to keep the things worth coming back to.</p>
          </div>
          <div className="header-actions">
            <Button variant="quiet" text="Sign out" onClick={signOut} />
            <Button variant="secondary" text="Share brain" startIcon={<ShareIcon size="sm" />} onClick={shareBrain} />
            <Button text="Add content" startIcon={<PlusIcon size="sm" />} onClick={() => setModalOpen(true)} />
          </div>
        </header>

        {notice && <p className="notice" role="status">
          {notice.startsWith("http") ? <a href={notice} target="_blank" rel="noreferrer">{notice}</a> : notice}
        </p>}
        {error && <p className="form-error dashboard-message" role="alert">{error}</p>}

        <section className="collection-section" aria-label="Saved content">
          <div className="collection-meta">
            <span>{visibleContents.length} {visibleContents.length === 1 ? "item" : "items"}</span>
            <button className="text-button" onClick={() => void refresh()} disabled={loading}>Refresh</button>
          </div>
          {loading ? (
            <div className="empty-state"><span className="spinner" />Loading your collection...</div>
          ) : visibleContents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">B</div>
              <h2>{contents.length === 0 ? "Start collecting ideas" : "Nothing in this collection yet"}</h2>
              <p>{contents.length === 0 ? "Add a video or post and it will be waiting here whenever you need it." : "Try another filter or save something new."}</p>
              {contents.length === 0 && <Button text="Add your first item" startIcon={<PlusIcon size="sm" />} onClick={() => setModalOpen(true)} />}
            </div>
          ) : (
            <div className="content-grid">
              {visibleContents.map((content) => (
                <Card
                  key={content._id}
                  {...content}
                  folderName={content.folderId ? folderNameMap[content.folderId] : undefined}
                  onDelete={() => void deleteContent(content._id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={() => {
          setModalOpen(false);
          void refresh();
          void fetchFolders();
        }}
        folders={folders}
      />
    </div>
  );
}
