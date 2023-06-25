export const Square = ({ children, isselected, updateBoard, index }) => {
  const className = `square ${isselected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
