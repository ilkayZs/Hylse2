import React from 'react';

function Privacy() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>Effective Date: 3/08/2024</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Your privacy is important to us. This Privacy Policy explains how Hylse collects, uses, and protects your personal information when you use our services, including logging in with Google OAuth through Clerk and interacting with our application connected to the Google AI API.</h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">1. Information We Collect</h3>
      <p>When you use our application, we may collect the following information:</p>
      <ul className="list-disc list-inside">
        <li><strong>Personal Information:</strong> This includes your name, email address, and any other information you provide when logging in with Google OAuth through Clerk.</li>
        <li><strong>Usage Data:</strong> We collect data on how you use our application, including your interactions with the Google AI API.</li>
        <li><strong>Technical Data:</strong> This includes your IP address, browser type, and device information.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">2. How We Use Your Information</h3>
      <p>The information we collect is used to:</p>
      <ul className="list-disc list-inside">
        <li>Provide and improve our services.</li>
        <li>Authenticate your access to our application using Clerk and Google OAuth.</li>
        <li>Respond to your inquiries and provide customer support.</li>
        <li>Analyze usage patterns to enhance user experience and application performance.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">3. Sharing Your Information</h3>
      <p>We do not share your personal information with third parties except:</p>
      <ul className="list-disc list-inside">
        <li>With your consent.</li>
        <li>With service providers who perform services on our behalf (e.g., Clerk for authentication).</li>
        <li>To comply with legal requirements or respond to lawful requests by public authorities.</li>
        <li>To protect and defend our rights and property.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">4. Data Security</h3>
      <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet or email transmission is ever fully secure or error-free.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5. Your Rights</h3>
      <p>You have the right to:</p>
      <ul className="list-disc list-inside">
        <li>Access the personal information we hold about you.</li>
        <li>Request the correction or deletion of your personal information.</li>
        <li>Object to the processing of your personal information.</li>
        <li>Withdraw your consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">6. Cookies</h3>
      <p>Our application uses cookies to enhance your experience. Cookies are small data files stored on your device. You can set your browser to refuse cookies, but this may limit your ability to use certain features of our application.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">7. Changes to This Privacy Policy</h3>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">8. Contact Us</h3>
      <p>If you have any questions about this Privacy Policy, please contact us at hylsesai@gmail.com.</p>
      <p>Hylse </p>

      <p>This Privacy Policy is designed to comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
    </div>
  );
};

export default Privacy;
