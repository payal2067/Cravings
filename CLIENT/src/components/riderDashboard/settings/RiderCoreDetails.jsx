import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/ApiConfig";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
import PasswordChangeModal from "../../commonModals/PasswordChangeModal";
import RunningLoader from "../../../assets/runningLoader.gif";

const RiderCoreDetails = () => {
  const { user, setUser } = useAuth();

  // Common State variables
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // Restaurant handlers
  const [isLoadingRider, setIsLoadingRider] = useState(false);
  const [loadingRiderError, setLoadingRiderError] = useState(null);
  const [riderData, setRiderData] = useState();
  const [editingRider, setEditingRider] = useState(false);
  const [riderFormData, setRiderFormData] = useState({
    riderName: riderData?.riderName || "",
    address: riderData?.address || "",
    city: riderData?.city || "",
    state: riderData?.state || "",
    pinCode: riderData?.pinCode || "",
    country: riderData?.country || "",
    description: riderData?.description || "",
    riderType: riderData?.riderType || "",
    cuisineTypes: riderData?.cuisineTypes?.join(", ") || "",
    isOpen: riderData?.isOpen || false,
    contactEmail: riderData?.contactDetails?.email || "",
    contactPhone: riderData?.contactDetails?.phone || "",
    openingTime: riderData?.servingHours?.openingTime || "",
    closingTime: riderData?.servingHours?.closingTime || "",
    geoLat: riderData?.geoLocation?.lat || "",
    geoLon: riderData?.geoLocation?.lon || "",
    socialMediaLinks: riderData?.socialMediaLinks || [],
  });

  const handleRiderChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRiderFormData({
      ...riderFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updated = riderFormData.socialMediaLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setRiderFormData({ ...riderFormData, socialMediaLinks: updated });
  };

  const addSocialMediaLink = () => {
    setRiderFormData({
      ...riderFormData,
      socialMediaLinks: [
        ...riderFormData.socialMediaLinks,
        { platform: "", url: "" },
      ],
    });
  };

  const removeSocialMediaLink = (index) => {
    setRiderFormData({
      ...riderFormData,
      socialMediaLinks: riderFormData.socialMediaLinks.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const handleSaveRider = async () => {
    try {
      setIsLoading(true);

      // Prepare payload for rider update
      console.log("riderFormData", riderFormData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update rider");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRider = () => {
    setRiderFormData({
      riderName: riderData?.riderName || "",
      address: riderData?.address || "",
      city: riderData?.city || "",
      state: riderData?.state || "",
      pinCode: riderData?.pinCode || "",
      country: riderData?.country || "",
      description: riderData?.description || "",
      riderType: riderData?.riderType || "",
      cuisineTypes: riderData?.cuisineTypes?.join(", ") || "",
      isOpen: riderData?.isOpen || false,
      contactEmail: riderData?.contactDetails?.email || "",
      contactPhone: riderData?.contactDetails?.phone || "",
      openingTime: riderData?.servingHours?.openingTime || "",
      closingTime: riderData?.servingHours?.closingTime || "",
      geoLat: riderData?.geoLocation?.lat || "",
      geoLon: riderData?.geoLocation?.lon || "",
      socialMediaLinks: riderData?.socialMediaLinks || [],
    });
    setEditingRider(false);
  };

  const fetchRiderData = async () => {
    try {
      setIsLoadingRider(true);

      const res = await api.get(`/rider/get-rider-data?id=${user._id}`);
      setRiderData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching rider. Please try again.",
      );
      setLoadingRiderError(
        error.response?.data?.message ||
          "Unknown error occurred fetching rider. Please try again.",
      );
    } finally {
      setIsLoadingRider(false);
    }
  };

  useEffect(() => {
    // fetchRiderData();
  }, [user]);

  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        {/* Rider Information Section */}
        {isLoadingRider ? (
          <div className="flex flex-col justify-center items-center h-64">
            <img src={RunningLoader} alt="Loading..." className="w-40 h-40" />
            <span className="text-lg text-(--color-primary) font-semibold mt-2 animate-bounce">
              Fetching Rider Information
            </span>
          </div>
        ) : loadingRiderError ? (
          <div className="flex flex-col justify-center items-center h-64">
            <span className="text-lg text-(--color-error) font-semibold mt-2">
              {loadingRiderError}
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

                  {!editingRider ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingRider(true)}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleSaveRider}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelRider}
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
                      value={riderFormData?.address || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={riderFormData?.city || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">State</label>
                    <input
                      type="text"
                      name="state"
                      value={riderFormData?.state || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Pin Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={riderFormData?.pinCode || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={riderFormData?.country || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="w-full">
                      <label className="text-xs font-semibold">Latitude</label>
                      <input
                        type="text"
                        name="geoLat"
                        value={riderFormData?.geoLat || ""}
                        onChange={handleRiderChange}
                        placeholder="e.g. 28.6139"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled={!editingRider}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-xs font-semibold">Longitude</label>
                      <input
                        type="text"
                        name="geoLon"
                        value={riderFormData?.geoLon || ""}
                        onChange={handleRiderChange}
                        placeholder="e.g. 77.2090"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled={!editingRider}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Banking and Document */}
              <div className="bg-(--color-base-100) rounded-lg p-3">
                <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="w-full text-sm font-semibold text-(--color-primary)">
                      Banking & Documents
                    </h3>
                  </div>

                  {!editingRider ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingRider(true)}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleSaveRider}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelRider}
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
                    <label className="text-xs font-semibold">Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={riderFormData?.address || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={riderFormData?.city || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">IFSC Code</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={riderFormData?.state || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">
                      Pan Card Number
                    </label>
                    <input
                      type="text"
                      name="panCard"
                      value={riderFormData?.pinCode || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">GST Number</label>
                    <input
                      type="text"
                      name="gst"
                      value={riderFormData?.country || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-xs font-semibold">fssai Code</label>
                    <input
                      type="text"
                      name="fssai"
                      value={riderFormData?.country || ""}
                      onChange={handleRiderChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRider ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRider}
                    />
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

export default RiderCoreDetails;
