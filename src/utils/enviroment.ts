const LIVE: string = "https://us-central1-mealstogo-12157.cloudfunctions.net";
const HOST_IP = "10.0.4.82";
const LOCAL: string = `http://${HOST_IP}:5001/mealstogo-12157/us-central1`;

export const isMock: boolean = false;
export const isDevelopment: boolean = process.env.NODE_ENV === "development";
export const HOST: string = isDevelopment ? LOCAL : LIVE;
