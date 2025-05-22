"use client";

import { useState, useEffect } from "react";
import { AccessibilityPoint } from "../api";

interface AddAccessibilityPointProps {
  onAdd: (point: Omit<AccessibilityPoint, "id">) => void;
  position: [number, number] | null;
  onCancel: () => void;
}

const AddAccessibilityPoint: React.FC<AddAccessibilityPointProps> = ({
  onAdd,
  position,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [accessibilityStatus, setAccessibilityStatus] = useState<
    "yes" | "limited" | "no"
  >("yes");
  const [description, setDescription] = useState("");
  const [entranceType, setEntranceType] = useState<string>("");
  const [hasRamp, setHasRamp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to animate the modal in
  useEffect(() => {
    if (position) {
      setIsVisible(true);
    }
    return () => {
      setIsVisible(false);
    };
  }, [position]);

  // Handle escape key to cancel
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isSubmitting]);

  if (!position) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Create a new accessibility point
    const newPoint: Omit<AccessibilityPoint, "id"> = {
      type: "node",
      lat: position[0],
      lon: position[1],
      tags: {
        name: name || undefined,
        wheelchair: accessibilityStatus,
        "wheelchair:description": description || undefined,
        entrance: entranceType || undefined,
        ramp: hasRamp ? "yes" : undefined,
      },
    };

    // Pass the new point to the parent component
    onAdd(newPoint);

    // Reset form (not needed as component will unmount)
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    // Animate out before unmounting
    setIsVisible(false);
    setTimeout(() => {
      onCancel();
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget && !isSubmitting) {
      handleCancel();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-200 z-50 ${
        isVisible ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Accessibility Point
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          At position: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Location Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Main Entrance, South Gate"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wheelchair Accessibility
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accessibility"
                  checked={accessibilityStatus === "yes"}
                  onChange={() => setAccessibilityStatus("yes")}
                  className="mr-2 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Full Access
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accessibility"
                  checked={accessibilityStatus === "limited"}
                  onChange={() => setAccessibilityStatus("limited")}
                  className="mr-2 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Limited
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accessibility"
                  checked={accessibilityStatus === "no"}
                  onChange={() => setAccessibilityStatus("no")}
                  className="mr-2 text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  No Access
                </span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the accessibility features or limitations"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="entranceType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Entrance Type
            </label>
            <select
              id="entranceType"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={entranceType}
              onChange={(e) => setEntranceType(e.target.value)}
            >
              <option value="">Not an entrance</option>
              <option value="main">Main Entrance</option>
              <option value="secondary">Secondary Entrance</option>
              <option value="emergency">Emergency Exit</option>
              <option value="service">Service Entrance</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hasRamp}
                onChange={(e) => setHasRamp(e.target.checked)}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Has Wheelchair Ramp
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Point"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccessibilityPoint;
