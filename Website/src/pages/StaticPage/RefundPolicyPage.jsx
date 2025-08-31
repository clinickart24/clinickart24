import React from "react";
import { useNavigate } from "react-router-dom";

const RefundPolicyPage = () => {
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
            <li onClick={() => navigate("/privacy-policy")}>Privacy policy</li>
            <li className="font-semibold text-black">Refund</li>
          </ul>
        </aside>

        <main className="flex-1 max-w-3xl space-y-8 text-sm md:text-base">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              General Refund Policy
            </h1>
            <p className="text-xs text-gray-400">
              Last updated on April 25, 2023
            </p>
          </div>

          <section className="bg-gray-100 p-4 rounded text-sm text-gray-700">
            Welcome to Clinic Kart! Your access and use of our platform, and any
            of its contents, are subject to the following terms and conditions.
            By utilizing our services, you confirm your acceptance of these
            terms and conditions. If you disagree with any part of these terms,
            please refrain from using our platform.
          </section>

          <section>
            <h2 className="font-semibold mb-2">Acceptance of Terms</h2>
            <p>
              Your use of Nimbus signifies your unreserved acceptance and
              compliance with these terms and conditions. You affirm that you
              have read and understood them in their entirety.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Changes to Terms</h2>
            <p>
              Nimbus reserves the right to modify these terms and conditions at
              any given time. Your continued use of our platform after any
              modifications indicates your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              Registration and Account Security
            </h2>
            <p>
              From finance and marketing to supply chain management and customer
              service, AI-Driven Forecasts find applications across various
              domains. Be it anticipating market trends, managing financial
              portfolios, optimizing supply chains, or personalizing customer
              experiences, predictive analytics serves as a multifaceted tool
              that enhances decision-making across diverse business functions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Privacy Policy</h2>
            <p>
              To utilize certain features of Nimbus, you may be required to
              register an account. You are responsible for ensuring that your
              account information is accurate and secure.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              Access and Use of the Services
            </h2>
            <p>
              Your use of Nimbus is also governed by our Privacy Policy, which
              outlines our approach towards handling any personal information
              that you may provide to us.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Restrictions</h2>
            <p>
              You are prohibited from using Nimbus for any illegal or
              unauthorized purpose and must not violate any laws in your
              jurisdiction during your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Content</h2>
            <p>
              You are responsible for all content you upload or otherwise make
              available via Nimbus. Nimbus does not control, nor is responsible
              for, the content posted by users on the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              Access and Use of the Services
            </h2>
            <p>
              Your use of Nimbus is also governed by our Privacy Policy, which
              outlines our approach towards handling any personal information
              that you may provide to us.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Limitation of Liability</h2>
            <p>
              Nimbus shall not be liable for any direct, indirect, incidental,
              or consequential damages resulting from the use or inability to
              use the service.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
