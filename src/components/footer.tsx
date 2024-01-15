import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container hidden text-sm text-secondary sm:block">
      <div className="mx-auto mt-1 flex max-w-[30rem] items-center justify-between sm:mt-5">
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
