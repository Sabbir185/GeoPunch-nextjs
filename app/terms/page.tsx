import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — GPI Connect",
  description:
    "The terms governing use of the GPI Connect verifiable presence and live availability platform.",
};

const lastUpdated = "September 3, 2026";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-900">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>

        <p className="mt-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          These terms govern access to and use of GPI Connect (the &ldquo;Service&rdquo;), including our web
          application, admin console, and check-in flows. By creating an account or using the Service, you
          agree to these terms on behalf of yourself or, if you are acting for an organization, on behalf of
          that organization.
        </p>

        <Section title="1. The Service">
          <p>
            GPI Connect provides verifiable attendance and live availability infrastructure, including
            geofenced check-in, offline Bluetooth-proximity attendance sessions, anti-proxy integrity checks,
            and organization admin tooling. Specific features available to you depend on your organization&apos;s
            plan, described on our{" "}
            <Link href="/#pricing" className="text-blue-600 font-semibold hover:underline">
              pricing page
            </Link>
            .
          </p>
        </Section>

        <Section title="2. Accounts and eligibility">
          <List
            items={[
              "You must provide accurate information when creating an account and keep your credentials confidential.",
              "If you are joining as a member of an organization, your organization's administrator controls your membership, role, and access, and may add, suspend, or remove your account.",
              "You are responsible for activity that occurs under your account, including check-ins performed from your device.",
            ]}
          />
        </Section>

        <Section title="3. Acceptable use">
          <p className="mb-2">You agree not to:</p>
          <List
            items={[
              "Use mock-location tools, GPS spoofing, emulators, or rooted/jailbroken integrity bypasses to falsify a check-in.",
              "Forward, relay, screenshot, or otherwise share a check-in token, QR code, or Bluetooth session credential to mark another person present.",
              "Tamper with locally cached offline attendance records before they sync.",
              "Attempt to access another organization's data, or probe, scan, or interfere with the Service's security controls.",
              "Use the Service for any unlawful purpose or in a way that violates the rights of others.",
            ]}
          />
          <p className="mt-2">
            Our{" "}
            <Link href="/#security" className="text-blue-600 font-semibold hover:underline">
              anti-proxy integrity engine
            </Link>{" "}
            is designed to detect these behaviors; flagged records are surfaced for administrator review rather
            than silently rejected or silently accepted.
          </p>
        </Section>

        <Section title="4. Organization data & administrators">
          <p>
            When you use GPI Connect as part of an organization, that organization&apos;s administrators can view,
            export, and manage attendance and availability records for their members as part of normal
            operation of the Service. Organizations are responsible for having a lawful basis to collect this
            data from their members and for complying with applicable law in their jurisdiction, including any
            notice or consent requirements.
          </p>
        </Section>

        <Section title="5. Subscriptions and billing">
          <List
            items={[
              "The Community & Teams plan is free. Paid plans (Campus Pro, Enterprise & Field) are billed per user, monthly or annually, at the rates shown on our pricing page at the time of purchase.",
              "Annual billing is paid upfront in exchange for the discounted annual rate.",
              "Fees are non-refundable except where required by law, unless otherwise agreed in writing.",
              "We may change pricing for future billing periods with advance notice.",
            ]}
          />
        </Section>

        <Section title="6. Availability and support">
          <p>
            We aim to keep the Service reliably available and will communicate planned maintenance where
            practical. The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis; we do not
            guarantee uninterrupted or error-free operation. Enterprise plans may include a separately agreed
            support SLA.
          </p>
        </Section>

        <Section title="7. Termination">
          <p>
            You or your organization may stop using the Service at any time. We may suspend or terminate access
            for violation of these terms, including attempts to circumvent attendance-integrity controls. Upon
            termination, your organization&apos;s data will be handled in accordance with our{" "}
            <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="8. Disclaimers & limitation of liability">
          <p>
            To the maximum extent permitted by law, GPI Connect is not liable for indirect, incidental, or
            consequential damages arising from use of the Service. Nothing in these terms limits liability that
            cannot be limited under applicable law.
          </p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>
            We may update these terms as the Service evolves. Continued use of the Service after an update
            constitutes acceptance of the revised terms. Material changes will be reflected by updating the
            &ldquo;Last updated&rdquo; date above.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:support@gpiconnect.com" className="text-blue-600 font-semibold hover:underline">
              support@gpiconnect.com
            </a>
            .
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900 font-sans">{title}</h2>
      <div className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-disc pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
