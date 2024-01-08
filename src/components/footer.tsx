import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container mx-auto mt-5 max-w-[30rem] text-sm text-secondary sm:p-0">
      <div className="flex items-center justify-between">
        <p>
          <span className="sr-only sm:not-sr-only sm:mr-1 sm:inline-block">
            created by
          </span>
          <Link
            href="https://github.com/jorgeguedess"
            target="_blank"
            className="font-semibold underline hover:text-link focus:text-link"
          >
            Jorge Guedes
          </Link>
        </p>
        <span>devChallenges.io</span>
      </div>
    </footer>
  );
};
