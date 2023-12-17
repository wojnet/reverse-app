import Providers from "@/redux/provider";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--fira-code",
});

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Providers>
      <div className={`${firaCode.variable} w-full h-screen bg-app-gray text-app-text flex justify-between`}>
        {children}
      </div>
    </Providers>
  );
}

export default layout;