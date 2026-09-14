import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({expenses , handleDelete , handleEdit , editingId , handleCancelEdit , handleSave}) => {
    
  const Expenses = expenses.map((item) => {
    return (
      <ExpenseItem
        key={item.id}
        expense={item}
        onDelete={handleDelete} // handleDelete ko onDelete me bhr ke child (ExpenseItem) me pass karenge
        onEdit={handleEdit}
        // How does ExpenseItem know whether it is the one being edited?
        isEditing={editingId === item.id}
        onCancelEdit={handleCancelEdit}
        onSave={handleSave}
      // ExpenseItem, make sure onSave is received:
      />
    );

  });

  return (
    <div>ExpenseList
        {Expenses}
        </div>
  )
}

export default ExpenseList
