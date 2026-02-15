
import React from 'react';

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Disclaimer – BharatVISTAAR</h1>
      <p className="text-gray-600 mb-8 font-medium">Effective Date: 16/02/2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          BharatVISTAAR is a digital agriculture advisory platform developed to support farmers, extension workers, and stakeholders by providing agricultural information, advisories, and related services. By accessing and using the BharatVISTAAR application or website, you agree to the terms outlined in this disclaimer.
        </p>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">1. General Information Purpose</h2>
          <p className="mb-4">
            The information, advisories, recommendations, forecasts, alerts, and other content provided through BharatVISTAAR are intended solely for general informational and educational purposes.
          </p>
          <p className="mb-4">
            While every effort is made to ensure that the information provided is accurate, reliable, and up to date, BharatVISTAAR does not guarantee the completeness, correctness, or suitability of the content for specific agricultural conditions or individual circumstances.
          </p>
          <p>
            Users are advised to consult qualified agricultural experts, local extension officers, or subject-matter specialists before making farming, financial, or operational decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">2. No Liability</h2>
          <p className="mb-4">
            BharatVISTAAR, its developers, associated departments, partners, and service providers shall not be held liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Any direct, indirect, incidental, or consequential loss or damage</li>
            <li>Crop loss, financial loss, or production loss</li>
            <li>Decisions taken based on advisories, weather updates, pest alerts, market information, or other content provided in the application</li>
          </ul>
          <p>
            Use of the information provided on the platform is strictly at the user’s own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">3. Weather and Market Information</h2>
          <p className="mb-4">
            Weather forecasts, pest/disease alerts, and market price data are sourced from authorized agencies and third-party providers. However:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Forecasts are predictive in nature and may change.</li>
            <li>Market prices may vary by location, time, and local trading conditions.</li>
            <li>Real-time accuracy cannot be guaranteed.</li>
          </ul>
          <p>
            Users are encouraged to verify critical information through local authorities or official sources before taking action.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">4. Third-Party Content and Links</h2>
          <p className="mb-4">
            BharatVISTAAR may include links to third-party websites, services, or content for user convenience. These external sites are not controlled or maintained by BharatVISTAAR.
          </p>
          <p className="mb-2">BharatVISTAAR is not responsible for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The content or reliability of third-party platforms</li>
            <li>Privacy practices of external websites</li>
            <li>Any loss or damage arising from use of such external services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">5. User Responsibility</h2>
          <p className="mb-2">Users are responsible for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Ensuring that agricultural practices adopted are suitable for their local soil, climate, and regulatory conditions</li>
            <li>Complying with applicable agricultural, environmental, and government regulations</li>
            <li>Verifying input usage (fertilizers, pesticides, seeds, etc.) as per approved guidelines</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">6. No Professional Relationship</h2>
          <p>
            Use of the BharatVISTAAR platform does not establish any professional, contractual, or advisory relationship between the user and BharatVISTAAR or its affiliated departments.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">7. Updates and Modifications</h2>
          <p>
            BharatVISTAAR reserves the right to modify, update, or remove content and this disclaimer at any time without prior notice. Continued use of the platform constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">8. Governing Jurisdiction</h2>
          <p>
            This disclaimer shall be governed by and interpreted in accordance with the laws of India. Any disputes arising in connection with the use of BharatVISTAAR shall fall under the jurisdiction of competent courts in India.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
