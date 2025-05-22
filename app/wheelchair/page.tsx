"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import {
  fetchAccessibilityData,
  getSampleAccessibilityData,
  AccessibilityData,
  AccessibilityPoint,
  getPointTitle,
  getPointDescription,
} from "./api";
import AddAccessibilityPoint from "./components/AddAccessibilityPoint";

const WheelchairMapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accessibilityData, setAccessibilityData] =
    useState<AccessibilityData | null>(null);
  const markersLayerRef = useRef<any>(null);
  const [addingPoint, setAddingPoint] = useState<boolean>(false);
  const [newPointPosition, setNewPointPosition] = useState<
    [number, number] | null
  >(null);
  const [userAddedPoints, setUserAddedPoints] = useState<AccessibilityPoint[]>(
    []
  );
  // Add state for user location
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const userMarkerRef = useRef<any>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Function to load and initialize the map
  const initializeMap = useCallback(async () => {
    try {
      setLoading(true);

      // Dynamically import Leaflet
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Return if map container is not available or map is already initialized
      if (!mapRef.current || map) return;

      // Create map instance
      const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Create a layer group for accessibility markers
      markersLayerRef.current = L.layerGroup().addTo(mapInstance);

      // Handle map movement/zoom to update data
      mapInstance.on("moveend", async () => {
        const bounds = mapInstance.getBounds();
        const bbox: [number, number, number, number] = [
          bounds.getSouth(),
          bounds.getWest(),
          bounds.getNorth(),
          bounds.getEast(),
        ];

        await loadAccessibilityData(bbox);
      });

      setMap(mapInstance);

      // Initial data load
      const initialBounds = mapInstance.getBounds();
      const initialBbox: [number, number, number, number] = [
        initialBounds.getSouth(),
        initialBounds.getWest(),
        initialBounds.getNorth(),
        initialBounds.getEast(),
      ];

      await loadAccessibilityData(initialBbox);
    } catch (error) {
      console.error("Error initializing map:", error);
      setError("Failed to initialize map. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, [map]);

  // Function to load accessibility data
  const loadAccessibilityData = async (
    bbox: [number, number, number, number]
  ) => {
    try {
      // Use the API to fetch real data, or fall back to sample data
      let data;
      try {
        data = await fetchAccessibilityData(bbox);
        // If no points were found, use sample data
        if (data.points.length === 0) {
          data = getSampleAccessibilityData();
        }
      } catch (error) {
        console.warn(
          "Error fetching real data, using sample data instead:",
          error
        );
        data = getSampleAccessibilityData();
      }

      setAccessibilityData(data);

      // Update markers on the map if map is initialized
      if (map && markersLayerRef.current) {
        await updateMapMarkers(data);
      }
    } catch (error) {
      console.error("Error loading accessibility data:", error);
      setError("Failed to load accessibility data. Please try again later.");
    }
  };

  // Update markers on the map
  const updateMapMarkers = async (data: AccessibilityData) => {
    if (!map || !markersLayerRef.current) return;

    // Dynamically import Leaflet
    const L = await import("leaflet");

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Create icons with different colors based on wheelchair accessibility
    const fullAccessIcon = L.icon({
      iconUrl: "/accessibility-icon.svg", // Default blue icon for full access
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const limitedAccessIcon = L.icon({
      iconUrl: "/accessibility-icon-limited.svg", // Yellow/orange icon for limited access
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const noAccessIcon = L.icon({
      iconUrl: "/accessibility-icon-no.svg", // Red icon with diagonal line for no access
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add markers for each accessibility point
    data.points.forEach((point) => {
      if (point.lat && point.lon) {
        // Choose icon based on wheelchair accessibility
        let icon = fullAccessIcon; // Default

        if (point.tags.wheelchair === "no") {
          icon = noAccessIcon;
        } else if (point.tags.wheelchair === "limited") {
          icon = limitedAccessIcon;
        }

        // Create popup content with information about the point
        const title = getPointTitle(point);
        const description = getPointDescription(point);

        // Add distance from user if user location is available
        let distanceInfo = "";
        if (userLocation) {
          const distance = calculateDistance(
            userLocation[0],
            userLocation[1],
            point.lat,
            point.lon
          );
          distanceInfo = `<div class="distance-info">
            <strong>Distance from you:</strong> ${distance.toFixed(2)} km
          </div>`;
        }

        const popupContent = `
          <div class="popup-content">
            <h3>${title}</h3>
            <p>${description}</p>
            ${
              point.tags.wheelchair
                ? `<div class="wheelchair-status wheelchair-${point.tags.wheelchair}">
                Wheelchair: ${point.tags.wheelchair}
              </div>`
                : ""
            }
            ${distanceInfo}
          </div>
        `;

        // Add marker to the map
        const marker = L.marker([point.lat, point.lon], { icon })
          .bindPopup(popupContent)
          .addTo(markersLayerRef.current);
      }
    });
  };

  // Calculate distance between two points in kilometers using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Function to get user's current location
  const getUserLocation = useCallback(async () => {
    if (!map) return;

    setIsLocating(true);
    setLocationError(null);

    try {
      // First check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      // Check for permissions
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permissionStatus.state === "denied") {
          throw new Error(
            "Location permission is denied. Please enable location access in your browser settings and try again."
          );
        }

        // If permission is prompt, we'll let the getCurrentPosition handle it
        if (permissionStatus.state === "prompt") {
          console.log("Location permission will be requested");
        }
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);

      // Center map on user's location
      map.setView([latitude, longitude], 16);

      // Update the user marker
      updateUserMarker([latitude, longitude]);

      // Load accessibility data around user's location
      const radius = 0.01; // Approximately 1km radius
      const bbox: [number, number, number, number] = [
        latitude - radius,
        longitude - radius,
        latitude + radius,
        longitude + radius,
      ];

      await loadAccessibilityData(bbox);
    } catch (error: any) {
      console.error("Error getting user location:", error);

      // Provide more specific error messages based on the error code
      if (error.code) {
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            setLocationError(
              "Location permission denied. Please enable location access in your browser settings and try again."
            );
            break;
          case 2: // POSITION_UNAVAILABLE
            setLocationError(
              "Your location information is unavailable. Please try again later."
            );
            break;
          case 3: // TIMEOUT
            setLocationError(
              "The request to get your location timed out. Please try again."
            );
            break;
          default:
            setLocationError(
              error.message || "Unable to get your location. Please try again."
            );
        }
      } else {
        setLocationError(
          error.message || "Unable to get your location. Please try again."
        );
      }
    } finally {
      setIsLocating(false);
    }
  }, [map, loadAccessibilityData]);

  // Update user marker on the map
  const updateUserMarker = async (location: [number, number]) => {
    if (!map) return;

    const L = await import("leaflet");

    // Remove existing user marker if it exists
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Create a user location marker with a different style
    const userIcon = L.divIcon({
      className: "user-location-marker",
      html: `
        <div class="user-marker-outer">
          <div class="user-marker-inner"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add the user marker to the map
    userMarkerRef.current = L.marker(location, {
      icon: userIcon,
      zIndexOffset: 1000, // Ensure user marker is on top
    })
      .addTo(map)
      .bindPopup("<strong>Your Location</strong>");
  };

  // Handle map click for adding new points
  const handleMapClick = useCallback(
    (e: any) => {
      if (addingPoint) {
        setNewPointPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
    [addingPoint]
  );

  // Initialize map on component mount
  useEffect(() => {
    initializeMap();

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [initializeMap]);

  // Automatically get user location after map is initialized
  useEffect(() => {
    if (map && !isLocating && !userLocation) {
      getUserLocation();
    }
  }, [map, getUserLocation, isLocating, userLocation]);

  // Set up map click event listener when addingPoint changes
  useEffect(() => {
    if (!map) return;

    if (addingPoint) {
      map.on("click", handleMapClick);
      // Change cursor to indicate clickable
      if (mapRef.current) {
        mapRef.current.style.cursor = "pointer";
      }
    } else {
      map.off("click", handleMapClick);
      // Reset cursor
      if (mapRef.current) {
        mapRef.current.style.cursor = "";
      }
    }

    return () => {
      if (map) {
        map.off("click", handleMapClick);
        if (mapRef.current) {
          mapRef.current.style.cursor = "";
        }
      }
    };
  }, [map, addingPoint, handleMapClick]);

  // Update markers when accessibility data changes
  useEffect(() => {
    if (accessibilityData && map) {
      updateMapMarkers(accessibilityData);
    }
  }, [accessibilityData, map, userLocation]);

  // Add a new accessibility point
  const handleAddPoint = (point: Omit<AccessibilityPoint, "id">) => {
    // Create a new point with unique ID
    const newPoint: AccessibilityPoint = {
      ...point,
      id: `user-${Date.now()}`,
    };

    // Add to user added points
    setUserAddedPoints((prev) => [...prev, newPoint]);

    // Add to the current data so it shows on the map
    setAccessibilityData((prev) => {
      if (!prev)
        return {
          points: [newPoint],
          timestamp: new Date().toISOString(),
        };

      return {
        ...prev,
        points: [...prev.points, newPoint],
      };
    });

    // Reset state
    setNewPointPosition(null);
    setAddingPoint(false);
  };

  // Cancel adding a point
  const handleCancelAddPoint = () => {
    setNewPointPosition(null);
    setAddingPoint(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-16 md:pt-20">
      <Head>
        <title>Wheelchair Accessibility Map</title>
        <meta name="description" content="Map of wheelchair ramp locations" />
      </Head>

      <main className="flex-grow p-3 md:p-4 pt-6 md:pt-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Wheelchair Accessibility Map
          </h1>
          <button
            onClick={() => setAddingPoint(!addingPoint)}
            className={`px-4 py-2.5 rounded-md flex items-center justify-center gap-2 shadow-sm font-medium ${
              addingPoint
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-600 text-white hover:bg-green-700"
            } transition-colors w-full md:w-auto`}
            aria-label={
              addingPoint
                ? "Cancel adding accessibility point"
                : "Add new accessibility point"
            }
          >
            {addingPoint ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Accessibility Point
              </>
            )}
          </button>
        </div>

        {addingPoint && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Click anywhere on the map to add a new accessibility point
            </span>
          </div>
        )}

        {isLocating && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded flex items-center">
            <svg
              className="animate-spin mr-2 h-5 w-5 text-blue-700"
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
            <span>Detecting your location...</span>
          </div>
        )}

        {locationError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex flex-col">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <p className="font-medium">{locationError}</p>
                {locationError.includes("permission") && (
                  <div className="mt-2">
                    <p className="text-sm">
                      How to enable location permissions:
                    </p>
                    <ul className="list-disc ml-5 text-sm mt-1">
                      <li>
                        Click the lock/info icon in your browser's address bar
                      </li>
                      <li>Select "Site settings" or "Permissions"</li>
                      <li>Enable "Location" permission</li>
                      <li>Refresh the page and try again</li>
                    </ul>
                    <button
                      onClick={getUserLocation}
                      className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Loading map...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-100 dark:bg-red-900 bg-opacity-80 dark:bg-opacity-80 z-10">
              <div className="text-center p-4">
                <p className="text-red-700 dark:text-red-300">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}

          <div
            ref={mapRef}
            className="w-full h-[70vh] rounded-lg"
            aria-label="Map showing wheelchair accessibility points"
          ></div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              About This Map
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              This map shows wheelchair ramp locations and accessibility points.
              Click on markers to view more details about each location.
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              Data is sourced from OpenStreetMap's accessibility information.
              The map shows:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-400">
              <li>Wheelchair ramps</li>
              <li>Accessible entrances</li>
              <li>Lowered kerbs</li>
              <li>Other wheelchair accessibility features</li>
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Legend
            </h2>
            <h3 className="text-md font-semibold mt-1 mb-2 text-gray-800 dark:text-gray-100">
              Accessibility Status:
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 bg-contain bg-no-repeat bg-center mr-2"
                  style={{ backgroundImage: "url(/accessibility-icon.svg)" }}
                ></div>
                <span className="text-gray-700 dark:text-gray-400">
                  Full wheelchair access
                </span>
              </div>

              <div className="flex items-center">
                <div
                  className="w-8 h-8 bg-contain bg-no-repeat bg-center mr-2"
                  style={{
                    backgroundImage: "url(/accessibility-icon-limited.svg)",
                  }}
                ></div>
                <span className="text-gray-700 dark:text-gray-400">
                  Limited wheelchair access (may require assistance)
                </span>
              </div>

              <div className="flex items-center">
                <div
                  className="w-8 h-8 bg-contain bg-no-repeat bg-center mr-2"
                  style={{ backgroundImage: "url(/accessibility-icon-no.svg)" }}
                ></div>
                <span className="text-gray-700 dark:text-gray-400">
                  No wheelchair access
                </span>
              </div>

              {userLocation && (
                <div className="flex items-center mt-2">
                  <div
                    className="user-marker-outer mr-2"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <div className="user-marker-inner"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-400">
                    Your current location
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
              Feature Types:
            </h3>
            <ul className="list-disc ml-5 text-gray-700 dark:text-gray-400">
              <li>Entrances with ramps</li>
              <li>Dedicated wheelchair paths</li>
              <li>Accessible facilities</li>
              <li>Lowered kerbs for street crossing</li>
            </ul>
          </div>
        </div>

        {/* Add the new component for adding points */}
        {newPointPosition && (
          <AddAccessibilityPoint
            position={newPointPosition}
            onAdd={handleAddPoint}
            onCancel={handleCancelAddPoint}
          />
        )}
      </main>

      <footer className="p-6 mt-8 bg-gray-200 dark:bg-gray-700 text-center text-gray-700 dark:text-gray-300">
        <p>
          Data sourced from OpenStreetMap | &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm mt-1">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            OpenStreetMap Contributors
          </a>
        </p>
      </footer>

      {/* Custom styles for popup content */}
      <style jsx global>{`
        .popup-content {
          padding: 5px;
          color: #333; /* Default text color for popup content */
        }
        .dark .popup-content {
          color: #eee; /* Dark mode text color for popup content */
        }

        .popup-content h3 {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .wheelchair-status {
          margin-top: 5px;
          padding: 3px 6px;
          border-radius: 4px;
          display: inline-block;
          font-weight: bold;
        }

        .wheelchair-yes {
          background-color: #10b981;
          color: white;
        }

        .wheelchair-limited {
          background-color: #f59e0b;
          color: white;
        }

        .wheelchair-no {
          background-color: #ef4444;
          color: white;
        }

        .distance-info {
          margin-top: 8px;
          padding: 3px 6px;
          background-color: #f3f4f6;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .user-location-marker {
          background: transparent;
        }

        .user-marker-outer {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(59, 130, 246, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        .user-marker-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgb(59, 130, 246);
          border: 2px solid white;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default WheelchairMapPage;
