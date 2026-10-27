import PortalPage from "../[locale]/page";

export default function FrPage() {
  return <PortalPage params={Promise.resolve({ locale: "fr" })} />;
}
