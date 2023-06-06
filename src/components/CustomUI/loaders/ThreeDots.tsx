type ThreeDotsProps = {
  size: "sm" | "md" | "lg" | "xl";
};

export default function ThreeDots({ size = "sm" }: ThreeDotsProps) {
  return (
    <div className='loaderThreeDots'>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
    </div>
  );
}
