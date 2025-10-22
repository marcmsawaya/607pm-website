export const metadata = {
title: "Beirut's Nightmare — Fundraiser",
description: "Help the Beirut Red Cross and Beirut Elna NGO now!",
};

export default function RootLayout({ children }) {
return (
<html lang="en" className="h-full">
<body className="h-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative bg-[url('/beirut607.jpg')] text-white">
{/* dark overlay for readability */}
<div className="pointer-events-none absolute inset-0 bg-black/50" />
<main className="relative min-h-screen flex flex-col">{children}</main>
</body>
</html>
);
}