import SVGs from "../images/SVGs";
import BannerElement from "./BannerElement";

export default function HomeButton(props) {
  return (
    <BannerElement class="bird" path={SVGs.bird} link="/" color="red-500" />
  );
}