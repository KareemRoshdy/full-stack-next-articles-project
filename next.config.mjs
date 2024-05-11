/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
withPWA("next-pwa")({
  dest: "public",
});
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
