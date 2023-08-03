/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const TaskList = () => {
  const tasksList = [];
  return (
    <div className="flex w-full overflow-hidden flex-col py-6">
      <h3 className="font-normal text-gray-500">TASK LISTS</h3>
      <div className="py-4 w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>
                <i className="fa-solid fa-check-to-slot w-4 h-4 text-blue-600"></i>
              </th>
              <th>Task</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((item, i) => (
              <>
                <tr key={i}>
                  <td>
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                  </td>
                  <td>{item.task}</td>
                  <td>{item.hours} hrs</td>
                  <td className="flex flex-row gap-1">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                      Edit
                    </button>
                    <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
