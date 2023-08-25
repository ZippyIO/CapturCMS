import UserDropdown from '~/components/UserDropdown';
import { getUser } from '~/server/user';

const DashboardNavbar = async () => {
  const user = await getUser();

  return (
    <header className="col-start-2 row-start-1 flex justify-end self-center border-b px-4 py-2">
      <UserDropdown user={user} />
    </header>
  );
};

export default DashboardNavbar;
