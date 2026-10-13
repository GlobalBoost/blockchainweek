import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Globe2, HeartHandshake, Shield, Users } from "lucide-react";
import { FiresideWatch } from "@/components/fireside/FiresideWatch";
import {
  BRAND_NAME,
  BRAND_URL,
  EVENT_DATES,
  EVENT_LOCATION,
  FIRESIDE_DISCLAIMER,
  FIRESIDE_LUMA_URL,
  FIRESIDE_PATH,
  FIRESIDE_START_ISO,
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_WIDTH,
  TICKETS_ANCHOR,
  YOUTUBE_WATCH_URL,
} from "@/lib/brand-constants";
import { getFiresidePhase } from "@/lib/fireside";
import { LUMA_PUBLIC_URL } from "@/lib/luma";

const title = "The Human Future: AI, Peace & The Next United Nations · Karla Ballard & Ivonne A-Baki";
const description =
  "Watch live October 13 at 10 AM ET: Ivonne A-Baki, candidate for UN Secretary-General, joins HUMN founder Karla Ballard on AI for peace, youth and the future of the United Nations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: FIRESIDE_PATH },
  openGraph: {
    title,
    description,
    url: FIRESIDE_PATH,
    type: "website",
    images: [
      {
        url: "/fireside/og.png",
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "The Human Future: AI, Peace and The Next United Nations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/fireside/og.png"],
  },
};

const THEMES = [
  {
    icon: Users,
    title: "Youth & Opportunity",
    copy: "The next generation will inherit both the promise of new technology and the cost of failed governance. How do we give them a real seat at the table?",
  },
  {
    icon: Shield,
    title: "AI & Human Dignity",
    copy: "Keeping people at the center as AI transforms work, identity and the economy.",
  },
  {
    icon: Globe2,
    title: "A More Relevant United Nations",
    copy: "Security Council reform, prevention over intervention, and a UN that delivers for ordinary people.",
  },
  {
    icon: HeartHandshake,
    title: "Peace & A Brighter Tomorrow",
    copy: "Practical paths to cooperation and stability in a divided world.",
  },
];

