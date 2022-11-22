import SVGs from "../images/SVGs";
import BannerElement from "./BannerElement";

export default function Home(props) {
  return <BannerElement path={SVGs.bird} link="/" color="red-500" />;
}
