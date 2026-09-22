import { useAuth } from "../context/AuthContext";
const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Profile
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Manage your account information.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Profile header */}

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {user?.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    {/* Account information */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Account Information
                        </h3>

                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Name
                                </p>
                                <p className="mt-1 text-sm text-gray-900">
                                    {user?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Email
                                </p>
                                <p className="mt-1 text-sm text-gray-900">
                                    {user?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    User ID
                                </p>
                                <p className="mt-1 break-all text-sm text-gray-500">
                                    {user?.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;