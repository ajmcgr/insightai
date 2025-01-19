import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-padding py-12 md:py-16">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="https://x.com/worksxyz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Follow on X</a></li>
              <li><a href="mailto:support@tryinsight.ai" className="hover:text-primary transition-colors">Email Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-neutral-600">
            Copyright © 2025 Works App, Inc. Built with ♥️ by <a href="https://www.works.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Works</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;