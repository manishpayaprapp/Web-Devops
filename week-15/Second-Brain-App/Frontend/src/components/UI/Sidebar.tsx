import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../../icons/TwitteIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { NotionIcon } from "../../icons/NotionIcon";
import { RoadmapIcon } from "../../icons/RoadmapIcon";
import { FolderIcon } from "../../icons/FolderIcon";
import { SunIcon, MoonIcon } from "../../icons/ThemeIcon";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import type { BrainFolder } from "../../api";

type SidebarFilter = "all" | "youtube" | "twitter" | "notion" | "roadmap";

interface SidebarProps {
  selected: SidebarFilter;
  onSelect: (filter: SidebarFilter) => void;
  folders: BrainFolder[];
  selectedFolder: string | null;
  onSelectFolder: (id: string | null) => void;
  onCreateFolder: () => void;
  onDeleteFolder: (id: string) => void;
}

export function Sidebar({ selected, onSelect, folders, selectedFolder, onSelectFolder, onCreateFolder, onDeleteFolder }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  function handleTypeSelect(filter: SidebarFilter) {
    onSelectFolder(null);
    onSelect(filter);
  }

  return (
    <aside className="sidebar">
      <Link className="brand" to="/dashboard" aria-label="Brainly home">
        <span className="brand-mark brand-mark-small">B</span>
        <span>brainly<span className="brand-period">.</span></span>
      </Link>
      <p className="sidebar-label">LIBRARY</p>
      <nav className="sidebar-nav" aria-label="Content filters">
        <SidebarItem text="Everything" active={selected === "all" && !selectedFolder} onClick={() => handleTypeSelect("all")} icon={<span className="nav-symbol">All</span>} />
        <SidebarItem text="YouTube" active={selected === "youtube" && !selectedFolder} onClick={() => handleTypeSelect("youtube")} icon={<YoutubeIcon />} />
        <SidebarItem text="X / Twitter" active={selected === "twitter" && !selectedFolder} onClick={() => handleTypeSelect("twitter")} icon={<TwitterIcon />} />
        <SidebarItem text="Notion" active={selected === "notion" && !selectedFolder} onClick={() => handleTypeSelect("notion")} icon={<NotionIcon />} />
        <SidebarItem text="Roadmap.sh" active={selected === "roadmap" && !selectedFolder} onClick={() => handleTypeSelect("roadmap")} icon={<RoadmapIcon />} />
      </nav>
      {(folders.length > 0 || true) && (
        <>
          <p className="sidebar-label">FOLDERS</p>
          <nav className="sidebar-nav" aria-label="Folders">
            {folders.map((folder) => (
              <div key={folder._id} className="folder-item-row">
                <SidebarItem
                  text={folder.name}
                  active={selectedFolder === folder._id}
                  onClick={() => onSelectFolder(folder._id)}
                  icon={<FolderIcon />}
                />
                <button
                  className="folder-delete-btn"
                  onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder._id); }}
                  aria-label={`Delete folder ${folder.name}`}
                  title="Delete folder"
                >
                  ×
                </button>
              </div>
            ))}
            <button className="sidebar-item new-folder-btn" onClick={onCreateFolder}>
              <span className="sidebar-icon">+</span>
              <span>New folder</span>
            </button>
          </nav>
        </>
      )}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
        <span className="status-dot" />
        Your ideas, all in one place
      </div>
    </aside>
  );
}
