import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, handleDelete, handleEdit, editingId, handleCancelEdit, handleSave , loading, error , page, totalPages, handlePreviousPage, handleNextPage}) => {

  const Expenses = expenses.map((item) => {
    return (
      <div>
        {loading && <p>Loading expenses...</p>}

        {error && <p>{error}</p>}
        <ExpenseItem
          key={item._id}
          expense={item}
          onDelete={handleDelete} // handleDelete ko onDelete me bhr ke child (ExpenseItem) me pass karenge
          onEdit={handleEdit}
          // How does ExpenseItem know whether it is the one being edited?
          isEditing={editingId === item._id}
          onCancelEdit={handleCancelEdit}
          onSave={handleSave}
        // ExpenseItem, make sure onSave is received:
        />
      </div>
    );

  });

  return (
    <div>
      
      <section>
    <div className="mb-4 flex items-center justify-between">
        <div>
            <h2 className="text-xl font-semibold">
                Your Transactions
            </h2>

            <p className="text-sm text-slate-400">
                {/* {sortedExpenses.length} transactions */}
            </p>
        </div>
    </div>

    <div className="space-y-3">
        {Expenses}
    </div>
</section>
<div className="flex items-center justify-center gap-4 py-6">

    <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className="rounded-lg bg-slate-800 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
        Previous
    </button>

    <span>
        Page {page} of {totalPages}
    </span>

    <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="rounded-lg bg-slate-800 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
        Next
    </button>

</div>
    </div>
  )
}

export default ExpenseList
