import { Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/hamzasaleem2/convex-tanstack-table"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <Github size={48} /> Source code on GitHub 🫀
      </a>
    </footer>
  );
}

export default Footer;
