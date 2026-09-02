export interface FaqItem {
  short: string;
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    short: "Does offline attendance really work?",
    q: "Does Track 2 proximity session attendance really work without internet?",
    a: "Yes, 100%. The group admin's phone and member phones establish presence directly with each other using Bluetooth Low Energy (BLE). Neither the instructor nor the students require active cellular data or Wi-Fi during the session. All records are cryptographically stored locally and synced automatically when connectivity returns.",
  },
  {
    short: "What's the Live Activity Board?",
    q: "What does the 'Activity' tab in the header show?",
    a: "The 'Activity' tab opens the live Availability Board. Whenever a teacher or team member checks in, they can publish a human-readable location tag (e.g., 'Seminar Hall B-401', 'Library', or 'Khulna Market until 5 PM'). This eliminates endless phone calls from students or colleagues asking 'Where is this person?'.",
  },
  {
    short: "Do you track background location?",
    q: "Does GPI Connect continuously track background location?",
    a: "Strictly NO. Continuous background tracking is deliberately excluded on privacy and battery grounds. Location is read ONLY at the exact moment of an explicit check-in or status update. Exact GPS coordinates are never published publicly — only human-readable tags.",
  },
  {
    short: "How do you stop token forwarding?",
    q: "How does GPI Connect stop students forwarding tokens to absent friends?",
    a: "Unlike simple apps that broadcast a token, GPI Connect mandates Two-Way Confirmation. A forwarded token is useless because the admin's device must detect the student's physical hardware in the room. In addition, entrance QR codes dynamically rotate every few seconds to defeat static photographs.",
  },
  {
    short: "Can I use it without an institution?",
    q: "Can I use GPI Connect for a small tuition batch or student club without an institution?",
    a: "Absolutely. An organization is completely optional. A tutor or team lead can create standalone personal groups with nothing more than a phone number and invite members via a 6-digit Join Code or WhatsApp link. If your team joins an institution later, your history carries over seamlessly.",
  },
  {
    short: "What if Bluetooth is unreliable?",
    q: "What if a student has an older smartphone that struggles with Bluetooth?",
    a: "Every session includes a Universal Rotating On-Screen Code fallback. The instructor's phone displays a code that rotates at short intervals; members can simply enter or scan it in under 5 seconds.",
  },
];
