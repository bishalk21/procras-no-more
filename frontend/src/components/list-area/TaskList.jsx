import { useDispatch } from "react-redux";
import {
  deleteTaskAction,
  switchTaskAction,
} from "../../reducers/tasks/tasksAction";

const TaskList = ({ list, handleOnEdit, title, name }) => {
  const dispatch = useDispatch();

  const handleOnEditItem = (item) => {
    handleOnEdit(item);
  };

  const handleCheckboxClick = (itemID, itemType) => {
    const newType = itemType === "completed" ? "not completed" : "completed";
    dispatch(switchTaskAction(itemID, newType));
  };

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
            {list.length > 0 &&
              list.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      onClick={() => handleCheckboxClick(item._id, item.type)}
                      id="checked-checkbox"
                      type="checkbox"
                      readOnly
                      value={item.type}
                      checked={item.type === "completed"}
                    ></input>
                  </td>
                  <td className="task-name">{item.task}</td>
                  <td className="text-xs">
                    <span className="font-semibold">
                      {item.date && item.date.substr(0, 10)}
                    </span>{" "}
                    ({item.hours}H)
                  </td>
                  <td className="flex flex-row gap-1">
                    <button
                      onClick={() => handleOnEditItem(item)}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                      onClick={() => dispatch(deleteTaskAction(item._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
