const UserInputError = ({ errorObj, inputName, singular = false }) => {
  // if errorObj is empty, return null
  if (Object.keys(errorObj).length === 0) return null;
  // if any lenth return div with inputName error(s)
  // and map over errorObj and return p tag for each proerty
  return (
    <div className="flex items-center space-x-4">
      <p className="w-1/6 flex-shrink-0 font-medium text-right mr-4 text-red-500">
        {inputName} {singular ? "Error" : "Error(s)"}:
      </p>

      <div className="overflow-hidden break-words">
        {Object.keys(errorObj).map((key, index) => {
          return (
            <p key={index} className="text-red-500 font-text mt-1 mb-1">
              {errorObj[key]}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default UserInputError;
