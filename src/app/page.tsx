import PortalPage from "./[locale]/page";

export default function RootPage() {
  return <PortalPage params={Promise.resolve({ locale: "en" })} />;
}
