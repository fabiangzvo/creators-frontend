import { tv, type VariantProps } from "tailwind-variants";

export const statusVariants = tv({
  base: "text-sm px-2 rounded-full w-fit",
  variants: {
    variant: {
      disabled: "text-warning-700 bg-warning-100",
      active: "text-primary-600 bg-primary-100",
      pending: "text-purple-600 bg-purple-100",
    },
  },
});

export type StatusVariants = VariantProps<typeof statusVariants>;
