import { useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import {
  ArrowRight,
} from "lucide-react";
const FAQS = [
  {
    question: "What is BIZOOP?",
    answer:
      "BIZOOP is a Business Operating System designed around the way different industries actually operate. It connects your daily operations, people, customers, inventory, billing and business data in one platform.",
  },
  {
    question: "What is a Business Operating System?",
    answer:
      "A Business Operating System brings the important parts of running a business into one connected environment. Instead of managing separate tools for different processes, your operations, information and workflows work together.",
  },
  {
    question: "Which industries does BIZOOP support?",
    answer:
      "BIZOOP provides industry-focused BOS solutions including Tyre BOS, Transport BOS and Tailor BOS, with additional industry solutions planned for the future.",
  },
  {
    question: "What is the difference between BIZOOP and an ERP?",
    answer:
      "BIZOOP is designed around industry-specific workflows and everyday business operations rather than forcing every business into the same generic workflow.",
  },
  {
    question: "Can I try BIZOOP before subscribing?",
    answer:
      "Yes. BIZOOP provides a 14-day free trial so businesses can explore the platform before choosing a paid plan.",
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="footer container">
        <div className="footer-cta" data-reveal>
          <div>
            <p className="eyebrow mb-3">Ready to get started?</p>
            <h2>Join thousands of teams already on Bizooop.</h2>
            <p>Book a demo today and see how Bizooop can work for your business.</p></div>
          <button className="pill-button demo-button">Get Started <ArrowRight /></button>
          <div className="footer-waves" />
        </div>
      </div>
          <section className="faq-section" id="faq">
      <div className="container faq-container">
        <div className="faq-header" data-reveal>
          <div className="eyebrow">
            FAQ · QUESTIONS, ANSWERED
          </div>

          <h2>
            Everything you need
            <br />
            <span>to know before you start.</span>
          </h2>

          <p>
            A few answers about BIZOOP, Business Operating Systems,
            onboarding and how the platform fits into your business.
          </p>
        </div>

        {/* FAQ */}
        <div className="faq-list" data-reveal>
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-left">
                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">
                      {faq.question}
                    </span>
                  </div>

                  <span className="faq-toggle">
                    <IoAdd />
                  </span>
                </button>

                <div
                  className={`faq-answer ${
                    isOpen ? "faq-answer-open" : ""
                  }`}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="faq-footer" data-reveal>
          <div>
            <span>STILL HAVE QUESTIONS?</span>
          </div>

          <button className="faq-cta">
            Talk to our team
            <RiArrowRightLine />
          </button>
        </div>

      </div>
    </section>
    </div>
  );
};

export default FAQSection;