import MatomoTracker from 'matomo-tracker-react-native';

export const instance = new MatomoTracker({
    urlBase: 'https://matomo.redbudway.com', // required
    // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
    siteId: 2, // required, number matching your Matomo project
    // userId: 'UID76903202' // optional, default value: `undefined`.
    // disabled: false, // optional, default value: false. Disables all tracking operations if set to true.
    log: true  // optional, default value: false. Enables some logs if set to true.
});