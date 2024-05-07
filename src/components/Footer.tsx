import Logo from "./Logo";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-t-slate-600">
      <div className="px-4 py-8 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <Logo />

        <p className="mt-4 text-center text-sm text-gray-400">
          Copyright &copy; {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
