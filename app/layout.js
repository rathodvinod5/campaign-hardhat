import 'semantic-ui-css/semantic.min.css'

import { Container } from 'semantic-ui-react';
import { Inter } from "next/font/google";
import "./globals.css";
import FactoryContextProvider from './context/factoryContext';
import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: 'white' }}>
        <FactoryContextProvider>
          <Container>
            <Header />
          </Container>
          <Container>
            {children}
          </Container>
        </FactoryContextProvider>
      </body>
    </html>
  );
}
