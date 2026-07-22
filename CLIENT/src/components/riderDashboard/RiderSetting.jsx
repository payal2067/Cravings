import React, { useState } from "react";
import RiderInformation from "./settings/RiderInformation";
import RiderCoreDetails from "./settings/RiderCoreDetails";

const tabs = [
  { id: "information", label: "Information" },
  { id: "coreDetails", label: "Core Details" },

];

const RiderSetting = () => {
  const [activeTab, setActiveTab] = useState("coreDetails");
  const [isRiderOpen, setIsRiderOpen] = useState(true);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center border-b border-(--color-secondary)/50 mb-2">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 uppercase cursor-pointer border-b-[3px] ${
                activeTab === tab.id
                  ? "text-(--color-primary) border-(--color-primary)"
                  : "border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="isOpen"
            className="text-xs font-semibold"
          >
            Currently Open
          </label>

          <input
            id="isOpen"
            type="checkbox"
            checked={isRiderOpen}
            onChange={() => setIsRiderOpen((prev) => !prev)}
            className="w-4 h-4 accent-(--color-primary)"
          />
        </div>
      </div>

      <div className="flex-1 rounded-lg bg-(--color-base-200) p-2">
        {activeTab === "information" && <RiderInformation />}
        {activeTab === "coreDetails" && <RiderCoreDetails />}
      
      </div>
    </div>
  );
};

export default RiderSetting;