import convexLogo from "./assets/convex-logo-only.svg";

export const Header = () => {
  return (
    <div className="header">
      <h1>Hello Tanstack Table!</h1>
      <h2>powered by Convex</h2>
      <div>
        <img src={convexLogo} alt="Convex Logo" width="50" height="50" />
      </div>
      
    </div>
  );
};
