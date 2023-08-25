import SettingsContainer from '~/components/SettingsContainer';
import { getApp } from '~/server/app';

const Settings = async () => {
  const app = await getApp();
  return (
    <main className="flex flex-col items-center justify-between p-8">
      {app && <SettingsContainer app={app} />}
    </main>
  );
};

export default Settings;
