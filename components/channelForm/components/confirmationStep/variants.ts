import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  variants: {
    variant: {
      youtube: "text-red-600",
      instagram: "text-yellow-500",
      facebook: "text-blue-600",
      tiktok: "text-cyan-600",
    },
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;
