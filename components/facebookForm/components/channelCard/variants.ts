import { tv, type VariantProps } from "tailwind-variants";

export const avatarVariants = tv({
  variants: {
    variant: {
      youtube: "ring-red-600 bg-red-600",
      instagram: "ring-yellow-500 bg-yellow-500",
      facebook: "ring-blue-600 bg-blue-600",
      tiktok: "ring-cyan-600 bg-cyan-600",
    },
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;

export const buttonVariants = tv({
  variants: {
    variant: {
      youtube: "bg-red-600",
      instagram: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
      facebook: "bg-blue-600",
      tiktok: "bg-cyan-500",
    },
    label: {
      youtube: "Ver Canal",
      instagram: "Ver Perfil",
      facebook: "Ver Página",
      tiktok: "Ver Perfil",
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
