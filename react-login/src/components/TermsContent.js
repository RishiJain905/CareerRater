import React from 'react';

const TermsContent = () => {
  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-4">
          <strong>Last updated:</strong> August 24, 2025
        </p>
        <p className="mb-4">
          Welcome to CareerRater. By creating an account and using our service, you agree to comply with and be bound by the following terms and conditions.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h4>
          <p className="mb-3">
            By accessing and using CareerRater, you accept and agree to be bound by these Terms and Conditions. If you do not agree to abide by these terms, please do not use this service.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">2. Description of Service</h4>
          <p className="mb-3">
            CareerRater is a platform that allows users to rate and review career-related services, companies, and opportunities. We provide tools for users to share their professional experiences and insights.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">3. User Accounts</h4>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your password</li>
            <li>You agree to notify us immediately of any unauthorized use of your account</li>
            <li>One person may not maintain more than one account</li>
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">4. User Conduct</h4>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Post false, misleading, or defamatory content</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Harass, threaten, or harm other users</li>
            <li>Upload malicious code or attempt to hack the system</li>
            <li>Use the service for spam or unauthorized advertising</li>
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">5. Privacy Policy</h4>
          <p className="mb-3">
            Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy, which is incorporated into these terms by reference.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">6. Content Ownership</h4>
          <p className="mb-3">
            You retain ownership of content you post, but grant CareerRater a license to use, display, and distribute your content on our platform. We reserve the right to remove content that violates these terms.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">7. Disclaimers</h4>
          <p className="mb-3">
            CareerRater is provided "as is" without warranties of any kind. We do not guarantee the accuracy of user-generated content and are not responsible for decisions made based on information found on our platform.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">8. Limitation of Liability</h4>
          <p className="mb-3">
            CareerRater shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">9. Termination</h4>
          <p className="mb-3">
            We reserve the right to terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">10. Changes to Terms</h4>
          <p className="mb-3">
            We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of updated terms.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">11. Contact Information</h4>
          <p className="mb-3">
            If you have questions about these Terms and Conditions, please contact us at:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Email:</strong> support@careerrator.com</p>
            <p><strong>Address:</strong> [Your Company Address]</p>
          </div>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          By clicking "I Understand" or using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsContent;
