import MatomoTracker from "matomo-tracker-react-native";

export const instance = new MatomoTracker({
    urlBase: 'https://matomo.redbudway.com',
    siteId: 2,
    // trackerUrl: 'https://matomo.redbudway.com/matomo.php', // optional, default value: `${urlBase}matomo.php`
    // srcUrl: 'https://matomo.redbudway.com/matomo.php', // optional, default value: `${urlBase}matomo.js`
})