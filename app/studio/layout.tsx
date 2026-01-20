export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // Bez <html> i <body> ovde
  return <>{children}</>;
}
