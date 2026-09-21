import { AlertTriangle, X, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({
    isOpen,
    expense,
    onCancel,
    onConfirm,
    isDeleting = false,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-red-100 p-3 text-red-600">
                            <AlertTriangle size={22} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Delete expense?
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                    <p className="font-medium text-gray-900">
                        {expense?.title}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {expense?.category} · ₹
                        {Number(expense?.amount || 0).toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-white" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={17} />
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;