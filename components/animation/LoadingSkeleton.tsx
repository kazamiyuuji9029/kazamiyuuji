interface LoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function LoadingSkeleton({
  className = "",
  width = "100%",
  height = "20px",
}: LoadingSkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
