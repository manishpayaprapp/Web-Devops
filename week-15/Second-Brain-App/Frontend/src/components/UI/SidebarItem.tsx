import type { ReactNode } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, active = false, onClick }: SidebarItemProps) {
  return (
    <button className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick} aria-current={active ? "page" : undefined}>
      <span className="sidebar-icon">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
