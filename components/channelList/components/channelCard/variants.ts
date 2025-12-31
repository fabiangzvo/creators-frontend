import { tv, type VariantProps } from "tailwind-variants";

export const statusVariants = tv({
  base: "text-sm px-2 rounded-full w-fit",
  variants: {
    variant: {
      disabled: "text-warning-700 bg-warning-100",
      active: "text-success-600 bg-success-100",
      pending: "text-purple-600 bg-purple-100",
    },
  },
});

export type StatusVariants = VariantProps<typeof statusVariants>;

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
