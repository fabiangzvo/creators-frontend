import { tv, type VariantProps } from "tailwind-variants";

export const cardVariants = tv({
  base: "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  variants: {
    variant: {
      tiktok: "from-rose-500/20 to-cyan-300/20",
      youtube: "from-red-600/30 to-transparent",
      instagram:
        "bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-600/20 text-white",
      facebook: "from-blue-600/30 to-blue-10/1",
    },
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;

export const iconContainerVariants = tv({
  base: "relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-active:scale-95",
  variants: {
    variant: {
      tiktok: "bg-gradient-to-br from-cyan-500 to-rose-400",
      youtube: "bg-red-600",
      instagram: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
      facebook: "bg-blue-600",
    },
  },
});

export type IconContainerVariants = VariantProps<typeof iconContainerVariants>;

export const iconVariants = tv({
  base: "w-full h-full",
  variants: {
    variant: {
      tiktok:
        "[&_path]:group-hover:fill-cyan-400 dark:[&_path]:group-hover:fill-cyan-400",
      youtube:
        "fill-primary-500 [&_path]:group-hover:fill-red-600 dark:[&_path]:group-hover:fill-red-500",
      facebook:
        "fill-primary-500 [&_path]:group-hover:fill-blue-700 dark:[&_path]:group-hover:fill-blue-600",
      instagram: "fill-primary-500 [&_path]:group-hover:fill-pink-500",
    },
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;
