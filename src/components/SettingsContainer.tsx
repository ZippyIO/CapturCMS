'use client';

import { type App } from '@prisma/client';
import { Label } from '~/components/ui/Label';

import { Switch } from '~/components/ui/Switch';
import { editApp } from '~/server/app';

interface Props {
  app: App;
}

const SettingsContainer = ({ app }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="access-level"
        defaultChecked={app.public}
        onCheckedChange={(e) => editApp({ public: e })}
      />
      <Label htmlFor="access-level">API Public Access</Label>
    </div>
  );
};

export default SettingsContainer;
