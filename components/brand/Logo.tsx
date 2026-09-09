export default function Logo({ size = 28 }: { size?: number }) {
  return <img src="/logo.png" width={size} height={size} alt="LuneX" />;
}
