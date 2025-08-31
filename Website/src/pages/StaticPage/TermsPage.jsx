import React from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white text-black min-h-screen flex flex-col md:flex-row px-6 md:px-16 py-12 gap-8">
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 pr-6 md:pr-10">
          <h3 className="font-semibold text-sm mb-4 text-gray-700">
            Other related page
          </h3>
          <ul className="space-y-3 text-sm text-gray-500 cursor-pointer">
            <li className="font-semibold text-black">Terms</li>
            <li onClick={() => navigate("/privacy-policy")}>Privacy policy</li>
            <li onClick={() => navigate("/refund")}>Refund</li>
          </ul>
        </aside>
        <main className="flex-1 max-w-3xl space-y-8 text-sm md:text-base">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              ClinicKart Vendor Panel – Terms & Conditions
            </h1>
            <p className="text-xs text-gray-400">
              Effective Date: [Insert Date]
            </p>
            <p className="text-xs text-gray-400">Last Updated: [Insert Date]</p>
          </div>
          <section className="bg-gray-100 p-4 rounded text-sm text-gray-700">
            This document outlines the Terms & Conditions ("Terms") applicable
            to vendors (“you” or “Vendor”) who access and use the ClinicKart
            Vendor Panel, operated by: Infiniclinickart Supplies LLP No 26, K No
            38/1352/9, Central Revenue Layout, SRK Nagar Post, RK Hegde Nagar,
            Doddagubbi, Sampigehalli Police Station, Bangalore North,
            Bangalore-560077, Karnataka, India ("ClinicKart", “Infiniclinickart
            Supplies LLP”, "we", "our", or "us"). By accessing or using the
            Vendor Panel, you confirm that you have read, understood, and agreed
            to be bound by these Terms. If you do not agree with these Terms,
            you may not use the Vendor Panel.
          </section>
          <section>
            <h2 className="font-semibold mb-2">1. Eligibility & Onboarding</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Vendors must be legally registered to conduct business in India.
              </li>
              <li>
                GST registration is mandatory where required under applicable
                Indian laws.
              </li>
              <li>
                All vendors will undergo manual verification of trade licenses,
                Udyam registration, GSTIN, and any other applicable permits.
              </li>
              <li>
                Vendors are responsible for keeping their business profile,
                documents, and contact information updated at all times.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">2. Vendor Obligations</h2>
            <p className="font-semibold mt-2">2.1 Product Listings</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                List only genuine, unexpired, and legally compliant dental
                products.
              </li>
              <li>
                Provide accurate product descriptions, pricing, batch/expiry
                info, and inventory levels.
              </li>
              <li>
                Discontinue or delist out-of-stock or discontinued products
                immediately.
              </li>
            </ul>
            <p className="font-semibold mt-2">2.2 Order Fulfillment</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Dispatch orders in a timely, professional, and well-packaged
                manner.
              </li>
              <li>
                Notify ClinicKart immediately if an order cannot be fulfilled
                within the promised SLA.
              </li>
              <li>
                Delays or frequent cancellations may lead to platform penalties.
              </li>
            </ul>
            <p className="font-semibold mt-2">
              2.3 Returns & Reverse Logistics
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>ClinicKart will manage reverse pickup coordination.</li>
              <li>
                The vendor is responsible for the return shipping cost in cases
                of incorrect, defective, expired, or damaged items.
              </li>
              <li>
                Vendors must cooperate promptly in all return/replacement cases
                and restock accepted returns.
              </li>
            </ul>
            <p className="font-semibold mt-2">2.4 Customer Support</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Respond promptly to customer complaints regarding product
                quality, missing items, or returns.
              </li>
              <li>
                Cooperate with ClinicKart’s support team for resolution of
                escalations within 2 business days.
              </li>
            </ul>
            <p className="font-semibold mt-2">2.5 Pricing & Inventory</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Maintain transparent and fair pricing consistent with offline
                pricing practices.
              </li>
              <li>
                Ensure inventory levels on the dashboard are accurate to avoid
                overselling.
              </li>
              <li>
                Repeated out-of-stock scenarios may result in product delisting
                or account suspension.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">3. Platform Services</h2>
            <p>ClinicKart will:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Provide a vendor dashboard for order, catalog, and inventory
                management.
              </li>
              <li>
                Promote your products to dental professionals and clinics across
                India.
              </li>
              <li>
                Handle all customer payments and deduct platform commissions
                automatically.
              </li>
              <li>
                Provide access to sales insights, performance analytics, and
                customer feedback.
              </li>
              <li>
                Manage all outbound and reverse logistics, subject to the above
                shipping responsibilities.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">4. Commission & Payouts</h2>
            <p>
              A 10% commission is charged on the gross order value (excluding
              GST).
            </p>
            <p>
              Payment for each successful order is made immediately after order
              confirmation, post deduction of commission and transaction
              charges.
            </p>
            <p>
              Downloadable invoices and payout summaries will be made available
              in your vendor dashboard.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">5. Prohibited Conduct</h2>
            <p>Vendors are strictly prohibited from:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Listing counterfeit, fake, expired, or unauthorized products.
              </li>
              <li>
                Contacting or soliciting customers directly, bypassing the
                platform.
              </li>
              <li>
                Misrepresenting product specifications, availability, or
                branding.
              </li>
              <li>
                Uploading harmful files, interfering with platform operations,
                or engaging in fraudulent activity.
              </li>
              <li>Selling any item restricted or banned under Indian law.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">6. Violations & Penalties</h2>
            <p>ClinicKart reserves the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Issue warnings or strike notices.</li>
              <li>Temporarily suspend vendor accounts or product listings.</li>
              <li>
                Permanently delist a vendor or block access to the platform.
              </li>
            </ul>
            <p>Grounds for penalty include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Delayed or unfulfilled orders.</li>
              <li>Repeated customer complaints or returns.</li>
              <li>Listing of prohibited, illegal, or low-quality products.</li>
              <li>Any violation of Indian laws or platform Terms.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              7. Subscription & Platform Fees
            </h2>
            <p>
              For the first 6 months, no listing, onboarding, or subscription
              fees will be charged.
            </p>
            <p>
              ClinicKart reserves the right to introduce subscription tiers or
              feature-based pricing after 6 months.
            </p>
            <p>
              Such changes will be communicated clearly in advance and will
              require your consent.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              8. Service Level Agreements (SLA)
            </h2>
            <p>
              Orders must be dispatched within the timeline committed on the
              platform.
            </p>
            <p>Excessive SLA breaches may result in account restrictions.</p>
            <p>
              ClinicKart may reassign unfulfilled orders or cancel them without
              liability to the vendor.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              9. Product Warranty & Quality
            </h2>
            <p>
              Vendors are responsible for the authenticity and quality of their
              products.
            </p>
            <p>
              Warranty claims must be directed to the
              vendor/manufacturer/importer. ClinicKart does not assume
              responsibility for post-sale warranty or repairs.
            </p>
            <p>
              Vendors must cooperate in facilitating contact between customer
              and manufacturer/importer, when needed.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              10. Non-Returnable Product Categories
            </h2>
            <p>
              The following are non-returnable unless damaged or incorrect upon
              delivery:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Single-quantity orders below ₹250.</li>
              <li>
                Patient-use items (e.g., face masks, water flossers, MRCs).
              </li>
              <li>Products marked as "short expiry".</li>
              <li>
                Equipment like dental chairs, X-ray units, compressors,
                autoclaves, RVGs, etc.
              </li>
              <li>Products clearly marked "Non-returnable" on the listing.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">11. Dispute Resolution</h2>
            <p>
              In the event of a dispute between the vendor and ClinicKart, both
              parties agree to attempt internal resolution through the
              ClinicKart support team.
            </p>
            <p>
              If unresolved, the dispute shall be settled through binding
              arbitration in Bangalore, under the Arbitration and Conciliation
              Act, 1996, with a mutually appointed arbitrator.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">12. Limitation of Liability</h2>
            <p>ClinicKart is not liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Any loss of profits, business interruption, goodwill, or
                indirect damages.
              </li>
              <li>
                Product-related legal issues, customer dissatisfaction, or
                misuse.
              </li>
              <li>
                Delays due to third-party logistics, system downtime, or force
                majeure events.
              </li>
            </ul>
            <p>
              Total liability is limited to the commission amount earned by
              ClinicKart from the vendor in the past 12 months preceding the
              dispute.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">13. Indemnification</h2>
            <p>
              Vendors agree to indemnify and hold harmless Infiniclinickart
              Supplies LLP, its affiliates, and employees from any claims,
              damages, or legal actions arising from:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Product defects or customer harm.</li>
              <li>Regulatory non-compliance.</li>
              <li>Breach of any term or representation made by the vendor.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              14. Confidentiality & Data Usage
            </h2>
            <p>
              Both parties agree to maintain the confidentiality of any
              proprietary, financial, or business information shared.
            </p>
            <p>
              Vendor access to customer data is limited to order fulfillment and
              must not be used for marketing, reselling, or external purposes.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">15. Force Majeure</h2>
            <p>
              ClinicKart shall not be liable for any delay or failure in
              performance caused by circumstances beyond its control, including
              but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Natural disasters</li>
              <li>Internet outages</li>
              <li>Regulatory shutdowns</li>
              <li>Supplier delays</li>
              <li>Political unrest</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">16. Amendments & Updates</h2>
            <p>
              ClinicKart reserves the right to modify these Terms at any time.
            </p>
            <p>
              Any updates will be communicated via email or displayed on the
              Vendor Panel.
            </p>
            <p>
              Continued use of the platform implies acceptance of the revised
              Terms.
            </p>
          </section>
          <section>
            <h2 className="font-semibold mb-2">17. Contact Information</h2>
            <address className="not-italic text-sm text-gray-700">
              Infiniclinickart Supplies LLP
              <br />
              No 26, K No 38/1352/9, Central Revenue Layout, SRK Nagar Post,
              <br />
              RK Hegde Nagar, Doddagubbi, Sampigehalli Police Station, Bangalore
              North, Bangalore-560077, Karnataka, India
              <br />
              📧 Email:{" "}
              <a
                href="mailto:support@clinickart.co"
                className="text-blue-600 underline"
              >
                support@clinickart.co
              </a>{" "}
              /{" "}
              <a
                href="mailto:tech@clinickart.co"
                className="text-blue-600 underline"
              >
                tech@clinickart.co
              </a>
              <br />
              📞 Phone: +91 8944094064
            </address>
          </section>
          <p className="text-sm text-gray-600 mt-4">
            By continuing to use the Vendor Panel, you confirm that you have
            read, understood, and agreed to these Terms & Conditions.
          </p>
        </main>
      </div>
    </div>
  );
};

export default TermsPage;