function FiresideJsonLd() {
  const siteUrl = BRAND_URL.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "The Human Future: AI, Peace & The Next United Nations",
    description,
    startDate: FIRESIDE_START_ISO,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`${siteUrl}/fireside/og.png`],
    location: {
      "@type": "VirtualLocation",
      url: `${siteUrl}${FIRESIDE_PATH}`,
    },
    organizer: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: siteUrl,
    },
    performer: [
      { "@type": "Person", name: "Ivonne A-Baki" },
      { "@type": "Person", name: "Karla Ballard" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function FiresidePage() {
  const phase = getFiresidePhase();
  const reminderHref = FIRESIDE_LUMA_URL || LUMA_PUBLIC_URL;
  const watchLabel =
    phase === "live" ? "LIVE NOW: Watch" : phase === "replay" ? "Watch the Replay" : "Watch Live";

  return (
    <>
      <FiresideJsonLd />
      <section className="bg-[#0d1b2a] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-gold/40 shadow-[0_0_80px_rgba(201,162,39,0.18)]">
            <Image
              src="/fireside/square.png"
              alt="The Human Future: Karla Ballard and Ivonne A-Baki"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
              A global fireside conversation
            </p>
            <h1 className="heading-font mt-4 text-3xl leading-tight text-runway-white sm:text-5xl">
              The Human Future: AI, Peace & The Next United Nations
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Ivonne A-Baki, candidate for United Nations Secretary-General, in conversation with Karla Ballard, Founder of HUMN Passport Wallet.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-un-blue">
              Tuesday, October 13, 2026 · 10:00 AM ET · Live online
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#watch"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-gold/90"
              >
                {phase === "live" ? <span className="h-2.5 w-2.5 rounded-full bg-red-600" aria-hidden /> : null}
                {watchLabel}
              </a>
              <a
                href={reminderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
              >
                Register for Reminders
              </a>
            </div>
          </div>
        </div>
      </section>

      <FiresideWatch initialPhase={phase} />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-lg leading-relaxed text-ink/80 lg:px-8">
          <p>
            Artificial intelligence is arriving on the battlefield, in the workplace and in every institution that governs our lives. The question is no longer whether technology will change the world. The question is whether it will protect people while it does.
          </p>
          <p>
            In this global fireside conversation, Karla Ballard sits down with Ivonne A-Baki, a peace negotiator, former minister and ambassador, and one of the candidates to become the next Secretary-General of the United Nations. Together they explore what a more human future looks like and what the next era of the United Nations could do to build it.
          </p>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 lg:px-8">
          {THEMES.map(({ icon: Icon, title: themeTitle, copy }) => (
            <div key={themeTitle} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="h-7 w-7 text-gold" aria-hidden />
              <h2 className="mt-4 text-xl font-bold text-white">{themeTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0d1b2a] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="heading-font text-3xl leading-tight text-gold sm:text-5xl">
            AI should protect human life, never take it.
          </p>
          <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-white/80 sm:text-lg">
            <p>
              As artificial intelligence moves onto the battlefield, Ivonne A-Baki advocates a clear principle: AI should be used only as a defensive tool, never for offense. Its purpose should be to protect people, to detect threats, prevent conflict and save lives, not to make killing faster or easier.
            </p>
            <p>
              In her official vision statement for the Secretary-General race, she warns that AI and other new technologies are remaking &ldquo;knowledge, work, warfare, and the human body itself,&rdquo; shaped by a handful of states and companies largely without global consent. She calls for the United Nations to become a credible convener on AI, building on the Global Digital Compact, so that every nation, not only the most powerful, helps set the guardrails.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-un-blue">
              Candidate for United Nations Secretary-General
            </p>
            <h2 className="heading-font mt-2 text-3xl text-ink">Ivonne A-Baki</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Ivonne A-Baki is an Ecuadorian diplomat, peace negotiator and former cabinet minister with four decades of public service across four continents. Born in Guayaquil, Ecuador, to Lebanese parents, she lived in Lebanon through much of its civil war. She has said that sheltering with her children during the bombing of Beirut is what committed her to a life of peacemaking.
              </p>
              <p>
                She took part in the peace process that ended the Ecuador-Peru border conflict, which concluded with the 1998 Brasilia Presidential Act. She became Ecuador&apos;s first woman Ambassador to the United States (1998 to 2002) and later served there again (2020 to 2024). She was Ecuador&apos;s first woman Minister of Industries and Productivity (2003 to 2005), President of the Andean Parliament (2007 to 2009), and lead negotiator of the Yasuní-ITT Initiative to keep oil in the ground in the Amazon (2010 to 2013). She also served as Ambassador to France in 2024. She studied at the Sorbonne and at Harvard.
              </p>
              <p>
                In August 2026 she was nominated by the Kingdom of Tonga as a candidate for UN Secretary-General. Her platform centers on preventing and ending wars, reforming the Security Council, development that reaches ordinary people, human dignity, and renewing the UN from within.
              </p>
            </div>
            <a
              href="https://www.un.org/sg/sites/default/files/document/2026-08/ms-ivonne-a-baki-official-vision-statement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-un-blue hover:underline"
            >
              Official vision statement on un.org
            </a>
          </article>
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-un-blue">
              Host · Founder, HUMN Passport Wallet
            </p>
            <h2 className="heading-font mt-2 text-3xl text-ink">Karla Ballard</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Karla Ballard is a cultural architect and the founder of HUMN, a platform that uses blockchain to record, verify and exchange work, skills and economic contribution within trusted communities. Her work focuses on the future of work and on how decentralized technology can restore agency, dignity and social capital to everyday people.
              </p>
              <p>
                A longtime advocate for digital inclusion, she ran as the Independent candidate for Vice President of the United States alongside Brock Pierce in 2020. She has held senior roles at Participant Media and Ogilvy, led broadband adoption initiatives, and has spoken at Harvard and Georgetown. She is a past speaker at Blockchain Week - UNGA Edition.
              </p>
            </div>
            <Link href="/karla-ballard" className="mt-5 inline-flex text-sm font-semibold text-un-blue hover:underline">
              Karla&apos;s speaker page
            </Link>
          </article>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-base leading-relaxed text-white/80 sm:text-lg lg:px-8">
          <h2 className="heading-font text-3xl text-runway-white sm:text-4xl">
            The race for the next UN Secretary-General
          </h2>
          <p>
            The Secretary-General leads the United Nations Secretariat and serves as the world&apos;s top diplomat. António Guterres completes his second term on December 31, 2026, and his successor takes office on January 1, 2027.
          </p>
          <p>
            The 2026 selection is the most open in the UN&apos;s history. Candidates publish vision statements and answer questions from member states and the public in live interactive dialogues. The 15 members of the Security Council then hold a series of closed straw polls and recommend one candidate. The General Assembly makes the final appointment.
          </p>
          <p>
            Seven candidates are in the race, and four of them are women. In 80 years, the United Nations has never had a woman as Secretary-General. By custom, the role rotates between world regions, and many member states expect the next Secretary-General to come from Latin America and the Caribbean.
          </p>
          <p>
            This conversation is a chance to hear directly from one of the candidates about where she would take the United Nations, and why.
          </p>
        </div>
      </section>

      <section className="section-light py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="heading-font text-3xl text-ink">How to watch</h2>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            <li>
              <span className="font-semibold text-ink">Here on this page:</span> the live stream plays in the player above.
            </li>
            <li>
              <span className="font-semibold text-ink">On Zoom:</span> registered guests receive the link through Luma.{" "}
              <a href={reminderHref} className="font-semibold text-un-blue hover:underline" target="_blank" rel="noopener noreferrer">
                Register for reminders
              </a>
              .
            </li>
            <li>
              <span className="font-semibold text-ink">On YouTube:</span>{" "}
              <a href={YOUTUBE_WATCH_URL} className="font-semibold text-un-blue hover:underline" target="_blank" rel="noopener noreferrer">
                watch the stream
              </a>
              . Also live on X, Facebook, Instagram and LinkedIn.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#0d1b2a] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="heading-font text-3xl text-runway-white sm:text-4xl">Continue the conversation in Times Square.</h2>
          <p className="mt-4 text-white/75">
            {BRAND_NAME} 2027 · {EVENT_DATES} · {EVENT_LOCATION}
          </p>
          <p className="mt-2 text-gold">Early, Early Bird pricing: General Admission $79 · VIP $399</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={TICKETS_ANCHOR}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-un-blue px-8 py-3 text-sm font-bold uppercase tracking-wider text-white"
            >
              Get Your 2027 Pass
            </Link>
            <a
              href={LUMA_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white"
            >
              See the Event Calendar
            </a>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-white/55">{FIRESIDE_DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
