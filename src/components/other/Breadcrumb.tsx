import Link from "next/link";
import { ChevronRight } from "lucide-react"; // or any icon library you prefer

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {/* If not the last crumb, render a Link. Otherwise, render text */}
              {!isLast ? (
                <Link
                  href={item.href ?? "#"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>
              )}

              {/* Separator icon (chevron) except on the last item */}
              {!isLast && (
                <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
