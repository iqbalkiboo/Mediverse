import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {config} from '@/utils/firebase/firebaseConfig';
import {fetchAndActivate, getAll, getRemoteConfig} from 'firebase/remote-config';

type Settings = Record<string, boolean> | undefined;

type SettingsContextValue = Settings;

export const SettingsContext = createContext<SettingsContextValue>({});

export const FlagsProvider = (props: PropsWithChildren<{default: any}>) => {
  const [flags, setFlags] = useState<Settings>(props.default);

  const firebaseApp = initializeApp(config);
  const remoteConfig = getRemoteConfig(firebaseApp);

  remoteConfig.settings.fetchTimeoutMillis = 3600000;
  remoteConfig.defaultConfig = props.default;

  useEffect(() => {
    setFlags(props.default);
    remoteConfig.defaultConfig = props.default;

    fetchAndActivate(remoteConfig).then(() => {
      return getAll(remoteConfig);
    }).then((remoteFlags) => {
      const newFlags: Settings = {
        ...flags,
      };

      for (const [key, config] of Object.entries(remoteFlags)) {
        newFlags[key] = config.asBoolean();
      }
      setFlags(newFlags);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <SettingsContext.Provider value={flags}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useRemoteConfigFlags = () => {
  const context = useContext(SettingsContext);

  return context;
};

export default FlagsProvider;
