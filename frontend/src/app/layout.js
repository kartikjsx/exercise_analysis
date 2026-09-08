import "./globals.css";

export const metadata = {
  title: "Calibra | Calorie Burn Simulator",
  description: "Explore how workout variables affect predicted calorie burn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
