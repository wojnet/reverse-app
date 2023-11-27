import ProjectNavigation from "../components/ProjectNavigation/ProjectNavigation";

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-theme-4 to-theme-5 flex justify-between">
      <ProjectNavigation />
      {children}
    </div>
  );
}

export default layout;