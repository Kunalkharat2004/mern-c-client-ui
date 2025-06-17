"use client";

import { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: React.ReactNode }) => {

    const timeOutId = useRef<NodeJS.Timeout | null>(null);

    const getAccessToken = async () => {
        
        const response = await fetch("/api/auth/accessToken");
        if (!response.ok) return;
        const data = await response.json();
        return data.token;
    }

    const refreshAccessToken = async () => {
        try {
          const res = await fetch("/api/auth/refreshToken");
            if (!res.ok) {
              console.error("Failed to refresh access token");
              return;
            }
            startRefresh(); // Restart the refresh timer
        } catch (err) {
            console.error("Error refreshing access token:", err);
            return 
       }
    }
    
    const startRefresh = useCallback(async () => {

        if(timeOutId.current) {
            clearTimeout(timeOutId.current);
            timeOutId.current = null;
        }

      try {
          console.log("Starting refresh process...");
            const accessToken = await getAccessToken();
            if (!accessToken) return;
            const decoded = jose.decodeJwt(accessToken);
            const exp = decoded.exp! * 1000; // Convert to milliseconds
            const currentTime = Date.now();
            const timeToRefresh = exp - currentTime - 5000; // Refresh 5 seconds before expiration

            console.log(`Expires at: ${new Date(exp).toISOString()}`);
            console.log(`Current time: ${new Date(currentTime).toISOString()}`);
            console.log(
              `Time to refresh: ${new Date(
                currentTime + timeToRefresh
              ).toISOString()}`
            );

            timeOutId.current = setTimeout(() => {
              refreshAccessToken();
            }, timeToRefresh);
        } catch (err) {
            console.error("Error starting refresh:", err);
            return;
        }

    }, []);
    
    useEffect(() => {
        startRefresh();

        return ()=> {
            if (timeOutId.current) {
                clearTimeout(timeOutId.current);
                timeOutId.current = null;
            }
        }
    }, [timeOutId, startRefresh]);


  return <div>{children}</div>;
}

export default Refresher;