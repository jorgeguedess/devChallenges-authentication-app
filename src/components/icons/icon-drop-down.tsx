import { ComponentProps } from "react";

export const IconDropDown = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      {...props}
    >
      <g clipPath="url(#clip0_0_3)">
        <path
          d="M12.5 17.5C12.2447 17.4987 11.9929 17.4406 11.7629 17.3299C11.5328 17.2192 11.3303 17.0587 11.17 16.86L6.95999 11.76C6.71399 11.453 6.55918 11.083 6.51321 10.6923C6.46724 10.3015 6.53196 9.90574 6.69999 9.55C6.83627 9.24083 7.05867 8.97741 7.34061 8.79122C7.62256 8.60503 7.95214 8.50393 8.28999 8.5H16.71C17.0478 8.50393 17.3774 8.60503 17.6594 8.79122C17.9413 8.97741 18.1637 9.24083 18.3 9.55C18.468 9.90574 18.5327 10.3015 18.4868 10.6923C18.4408 11.083 18.286 11.453 18.04 11.76L13.83 16.86C13.6697 17.0587 13.4672 17.2192 13.2371 17.3299C13.0071 17.4406 12.7553 17.4987 12.5 17.5Z"
          className="fill-primary"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_3">
          <rect
            width="24"
            height="24"
            className="fill-primary"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
