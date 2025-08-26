import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "@/components/shopping-view/footer";

const Policy = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  const privacySections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `Trustmart (“we”, “our”, “us”) values and protects your privacy. Whether you are a buyer or a vendor, all transactions and deliveries are handled by us directly, ensuring your data never gets into unauthorized hands.`,
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: `We may collect:
• Personal Information: Name, phone number, email, address, campus.
• Order Information: Products purchased, delivery location, and payment method.
• Vendor Information: Stock details, supply agreements, and verification data.
• Cookies & Tracking Data: When you use our app or website, we may collect technical data (via cookies, pixels, or analytics tools) to improve user experience and marketing.`,
    },
    {
      id: "information-use",
      title: "3. How We Use Your Information",
      content: `We use your data to:
• Process orders and deliveries efficiently.
• Verify vendors and ensure product quality.
• Communicate updates about orders or services.
• Improve our platform and personalize your shopping experience.
• Provide safe and reliable customer support.`,
    },
    {
      id: "data-retention",
      title: "4. Data Retention",
      content: `• Personal and order data is retained for up to 12 months for dispute resolution and audit purposes.
• Vendor account records may be retained longer to maintain compliance.`,
    },
    {
      id: "data-protection",
      title: "5. Data Protection",
      content: `• All personal data is stored securely with encryption.
• We do not sell or trade your information.
• We do not share your details with vendors – all interactions happen through Trustmart.`,
    },
    {
      id: "age-restriction",
      title: "6. Age Restriction",
      content: `Trustmart is designed for users 16 years and older. By registering, you confirm that you meet this requirement.`,
    },
    {
      id: "information-sharing",
      title: "7. Information Sharing",
      content: `We only share information when:
• Required by law.
• Necessary for secure payment processing.
• Needed for internal delivery and logistics.`,
    },
    {
      id: "your-rights",
      title: "8. Your Rights",
      content: `You may:
• Request to view, update, or delete your data.
• Opt out of marketing communications at any time.

For requests, contact: noreply.trustmart@gmail.com`,
    },
  ];

  const refundSections = [
    {
      id: "buyers",
      title: "For Buyers",
      content: `We guarantee a refund if:
• The item is damaged or defective.
• The wrong item is delivered.
• The product is not as described.

Conditions:
• Requests must be made within 24 hours of delivery.
• Provide clear proof (photo/video).
• Certain items (perishables, hygiene goods, and custom orders) are not eligible for refund.

Process:
1. Contact Trustmart directly via app or website.
2. Our team will review and confirm your claim.
3. If approved, we arrange a replacement or issue a refund within 3 working days.

Additional Notes:
• Partial Orders: If only part of your order is wrong/damaged, we may issue a partial refund.
• Delivery Fees: Delivery charges are non-refundable, unless the vendor/Trustmart is at fault.
• Final Decision: Trustmart's decision after review is final.`,
    },
    {
      id: "vendors",
      title: "For Vendors",
      content: `• Vendors supply products to Trustmart, not directly to customers.
• All customer complaints are handled by Trustmart.
• Vendors must cooperate only for product verification and replacement.
• Vendors must maintain accurate stock and meet agreed quality standards.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0057B8] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Trustmart Policies</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Policy Type Selector */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeSection === "privacy"
                ? "text-[#0057B8] border-b-2 border-[#0057B8]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveSection("privacy")}
          >
            Privacy Policy
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeSection === "refund"
                ? "text-[#0057B8] border-b-2 border-[#0057B8]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveSection("refund")}
          >
            Refund Policy
          </button>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Policy Header */}
          <div className="bg-[#0057B8] text-white p-6">
            <h2 className="text-2xl font-bold mb-2">
              {activeSection === "privacy" ? "Privacy Policy" : "Refund Policy"}
            </h2>
            <p className="opacity-90">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="p-6">
            {activeSection === "privacy" ? (
              <div className="space-y-8">
                {privacySections.map((section, index) => (
                  <PolicySection key={index} section={section} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {refundSections.map((section, index) => (
                  <PolicySection key={index} section={section} />
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Need more help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about our policies, please contact us
              at:
            </p>
            <a
              href="mailto:noreply.trustmart@gmail.com"
              className="inline-flex items-center text-[#0057B8] font-medium hover:underline"
            >
              noreply.trustmart@gmail.com
            </a>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#0057B8] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PolicySection = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 prose prose-blue max-w-none">
          {section.content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-3 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Policy;
