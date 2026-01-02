export interface BannerProps {
  title: string;
  description: string;
  link?: string;
  handleSearch: (value: string) => Promise<void> | void;
}
