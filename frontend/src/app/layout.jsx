import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Roboto } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "GraphQL Forge",
  description: "Generated by create next app",
};

export default function RootLayout({children,}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster position='top-center' />
        {children}</body>
    </html>
  );
}