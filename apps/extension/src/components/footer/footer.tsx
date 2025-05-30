import { SignedIn, UserButton } from "@clerk/chrome-extension"

const Footer = () => {
  return (
    <footer className="h-[64px] sticky bottom-0 flex flex-col gap-4 items-center justify-center p-4 border-t bg-blue-50">
      <div className="flex flex-row gap-4 items-center justify-center">
        <p>
          Developed with ❤️ by Nitron Developments{" "}
          <a
            href="https://nitrondevelopments.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600">
            nitrondevelopments.co.uk
          </a>
        </p>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </footer>
  )
}

export default Footer
