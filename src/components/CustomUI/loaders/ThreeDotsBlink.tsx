type ThreeDotsBlinkProps = { size?: "sm" | "md" | "lg" | "xl" };

export default function ThreeDotsBlink({ size = "sm" }: ThreeDotsBlinkProps) {
  return (
    <div className='loaderThreeDotsBlink'>
      <div className={`line line-${size}`}></div>
      <div className={`line line-${size}`}></div>
      <div className={`line line-${size}`}></div>
    </div>
  );
}
