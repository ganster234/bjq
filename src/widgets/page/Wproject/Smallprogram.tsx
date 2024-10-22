import PcProject from "../pcProject";
export default function Smallprogram() {
  return (
    <PcProject
      props={{ is_mini: 1, is_qq: 2, is_web: 0, is_app: 1 }}
    ></PcProject>
  );
}
