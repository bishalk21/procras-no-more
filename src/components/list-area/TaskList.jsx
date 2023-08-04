/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const TaskList = ({ list = [], title, name, switchTask, handleOnDelete }) => {
  console.log(list);

  return (
    <div className="flex w-full overflow-hidden flex-col py-6">
      <h3 className="font-normal text-gray-500">
        {title} ({list.length})
      </h3>
      <div className="py-4 w-full">
        <table
          className={`table-auto w-full ${
            name === "completed" ? "completed" : ""
          }`}
        >
          <thead>
            <tr>
              <th>
                <i className="fa-solid fa-check-to-slot w-4 h-4 text-blue-600"></i>
              </th>
              <th>Task</th>
              <th>Complete By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <>
                <tr key={item._id}>
                  <td>
                    <input
                      onClick={() =>
                        switchTask(
                          item._id,
                          item.type === "completed"
                            ? "not completed"
                            : "completed"
                        )
                      }
                      id="checked-checkbox"
                      type="checkbox"
                      checked={item.type === "completed"}
                      value={item._id}
                      readOnly
                    ></input>
                  </td>
                  <td className="task-name">{item.task}</td>
                  <td>
                    {item.hours} hours {item.date && item.date.substr(0, 10)}
                  </td>
                  <td className="flex flex-row gap-1">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                      Edit
                    </button>
                    <button
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                      onClick={() => handleOnDelete(item._id)}
                    >
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
