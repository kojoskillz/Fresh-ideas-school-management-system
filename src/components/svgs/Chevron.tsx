import { SVGProps } from "react";

export function ChevronSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="17"
      viewBox="0 0 23 17"
      fill="none"
      {...props}
    >
      <path
        d="M11.5 17L0.674682 0.5L22.3253 0.500002L11.5 17Z"
        fill="#B3B3B3"
      />
    </svg>
  );
}
