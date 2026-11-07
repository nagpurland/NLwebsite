import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <PublicLayout>
      <article className="container mx-auto px-4 max-w-2xl py-16 space-y-6 text-slate-700">
        <h1 className="text-4xl font-semibold text-primary">Privacy policy</h1>
        <p>This policy explains what NagpurLand collects through this website and how it is used.</p>
        <h2 className="text-xl font-bold text-primary">What we collect</h2>
        <p>Only what you type into our forms: your name, phone number, email address, locality and message. The locality, prices, answers and ticks you enter in the four steps stay in your own browser and are not sent to us. You can delete them from your Plot Summary. We also count anonymous actions, such as how many people opened or sent a form. These counts contain no name, number, message or visitor id.</p>
        <h2 className="text-xl font-bold text-primary">Why we use it</h2>
        <p>To reply to your request, and to send the email updates you asked for if you subscribed. We do not sell your details and we do not share them with brokers or developers.</p>
        <h2 className="text-xl font-bold text-primary">Where it is kept</h2>
        <p>Your details are stored in our database, which only logged-in administrators can read. We keep them until you ask us to delete them or we no longer need them to answer you.</p>
        <h2 className="text-xl font-bold text-primary">Your choices</h2>
        <p>You can ask us to show, correct or delete your details, or to stop contacting you, through the <Link href="/contact" className="underline">contact page</Link>.</p>
      </article>
    </PublicLayout>
  );
}
