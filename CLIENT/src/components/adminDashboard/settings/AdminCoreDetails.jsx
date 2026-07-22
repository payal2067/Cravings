 import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/ApiConfig";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
import PasswordChangeModal from "../../commonModals/PasswordChangeModal";
import RunningLoader from "../../../assets/runningLoader.gif";

const AdminInformation = () => {
  const { user, setUser } = useAuth();

  // Common State variables
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // Restaurant handlers
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [loadingCustomerError, setLoadingCustomerError] = useState(null);
  const [customerData, setCustomerData] = useState();
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [customerFormData, setCustomerFormData] = useState({
    customerName: customerData?.customerName || "",
    address: customerData?.address || "",
    city: customerData?.city || "",
    state: customerData?.state || "",
    pinCode: customerData?.pinCode || "",
    country: customerData?.country || "",
    customerType: customerData?.customerType || "",
    addressType: customerData?.addressType || false,
    geoLat: customerData?.geoLocation?.lat || "",
    geoLon: customerData?.geoLocation?.lon || "",
    isActive: customerData?.isActive || "true",
    status: customerData?.status || "pending",
  });

  const handleCustomerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerFormData({
      ...customerFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveCustomer = async () => {
    try {
      setIsLoading(true);

      // Prepare payload for customer update
      console.log("customerFormData", customerFormData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update customer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCustomer = () => {
    setCustomerFormData({
      customerName: customerData?.customerName || "",
      address: customerData?.address || "",
      city: customerData?.city || "",
      state: customerData?.state || "",
      pinCode: customerData?.pinCode || "",
      country: customerData?.country || "",
      customerType: customerData?.customerType || "",
      addressType: customerData?.addressType || false,
      geoLat: customerData?.geoLocation?.lat || "",
      geoLon: customerData?.geoLocation?.lon || "",
      isActive: customerData?.isActive || "true",
      status: customerData?.status || "pending",
    });
    setEditingCustomer(false);
  };

  const fetchCustomerData = async () => {
    try {
      setIsLoadingCustomer(true);

      const res = await api.get(`/customer/get-customer-data?id=${user._id}`);
      setCustomerData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching customer. Please try again.",
      );
      setLoadingCustomerError(
        error.response?.data?.message ||
          "Unknown error occurred fetching customer. Please try again.",
      );
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  useEffect(() => {
    // fetchCustomerData();
  }, [user]);

  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        {/* Customer Information Section */}
        {isLoadingCustomer ? (
          <div className="flex flex-col justify-center items-center h-64">
            <img src={RunningLoader} alt="Loading..." className="w-40 h-40" />
            <span className="text-lg text-(--color-primary) font-semibold mt-2 animate-bounce">
              Fetching Customer Information
            </span>
          </div>
        ) : loadingCustomerError ? (
          <div className="flex flex-col justify-center items-center h-64">
            <span className="text-lg text-(--color-error) font-semibold mt-2">
              {loadingCustomerError}
            </span>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 h-full">
              {/* Address Information */}
              <div className="bg-(--color-base-100) rounded-lg p-3">
                <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="w-full text-sm font-semibold text-(--color-primary)">
                      Address
                    </h3>
                  </div>

                  {!editingCustomer ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingCustomer(true)}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleSaveCustomer}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelCustomer}
                        className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
                  <div className="w-full">
                    <label className="text-xs font-semibold">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={customerFormData?.address || ""}
                      onChange={handleCustomerChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingCustomer}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={customerFormData?.city || ""}
                      onChange={handleCustomerChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingCustomer}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">State</label>
                    <input
                      type="text"
                      name="state"
                      value={customerFormData?.state || ""}
                      onChange={handleCustomerChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingCustomer}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Pin Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={customerFormData?.pinCode || ""}
                      onChange={handleCustomerChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingCustomer}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={customerFormData?.country || ""}
                      onChange={handleCustomerChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingCustomer}
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="w-full">
                      <label className="text-xs font-semibold">Latitude</label>
                      <input
                        type="text"
                        name="geoLat"
                        value={customerFormData?.geoLat || ""}
                        onChange={handleCustomerChange}
                        placeholder="e.g. 28.6139"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled={!editingCustomer}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-xs font-semibold">Longitude</label>
                      <input
                        type="text"
                        name="geoLon"
                        value={customerFormData?.geoLon || ""}
                        onChange={handleCustomerChange}
                        placeholder="e.g. 77.2090"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingCustomer ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled={!editingCustomer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminInformation;
