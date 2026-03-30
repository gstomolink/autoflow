'use client';

import { useState } from "react";

export default function SettingsPage() {
  const [tab, setTab] = useState("general");

  const tabs = [
    "general",
    "store",
    "tax",
    "payment",
    "inventory",
    "order",
    "receipt",
    "notification",
    "security",
    "system",
  ];

  const TabButton = ({ id, label }: any) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded cursor-pointer text-sm ${
        tab === id
          ? "bg-sky-500 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="text-gray-700">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-6">Manage system configuration</p>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton id="general" label="General" />
        <TabButton id="store" label="Store" />
        <TabButton id="tax" label="Tax" />
        <TabButton id="payment" label="Payment" />
        <TabButton id="inventory" label="Inventory" />
        <TabButton id="order" label="Orders" />
        <TabButton id="receipt" label="Receipt" />
        <TabButton id="notification" label="Notifications" />
        <TabButton id="security" label="Security" />
        <TabButton id="system" label="System" />
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow">

        {/* GENERAL */}
        {tab === "general" && (
          <div>
            <h2 className="font-semibold mb-4">General Settings</h2>

            <input placeholder="System Name" className="w-full border p-2 rounded mb-3"/>
            <input type="file" className="mb-3"/>
            <input placeholder="Time Zone (Asia/Colombo)" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Currency (LKR)" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Currency Symbol (Rs)" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Date Format (DD/MM/YYYY)" className="w-full border p-2 rounded mb-3"/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        )}

        {/* STORE */}
        {tab === "store" && (
          <div>
            <h2 className="font-semibold mb-4">Store Settings</h2>

            <input placeholder="Store Name" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Address" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="City" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Country" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Phone" className="w-full border p-2 rounded mb-3"/>
            <input placeholder="Email" className="w-full border p-2 rounded mb-3"/>

            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" /> Enable Multi-Store
            </label>

            <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        )}

        {/* TAX */}
        {tab === "tax" && (
          <div>
            <h2 className="font-semibold mb-4">Tax Settings</h2>

            <input placeholder="Default Tax %" className="w-full border p-2 rounded mb-3"/>

            <select className="w-full border p-2 rounded mb-3">
              <option>Inclusive</option>
              <option>Exclusive</option>
            </select>

            <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        )}

        {/* PAYMENT */}
        {tab === "payment" && (
          <div>
            <h2 className="font-semibold mb-4">Payment Settings</h2>

            <label><input type="checkbox"/> Cash</label><br/>
            <label><input type="checkbox"/> Card</label><br/>
            <label><input type="checkbox"/> Bank Transfer</label><br/>

            <select className="w-full border p-2 rounded my-3">
              <option>Default Payment</option>
            </select>

            <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        )}

        {/* INVENTORY */}
        {tab === "inventory" && (
          <div>
            <h2 className="font-semibold mb-4">Inventory Settings</h2>

            <label><input type="checkbox"/> Allow Negative Stock</label><br/>
            <label><input type="checkbox"/> Auto Deduct on Payment</label><br/>

            <input placeholder="Reorder Level" className="w-full border p-2 rounded my-3"/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        )}

        {/* ORDER */}
        {tab === "order" && (
          <div>
            <h2 className="font-semibold mb-4">Order Settings</h2>

            <input placeholder="Order Prefix (ORD-)" className="w-full border p-2 rounded mb-3"/>

            <label><input type="checkbox"/> Allow Cancellation</label><br/>
            <label><input type="checkbox"/> Allow Refund</label><br/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-3">Save</button>
          </div>
        )}

        {/* RECEIPT */}
        {tab === "receipt" && (
          <div>
            <h2 className="font-semibold mb-4">Receipt Settings</h2>

            <textarea placeholder="Header Text" className="w-full border p-2 rounded mb-3"/>
            <textarea placeholder="Footer Text" className="w-full border p-2 rounded mb-3"/>

            <label><input type="checkbox"/> Show Logo</label><br/>
            <label><input type="checkbox"/> Auto Print</label><br/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-3">Save</button>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notification" && (
          <div>
            <h2 className="font-semibold mb-4">Notification Settings</h2>

            <label><input type="checkbox"/> Low Stock Alert</label><br/>
            <label><input type="checkbox"/> Order Success</label><br/>
            <label><input type="checkbox"/> Payment Failure</label><br/>

            <input placeholder="SMTP Email" className="w-full border p-2 rounded mt-3"/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-3">Save</button>
          </div>
        )}

        {/* SECURITY */}
        {tab === "security" && (
          <div>
            <h2 className="font-semibold mb-4">Security Settings</h2>

            <label><input type="checkbox"/> Enable 2FA</label><br/>
            <label><input type="checkbox"/> Session Timeout</label><br/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-3">Save</button>
          </div>
        )}

        {/* SYSTEM */}
        {tab === "system" && (
          <div>
            <h2 className="font-semibold mb-4">System Settings</h2>

            <label><input type="checkbox"/> Maintenance Mode</label><br/>
            <label><input type="checkbox"/> Enable Logs</label><br/>

            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-3">Save</button>
          </div>
        )}

      </div>
    </div>
  );
}