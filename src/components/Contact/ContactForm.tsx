import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiCheck } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import emailjs from "@emailjs/browser";

interface ContactOption {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const contactOptions: ContactOption[] = [
    {
      icon: <FiMail className="text-2xl" />,
      label: "Email",
      value: "pedro.cruz.lopez001@gmail.com",
      href: "mailto:pedro.cruz.lopez001@gmail.com",
    },
    {
      icon: <FiLinkedin className="text-2xl" />,
      label: "LinkedIn",
      value: "linkedin.com/in/pedro-cruz-037309313",
      href: "https://www.linkedin.com/in/pedro-cruz-037309313",
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      label: "Location",
      value: "Tunja, COL",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        }
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        "Failed to send message. Please try again or contact me directly."
      );
      console.error("Email send error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-dark-secondary/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient-cosmic">Connect</span>
          </h2>
          <p className="text-light text-lg">
            Have a project in mind? Let's talk about how I can help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Get in touch directly
            </h3>

            {contactOptions.map((option, index) => {
              const Wrapper = option.href ? motion.a : motion.div;
              return (
                <Wrapper
                  key={option.label}
                  {...(option.href
                    ? { href: option.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={option.href ? { x: 8 } : undefined}
                  className="group flex items-start gap-4 p-4 rounded-lg border border-accent/20 hover:border-accent/50 bg-dark hover:bg-dark-secondary transition-all duration-300"
                >
                  <div className="text-accent group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <div>
                    <p className="text-accent font-semibold text-sm uppercase tracking-wide">
                      {option.label}
                    </p>
                    <p className="text-light text-base mt-1">{option.value}</p>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-dark p-6 rounded-xl border border-accent/20"
            >
              <div>
                <label className="block text-light text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-dark-secondary border border-accent/30 text-light placeholder-light/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-light text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-dark-secondary border border-accent/30 text-light placeholder-light/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-light text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-dark-secondary border border-accent/30 text-light placeholder-light/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={submitted || loading}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    submitted
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : loading
                      ? "bg-accent/50 text-dark"
                      : "bg-gradient-to-r from-accent to-highlight text-dark hover:shadow-lg hover:shadow-accent/50"
                  }`}
                >
                  {submitted ? (
                    <>
                      <FiCheck className="text-lg" />
                      Message sent!
                    </>
                  ) : loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-lg"
                      >
                        ⚙️
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.div>

              <p className="text-light/60 text-xs text-center">
                I'll get back to you within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
