const ProjectList = () => {
  return (
    <div className="flex w-full overflow-hidden flex-col py-5">
      <h3 className="font-normal text-gray-500">PROJECTS</h3>
      <div className="timer h-20 flex flex-row items-center">
        <span className="active relative -top-1 px-2 mr-1">
          <i className="fa-solid fa-plus"></i>
        </span>

        <div className="overflow-hidden flex flex-row items-center justify-start overflow-x-auto gap-2 px-2 py-4">
          <span className="inline-block">Build Not To Do List</span>
          <span className="">Day 01 basics </span>
          <span className="">Day 01 basics </span>
          <span className="">Day 01 basics </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
