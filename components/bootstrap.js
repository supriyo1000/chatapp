// "use client";

// import { useEffect } from "react";

// function BootstrapClient() {
//     useEffect(() => {
//         // Dynamically import the Bootstrap JS only on the client side
//         import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
//             console.log("Bootstrap JS has been loaded");
//         });
//     }, []);

//     return null;
// }

// export default BootstrapClient;



"use client";

import { useEffect } from "react";

function BootstrapClient() {
    useEffect(() => {
        console.log("BootstrapClient mounted. Starting Bootstrap JS load...");

        // Dynamically import Bootstrap JS and initialize the popover
        import("bootstrap/dist/js/bootstrap.bundle.min.js")
            .then(() => {
                console.log("Bootstrap JS bundle loaded successfully.");

                // After importing the Bootstrap JS bundle, initialize the popovers
                const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));

                console.log(`Found ${popoverTriggerList.length} popover trigger(s) in the DOM.`);

                // Initialize each popover element
                popoverTriggerList.forEach((popoverTriggerEl, index) => {
                    console.log(`Initializing popover #${index + 1}`, popoverTriggerEl);
                    new window.bootstrap.Popover(popoverTriggerEl);
                    console.log(`Popover #${index + 1} initialized.`);
                });

                console.log("All popovers initialized.");
            })
            .catch((error) => {
                console.error("Error loading Bootstrap JS:", error);
            });
    }, []);

    return null; // This component only handles loading Bootstrap JS on the client
}

export default BootstrapClient;
