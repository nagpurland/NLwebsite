import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Terms() {
  return (
    <PublicLayout>
      <article className="container mx-auto px-4 max-w-2xl py-16 space-y-6 text-slate-700">
        <h1 className="text-4xl font-semibold text-primary">Terms of use</h1>
        <h2 className="text-xl font-bold text-primary">General information only</h2>
        <p>NagpurLand publishes checklists and guides to help you ask better questions when buying land. This is not legal, financial or investment advice, and we are not a law firm.</p>
        <h2 className="text-xl font-bold text-primary">Your decision</h2>
        <p>Rules, fees and office procedures change, and the content may be out of date or incomplete. Completing the checklist does not mean a plot is safe. Have a qualified property advocate review the title and documents before you pay any money.</p>
        <h2 className="text-xl font-bold text-primary">We don't sell land</h2>
        <p>We do not list, sell or broker land on this website, and we do not take commission on sales.</p>
      </article>
    </PublicLayout>
  );
}
