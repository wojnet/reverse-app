import Providers from "@/redux/provider";

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Providers>
      <div className="w-full h-screen bg-app-gray text-app-text flex justify-between">
        {children}
      </div>
    </Providers>
  );
}

export default layout;