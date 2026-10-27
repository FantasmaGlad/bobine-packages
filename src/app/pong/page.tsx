import PongPage from "../[locale]/pong/page";

export default function RootPongPage() {
  return <PongPage params={Promise.resolve({ locale: "en" })} />;
}
