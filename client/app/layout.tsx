"use client";

import React, { useRef } from "react";
import { ApolloProvider } from "@apollo/client/react/react.cjs";

import "./globals.css";
import Header from "@/components/head";
// import { AnimationProvider } from "@/components/animation-provider";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/auth-context";
import { client } from '../lib/apollo-client';
import { ThemeProvider } from "@/context/theme-content";
import AnimationProvider from "@/context/animation-context";
import LayoutContent from "@/components/layout-content";


// Mark the wrapper as a Client Component
const LayoutContentClient = (props: { children: ReactNode }) => {
  return (
    <div className="client-wrapper">
      <LayoutContent {...props} />
    </div>
  );
};
LayoutContentClient.displayName = 'LayoutContent';
(LayoutContentClient as any)['__next_internal_client_entry_do_not_use__'] = true;


const RootLayout = ({ children }: { children: React.ReactNode }) => {

  const animatedDivRef = useRef<HTMLDivElement | null>(null);

	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
        <ApolloProvider client={client}>
          <AuthProvider>
            <ThemeProvider>
              <AnimationProvider value={{ animatedDivRef }}>
                <LayoutContentClient>
                  { children }
                </LayoutContentClient>
              </AnimationProvider>
            </ThemeProvider>
          </AuthProvider>
        </ApolloProvider>
			</body>
		</html>
	);
}

export default RootLayout;