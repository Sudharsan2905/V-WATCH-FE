"use client";

interface WhatsAppFloatProps {
  /** Phone number in international format, digits only (no +, spaces or dashes). */
  phone: string;
  /** Optional pre-filled message. */
  message?: string;
}

/**
 * Floating WhatsApp button pinned to the bottom-right of the viewport.
 *
 * Clicking opens the WhatsApp app when installed and falls back to WhatsApp Web
 * otherwise. The wa.me universal link handles this automatically on mobile
 * (deep-links to the app, else the browser) and opens WhatsApp Web/Desktop on
 * desktop, so it works across platforms without unreliable timeout hacks.
 */
const WhatsAppFloat = ({ phone, message }: WhatsAppFloatProps) => {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  const href = `https://wa.me/${phone}${query}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.744 3.05 9.38L1.05 31.4l6.223-1.99A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.318 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.844-.574 1.328-.574.156 0 .296.008.424.014.386.016.58.038.834.646.316.762 1.086 2.658 1.178 2.842.094.184.188.434.062.744-.118.31-.222.446-.406.66-.184.214-.36.378-.544.608-.168.2-.358.416-.146.782.212.36.944 1.556 2.026 2.52 1.396 1.244 2.526 1.63 2.92 1.816.31.146.68.11.928-.164.316-.354.706-.94 1.104-1.518.28-.414.636-.466 1.006-.324.376.132 2.372 1.118 2.78 1.322.408.204.678.302.778.472.098.17.098.976-.288 2.066Z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloat;
