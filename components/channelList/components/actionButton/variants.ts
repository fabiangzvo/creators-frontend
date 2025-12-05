import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  variants: {
    variant: {
      danger:
        "text-danger hover:text-danger-600 data-[hover=true]:text-danger-600",
      default: "data-[hover=true]:text-primary-600",
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
