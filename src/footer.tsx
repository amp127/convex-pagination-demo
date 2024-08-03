import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/hamzasaleem2/convex-tanstack-table"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <FaGithub size={48} /> Source code on GitHub 🫀
      </a>
    </footer>
  );
}

export default Footer;
