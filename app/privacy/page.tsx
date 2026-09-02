import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — GPI Connect",
  description:
    "How GPI Connect collects, uses, and protects data across its verifiable presence and live availability platform.",
};

const lastUpdated = "September 3, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>

        <p className="mt-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          This policy explains what data GPI Connect (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you or your
          organization use our verifiable presence and live availability platform, why we collect it, and the
          choices you have. It is written to reflect what the product actually does today. If a future feature
          changes how data is handled, we will update this page and note the change.
        </p>

        <Section title="1. Who this applies to">
          <p>
            This policy covers GPI Connect&apos;s web application, the organization admin console, and the
            check-in flows used by members of an organization (students, staff, field agents) on their own
            devices. If you access GPI Connect on behalf of an institution or company, that organization is
            typically the data controller for the attendance records it collects about its members, and GPI
            Connect acts as the processor operating the underlying infrastructure.
          </p>
        </Section>

        <Section title="2. Data we collect">
          <List
            items={[
              [
                "Account & profile data",
                "Name, email or phone number, role/designation, and organization/department membership, provided at sign-up or by an administrator.",
              ],
              [
                "Check-in location data",
                "Precise device location is read only at the moment you perform an explicit check-in or update your availability status — never continuously in the background. Coordinates are used to validate geofence boundaries and are not published publicly; only a human-readable status tag (e.g. “Seminar Hall B-401”) is shown to others.",
              ],
              [
                "Proximity (Bluetooth) session data",
                "During Track 2 offline sessions, devices exchange short-range Bluetooth Low Energy signals to confirm physical presence. This data is used to build the attendance record for that session and is not used for tracking outside of an active session.",
              ],
              [
                "Device & integrity signals",
                "A device hardware signature, clock-drift measurements, and mock-location/rooting indicators are used to detect spoofing and proxy attendance. See our anti-proxy defenses for details.",
              ],
              [
                "Usage & diagnostic data",
                "Standard application logs and error reports (via our error-monitoring provider) to help us fix bugs and keep the service reliable.",
              ],
            ]}
          />
        </Section>

        <Section title="3. How we use data">
          <List
            items={[
              ["Attendance records", "To generate the official attendance/check-in record for your organization."],
              ["Live availability", "To power the opt-in “where is this person right now” status tag your organization enables."],
              ["Anti-proxy integrity", "To detect buddy punching, token replay, mock GPS, and other forms of attendance fraud described in our security matrix."],
              ["Service operation", "To authenticate you, sync offline records once connectivity returns, and provide support."],
              ["Product reliability", "To diagnose crashes and performance issues via aggregated, pseudonymized error reports."],
            ]}
          />
        </Section>

        <Section title="4. What we do not do">
          <List
            items={[
              ["No background tracking", "We do not read or store your location outside of an explicit check-in or status update."],
              ["No public GPS coordinates", "Exact coordinates are never shown to other members — only the human-readable tag you choose to publish."],
              ["No selling of data", "We do not sell personal data to third parties or data brokers."],
            ]}
          />
        </Section>

        <Section title="5. Data sharing">
          <p>
            We share data with the organization you belong to (for attendance and availability purposes), and
            with infrastructure and service providers who process data on our behalf under contract — for
            example, cloud hosting, database, authentication, transactional email, and error-monitoring
            providers. We do not permit these providers to use your data for their own purposes.
          </p>
        </Section>

        <Section title="6. Data retention">
          <p>
            Attendance and availability records are retained for as long as your organization&apos;s account is
            active, plus a reasonable period afterward for record-keeping and dispute resolution, unless your
            organization requests earlier deletion or applicable law requires a different retention period.
            Offline records queued on a device are held locally for up to 7 days before syncing, after which
            they are cleared from the device.
          </p>
        </Section>

        <Section title="7. Cookies & local storage">
          <p>
            We use one essential session cookie to keep you signed in to the admin console — it is required
            for the Service to function and is not used for advertising or cross-site tracking. Some pages also
            use your browser&apos;s local storage to remember lightweight preferences (such as an open panel or
            filter) on your own device; this data stays on your device and is not sent to us.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            Data is encrypted in transit and at rest. Offline attendance entries are signed with HMAC and
            independently re-validated by the server on sync, so a tampered local record is detected rather
            than silently trusted. Access to organization data is isolated per organization and limited to
            authorized administrators.
          </p>
        </Section>

        <Section title="9. Your rights">
          <p>
            Depending on your organization&apos;s policies and applicable law, you may have the right to access,
            correct, export, or request deletion of your personal data. Start by contacting your organization&apos;s
            administrator, or reach us directly at{" "}
            <a href="mailto:support@gpiconnect.com" className="text-blue-600 font-semibold hover:underline">
              support@gpiconnect.com
            </a>
            .
          </p>
        </Section>

        <Section title="10. Children's privacy">
          <p>
            GPI Connect is used in educational settings and may process attendance data for minors on behalf of
            a school or university acting as the responsible data controller. We rely on that institution to
            obtain any consent required under applicable law before enrolling a minor.
          </p>
        </Section>

        <Section title="11. Changes to this policy">
          <p>
            We may update this policy as the product evolves. Material changes will be reflected by updating
            the &ldquo;Last updated&rdquo; date above.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Questions about this policy can be sent to{" "}
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
      <div className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([label, desc]) => (
        <li key={label} className="flex flex-col sm:flex-row sm:gap-2">
          <span className="font-bold text-slate-900 shrink-0">{label}:</span>
          <span>{desc}</span>
        </li>
      ))}
    </ul>
  );
}
