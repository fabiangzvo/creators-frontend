import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "w-8 h-8 flex justify-center items-center ",
  variants: {
    variant: {
      youtube: "bg-red-600",
      instagram: "bg-yellow-500",
      facebook: "bg-blue-600",
      tiktok: "bg-cyan-600",
    },
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
