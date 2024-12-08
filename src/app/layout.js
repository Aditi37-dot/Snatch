import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
// import Head from "next/head";
const apfelGrotezkMittel = localFont({
  src: [
    {
      path: "./fonts/ApfelGrotezk-Mittel.otf", 
      weight: "400", 
      style: "normal", 
    },
  ],
  variable: "--font-apfel-grotezk-mittel", 
});

const apfelGrotezkRegular = localFont({
  src: [
    {
      path: "./fonts/ApfelGrotezk-Regular.otf", 
      weight: "400",
      style: "normal", 
    },
  ],
  variable: "--font-apfel-grotezk-regular", 
});

const qimano = localFont({
  src: [
    {
      path: "./fonts/Qimano-aYxdE.otf", 
      weight: "400", 
      style: "normal", 
    },
  ],
  variable: "--font-qimano", 
});

export const metadata = {
  title: "Snatch",
  description: "Connecting Influencers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
     {/* <Head>
          
           <script
            src="https://cdn.clerk.dev/clerk.js"
            type="text/javascript"
            async
          ></script>
        </Head> */}
      <body
        className={`${apfelGrotezkMittel.variable} ${apfelGrotezkRegular.variable} ${qimano.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
