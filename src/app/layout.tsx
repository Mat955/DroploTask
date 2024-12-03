import {ToastProvider} from "../contexts/ToastContext";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} text-sm`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
