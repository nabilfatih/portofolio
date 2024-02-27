import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 border-b bg-background backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="flex items-center">
            <Link
              href="/"
              className="ml-2 text-lg font-semibold tracking-tighter"
            >
              Nabil Fatih
            </Link>
          </h1>
        </div>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4"></div>
      </div>
    </header>
  );
}
