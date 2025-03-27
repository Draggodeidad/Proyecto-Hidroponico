import React, { createContext, useContext, useState, ReactNode } from "react";

interface MonitoringData {
  ph: number | null;
  temperatura: number | null;
  tds: number | null;
  turbidez: number | null;
  timeActive: number | null;
}

interface MonitoringContextType {
  monitoringData: MonitoringData;
  updateMonitoringData: (data: Partial<MonitoringData>) => void;
}

const defaultValue: MonitoringContextType = {
  monitoringData: {
    ph: null,
    temperatura: null,
    tds: null,
    turbidez: null,
    timeActive: null,
  },
  updateMonitoringData: () => {},
};

const MonitoringContext = createContext<MonitoringContextType>(defaultValue);

export const useMonitoring = () => useContext(MonitoringContext);

export const MonitoringProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData>(
    defaultValue.monitoringData
  );

  const updateMonitoringData = (data: Partial<MonitoringData>) => {
    setMonitoringData((prev) => ({ ...prev, ...data }));
  };

  return (
    <MonitoringContext.Provider
      value={{ monitoringData, updateMonitoringData }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export default MonitoringContext;
