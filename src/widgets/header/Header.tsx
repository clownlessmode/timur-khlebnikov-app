import { cn } from "@/shared/lib/utils";
import { Home, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

// Интерфейс для пропсов навигационного элемента
interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  className?: string;
}

// Переиспользуемый компонент навигационного элемента
const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  label,
  isActive = true,
  className,
}) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 font-medium text-lg group",
      isActive
        ? "hover:text-primary"
        : "pointer-events-none text-muted-foreground",
      className
    )}
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
      <Icon className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
    </div>
    <span>{label}</span>
  </Link>
);

// Основной компонент хедера с возможностью кастомизации
interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 w-full bg-background border-b",
        className
      )}
    >
      <div className="container px-4 h-14 flex items-center justify-between">
        <NavItem href="/" icon={Home} label="Главная" />

        {/* Место для дополнительного контента */}
        {children}
      </div>
    </header>
  );
};

// Экспорт компонентов
export { Header, NavItem };
export default Header;
