import http from 'k6/http';
import { check, sleep } from "k6";

const url = 'https://5dc5-170-239-140-91.ngrok-free.app/superfrete-teste/us-central1/webApi/user/create';
const formData = {
  name: 'Superfrete',
};

const isNumeric = (value) => /^\d+$/.test(value);

const default_vus = 5;

const target_vus_env = `${__ENV.TARGET_VUS}`;
const target_vus = isNumeric(target_vus_env) ? Number(target_vus_env) : default_vus;

export let options = {
  stages: [
      // Ramp-up from 1 to TARGET_VUS virtual users (VUs) in 5s
      { duration: "5s", target: 10 },

      // Stay at rest on TARGET_VUS VUs for 10s
      { duration: "10s", target: 100 },

      // Ramp-down from TARGET_VUS to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  const response = http.post(url, JSON.stringify(formData));
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
