import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-padding py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-semibold">Insight AI</span>
            </Link>
            <p className="text-neutral-600 text-sm">
              Search Trends Analytics Platform
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Blog</a></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © 2024 Insight AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;