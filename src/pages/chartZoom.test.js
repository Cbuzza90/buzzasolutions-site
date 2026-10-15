import { test } from "node:test";
import assert from "node:assert/strict";
import { startPinch, updatePinch } from "./chartZoom.js";

test("pinching scales the chart around the point beneath both fingers", () => {
  const start = startPinch([{x:50,y:100},{x:150,y:100}], {width:1280, scrollLeft:300, scrollTop:400});
  const next = updatePinch(start, [{x:0,y:100},{x:200,y:100}], 320);
  assert.equal(next.zoom, 200);
  assert.equal(next.width, 2560);
  assert.equal(next.scrollLeft, 700);
  assert.equal(next.scrollTop, 900);
});

test("two fingers can pan at the zoom limit without changing scale", () => {
  const start = startPinch([{x:50,y:100},{x:150,y:100}], {width:2560, scrollLeft:300, scrollTop:400});
  const next = updatePinch(start, [{x:0,y:150},{x:200,y:150}], 320);
  assert.equal(next.zoom, 200);
  assert.equal(next.scrollLeft, 300);
  assert.equal(next.scrollTop, 350);
});

test("pinching from Fit begins at its actual width rather than jumping to 50%", () => {
  const start = startPinch([{x:50,y:100},{x:150,y:100}], {width:320, scrollLeft:0, scrollTop:0});
  const next = updatePinch(start, [{x:40,y:100},{x:160,y:100}], 320);
  assert.equal(next.zoom, 30);
  assert.equal(next.width, 384);
  const smaller = updatePinch(start, [{x:75,y:100},{x:125,y:100}], 320);
  assert.equal(smaller.zoom, 25);
  assert.equal(smaller.width, 320);
});

test("coincident touches and unloaded images do not create an invalid pinch", () => {
  assert.equal(startPinch([{x:100,y:100},{x:100,y:100}], {width:1280,scrollLeft:0,scrollTop:0}), null);
  assert.equal(startPinch([{x:0,y:0},{x:100,y:100}], {width:0,scrollLeft:0,scrollTop:0}), null);
});

test("resistor pinch uses its fitted width and keeps the same chart point at its 300% limit", () => {
  const start = startPinch([{x:50,y:60},{x:150,y:60}], {width:480,scrollLeft:100,scrollTop:140});
  const options = { baseWidth:320, minZoom:100, maxZoom:300 };
  const next = updatePinch(start, [{x:0,y:60},{x:200,y:60}], 320, options);
  assert.equal(next.zoom, 300);
  assert.equal(next.width, 960);
  assert.equal(next.scrollLeft, 300);
  assert.equal(next.scrollTop, 340);
  const fit = updatePinch(start, [{x:90,y:60},{x:110,y:60}], 320, options);
  assert.equal(fit.zoom, 100);
  assert.equal(fit.width, 320);
});
