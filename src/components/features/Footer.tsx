import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* Company info - spans 5 columns */}
            <div className="md:col-span-5 space-y-5 sm:space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Programmatic
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                  Streamlining workflows through intelligent automation
                  solutions that drive efficiency and innovation for modern
                  businesses.
                </p>
              </div>

              {/* Social links */}
              <div className="flex justify-center md:justify-start space-x-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.897 3.708 13.746 3.708 12.45s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297s2.448.422 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.447-1.418 3.322c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.734 0-1.297-.563-1.297-1.297s.563-1.297 1.297-1.297 1.297.563 1.297 1.297-.563 1.297-1.297 1.297zM12.017 7.729c-2.585 0-4.721 2.136-4.721 4.721s2.136 4.721 4.721 4.721 4.721-2.136 4.721-4.721-2.136-4.721-4.721-4.721z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                  aria-label="Connect with us on LinkedIn"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                {/* Resources */}
                <div>
                  <FooterColumn title="Resources">
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/projects"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      Our Projects
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      Get in Touch
                    </Link>
                    <Link
                      href="/services"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      Services
                    </Link>
                  </FooterColumn>
                </div>

                {/* Support */}
                <div>
                  <FooterColumn title="Support">
                    <Link
                      href="/help"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      Help Center
                    </Link>

                    <Link
                      href="/faq"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/status"
                      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1"
                    >
                      System Status
                    </Link>
                  </FooterColumn>
                </div>

                {/* Contact info */}
                <div>
                  <FooterColumn title="Contact">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2 justify-center sm:justify-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <a
                          href="mailto:alexchen@myprogrammatic.com"
                          className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                        >
                          [support@programmatic.com](mailto:support@programmatic.com)
                        </a>
                      </div>
                      <div className="flex items-start space-x-2 justify-center sm:justify-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-gray-600 text-sm">
                          (424) 378-9749
                        </span>
                      </div>
                      <div className="flex items-start space-x-2 justify-center sm:justify-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="text-gray-600 text-sm">
                          <div>Califonia, United States</div>
                        </div>
                      </div>
                    </div>
                  </FooterColumn>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Programmatic. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-1.5 sm:pb-2">
        {title}
      </h4>
      <div className="space-y-2.5 sm:space-y-3 flex flex-col">{children}</div>
    </div>
  );
};

export default Footer;
