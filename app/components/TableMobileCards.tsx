"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function applyMobileTableLabels() {
  const tables = document.querySelectorAll("table");

  tables.forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (header) => header.textContent?.trim() ?? "",
    );

    if (headers.length === 0) {
      return;
    }

    table.setAttribute("data-mobile-cards", "true");

    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));

      cells.forEach((cell, index) => {
        const label = headers[index] ?? "";

        if (label) {
          cell.setAttribute("data-label", label);
        }
      });
    });
  });
}

export default function TableMobileCards() {
  const pathname = usePathname();

  useEffect(() => {
    applyMobileTableLabels();

    const observer = new MutationObserver(() => {
      applyMobileTableLabels();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}