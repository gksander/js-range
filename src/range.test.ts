import { describe, expect, test } from "vitest";
import { range } from "./range";

describe("range", () => {
  test("single positive integer argument: iterates from 0 to arg, step of 1", () => {
    expect([...range(3)]).toEqual([0, 1, 2]);
  });

  test("single positive float argument: iterates from 0 to floor(arg)", () => {
    expect([...range(3.3)]).toEqual([0, 1, 2, 3]);
  });

  test("single negative argument: empty iteration", () => {
    expect([...range(-3)]).toEqual([]);
    expect([...range(-3.3)]).toEqual([]);
  });

  test("handles positive integers for start/end", () => {
    expect([...range(2, 5)]).toEqual([2, 3, 4]);
    expect([...range(5, 2)]).toEqual([]);
  });

  // TODO: Handle float start/ends

  test("handles negative integers for start/end", () => {
    expect([...range(-5, -2)]).toEqual([-5, -4, -3]);
    expect([...range(-2, -5)]).toEqual([]);
  });

  // TODO: handle negative float start/ends

  test("handles positive integer step", () => {
    expect([...range(1, 9, 2)]).toEqual([1, 3, 5, 7]);
    expect([...range(-3, 14, 4)]).toEqual([-3, 1, 5, 9, 13]);
  });

  test("handles negative integer step", () => {
    expect([...range(10, 2, -2)]).toEqual([10, 8, 6, 4]);
    expect([...range(-3, -11, -3)]).toEqual([-3, -6, -9]);
  });

  test("handles 'in' keyword for properties on the object", () => {
    const r = range(3);

    expect("start" in r).toBe(true);
    expect("end" in r).toBe(true);
    expect("step" in r).toBe(true);
    expect("plop" in r).toBe(false);
  });

  test("handles 'in' keyword for single-arg", () => {
    const r = range(3);
    expect(-2 in r).toBe(false);
    expect(-1 in r).toBe(false);
    expect(0 in r).toBe(true);
    expect(1 in r).toBe(true);
    expect(2 in r).toBe(true);
    expect(3 in r).toBe(false);
    expect(4 in r).toBe(false);

    expect(2.2 in r).toBe(false);
    expect(2.01 in r).toBe(false);
  });

  test("handles 'in' keyword for double-arg", () => {
    const r = range(-2, 3);
    expect(-4 in r).toBe(false);
    expect(-3 in r).toBe(false);
    expect(-2 in r).toBe(true);
    expect(-1 in r).toBe(true);
    expect(0 in r).toBe(true);
    expect(1 in r).toBe(true);
    expect(2 in r).toBe(true);
    expect(3 in r).toBe(false);
    expect(4 in r).toBe(false);
  });

  test("handles 'in' keyword for triple-arg", () => {
    const r = range(-3, 9, 4);

    expect(-7 in r).toBe(false);
    expect(-4 in r).toBe(false);
    expect(-3 in r).toBe(true);
    expect(1 in r).toBe(true);
    expect(5 in r).toBe(true);
    expect(6 in r).toBe(false);
    expect(9 in r).toBe(false);
  });

  test("handles 'in' keyword for float triple-arg", () => {
    const r = range(2.2, Infinity, 1.5);

    expect(2.2 in r).toBe(true);
    expect(3 in r).toBe(false);
    expect(3.7 in r).toBe(true);
    expect(494.2 in r).toBe(true);
  });

  test("handles positive value lookup for single-arg", () => {
    expect(range(5)[1]).toEqual(1);
    expect(range(5)[2]).toEqual(2);
    expect(range(5)[5]).toBeUndefined();
    expect(range(5)[7]).toBeUndefined();
  });
});