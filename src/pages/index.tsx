import Image from "next/image";
import { Inter } from "next/font/google";
import CardItem from "@/component/client/card";
import { TestimonialCard } from "@/component/client/testimoni";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <section className="flex justify-center items-center flex-wrap gap-5 py-10">
        {[...new Array(6)].map((i) => (
          <CardItem key={i} />
        ))}
      </section>
      <section className="flex justify-center items-center flex-wrap gap-5 my-20">
        {[...new Array(6)].map((i) => (
          <TestimonialCard key={i} />
        ))}
      </section>
    </main>
  );
}
