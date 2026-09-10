import { cn } from "@/lib/utils";

export function Separator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-11/12 mx-auto h-px bg-gray-200 my-8",
        className
      )}
      {...props}
    />
  );
}