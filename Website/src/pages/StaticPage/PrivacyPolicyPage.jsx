import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white text-black min-h-screen flex flex-col md:flex-row px-6 md:px-16 py-12 gap-8">
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 pr-6 md:pr-10">
          <h3 className="font-semibold text-sm mb-4 text-gray-700">
            Other related page
          </h3>
          <ul className="space-y-3 text-sm text-gray-500 cursor-pointer">
            <li onClick={() => navigate("/terms-and-conditions")}>Terms</li>
            <li className="font-semibold text-black">Privacy policy</li>
            <li onClick={() => navigate("/refund")}>Refund</li>
          </ul>
        </aside>

        <main className="flex-1 max-w-3xl space-y-8 text-sm md:text-base">
          <div className="flex justify-end">
            <button
              onClick={() => setIsDeleted(true)}
              className="text-sm text-red-600 px-3 py-1 rounded hover:bg-red-50"
            >
              Delete Privacy Policy
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-1">Privacy Policy</h1>
            <p className="text-xs text-gray-400">
              Last updated on April 25, 2023
            </p>
          </div>

          <section>
            <p>
              This Privacy Policy outlines how Infiniclinickart Supplies LLP
              ("ClinicKart", “we”, “our”, or “us”) collects, uses, stores, and
              protects your personal and business information across our mobile
              application, website, and related services (“Platform”).
            </p>
            <p>
              We are committed to protecting your data in accordance with the
              Information Technology Act, 2000, its applicable Rules, and the
              guidelines of Google Play Store and Apple App Store.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We may collect and process the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Personal & Business Information:</strong> Name, email,
                phone, GSTIN, trade license, etc.
              </li>
              <li>
                <strong>Technical Information:</strong> Device, OS, IP address,
                location, crash logs, etc.
              </li>
              <li>
                <strong>Transaction Information:</strong> Orders, returns,
                transaction IDs, coupons.
              </li>
              <li>
                <strong>Third-Party Sources:</strong> Payment gateways, courier
                partners, referrals.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Account creation and management</li>
              <li>Order processing and tracking</li>
              <li>Refunds and payouts</li>
              <li>Support and dispute resolution</li>
              <li>Marketing and alerts</li>
              <li>Fraud prevention and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              3. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies and similar technologies to save preferences, track
              usage, and improve performance. You can control cookie settings
              via your browser or device.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">4. Data Sharing & Disclosure</h2>
            <p>
              We may share your data with logistics partners, payment
              processors, cloud vendors, regulatory authorities, and service
              providers under confidentiality. We do <strong>not</strong> sell
              personal data.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">5. Data Retention</h2>
            <p>
              We retain your data as long as your account is active or as
              required by legal/tax obligations. Post that, data is deleted or
              anonymized.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">6. User Rights & Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and correct your data</li>
              <li>Request deletion (subject to laws)</li>
              <li>Withdraw marketing consent</li>
              <li>Restrict processing under conditions</li>
            </ul>
            <p>
              Contact:{" "}
              <a
                href="mailto:support@clinickart.co"
                className="text-blue-600 underline"
              >
                support@clinickart.co
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">7. Your Consent</h2>
            <p>
              By using our platform, you consent to our collection, storage, and
              processing of data in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">8. Data Security</h2>
            <p>
              We use SSL encryption, secured servers, limited employee access,
              and regular audits. While we ensure strong protection, no system
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">9. Children’s Privacy</h2>
            <p>
              ClinicKart is for users 18+. We do not knowingly collect data from
              minors. If discovered, it will be deleted promptly.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">10. Third-Party Links</h2>
            <p>
              We are not responsible for the privacy policies or content of
              external sites linked on our platform. Please review them
              independently.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">11. Location Permissions</h2>
            <p>
              If enabled, we may use your location for delivery zones,
              auto-filling addresses, and verifying supplier proximity. You can
              revoke access anytime via device settings.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">12. Changes to This Policy</h2>
            <p>
              We may update this policy due to changes in practices or legal
              compliance. You'll be notified via app, site, or email. Continued
              use indicates acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">13. Contact Us</h2>
            <address className="not-italic text-sm text-gray-700">
              Infiniclinickart Supplies LLP
              <br />
              No 26, K No 38/1352/9, Central Revenue Layout, SRK Nagar Post,
              <br />
              RK Hegde Nagar, Doddagubbi, Sampigehalli PS, Bangalore-560077,
              Karnataka, India
              <br />
              📧{" "}
              <a
                href="mailto:privacy@clinickart.co"
                className="text-blue-600 underline"
              >
                privacy@clinickart.co
              </a>
              <br />
              📞 +91 8944094064
            </address>
          </section>
          <section>
            <h2 className="font-semibold mb-2">
              14. Account Deletion & Data Erasure
            </h2>
            <p>
              If you delete your ClinicKart account, we will retain your data
              only for the legally required duration. After that, all your
              personal and business information will be securely deleted or
              anonymized within 90 days of account deletion.
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-4">
            By using the ClinicKart platform, you consent to the practices
            described in this Privacy Policy.
          </p>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
