import { ProvidersComponentMap } from "@/types/providers";
import FacebookForm from "@/components/facebookForm";
import InstagramForm from "@/components/instagramForm";
import YoutubeForm from "@/components/youtubeForm";
import TiktokForm from "@/components/tiktokForm";

export const PROVIDERS_FORM: ProvidersComponentMap = {
  facebook: FacebookForm,
  instagram: InstagramForm,
  youtube: YoutubeForm,
  tiktok: TiktokForm,
};
