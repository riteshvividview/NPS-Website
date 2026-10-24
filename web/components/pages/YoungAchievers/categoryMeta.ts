import type { AchieverCategory } from "@/content/pages/youngAchievers";

export const categoryMeta: Record<AchieverCategory, { icon: string; tone: string; label: string }> = {
  literary: { icon: "fa-solid fa-feather-pointed", tone: "blue", label: "Literary" },
  sports: { icon: "fa-solid fa-medal", tone: "peach", label: "Sports" },
  music: { icon: "fa-solid fa-music", tone: "gold", label: "Music" },
  academics: { icon: "fa-solid fa-graduation-cap", tone: "green", label: "Academics" },
};
