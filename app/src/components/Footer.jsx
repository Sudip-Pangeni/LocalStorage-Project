const Footer = () => {
  return (
    <footer className="text-gray-800 font-semibold py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;