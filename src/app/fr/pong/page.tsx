import PongPage from "../../[locale]/pong/page";

export default function FrPongPage() {
  return <PongPage params={Promise.resolve({ locale: "fr" })} />;
}
