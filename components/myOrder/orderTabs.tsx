'use client'

interface Tab {
    key: string;
    label: string;
}

interface OrderTabsProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (key: string) => void;
}

export default function OrderTabs({ tabs, activeTab, setActiveTab }: OrderTabsProps) {
    return (
        <div className="mb-6 overflow-x-auto rounded-xl border bg-white shadow-sm">
            <div className="flex w-full min-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 px-6 py-4 text-sm font-semibold transition relative text-center ${
                            activeTab === tab.key ? "text-[#d93f1d]" : "text-neutral-500"
                        }`}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#d93f1d]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}