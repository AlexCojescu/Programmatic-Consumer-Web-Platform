export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center pt-28"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}
