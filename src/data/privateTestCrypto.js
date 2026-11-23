const encoder = new TextEncoder();
const decoder = new TextDecoder();
const iterations = 310000;
function encode(bytes) { return btoa(String.fromCharCode(...new Uint8Array(bytes))); }
function decode(text) { return Uint8Array.from(atob(text), character => character.charCodeAt(0)); }

export async function privateTestKey(password, salt) {
  const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: decode(salt), iterations, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

export async function sealPrivateData(value, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(JSON.stringify(value)));
  return { version: 1, iv: encode(iv), ciphertext: encode(ciphertext) };
}

export async function openPrivateData(envelope, key) {
  if (envelope.version !== 1) throw new Error("Unsupported private data");
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decode(envelope.iv) }, key, decode(envelope.ciphertext));
  return JSON.parse(decoder.decode(plaintext));
}

export async function createPrivateEnvelope(value, password) {
  const salt = encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await privateTestKey(password, salt);
  return { ...(await sealPrivateData(value, key)), salt };
}

// The quiz engine uses synchronous storage. Keep its unlocked records in memory,
// then serialize encrypted snapshots to disk in order. No password/key is saved.
export async function privateProgressStorage(key, backing, name = "study-private:electricity:v1") {
  let values = {};
  const raw = backing?.getItem(name);
  if (raw) values = await openPrivateData(JSON.parse(raw), key);
  let pending = Promise.resolve();
  let failed = false;
  return {
    getItem: field => values[field] ?? null,
    setItem(field, value) {
      if (failed || !backing) throw new Error("Private progress storage unavailable");
      values[field] = value;
      const snapshot = { ...values };
      pending = pending.then(async () => backing.setItem(name, JSON.stringify(await sealPrivateData(snapshot, key)))).catch(() => { failed = true; });
    },
    async flush() { await pending; if (failed) throw new Error("Private progress could not be saved"); },
  };
}
