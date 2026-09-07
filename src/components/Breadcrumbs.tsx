"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbItem } from "@/lib/schema";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center gap-1.5 text-xs text-neutral-400 mb-6 flex-wrap ${className}`}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
        title="Jeseem Tours & Travels Homepage"
      >
        <Home className="w-3.5 h-3.5 text-[#ff007f]" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.url}>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            {isLast ? (
              <span
                aria-current="page"
                className="text-white font-medium truncate max-w-[200px] sm:max-w-none"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-white transition-colors duration-200 truncate max-w-[150px] sm:max-w-none"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
