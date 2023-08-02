const CreateTask = () => {
  return (
    <div className="flex w-full flex-col pb-2">
      <h3 className="font-normal text-gray-500">TITLE</h3>
      <div className="input-field relative flex flex-col gap-4 py-4">
        <div className="flex w-full gap-4 justify-between">
          <input
            type="text"
            placeholder="Task Name"
            className="text-black w-4/6"
            name="task"
          />
          <input
            type="number"
            className="w-2/6"
            placeholder="10"
            name="hours"
          />
        </div>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          id="description"
        />
        <p className="absolute bottom-4 right-0 italic transform -translate-x-1/2 -translate-y-1/2">
          (optional)
        </p>
      </div>
      <button
        className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
        type="submit"
      >
        Create
      </button>
    </div>
  );
};

export default CreateTask;
