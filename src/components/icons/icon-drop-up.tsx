import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const IconDropUp = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      {...props}
    >
      <g clipPath="url(#clip0_0_27)">
        <path
          d="M12 8C12.2553 8.00129 12.5071 8.05939 12.7371 8.17009C12.9672 8.28078 13.1697 8.4413 13.33 8.64L17.54 13.74C17.786 14.047 17.9408 14.417 17.9868 14.8077C18.0327 15.1985 17.968 15.5943 17.8 15.95C17.6637 16.2592 17.4413 16.5226 17.1594 16.7088C16.8774 16.895 16.5478 16.9961 16.21 17H7.78999C7.45214 16.9961 7.12256 16.895 6.84061 16.7088C6.55866 16.5226 6.33627 16.2592 6.19999 15.95C6.03196 15.5943 5.96724 15.1985 6.01321 14.8077C6.05918 14.417 6.21398 14.047 6.45999 13.74L10.67 8.64C10.8303 8.4413 11.0328 8.28078 11.2629 8.17009C11.4929 8.05939 11.7447 8.00129 12 8Z"
          className="fill-primary"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_27">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
