import React from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";

const Contact: React.FC = () => {
  return (
    <PageTemplate>
      <div className="text-center">
        <Typography variant="h6" className="mb-4">
          We’d love to hear from you! Reach out with any questions or feedback.
        </Typography>
        <Typography variant="body1" className="mb-8">
          Feel free to contact us via email at support@walletapp.com or through
          the form below.
        </Typography>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-dark-200 text-white rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-dark-200 text-white rounded-lg"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-dark-200 text-white rounded-lg"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default Contact;
