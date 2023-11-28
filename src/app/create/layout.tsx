import ProjectNavigation from "../components/ProjectNavigation/ProjectNavigation";

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-between">
      <ProjectNavigation />
      {children}
    </div>
  );
}

export default layout;