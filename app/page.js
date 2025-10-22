import Link from "next/link";

export default function HomePage() {
return (
<section className="flex-1 flex items-center justify-center text-center p-6">
<div className="max-w-3xl">
<h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-md leading-tight">
Help the Beirut Red Cross and Beirut Elna NGO now!
</h1>
<p className="mt-6 text-lg sm:text-xl opacity-90">
Beirut's Nightmare — learn what happened and support trusted responders.
</p>
<div className="mt-10">
<Link
href="/donate"
className="inline-block rounded-2xl bg-white/90 text-black px-8 py-4 text-lg font-semibold shadow hover:bg-white"
>
Donate Now
</Link>
</div>
</div>
</section>
);
}