import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../../icons/TwitteIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Link } from "react-router-dom";

type SidebarFilter = "all" | "youtube" | "twitter";

interface SidebarProps {
  selected: SidebarFilter;
  onSelect: (filter: SidebarFilter) => void;
}

export function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <Link className="brand" to="/dashboard" aria-label="Brainly home">
        <span className="brand-mark brand-mark-small">B</span>
        <span>brainly<span className="brand-period">.</span></span>
      </Link>
      <p className="sidebar-label">LIBRARY</p>
      <nav className="sidebar-nav" aria-label="Content filters">
        <SidebarItem text="Everything" active={selected === "all"} onClick={() => onSelect("all")} icon={<span className="nav-symbol">All</span>} />
        <SidebarItem text="YouTube" active={selected === "youtube"} onClick={() => onSelect("youtube")} icon={<YoutubeIcon />} />
        <SidebarItem text="X / Twitter" active={selected === "twitter"} onClick={() => onSelect("twitter")} icon={<TwitterIcon />} />
      </nav>
      <div className="sidebar-footer">
        <span className="status-dot" />
        Your ideas, all in one place
      </div>
    </aside>
  );
}
